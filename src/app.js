const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// === Credenciais embutidas (NÃO RECOMENDADO em produção) ===
const SUPABASE_URL = "https://gwgwfpuitlswqdifyzis.supabase.co";
const SUPABASE_SERVICE_ROLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Z3dmcHVpdGxzd3FkaWZ5emlzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODY0MjM2NywiZXhwIjoyMDc0MjE4MzY3fQ.mJjj0AHSbbCKfvLFFPStQhhF9V4O5SncFu0jYBef-uw";
const JWT_SECRET = "mRrD2L5c7oUkVfqwrSuHDT14KcD2n/idnxt1KivuHiWB7R74/HyCaHHdLC039BxdAGT+Qkl7lDo71Xw/0TxS/g==";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

function sendSbError(res, error, status = 400) {
  console.error(error);
  return res.status(status).json({ ok: false, error: error?.message || String(error) });
}

// --- Saúde ---
app.get('/health', (req, res) => res.json({ ok: true, service: 'gestao-api' }));
app.get('/', (req, res) => res.json({ ok: true, name: 'Gestão & Dashboard API' }));

// --- Lançamentos ---
app.post('/paid_traffic', async (req, res) => {
  try {
    const { year, month, contacts, cost } = req.body || {};
    if (!year || !month) return res.status(422).json({ ok: false, error: 'year e month são obrigatórios' });
    const payload = { year: Number(year), month: Number(month), contacts: Number(contacts||0), cost: Number(cost||0) };
    const { data, error } = await supabase.from('paid_traffic').upsert(payload, { onConflict: 'year,month' }).select();
    if (error) return sendSbError(res, error);
    return res.json({ ok: true, data });
  } catch (e) { return sendSbError(res, e, 500); }
});

app.post('/operational_data', async (req, res) => {
  try {
    const { date, appointments, attendances } = req.body || {};
    if (!date) return res.status(422).json({ ok: false, error: 'date é obrigatório' });
    const payload = { date, appointments: Number(appointments||0), attendances: Number(attendances||0) };
    const { data, error } = await supabase.from('operational_data').insert(payload).select();
    if (error) return sendSbError(res, error);
    return res.json({ ok: true, data });
  } catch (e) { return sendSbError(res, e, 500); }
});

app.post('/financial_data', async (req, res) => {
  try {
    const { date, revenue, expenses, cmv } = req.body || {};
    if (!date) return res.status(422).json({ ok: false, error: 'date é obrigatório' });
    const payload = { date, revenue: Number(revenue||0), expenses: Number(expenses||0), cmv: Number(cmv||0) };
    const { data, error } = await supabase.from('financial_data').insert(payload).select();
    if (error) return sendSbError(res, error);
    return res.json({ ok: true, data });
  } catch (e) { return sendSbError(res, e, 500); }
});

// --- Views ---
app.get('/views/monthly_indicators', async (req, res) => {
  try {
    const { year } = req.query;
    let q = supabase.from('monthly_indicators').select('*').order('year').order('month');
    if (year) q = q.eq('year', Number(year));
    const { data, error } = await q;
    if (error) return sendSbError(res, error);
    return res.json(data||[]);
  } catch (e) { return sendSbError(res, e, 500); }
});

app.get('/views/payment_methods_summary', async (req, res) => {
  try {
    const { data, error } = await supabase.from('payment_methods_summary').select('*');
    if (error) return sendSbError(res, error);
    return res.json(data||[]);
  } catch (e) { return sendSbError(res, e, 500); }
});

// --- Cadastros ---
app.get('/users', async (req, res) => {
  try { const { data, error } = await supabase.from('users').select('*').limit(100);
    if (error) return sendSbError(res, error); return res.json(data||[]);
  } catch (e) { return sendSbError(res, e, 500); }
});

app.get('/professionals', async (req, res) => {
  try { const { data, error } = await supabase.from('professionals').select('*').limit(100);
    if (error) return sendSbError(res, error); return res.json(data||[]);
  } catch (e) { return sendSbError(res, e, 500); }
});

app.get('/products', async (req, res) => {
  try { const { data, error } = await supabase.from('products').select('*').limit(100);
    if (error) return sendSbError(res, error); return res.json(data||[]);
  } catch (e) { return sendSbError(res, e, 500); }
});

app.get('/categories', async (req, res) => {
  try { const { data, error } = await supabase.from('categories').select('*').limit(100);
    if (error) return sendSbError(res, error); return res.json(data||[]);
  } catch (e) { return sendSbError(res, e, 500); }
});

// --- Login simples ---
app.post('/auth/login', (req, res) => {
  const { email } = req.body || {};
  return res.json({ token: JWT_SECRET, user: { email: email || 'user@cmvgestao.com.br' } });
});

module.exports = app;
