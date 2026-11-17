const API = '/api';
const CONTENT_REFRESH_MS = 15000;

async function getData(route) {
  const response = await fetch(`${API}/${route}?t=${Date.now()}`, { cache: 'no-store' });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || `No se pudieron cargar los datos (${route}).`);
  return result;
}

function setText(selector, value) {
  document.querySelector(selector).textContent = value || '';
}

function renderCards(items, target, kind) {
  const container = document.querySelector(target);
  if (!items.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No hay información disponible.';
    container.replaceChildren(empty);
    return;
  }
  const cards = items.map((item, index) => {
    const card = document.createElement('article');
    card.className = kind === 'service' ? 'service-card' : 'specialty-card';
    if (kind === 'service') {
      const top = document.createElement('div');
      top.className = 'card-top';
      const icon = document.createElement('span');
      icon.className = 'card-icon';
      icon.textContent = item.icon;
      const number = document.createElement('span');
      number.className = 'card-index';
      number.textContent = String(index + 1).padStart(2, '0');
      top.append(icon, number);
      const title = document.createElement('h3');
      title.textContent = item.name;
      const description = document.createElement('p');
      description.textContent = item.description;
      const link = document.createElement('a');
      link.href = '#contacto';
      link.setAttribute('aria-label', `Consultar por ${item.name}`);
      link.textContent = '↗';
      card.append(top, title, description, link);
    } else {
      const icon = document.createElement('span');
      icon.className = 'specialty-icon';
      icon.textContent = item.icon;
      const details = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = item.name;
      const description = document.createElement('p');
      description.textContent = item.description;
      details.append(title, description);
      const arrow = document.createElement('span');
      arrow.className = 'specialty-arrow';
      arrow.textContent = '↗';
      card.append(icon, details, arrow);
    }
    return card;
  });
  container.replaceChildren(...cards);
}

function renderPrices(items) {
  const list = document.querySelector('#prices-list');
  if (!items.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No hay precios disponibles.';
    list.replaceChildren(empty);
    return;
  }
  const rows = items.map((item, index) => {
    const row = document.createElement('article');
    row.className = 'price-row';
    const number = document.createElement('span');
    number.className = 'price-num';
    number.textContent = String(index + 1).padStart(2, '0');
    const name = document.createElement('strong');
    name.textContent = item.service_name;
    const note = document.createElement('span');
    note.className = 'price-note-inline';
    note.textContent = item.note || '';
    const amount = document.createElement('span');
    amount.className = 'price-amount';
    amount.textContent = `${item.currency} ${Number(item.amount).toFixed(0)}`;
    row.append(number, name, note, amount);
    return row;
  });
  list.replaceChildren(...rows);
}

function renderContact(info) {
  const details = document.querySelector('#contact-details');
  const entries = [
    ['VISÍTANOS', info.address],
    ['LLÁMANOS', info.phone],
    ['HORARIO', info.hours],
    ['CORREO', info.email]
  ];
  const elements = entries.map(([label, value]) => {
    const item = document.createElement('div');
    const caption = document.createElement('span');
    caption.textContent = label;
    const content = document.createElement('strong');
    if (label === 'LLÁMANOS') {
      const link = document.createElement('a');
      link.href = `tel:${value.replace(/[^+\d]/g, '')}`;
      link.textContent = value;
      content.append(link);
    } else if (label === 'CORREO') {
      const link = document.createElement('a');
      link.href = `mailto:${value}`;
      link.textContent = value;
      content.append(link);
    } else {
      content.textContent = value;
    }
    item.append(caption, content);
    return item;
  });
  details.replaceChildren(...elements);
}

function renderHome(home, about) {
  document.title = `${about.name} | ${about.tagline}`;
  document.querySelector('#site-description').content = home.hero_subheadline;
  document.querySelectorAll('.brand-name').forEach((element) => { element.textContent = about.name; });
  document.querySelectorAll('.brand-tagline').forEach((element) => { element.textContent = about.tagline; });
  setText('#footer-business-name', about.name);
  setText('#header-cta-label', home.header_cta);
  setText('#hero-eyebrow', home.hero_eyebrow);
  setText('#hero-title', home.hero_headline);
  setText('#hero-subtitle', home.hero_subheadline);
  setText('#hero-trust-title', home.hero_trust_title);
  setText('#hero-trust-text', home.hero_trust_text);
  setText('#hero-bottom-1', home.hero_bottom_1);
  setText('#hero-bottom-2', home.hero_bottom_2);
  setText('#hero-bottom-3', home.hero_bottom_3);
  const heroImage = document.querySelector('#hero-image');
  heroImage.src = home.hero_image_url;
  heroImage.alt = home.hero_image_alt;
  setText('#hero-caption', home.hero_caption);
  setText('#welcome-message', home.welcome_message);
  setText('#welcome-label', home.welcome_label);
  setText('#menu-eyebrow', home.menu_eyebrow);
  setText('#menu-heading', home.menu_heading);
  setText('#menu-description', home.menu_description);
  setText('#features-eyebrow', home.features_eyebrow);
  setText('#features-heading', home.features_heading);
  setText('#features-description', home.features_description);
  setText('#about-eyebrow', home.about_eyebrow);
  setText('#about-heading', home.about_heading);
  const aboutImage = document.querySelector('#about-image');
  aboutImage.src = home.about_image_url;
  aboutImage.alt = home.about_image_alt;
  setText('#about-photo-note', home.about_photo_note);
  setText('#about-fact-1', home.about_fact_1);
  setText('#about-fact-2', home.about_fact_2);
  setText('#about-fact-3', home.about_fact_3);
  setText('#about-cta', home.about_cta);
  setText('#prices-eyebrow', home.prices_eyebrow);
  setText('#prices-heading', home.prices_heading);
  setText('#prices-description', home.prices_description);
  setText('#prices-note', home.prices_note);
  setText('#contact-eyebrow', home.contact_eyebrow);
  setText('#contact-heading', home.contact_heading);
  setText('#contact-description', home.contact_description);
  setText('#footer-note', home.footer_note);
  setText('#chat-name', `Asistente ${about.name}`);
  setText('#chat-subtitle', home.chat_subtitle);
  setText('#chat-greeting', home.chat_greeting);
  setText('#chat-disclaimer', home.chat_disclaimer);
}

async function renderContent() {
  const [home, services, specialties, about, prices, contact] = await Promise.all([
    getData('home'),
    getData('services'),
    getData('specialties'),
    getData('about'),
    getData('prices'),
    getData('contact-info')
  ]);
  renderHome(home, about);
  setText('#about-history', about.history);
  renderCards(services, '#services-grid', 'service');
  renderCards(specialties, '#specialties-grid', 'specialty');
  renderPrices(prices);
  renderContact(contact);
  document.querySelector('#year').textContent = new Date().getFullYear();
}

async function init() {
  try {
    await renderContent();
    document.querySelector('#site-loading').hidden = true;
    document.querySelector('header').hidden = false;
    document.querySelector('main').hidden = false;
    document.querySelector('footer').hidden = false;
    document.querySelector('#chat-toggle').hidden = false;
    document.querySelector('#site-error').hidden = true;
  } catch (error) {
    console.error('No se pudo cargar el contenido desde MySQL:', error);
    document.querySelector('#site-loading').hidden = true;
    const message = document.querySelector('#site-error');
    message.textContent = `No se pudo cargar la información desde la base de datos. ${error.message}`;
    message.hidden = false;
  }
}

let refreshTimer = null;
function startContentRefresh() {
  if (refreshTimer) return;
  refreshTimer = window.setInterval(async () => {
    try {
      await renderContent();
      document.querySelector('#site-error').hidden = true;
    } catch (error) {
      console.warn('No se pudo refrescar el contenido desde MySQL:', error);
    }
  }, CONTENT_REFRESH_MS);
}

init();
startContentRefresh();
window.addEventListener('focus', () => {
  renderContent().catch(() => { /* no-op */ });
});

const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('nav-open', open);
});
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    nav.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

document.querySelector('#contact-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector('#form-status');
  const button = form.querySelector('button');
  button.disabled = true;
  status.textContent = 'Enviando…';
  status.className = 'form-status';
  try {
    const response = await fetch(`${API}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'No se pudo enviar el mensaje.');
    status.textContent = result.message;
    status.classList.add('success');
    form.reset();
  } catch (error) {
    status.textContent = error.message || 'No se pudo enviar el mensaje.';
    status.classList.add('error');
  } finally {
    button.disabled = false;
  }
});

const chatPanel = document.querySelector('#chat-panel');
const chatMessages = document.querySelector('#chat-messages');
let history = [];
document.querySelector('#chat-toggle').addEventListener('click', () => {
  chatPanel.hidden = !chatPanel.hidden;
  if (!chatPanel.hidden) document.querySelector('#chat-input').focus();
});
document.querySelector('#chat-close').addEventListener('click', () => { chatPanel.hidden = true; });
document.querySelector('#chat-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = document.querySelector('#chat-input');
  const message = input.value.trim();
  if (!message) return;
  addBubble(message, 'user');
  history.push({ role: 'user', content: message });
  input.value = '';
  const pending = addBubble('Estoy pensando…', 'bot pending');
  try {
    const response = await fetch(`${API}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: history.slice(0, -1) })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'No se pudo responder.');
    pending.textContent = result.reply;
    pending.classList.remove('pending');
    history.push({ role: 'assistant', content: result.reply });
  } catch (error) {
    pending.textContent = error.message || 'No se pudo responder en este momento.';
    pending.classList.remove('pending');
  }
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

function addBubble(text, role) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;
  bubble.textContent = text;
  chatMessages.append(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}
