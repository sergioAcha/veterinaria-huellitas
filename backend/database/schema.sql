-- Base exclusiva de Café Aroma en XAMPP; no modifica bases de otros proyectos.
CREATE DATABASE IF NOT EXISTS cafeteria_xampp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cafeteria_xampp;

CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, description TEXT NOT NULL,
  icon VARCHAR(20) NOT NULL DEFAULT '☕', sort_order INT NOT NULL DEFAULT 0, active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS cafe_features (
  id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, description TEXT NOT NULL,
  icon VARCHAR(20) NOT NULL DEFAULT '🥐', sort_order INT NOT NULL DEFAULT 0, active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS prices (
  id INT AUTO_INCREMENT PRIMARY KEY, service_name VARCHAR(140) NOT NULL, amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'Bs', note VARCHAR(255), sort_order INT NOT NULL DEFAULT 0, active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, email VARCHAR(190) NOT NULL,
  phone VARCHAR(40), subject VARCHAR(180) NOT NULL, message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS cafe_info (
  id INT PRIMARY KEY, name VARCHAR(160) NOT NULL, tagline VARCHAR(255) NOT NULL, history TEXT NOT NULL,
  address VARCHAR(255) NOT NULL, phone VARCHAR(50) NOT NULL, email VARCHAR(190) NOT NULL,
  hours VARCHAR(255) NOT NULL, instagram VARCHAR(255), updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS site_content (
  content_key VARCHAR(80) PRIMARY KEY, content_value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO menu_items (name,description,icon,sort_order) VALUES
('Espresso','Café intenso, preparado al momento con granos seleccionados.','☕',1),
('Cappuccino','Espresso con leche cremosa y una capa suave de espuma.','🥛',2),
('Latte','Un espresso equilibrado con leche vaporizada.','🤎',3),
('Café filtrado','Métodos de filtrado para descubrir los aromas del café de origen.','🫖',4),
('Repostería del día','Pasteles y dulces artesanales, recién preparados.','🥐',5),
('Té e infusiones','Una selección de infusiones para disfrutar a cualquier hora.','🍵',6);
INSERT INTO cafe_features (name,description,icon,sort_order) VALUES
('Café de especialidad','Granos seleccionados y bebidas preparadas al momento.','☕',1),
('Repostería artesanal','Algo dulce para acompañar tu taza favorita.','🥐',2),
('Bebidas frías','Opciones refrescantes para los días soleados.','🧊',3),
('Opciones vegetales','Pregunta por las alternativas de leche disponibles.','🌱',4);
INSERT INTO prices (service_name,amount,currency,note,sort_order) VALUES
('Espresso',12,'Bs','Café preparado al momento.',1),
('Cappuccino',20,'Bs','Pregunta por alternativas de leche.',2),
('Latte',22,'Bs','Disponible caliente o frío.',3),
('Café filtrado',18,'Bs','Consulta los granos del día.',4),
('Repostería del día',15,'Bs','Variedad según disponibilidad.',5);
INSERT IGNORE INTO cafe_info (id,name,tagline,history,address,phone,email,hours,instagram) VALUES
(1,'Café Aroma','Café de especialidad, hecho con calma.','Somos una cafetería de barrio en La Paz. Preparamos café con dedicación, horneamos cosas ricas y hacemos espacio para las buenas conversaciones.','Av. Principal #123, La Paz, Bolivia','+591 70000000','hola@cafearoma.bo','Lunes a sábado · 08:00 a 20:00','https://www.instagram.com/');

INSERT IGNORE INTO site_content (content_key,content_value) VALUES
('hero_eyebrow','CAFÉ DE ESPECIALIDAD, HECHO CON CALMA'),
('hero_headline','Tu pausa favorita empieza con un buen café.'),
('hero_subheadline','Café recién preparado, algo rico para acompañar y un espacio para disfrutar sin apuro.'),
('hero_image_url','https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85'),
('hero_image_alt','Taza de café recién preparado en una mesa'),
('hero_caption','Una pausa hecha a tu gusto'),
('hero_trust_title','Buen café, buena compañía,'),
('hero_trust_text','un momento para ti.'),
('hero_bottom_1','01 — BUEN CAFÉ, SIN PRISA'),
('hero_bottom_2','DESLIZA PARA CONOCERNOS ↓'),
('hero_bottom_3','LA PAZ · BOLIVIA'),
('header_cta','Ven a visitarnos'),
('welcome_message','Un buen día puede empezar con una taza y algo recién horneado.'),
('welcome_label','HECHO PARA DISFRUTAR'),
('menu_eyebrow','DE NUESTRA BARRA'),
('menu_heading','Cada taza tiene su momento.'),
('menu_description','Café preparado al momento, bebidas para todos los gustos y algo rico para acompañar.'),
('features_eyebrow','HECHO CON CARIÑO'),
('features_heading','Pequeños detalles, grandes sabores.'),
('features_description','Elegimos buenos ingredientes y cuidamos cada detalle para que disfrutes cada visita.'),
('about_eyebrow','UN POCO SOBRE NOSOTROS'),
('about_heading','Primero el café. Siempre el momento.'),
('about_image_url','https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=85'),
('about_image_alt','Interior acogedor de una cafetería'),
('about_photo_note','Un lugar para quedarte un ratito más.'),
('about_cta','Ven a conocernos'),
('about_fact_1','Café preparado al momento'),
('about_fact_2','Repostería artesanal'),
('about_fact_3','Un espacio para disfrutar'),
('prices_eyebrow','CLARIDAD DESDE EL INICIO'),
('prices_heading','La carta y sus precios.'),
('prices_description','Precios en bolivianos. Escríbenos para consultar opciones del día o disponibilidad.'),
('prices_note','La carta y los precios pueden variar según disponibilidad.'),
('contact_eyebrow','NOS VEMOS PRONTO'),
('contact_heading','Tu próxima pausa empieza aquí.'),
('contact_description','¿Tienes alguna pregunta o quieres consultar sobre la carta? Escríbenos o pasa a saludarnos.'),
('footer_note','Un buen café siempre encuentra su momento. ☕'),
('chat_greeting','¡Hola! ☕ ¿Qué te gustaría saber? Puedo contarte sobre nuestra carta, precios y horarios.'),
('chat_subtitle','La carta y nuestro café'),
('chat_disclaimer','Consulta con nuestro equipo sobre ingredientes y alérgenos.');
