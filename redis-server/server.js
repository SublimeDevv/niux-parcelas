import express from 'express';
import { createClient } from 'redis';

const client = createClient({ 
  url: process.env.REDIS_URL || 'redis://localhost:6379'  // Default local para pruebas
  // En K8s, setea REDIS_URL=redis://redis:6370 en tu Deployment de la app
});

client.on('error', (err) => {
  console.log('🛑 Error de Redis:', err.message || err);
});
client.on('connect', () => console.log('✅ ¡Conectado a Redis! 🎉'));
client.on('ready', () => console.log('🚀 Redis listo.'));

let connected = false;
async function connectRedis() {
  try {
    console.log('🔄 Conectando a Redis...');
    await client.connect();
    connected = true;
    console.log('✅ Conexión OK.');
  } catch (err) {
    console.log('🛑 Falló conexión:', err.message || err);
  }
}

await connectRedis();

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  if (!connected) return res.status(500).send('No conectado a Redis.');
  try {
    let visitas = parseInt(await client.get('visitas') || '0') + 1;
    await client.set('visitas', visitas.toString());
    res.send(`¡Hola! Visitas: ${visitas} (Redis OK) 😎`);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🌐 App en puerto ${PORT}`));