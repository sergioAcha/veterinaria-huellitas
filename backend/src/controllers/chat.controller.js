const systemPrompt = `Eres el asistente virtual de una veterinaria. Responde en español, de forma cálida, breve y clara. Ayuda con información general sobre servicios, horarios, precios orientativos y cuidado preventivo. No diagnostiques ni recomiendes medicamentos o dosis. Si describen una urgencia (dificultad para respirar, convulsiones, sangrado fuerte, intoxicación, atropello), indica que contacten o acudan de inmediato a una clínica veterinaria. Aclara que el chatbot no sustituye una consulta veterinaria.`;

export async function sendChat(req, res) {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message || message.length > 1500) return res.status(400).json({ error: 'Escribe un mensaje de hasta 1500 caracteres.' });
  const history = Array.isArray(req.body.history) ? req.body.history.slice(-8).filter((item) => ['user', 'assistant'].includes(item?.role) && typeof item?.content === 'string').map(({ role, content }) => ({ role, content: content.slice(0, 1500) })) : [];
  const url = `${(process.env.OLLAMA_URL || 'http://localhost:11434').replace(/\/$/, '')}/api/chat`;
  try {
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: process.env.OLLAMA_MODEL || 'gemma3', stream: false, messages: [{ role: 'system', content: systemPrompt }, ...history, { role: 'user', content: message }] }), signal: AbortSignal.timeout(90000) });
    if (!response.ok) throw new Error(`Ollama respondió ${response.status}`);
    const data = await response.json();
    const reply = data.message?.content?.trim();
    if (!reply) throw new Error('Ollama devolvió una respuesta vacía');
    return res.json({ reply, source: 'ollama', model: process.env.OLLAMA_MODEL || 'gemma3' });
  } catch (error) {
    console.warn(`Chatbot sin Ollama: ${error.message}`);
    return res.json({ reply: 'En este momento no puedo conectarme al asistente. Para consultas o urgencias, llama directamente a la veterinaria. Recuerda que una evaluación profesional es la mejor forma de cuidar a tu mascota.', source: 'fallback' });
  }
}
