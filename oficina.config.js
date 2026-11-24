// ============================================================
//  OFICINA VIRTUAL 3D · TU CONFIGURACIÓN
//  Cambia aquí el nombre, los departamentos, los colores y los agentes.
//  Todo lo de este archivo son DATOS DE EJEMPLO: no pongas datos reales
//  de clientes, correos, teléfonos ni claves.
// ============================================================
window.OFICINA = {
  // Nombre que flota sobre el núcleo central y sale en la cabecera
  empresa: 'corestack_systemc',
  lema: 'Oficina virtual 3D',
  colorCentral: '#7c5ce6',

  // Recepción, en el centro (pon `recepcion: false` para quitarla)
  recepcion: {
    nombre: 'Recepción',
    tareas: ['Lee un mensaje nuevo y decide a quién pasarlo', 'Busca en internet: horario de un proveedor', 'Escribe la respuesta de bienvenida'],
  },

  // Cada departamento es un edificio (máximo 5). Cada agente tiene su propia oficina dentro.
  // `oficina` decide cómo se amuebla su puesto. Tipos: ventas, captacion, atencion, contenido, investigacion,
  // desarrollo, entrega, finanzas, direccion, pizarra, servidores, seguridad, laboratorio, comunidad, academia,
  // analitica, formacion.
  // `estado` (opcional): 'funciona' (por defecto), 'a_medias' o 'no_existe' (sale en obras y sin agente).
  // Las tareas que empiezan por «Busca en internet» o «Lee» cambian el holograma que flota sobre el agente.
  departamentos: [
    {
      id: 'ventas',
      nombre: 'Ventas',
      color: '#7c5ce6',
      zona: 'Equipo comercial',
      responsable: { nombre: 'Responsable de ventas', tareas: ['Reparte las oportunidades del día', 'Revisa las propuestas del equipo', 'Lee el estado del embudo'] },
      agentes: [
        { id: 'ventas-captacion', nombre: 'Agente de captación', puesto: 'Captación', oficina: 'captacion',
          tareas: ['Busca en internet: empresas que encajen con el servicio', 'Lee las respuestas de los últimos contactos', 'Escribe el primer mensaje de contacto'] },
        { id: 'ventas-propuestas', nombre: 'Agente de propuestas', puesto: 'Propuestas', oficina: 'ventas',
          tareas: ['Lee la ficha de una oportunidad nueva', 'Escribe una propuesta a medida', 'Busca en internet: precios de referencia del sector'] },
      ],
    },
    {
      id: 'atencion',
      nombre: 'Atención al cliente',
      color: '#2aa79b',
      zona: 'Equipo de soporte',
      responsable: { nombre: 'Responsable de atención', tareas: ['Revisa las conversaciones abiertas', 'Escribe las respuestas tipo', 'Lee las valoraciones de la semana'] },
      agentes: [
        { id: 'atencion-respuestas', nombre: 'Agente de respuestas', puesto: 'Respuestas', oficina: 'atencion',
          tareas: ['Lee el mensaje de un cliente', 'Escribe la respuesta', 'Busca en internet: solución a una incidencia'] },
      ],
    },
    {
      id: 'contenido',
      nombre: 'Contenido',
      color: '#e0609a',
      zona: 'Equipo editorial',
      responsable: { nombre: 'Responsable de contenido', tareas: ['Planifica el calendario editorial', 'Revisa los textos del equipo', 'Lee los resultados de las publicaciones'] },
      agentes: [
        { id: 'contenido-redes', nombre: 'Agente de redes', puesto: 'Redes sociales', oficina: 'contenido',
          tareas: ['Busca en internet: tendencias de la semana', 'Escribe el guion de una publicación', 'Escribe los textos de las redes'] },
      ],
    },
  ],
};
