const API = '/api';
const fallback = {
  home: { clinicName: 'Huellitas', headline: 'Su bienestar también es parte de la familia.', subheadline: 'Atención veterinaria con cariño, experiencia y un equipo que escucha.' },
  services: [{ name: 'Consulta general', description: 'Evaluación completa y orientación para cuidar la salud de tu mascota.', icon: '🩺' }, { name: 'Vacunación', description: 'Plan de vacunas y recordatorios según la edad de cada paciente.', icon: '💉' }, { name: 'Desparasitación', description: 'Prevención y tratamiento seguro para perros y gatos.', icon: '🛡️' }, { name: 'Estética y baño', description: 'Baño, corte y cuidado de piel y pelaje.', icon: '🛁' }, { name: 'Laboratorio clínico', description: 'Análisis de apoyo para un diagnóstico oportuno.', icon: '🔬' }, { name: 'Cirugía', description: 'Procedimientos programados con seguimiento veterinario.', icon: '🏥' }],
  specialties: [{ name: 'Medicina preventiva', description: 'Controles, vacunas y planes de bienestar.', icon: '🌿' }, { name: 'Medicina interna', description: 'Evaluación de enfermedades frecuentes.', icon: '🩺' }, { name: 'Dermatología', description: 'Atención de alergias y problemas de piel.', icon: '🐕' }, { name: 'Odontología', description: 'Cuidado de la salud oral de tu mascota.', icon: '🦷' }],
  about: { history: 'Somos un equipo dedicado a la salud y bienestar de perros y gatos. Queremos que cada visita sea tranquila, clara y llena de cariño.', address: 'Av. Principal #123, La Paz, Bolivia', phone: '+591 70000000', email: 'hola@huellitas.bo', hours: 'Lunes a sábado · 09:00 a 18:00' },
  prices: [{ service_name: 'Consulta general', amount: 80, currency: 'Bs', note: 'Precio referencial.' }, { service_name: 'Vacunación', amount: 60, currency: 'Bs', note: 'Desde; depende de la vacuna.' }, { service_name: 'Desparasitación', amount: 35, currency: 'Bs', note: 'Desde; depende del peso.' }, { service_name: 'Baño y estética', amount: 90, currency: 'Bs', note: 'Desde; varía según tamaño.' }, { service_name: 'Control de seguimiento', amount: 50, currency: 'Bs', note: 'Precio referencial.' }]
};
async function getData(route, defaultValue) { try { const response = await fetch(`${API}/${route}`); if (!response.ok) throw new Error(); return await response.json(); } catch { return defaultValue; } }
function renderCards(items, target, kind) {
  document.querySelector(target).innerHTML = items.map((item, index) => kind === 'service'
    ? `<article class="service-card"><div class="card-top"><span class="card-icon">${item.icon}</span><span class="card-index">0${index + 1}</span></div><h3>${item.name}</h3><p>${item.description}</p><a href="#contacto" aria-label="Consultar por ${item.name}">↗</a></article>`
    : `<article class="specialty-card"><span class="specialty-icon">${item.icon}</span><div><h3>${item.name}</h3><p>${item.description}</p></div><span class="specialty-arrow">↗</span></article>`).join('');
}
function renderPrices(items) { document.querySelector('#prices-list').innerHTML = items.map((item, i) => `<article class="price-row"><span class="price-num">0${i + 1}</span><strong>${item.service_name}</strong><span class="price-note-inline">${item.note || ''}</span><span class="price-amount">${item.currency} ${Number(item.amount).toFixed(0)}</span></article>`).join(''); }
function renderContact(info) {
  document.querySelector('#contact-details').innerHTML = `<div><span>VISÍTANOS</span><strong>${info.address}</strong></div><div><span>LLÁMANOS</span><strong><a href="tel:${info.phone.replace(/[^+\d]/g, '')}">${info.phone}</a></strong></div><div><span>HORARIO</span><strong>${info.hours}</strong></div>`;
}
async function init() {
  const [home, services, specialties, about, prices, contact] = await Promise.all([getData('home', fallback.home), getData('services', fallback.services), getData('specialties', fallback.specialties), getData('about', fallback.about), getData('prices', fallback.prices), getData('contact-info', fallback.about)]);
  document.querySelector('#hero-title').innerHTML = (home.headline || fallback.home.headline).replace('familia.', '<em>familia.</em>');
  document.querySelector('#hero-subtitle').textContent = home.subheadline || fallback.home.subheadline;
  if (home.videoUrl) document.querySelector('#hero-video source').src = home.videoUrl;
  document.querySelector('#hero-video').load();
  document.querySelector('#about-history').textContent = about.history;
  renderCards(services, '#services-grid', 'service'); renderCards(specialties, '#specialties-grid', 'specialty'); renderPrices(prices); renderContact(contact);
  document.querySelector('#year').textContent = new Date().getFullYear();
}
init();
const nav = document.querySelector('.nav'), menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('nav-open', open); });
nav.addEventListener('click', (event) => { if (event.target.closest('a')) { nav.classList.remove('nav-open'); menuToggle.setAttribute('aria-expanded', 'false'); } });
document.querySelector('#contact-form').addEventListener('submit', async (event) => {
  event.preventDefault(); const form = event.currentTarget, status = document.querySelector('#form-status'), button = form.querySelector('button');
  button.disabled = true; status.textContent = 'Enviando…'; status.className = 'form-status';
  try { const response = await fetch(`${API}/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || 'No se pudo enviar.'); status.textContent = result.message; status.classList.add('success'); form.reset(); }
  catch (error) { status.textContent = error.message || 'No pudimos enviar tu mensaje. Intenta por teléfono.'; status.classList.add('error'); }
  finally { button.disabled = false; }
});
const chatPanel = document.querySelector('#chat-panel'), chatMessages = document.querySelector('#chat-messages'); let history = [];
document.querySelector('#chat-toggle').addEventListener('click', () => { chatPanel.hidden = !chatPanel.hidden; if (!chatPanel.hidden) document.querySelector('#chat-input').focus(); });
document.querySelector('#chat-close').addEventListener('click', () => { chatPanel.hidden = true; });
document.querySelector('#chat-form').addEventListener('submit', async (event) => {
  event.preventDefault(); const input = document.querySelector('#chat-input'), message = input.value.trim(); if (!message) return;
  addBubble(message, 'user'); history.push({ role: 'user', content: message }); input.value = ''; const pending = addBubble('Estoy pensando…', 'bot pending');
  try { const response = await fetch(`${API}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, history: history.slice(0, -1) }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error); pending.textContent = result.reply; pending.classList.remove('pending'); history.push({ role: 'assistant', content: result.reply }); }
  catch { pending.textContent = 'No pude responder ahora. Llámanos directamente para ayudarte.'; pending.classList.remove('pending'); }
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
function addBubble(text, role) { const bubble = document.createElement('div'); bubble.className = `chat-bubble ${role}`; bubble.textContent = text; chatMessages.append(bubble); chatMessages.scrollTop = chatMessages.scrollHeight; return bubble; }
