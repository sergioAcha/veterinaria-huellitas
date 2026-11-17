import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRoutes from './routes/api.routes.js';
import { errorHandler, notFound } from './middleware/errors.js';

const app = express();
const port = Number(process.env.PORT || 3000);
const here = path.dirname(fileURLToPath(import.meta.url));
const frontendPath = path.resolve(here, '../../frontend');

app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json({ limit: '20kb' }));
app.use('/api', apiRoutes);
app.use(express.static(frontendPath));
app.get('*', (_req, res) => res.sendFile(path.join(frontendPath, 'index.html')));
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Café Aroma listo en http://localhost:${port}`));
