require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`[gestao-backend] listening on port ${PORT}`);
});
