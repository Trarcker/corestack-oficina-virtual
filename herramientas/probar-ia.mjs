// Prueba rápida de la conexión con Gemini desde la terminal.
// Uso: npm run probar-ia
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { responderAgente } from '../lib/agentes.js';

const RAIZ = resolve(fileURLToPath(new URL('..', import.meta.url)));

try {
  const texto = await readFile(join(RAIZ, '.env'), 'utf8');
  for (const linea of texto.split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    let valor = m[2];
    if ((valor.startsWith('"') && valor.endsWith('"')) || (valor.startsWith("'") && valor.endsWith("'"))) valor = valor.slice(1, -1);
    if (!(m[1] in process.env)) process.env[m[1]] = valor;
  }
} catch { /* sin .env */ }

if (!process.env.GEMINI_API_KEY) {
  console.log('Falta GEMINI_API_KEY.');
  console.log('Crea un archivo .env en la carpeta del proyecto y pega tu clave de Google AI Studio.');
  process.exit(1);
}

console.log('Consultando a Gemini...\n');
try {
  const resultado = await responderAgente({
    agenteId: 'ventas-propuestas',
    mensaje: 'Redacta un correo breve y cordial para el dueño de un restaurante en Arica que no tiene página web. Ofrece un diagnóstico gratuito de 15 minutos. No inventes precios.',
  });
  console.log(resultado.respuesta);
  console.log(`\nModelo: ${resultado.modelo}`);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
