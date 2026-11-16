export function notFound(_req, res) {
  res.status(404).json({ error: 'Ruta no encontrada.' });
}

export function errorHandler(err, _req, res, _next) {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Ocurrió un error en el servidor.' });
}
