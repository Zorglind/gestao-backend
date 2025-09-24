const supabase = require('../services/supabaseService');

exports.getAll = async (req, res) => {
  const { data, error } = await supabase.from('professionals').select('*').order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.create = async (req, res) => {
  const { name, role, email, phone } = req.body;
  const { data, error } = await supabase.from('professionals').insert([{ name, role, email, phone }]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, role, email, phone } = req.body;
  const { data, error } = await supabase.from('professionals').update({ name, role, email, phone, updated_at: new Date() }).eq('id', id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('professionals').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
};
