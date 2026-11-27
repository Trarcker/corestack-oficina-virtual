import { responderAgente, permitirLlamada } from '../lib/agentes.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'local';
  if (!permitirLlamada(ip)) {
    return res.status(429).json({ error: 'Demasiadas preguntas seguidas. Espera un minuto.' });
  }

  try {
    const cuerpo = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const resultado = await responderAgente(cuerpo);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message || 'Error inesperado.' });
  }
}
