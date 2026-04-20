import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import * as ComisionController from './controllers/ComisionController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Esta ruta interactúa con el Controlador (C) de nuestro MVC
app.post('/api/comisiones', ComisionController.calcularComisiones);

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor MVC corriendo en http://localhost:${PORT}`);
});
