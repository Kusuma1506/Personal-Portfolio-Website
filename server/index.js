import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase } from './db.js';
import projectRoutes from './routes/projects.js';

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

await connectDatabase();

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'portfolio-api' });
});

app.use('/api/projects', projectRoutes);

const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

app.listen(port, () => {
  console.log(`Portfolio server running on http://127.0.0.1:${port}`);
});
