// src/controllers/servicesController.js
const supabase = require("../services/supabaseService");

// Listar todos os serviços
exports.getAll = async (req, res) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Criar novo serviço
exports.create = async (req, res) => {
  const { name, price, duration } = req.body;

  const { data, error } = await supabase
    .from("services")
    .insert([{ name, price, duration }])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

// Atualizar serviço
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, price, duration } = req.body;

  const { data, error } = await supabase
    .from("services")
    .update({ name, price, duration, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// Remover serviço
exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
};
