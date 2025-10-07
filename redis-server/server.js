import express from 'express';
const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('🌐 API con Redis - OK');
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🌐 App en puerto ${PORT}`));