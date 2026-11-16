CREATE DATABASE IF NOT EXISTS veterinaria_huellitas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE veterinaria_huellitas;

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, description TEXT NOT NULL,
  icon VARCHAR(20) NOT NULL DEFAULT '🐾', sort_order INT NOT NULL DEFAULT 0, active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS specialties (
  id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, description TEXT NOT NULL,
  icon VARCHAR(20) NOT NULL DEFAULT '🩺', sort_order INT NOT NULL DEFAULT 0, active BOOLEAN NOT NULL DEFAULT TRUE
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
CREATE TABLE IF NOT EXISTS clinic_info (
  id INT PRIMARY KEY, name VARCHAR(160) NOT NULL, tagline VARCHAR(255) NOT NULL, history TEXT NOT NULL,
  address VARCHAR(255) NOT NULL, phone VARCHAR(50) NOT NULL, email VARCHAR(190) NOT NULL,
  hours VARCHAR(255) NOT NULL, instagram VARCHAR(255), updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO services (name,description,icon,sort_order) VALUES
('Consulta general','Evaluación completa y orientación para cuidar la salud de tu mascota.','🩺',1),
('Vacunación','Plan de vacunas y recordatorios según la edad y necesidades de cada paciente.','💉',2),
('Desparasitación','Prevención y tratamiento con un plan seguro para perros y gatos.','🛡️',3),
('Estética y baño','Baño, corte y cuidado de piel y pelaje con atención amable.','🛁',4),
('Laboratorio clínico','Análisis de apoyo para un diagnóstico oportuno.','🔬',5),
('Cirugía','Procedimientos programados con evaluación y seguimiento veterinario.','🏥',6);
INSERT INTO specialties (name,description,icon,sort_order) VALUES
('Medicina preventiva','Controles, vacunas y planes de bienestar para cada etapa de vida.','🌿',1),
('Medicina interna','Evaluación y tratamiento de enfermedades frecuentes en perros y gatos.','🩺',2),
('Dermatología','Atención de alergias, irritaciones y problemas de piel y pelaje.','🐕',3),
('Odontología','Revisión y cuidado de la salud oral de tu mascota.','🦷',4);
INSERT INTO prices (service_name,amount,currency,note,sort_order) VALUES
('Consulta general',80,'Bs','Precio referencial; confirmar en clínica.',1),
('Vacunación',60,'Bs','Desde; depende de la vacuna indicada.',2),
('Desparasitación',35,'Bs','Desde; depende del peso.',3),
('Baño y estética',90,'Bs','Desde; varía según tamaño y pelaje.',4),
('Control de seguimiento',50,'Bs','Precio referencial.',5);
INSERT INTO clinic_info (id,name,tagline,history,address,phone,email,hours,instagram) VALUES
(1,'Huellitas','Cuidado cercano para quienes más quieres.','Somos un equipo dedicado a la salud y bienestar de perros y gatos. Queremos que cada visita sea tranquila, clara y llena de cariño.','Av. Principal #123, La Paz, Bolivia','+591 70000000','hola@huellitas.bo','Lunes a sábado · 09:00 a 18:00','https://www.instagram.com/');
