const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json({ limit: '1mb' }));

// CORS robusto (origens configuráveis via env)
const origins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || origins.length === 0 || origins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(morgan('dev'));

// Routes
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const professionalsRoutes = require('./routes/professionalsRoutes');

app.use('/auth', authRoutes);
app.use('/data', dataRoutes);

// 🔥 Aqui alinhamos o frontend (que chama /views) com o backend
app.use('/reports', reportsRoutes);
app.use('/views', reportsRoutes);

app.use('/services', servicesRoutes);
app.use('/professionals', professionalsRoutes);

// Health check
app.get('/health', (req, res) =>
  res.json({ ok: true, service: 'gestao-api', time: new Date().toISOString() })
);

app.get('/', (req, res) =>
  res.json({ ok: true, name: 'Gestão & Dashboard API' })
);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ ok: false, error: err.message || 'internal error' });
});

module.exports = app;
