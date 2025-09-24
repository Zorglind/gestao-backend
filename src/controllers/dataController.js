const supabase = require('../services/supabaseService');

exports.addPaidTraffic = async (req, res) => {
  try {
    const { year, month, contacts, cost } = req.body || {};
    if (!year || !month) return res.status(422).json({ ok:false, error: 'year e month são obrigatórios' });

    const payload = {
      year: Number(year),
      month: Number(month),
      contacts: Number(contacts || 0),
      cost: Number(cost || 0),
    };

    const { data, error } = await supabase
      .from('paid_traffic')
      .upsert(payload, { onConflict: 'year,month' })
      .select();

    if (error) return res.status(400).json({ ok:false, error: error.message });
    return res.json({ ok:true, data });
  } catch (e) {
    return res.status(500).json({ ok:false, error: e.message });
  }
};

exports.addOperationalData = async (req, res) => {
  try {
    const { date, appointments, attendances } = req.body || {};
    if (!date) return res.status(422).json({ ok:false, error: 'date é obrigatório' });

    const payload = {
      date,
      appointments: Number(appointments || 0),
      attendances: Number(attendances || 0),
    };

    const { data, error } = await supabase.from('operational_data').insert(payload).select();
    if (error) return res.status(400).json({ ok:false, error: error.message });
    return res.json({ ok:true, data });
  } catch (e) {
    return res.status(500).json({ ok:false, error: e.message });
  }
};

exports.addFinancialData = async (req, res) => {
  try {
    const { date, revenue, expenses, cmv } = req.body || {};
    if (!date) return res.status(422).json({ ok:false, error: 'date é obrigatório' });

    const payload = {
      date,
      revenue: Number(revenue || 0),
      expenses: Number(expenses || 0),
      cmv: Number(cmv || 0),
    };

    const { data, error } = await supabase.from('financial_data').insert(payload).select();
    if (error) return res.status(400).json({ ok:false, error: error.message });
    return res.json({ ok:true, data });
  } catch (e) {
    return res.status(500).json({ ok:false, error: e.message });
  }
};
