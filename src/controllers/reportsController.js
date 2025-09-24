const supabase = require('../services/supabaseService');

exports.getMonthlyIndicators = async (req, res) => {
  try {
    const { year } = req.query;

    // NOTE: seu schema usa 'ano' e 'mes' em algumas views
    let q = supabase.from('monthly_indicators').select('*').order('ano').order('mes');
    if (year) q = q.eq('ano', Number(year));

    const { data, error } = await q;
    if (error) return res.status(400).json({ ok:false, error: error.message });
    return res.json(data || []);
  } catch (e) {
    return res.status(500).json({ ok:false, error: e.message });
  }
};

exports.getPaymentSummary = async (req, res) => {
  try {
    const { data, error } = await supabase.from('payment_methods_summary').select('*');
    if (error) return res.status(400).json({ ok:false, error: error.message });
    return res.json(data || []);
  } catch (e) {
    return res.status(500).json({ ok:false, error: e.message });
  }
};
