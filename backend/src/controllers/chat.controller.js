import { getCafeInfo, getSiteContent, listPrices, listServices, listSpecialties } from '../models/content.model.js';

const systemPrompt = `Eres el asistente virtual de una cafetería. Responde en español, de forma cálida, breve y clara. Usa únicamente la información incluida desde la base de datos. No inventes productos, ingredientes, precios, horarios, ubicación ni disponibilidad. Si la información no está en la base de datos, indícalo y recomienda consultar directamente al equipo. Para preguntas de alergias o ingredientes, recomienda confirmarlo con el equipo de la cafetería.`;

function normalizeModelName(value) {
  const candidate = (value || 'gemma3').trim();
  if (!candidate) return 'gemma3:latest';
  return candidate.includes(':') ? candidate : `${candidate}:latest`;
}

async function loadBusinessContext() {
  const [infoRows, menu, features, prices, content] = await Promise.all([
    getCafeInfo(),
    listServices(),
    listSpecialties(),
    listPrices(),
    getSiteContent()
  ]);
  if (!infoRows[0]) throw new Error('Falta la información del negocio en la base de datos.');
  return {
    business: infoRows[0],
    menu,
    features,
    prices,
    siteContent: Object.fromEntries(content.map(({ content_key, content_value }) => [content_key, content_value]))
  };
}

export async function sendChat(req, res) {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message || message.length > 1500) return res.status(400).json({ error: 'Escribe un mensaje de hasta 1500 caracteres.' });
  const history = Array.isArray(req.body.history) ? req.body.history.slice(-8).filter((item) => ['user', 'assistant'].includes(item?.role) && typeof item?.content === 'string').map(({ role, content }) => ({ role, content: content.slice(0, 1500) })) : [];
  let context;
  try {
    context = await loadBusinessContext();
  } catch (error) {
    console.error(`No se pudo leer el contexto del chat desde MySQL: ${error.message}`);
    return res.status(503).json({ error: 'No se pudo leer la información de MySQL. Verifica XAMPP y la configuración de la base de datos.' });
  }

  const baseUrl = (process.env.OLLAMA_URL || 'http://localhost:11434').replace(/\/$/, '');
  const model = normalizeModelName(process.env.OLLAMA_MODEL);
  const url = `${baseUrl}/api/chat`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'system', content: `INFORMACIÓN ACTUAL DE LA BASE DE DATOS:\n${JSON.stringify(context)}` },
          ...history,
          { role: 'user', content: message }
        ]
      }),
      signal: AbortSignal.timeout(90000)
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(errorText || `Ollama respondió ${response.status}`);
    }
    const data = await response.json();
    const reply = data.message?.content?.trim();
    if (!reply) throw new Error('Ollama devolvió una respuesta vacía');
    return res.json({ reply, source: 'ollama', model });
  } catch (error) {
    console.warn(`Chatbot sin Ollama: ${error.message}`);
    return res.json({
      reply: `En este momento el asistente no está disponible. Puedes contactar directamente a ${context.business.name}.`,
      source: 'fallback',
      model
    });
  }
}
