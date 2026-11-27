// Comprobador: que la configuración cargue, que existan todos los modelos y archivos que pide el código.
import { readFile, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const RAIZ = resolve(fileURLToPath(new URL('..', import.meta.url)));
let fallos = 0;
const mal = (m) => { fallos++; console.log('✗ ' + m); }, bien = (m) => console.log('✓ ' + m);
const existe = (p) => access(join(RAIZ, p)).then(() => true, () => false);

// 1) configuración
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(await readFile(join(RAIZ, 'oficina.config.js'), 'utf8'), ctx);
const C = ctx.window.OFICINA;
if (!C) mal('oficina.config.js no define window.OFICINA');
else {
  const deps = C.departamentos || [];
  if (!deps.length) mal('No hay departamentos'); if (deps.length > 5) mal('Máximo 5 departamentos (hay ' + deps.length + ')');
  const ids = new Set();
  for (const d of deps) {
    if (!d.id || ids.has(d.id)) mal(`Departamento sin id o repetido: ${d.nombre}`); ids.add(d.id);
    for (const a of d.agentes || []) { if (a.id && ids.has(a.id)) mal(`Id repetido: ${a.id}`); if (a.id) ids.add(a.id); }
  }
  bien(`Configuración: «${C.empresa}», ${deps.length} departamentos, ${deps.reduce((n, d) => n + (d.agentes || []).length, 0)} agentes`);
}

// 2) archivos que pide el código
const js = await readFile(join(RAIZ, 'oficina3d.js'), 'utf8');
const M = JSON.parse(js.match(/const M = (\[[^\]]+\])/)[1].replace(/'/g, '"'));
const pedidos = [...M.map((m) => `modelos/muebles/${m}.glb`), 'modelos/personas/xbot.glb',
  'vendor/three.module.js', 'vendor/OrbitControls.js', 'vendor/GLTFLoader.js', 'vendor/SkeletonUtils.js', 'vendor/BufferGeometryUtils.js', 'oficina.config.js', 'oficina3d.js', 'index.html'];
const faltan = []; for (const p of pedidos) if (!(await existe(p))) faltan.push(p);
faltan.length ? faltan.forEach((p) => mal('Falta ' + p)) : bien(`${pedidos.length} archivos referenciados, todos presentes`);

// 3) solo se conecta a la API propia de IA (la clave vive en el servidor)
const codigo = js.split(/\r?\n/).map((l) => l.replace(/\/\/.*$/, '')).join('\n');
const rutas = [...new Set([...codigo.matchAll(/['"`](\/api\/[a-z-]+)/g)].map((m) => m[1]))];
const permitidas = ['/api/estado', '/api/agente'];
const noPermitidas = rutas.filter((r) => !permitidas.includes(r));
if (noPermitidas.length) mal('Rutas de API no permitidas: ' + noPermitidas.join(', '));
else bien(`API propia: ${rutas.join(', ')}`);
const externas = [...codigo.matchAll(/https?:\/\/[^\s'"`]+/g)].map((m) => m[0]);
if (externas.length) mal('URLs externas en oficina3d.js: ' + externas.join(', '));
else bien('Sin llamadas a servicios externos desde el navegador');

console.log(fallos ? `\n${fallos} problema(s)` : '\nTodo en orden.'); process.exit(fallos ? 1 : 0);
