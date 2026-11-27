// Servidor local mínimo, sin dependencias: sirve la carpeta del proyecto en http://localhost:8780
// También expone /api/estado y /api/agente para probar Gemini sin publicar la clave.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { responderAgente, permitirLlamada } from '../lib/agentes.js';

const RAIZ = resolve(fileURLToPath(new URL('..', import.meta.url)));
const PUERTO = Number(process.env.PORT) || 8780;
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon' };

// Lee .env sin dependencias. Las variables ya definidas en el sistema tienen prioridad.
async function cargarEnv() {
  try {
    const texto = await readFile(join(RAIZ, '.env'), 'utf8');
    for (const linea of texto.split(/\r?\n/)) {
      const m = linea.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!m) continue;
      let valor = m[2];
      if ((valor.startsWith('"') && valor.endsWith('"')) || (valor.startsWith("'") && valor.endsWith("'"))) valor = valor.slice(1, -1);
      if (!(m[1] in process.env)) process.env[m[1]] = valor;
    }
  } catch { /* sin .env: se usan las variables del sistema */ }
}

function json(res, estado, datos) {
  res.writeHead(estado, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(datos));
}

function leerCuerpo(req, maximo = 30000) {
  return new Promise((resolve, reject) => {
    let total = 0;
    const partes = [];
    req.on('data', (trozo) => {
      total += trozo.length;
      if (total > maximo) {
        reject(Object.assign(new Error('Solicitud demasiado grande.'), { status: 413 }));
        req.destroy();
        return;
      }
      partes.push(trozo);
    });
    req.on('end', () => resolve(Buffer.concat(partes).toString('utf8')));
    req.on('error', reject);
  });
}

await cargarEnv();

createServer(async (req, res) => {
  try {
    const ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);

    if (ruta === '/api/estado' && req.method === 'GET') {
      return json(res, 200, {
        configurado: Boolean(process.env.GEMINI_API_KEY),
        modelo: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      });
    }

    if (ruta === '/api/agente') {
      if (req.method !== 'POST') {
        res.setHeader('allow', 'POST');
        return json(res, 405, { error: 'Método no permitido.' });
      }
      if (!permitirLlamada(req.socket.remoteAddress || 'local')) {
        return json(res, 429, { error: 'Demasiadas preguntas seguidas. Espera un minuto.' });
      }
      let datos;
      try {
        datos = JSON.parse(await leerCuerpo(req));
      } catch (error) {
        return json(res, error.status || 400, { error: error.status ? error.message : 'JSON inválido.' });
      }
      try {
        return json(res, 200, await responderAgente(datos));
      } catch (error) {
        return json(res, error.status || 500, { error: error.message || 'Error inesperado.' });
      }
    }

    let archivoRuta = ruta;
    if (archivoRuta.endsWith('/')) archivoRuta += 'index.html';
    const archivo = normalize(join(RAIZ, archivoRuta));
    if (!archivo.startsWith(RAIZ + sep) && archivo !== RAIZ) throw Object.assign(new Error('fuera'), { code: 'ENOENT' });
    if (/[\/]\.|[\/]node_modules[\/]|[\/]herramientas[\/]|[\/]lib[\/]|[\/]api[\/]|[\/]sistema-real-agentes[\/]/.test(archivo.slice(RAIZ.length))) {
      throw Object.assign(new Error('oculto'), { code: 'ENOENT' });
    }
    if (!(await stat(archivo)).isFile()) throw Object.assign(new Error('no'), { code: 'ENOENT' });
    res.writeHead(200, { 'content-type': TIPOS[extname(archivo).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-cache' });
    res.end(await readFile(archivo));
  } catch (error) {
    if (error.status) return json(res, error.status, { error: error.message });
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }); res.end('No encontrado');
  }
}).listen(PUERTO, '127.0.0.1', () => console.log(`Centro de agentes en http://localhost:${PUERTO}`));
