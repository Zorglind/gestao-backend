const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email } = req.body || {};
    const payload = { sub: email || 'user@cmvgestao.com.br', role: 'user' };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    return res.json({ token, user: { email: payload.sub } });
  } catch (e) {
    return res.status(500).json({ ok:false, error: e.message });
  }
};
