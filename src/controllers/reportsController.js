const supabase = require('../services/supabaseService');

// --- Indicadores Mensais ---
exports.getMonthlyIndicators = async (req, res) => {
  try {
    const { year } = req.query;
    let query = supabase.from('monthly_indicators').select('*').order('ano').order('mes');
    if (year) query = query.eq('ano', Number(year));

    const { data, error } = await query;
    if (error) return res.status(400).json({ ok: false, error: error.message });

    return res.json(data || []);
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

// --- Resumo de Métodos de Pagamento ---
exports.getPaymentSummary = async (req, res) => {
  try {
    const { data, error } = await supabase.from('payment_methods_summary').select('*');
    if (error) return res.status(400).json({ ok: false, error: error.message });

    return res.json(data || []);
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
