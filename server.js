const app = require('./src/app');
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({ ok: true, name: 'Gestão & Dashboard API' });
});

app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
