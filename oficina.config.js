// ============================================================
//  OFICINA VIRTUAL 3D · TU CONFIGURACIÓN
//  Cambia aquí el nombre, los departamentos, los colores y los agentes.
//  Todo lo de este archivo son DATOS DE EJEMPLO: no pongas datos reales
//  de clientes, correos, teléfonos ni claves.
// ============================================================
window.OFICINA = {
  // Nombre que flota sobre el núcleo central y sale en la cabecera
  empresa: 'corestack_systemc',
  lema: 'Centro de agentes',
  colorCentral: '#7c5ce6',

  // Recepción, en el centro (pon `recepcion: false` para quitarla)
  recepcion: {
    nombre: 'Recepción',
    tareas: ['Lee un mensaje nuevo y decide a quién pasarlo', 'Busca en internet: horario de un proveedor', 'Escribe la respuesta de bienvenida'],
  },

  // Cada departamento es una zona abierta (máximo 5). Cada agente tiene su propio puesto dentro.
  // `oficina` decide cómo se amuebla su puesto. Tipos: ventas, captacion, atencion, contenido, investigacion,
  // desarrollo, entrega, finanzas, direccion, pizarra, servidores, seguridad, laboratorio, comunidad, academia,
  // analitica, formacion.
  // `estado` (opcional): 'funciona' (por defecto), 'a_medias' o 'no_existe' (sale en obras y sin agente).
  // Las tareas que empiezan por «Busca en internet» o «Lee» cambian el holograma que flota sobre el agente.
  departamentos: [
    {
      id: 'prospeccion',
      nombre: 'Prospección',
      color: '#6c5ce7',
      zona: 'Equipo de captación',
      responsable: { nombre: 'Responsable de Prospección', tareas: ['Revisa diagnósticos de negocios locales', 'Aprueba o rechaza primeros contactos', 'Deriva leads calificados a Ventas'] },
      agentes: [
        { id: 'prospeccion-investigador', nombre: 'Investigador Digital', puesto: 'Auditor Digital', oficina: 'investigacion',
          tareas: ['Audita calificación y reseñas de negocios locales en Google Maps', 'Identifica brecha digital: sin web, pedidos manuales o sin pagos web', 'Define solución recomendada: web, e-commerce, app Android o software PC/POS', 'Entrega diagnóstico a Tu Oficina para aprobación'] },
        { id: 'prospeccion-contacto', nombre: 'Primer Contacto', puesto: 'Primer Contacto', oficina: 'comunidad',
          tareas: ['Redacta borrador de correo en frío con datos reales del negocio', 'Redacta mensaje corto de WhatsApp (máximo 3 líneas)', 'Deja borradores en Tu Oficina para aprobación del director'] },
      ],
    },
    {
      id: 'ventas',
      nombre: 'Ventas',
      color: '#7c5ce6',
      zona: 'Equipo comercial',
      responsable: { nombre: 'Responsable de Ventas', tareas: ['Califica oportunidades de software', 'Aprueba o rechaza cotizaciones', 'Deriva aprobados a Desarrollo y QA'] },
      agentes: [
        { id: 'ventas-captacion', nombre: 'Agente de captación', puesto: 'Captación', oficina: 'captacion',
          tareas: ['Recibe lead aprobado desde Prospección', 'Califica tipo de proyecto: web, e-commerce, Android o POS/escritorio', 'Presupuesta rangos de tiempo y detecta al decisor', 'Entrega ficha de calificación a Tu Oficina'] },
        { id: 'ventas-propuestas', nombre: 'Agente de propuestas', puesto: 'Propuestas', oficina: 'ventas',
          tareas: ['Genera cotización de desarrollo de software aprobada', 'Define alcance, entregables, tiempos y costo estimado', 'Deja propuesta en Tu Oficina para revisión del director'] },
      ],
    },
    {
      id: 'desarrollo',
      nombre: 'Desarrollo y QA',
      color: '#00b894',
      zona: 'Equipo técnico',
      responsable: { nombre: 'Responsable de Desarrollo y QA', tareas: ['Valida requisitos antes de iniciar', 'Supervisa calidad del software', 'Aprueba entregas técnicas para Tu Oficina'] },
      agentes: [
        { id: 'desarrollo-dev', nombre: 'Desarrollador de Software', puesto: 'Desarrollador', oficina: 'desarrollo',
          tareas: ['Recibe requisitos aprobados desde Ventas', 'Desarrolla sitio web, e-commerce, app Android o software POS/escritorio', 'Entrega build al agente QA del mismo departamento'] },
        { id: 'desarrollo-qa', nombre: 'Analista QA', puesto: 'QA', oficina: 'laboratorio',
          tareas: ['Prueba funcional y de usabilidad el software desarrollado', 'Verifica que resuelva el dolor del cliente detectado en prospección', 'Entrega reporte de calidad a Tu Oficina para aprobación final'] },
      ],
    },
    {
      id: 'atencion',
      nombre: 'Atención al Cliente',
      color: '#2aa79b',
      zona: 'Equipo de soporte',
      responsable: { nombre: 'Responsable de Atención', tareas: ['Clasifica incidentes de soporte', 'Aprueba respuestas al cliente', 'Deriva errores a Desarrollo y QA'] },
      agentes: [
        { id: 'atencion-respuestas', nombre: 'Agente de respuestas', puesto: 'Respuestas', oficina: 'atencion',
          tareas: ['Recibe consulta de cliente sobre web, e-commerce, app o POS', 'Genera diagnóstico inicial y solución tentativa', 'Deja borrador de respuesta en Tu Oficina para aprobación'] },
      ],
    },
    {
      id: 'contenido',
      nombre: 'Contenido',
      color: '#e0609a',
      zona: 'Equipo editorial',
      responsable: { nombre: 'Responsable de Contenido', tareas: ['Aprueba casos de éxito', 'Revisa textos de portafolio', 'Autoriza publicaciones'] },
      agentes: [
        { id: 'contenido-redes', nombre: 'Agente de redes', puesto: 'Redes', oficina: 'contenido',
          tareas: ['Redacta publicaciones de portafolio de software de CoreStack Systems', 'Crea textos web para nuevos sitios o apps lanzados', 'Deja borradores en Tu Oficina para aprobación antes de publicar'] },
      ],
    },
  ],
};
