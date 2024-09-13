import TestConsumer         from './Http/Consumer/test.consumer.js';
import Logger               from './Logger/Logger.js';
import router               from './routes/api.js';
import express              from 'express';
import cors                 from 'cors';

import { json }             from 'express';

const APP = express();
const PORT = process.env.SERVER_PORT || 3000;

// Inicializar logger
Logger();

// Configurar Express
APP.use(json());
APP.use(cors());

// Inicializar el pool de conexiones antes de iniciar el servidor
async function startServer() {
  try {

    // Inicializar el cliente global
    await global.DB.connect();

    // Configurar rutas
    APP.use('/api', router);

    // Iniciar servidor Express
    APP.listen(PORT, () => {
      TestConsumer();
    });
  } catch (err) {
    console.error('Error al iniciar el servidor:', err);
  }
}

startServer();