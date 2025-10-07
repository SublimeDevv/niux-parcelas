import express from 'express';
//import { createClient } from 'redis';

/* const client = createClient({ 
  url: process.env.REDIS_URL || 'redis://:Niux123@40.233.7.206:6379'  // Default local para pruebas
  // En K8s, setea REDIS_URL=redis://redis:6370 en tu Deployment de la app
});
  console.log('🔧 Config  url:', client.options.url);

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
 */
const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('🌐 API con Redis - OK');
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🌐 App en puerto ${PORT}`));