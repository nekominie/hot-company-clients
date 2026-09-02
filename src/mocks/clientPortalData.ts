// Datos simulados del Portal de Clientes FISINOR (modo placeholder, sin backend).

export interface PortalClient {
  id: string
  businessName: string
  representative: string
  avatarInitials: string
  email: string
}

export interface PortalNotice {
  id: string
  text: string
}

export interface PortalKpi {
  id: string
  icon: 'droplet' | 'layers' | 'truck' | 'activity'
  accent: 'teal' | 'orange' | 'blue' | 'green'
  label: string
  value: string
  meta: string
}

export interface CatalogCategory {
  id: string
  label: string
}

export interface CatalogProduct {
  id: string
  sku: string
  name: string
  categoryId: string
  concentration: string
  dose: string
  level: 1 | 2 | 3
  price: number | null
  unit: string
  stock: 'available' | 'limited' | 'restricted'
  description: string
}

export type OrderStatus = 'processing' | 'transit' | 'held' | 'delivered'

export interface OrderTimelineStep {
  label: string
  timestamp: string
  state: 'done' | 'current' | 'pending'
}

export interface PortalOrder {
  id: string
  code: string
  guide: string
  date: string
  destination: string
  total: number
  currency: string
  status: OrderStatus
  timeline: OrderTimelineStep[]
}

export interface PortalSubscription {
  id: string
  code: string
  name: string
  description: string
  price: number
  period: string
  renewalLabel: string
  features: string[]
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
}

export interface DistributionFrequency {
  id: string
  label: string
}

export interface EnvironmentalClause {
  id: string
  text: string
}

export interface SupportFaq {
  id: string
  question: string
  answer: string
}

export interface ChatQuickReply {
  id: string
  label: string
  response: string
}

export interface SdsSection {
  title: string
  body: string
}

export interface DeliveryAddress {
  id: string
  label: string
  detail: string
  contact: string
  primary: boolean
}

export interface LicenseRecord {
  id: string
  name: string
  level: string
  status: 'active' | 'pending'
  expiry: string
}

export interface NotificationPref {
  id: string
  label: string
  description: string
  enabled: boolean
}

export const portalClient: PortalClient = {
  id: 'FS-AGRO-8829-SON',
  businessName: 'AgroCosta del Noroeste S. de R.L. de C.V.',
  representative: 'Ing. Marco Antonio Cárdenas',
  avatarInitials: 'AC',
  email: 'operaciones@agrocosta.mx',
}

export const portalNotices: PortalNotice[] = [
  {
    id: 'notice-irrigation',
    text: 'Aviso: Mantenimiento programado en la red de aspersión sintética en Sector 4 del 12 al 14 de Octubre.',
  },
  {
    id: 'notice-seal',
    text: 'Circular 41-B: Los lotes tratados con inóculos de Nivel 3 deben permanecer sellados 72 h después de la aplicación.',
  },
]

export const portalKpis: PortalKpi[] = [
  {
    id: 'polymer',
    icon: 'droplet',
    accent: 'teal',
    label: 'Consumo Activo de Biopolímeros',
    value: '1,420 L / mes',
    meta: '+6% vs. ciclo anterior · Meta mensual: 1,600 L',
  },
  {
    id: 'subs',
    icon: 'layers',
    accent: 'blue',
    label: 'Suscripciones Activas',
    value: '2 Contratos Vigentes',
    meta: 'Próxima renovación programada: 12 Oct 2026',
  },
  {
    id: 'shipping',
    icon: 'truck',
    accent: 'orange',
    label: 'Próximo Envío de Muestras',
    value: 'En 4 días',
    meta: 'Guía #FS-88392 · Módulo V, Costa de Hermosillo',
  },
  {
    id: 'env',
    icon: 'activity',
    accent: 'green',
    label: 'Estatus del Entorno',
    value: 'Estable',
    meta: 'Tasa de Deriva Sintética 0.02% · Dentro de parámetros',
  },
]

export const catalogCategories: CatalogCategory[] = [
  { id: 'fertilizantes', label: 'Fertilizantes Biopoliméricos' },
  { id: 'suelo', label: 'Modificadores Genéticos de Suelo' },
  { id: 'plaguicidas', label: 'Plaguicidas Biocompatibles' },
  { id: 'inoculos', label: 'Inóculos de Muestra Restringida' },
]

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'p-902',
    sku: 'FS-BIO-902',
    name: 'BioSuelo R3',
    categoryId: 'fertilizantes',
    concentration: '68% biopolímero activo',
    dose: '12 L / ha por riego',
    level: 1,
    price: 4820,
    unit: 'tambo 200 L',
    stock: 'available',
    description: 'Fertilizante base de liberación lenta para ciclos de maíz y trigo irrigado.',
  },
  {
    id: 'p-914',
    sku: 'FS-BIO-914',
    name: 'BioSuelo X-7 Alta Densidad',
    categoryId: 'fertilizantes',
    concentration: '82% biopolímero activo',
    dose: '9 L / ha por riego',
    level: 2,
    price: 7350,
    unit: 'tambo 200 L',
    stock: 'available',
    description: 'Formulación de alto rendimiento para suelos con agotamiento severo de materia orgánica.',
  },
  {
    id: 'p-955',
    sku: 'FS-BIO-955',
    name: 'BioSuelo Foliar Coastal',
    categoryId: 'fertilizantes',
    concentration: '54% biopolímero activo',
    dose: '6 L / ha vía foliar',
    level: 1,
    price: 3110,
    unit: 'bidón 20 L',
    stock: 'limited',
    description: 'Aplicación foliar resistente a salinidad para cultivos de la franja costera.',
  },
  {
    id: 'p-204',
    sku: 'FS-GEN-204',
    name: 'TerraGen M2',
    categoryId: 'suelo',
    concentration: 'Solución madre 40%',
    dose: '2.5 L / ha diluida en fertirriego',
    level: 2,
    price: 12900,
    unit: 'kit 2 × 10 L',
    stock: 'available',
    description: 'Modificador genético de consorcio microbiano para corrección de pH alcalino.',
  },
  {
    id: 'p-311',
    sku: 'FS-GEN-311',
    name: 'RaízSintética Deep-Root',
    categoryId: 'suelo',
    concentration: 'Solución madre 71%',
    dose: '1.8 L / ha — aplicación enterrada',
    level: 3,
    price: 24500,
    unit: 'kit 2 × 10 L',
    stock: 'restricted',
    description: 'Extensión radical sintética para cultivos profundos. Aplicación restringida a técnicos certificados.',
  },
  {
    id: 'p-101',
    sku: 'FS-PLA-101',
    name: 'BioPlaga-Control Bt-Syn',
    categoryId: 'plaguicidas',
    concentration: '32% cepa activa',
    dose: '4 L / ha por aspersión',
    level: 1,
    price: 5240,
    unit: 'bidón 40 L',
    stock: 'available',
    description: 'Control biocompatible de lepidópteros con cepa Bacillus sintética autorizada.',
  },
  {
    id: 'p-118',
    sku: 'FS-PLA-118',
    name: 'NemaStop Súper',
    categoryId: 'plaguicidas',
    concentration: '46% compuesto activo',
    dose: '5 L / ha en fertirriego',
    level: 2,
    price: 8900,
    unit: 'bidón 40 L',
    stock: 'available',
    description: 'Supresor de nematodos de liberación programada, seguro para polinizadores nativos.',
  },
  {
    id: 'p-707',
    sku: 'FS-INM-707',
    name: 'Inóculo Micorrízico Sintético M-7',
    categoryId: 'inoculos',
    concentration: '2.4 × 10⁹ propágulos / mL',
    dose: '0.8 L / ha — aplicación en biobarra',
    level: 3,
    price: 31800,
    unit: 'termobox 5 L',
    stock: 'restricted',
    description: 'Simbiosis radicular acelerada. Requiere cámara fría en destino y bitácora de apertura.',
  },
  {
    id: 'p-733',
    sku: 'FS-INM-733',
    name: 'Cepa Experimental TITAN-04',
    categoryId: 'inoculos',
    concentration: 'Clasificado',
    dose: 'Bajo protocolo adjunto',
    level: 3,
    price: null,
    unit: 'contenedor sellado',
    stock: 'restricted',
    description: 'Material experimental del Programa de Duplicación Asistida. Distribución supervisada por la Dirección Operativa.',
  },
]

export const portalOrders: PortalOrder[] = [
  {
    id: 'o-9921',
    code: '#ORD-2026-9921',
    guide: '#FS-88392',
    date: '28 Sep 2026',
    destination: 'Sector 4 · Lote 12-B',
    total: 48250,
    currency: 'MXN',
    status: 'transit',
    timeline: [
      { label: 'Salida de Planta FISINOR Norte', timestamp: '28 Sep, 08:15', state: 'done' },
      { label: 'Control Biológico de Aduana Local', timestamp: '28 Sep, 13:40', state: 'done' },
      { label: 'En Tránsito — Ruta Hermosillo–Costa', timestamp: '29 Sep, 06:02', state: 'current' },
      { label: 'Llegada a Estación: Módulo V', timestamp: 'Estimado: 02 Oct', state: 'pending' },
      { label: 'Entrega y validación de sellos', timestamp: 'Estimado: 02 Oct', state: 'pending' },
    ],
  },
  {
    id: 'o-9877',
    code: '#ORD-2026-9877',
    guide: '#FS-88267',
    date: '21 Sep 2026',
    destination: 'Módulo V · Costa de Hermosillo',
    total: 12900,
    currency: 'MXN',
    status: 'delivered',
    timeline: [
      { label: 'Salida de Planta FISINOR Norte', timestamp: '21 Sep, 09:05', state: 'done' },
      { label: 'Control Biológico de Aduana Local', timestamp: '21 Sep, 14:22', state: 'done' },
      { label: 'En Tránsito — Ruta Hermosillo–Costa', timestamp: '22 Sep, 07:30', state: 'done' },
      { label: 'Entregado — Firma: J. Refuerzo', timestamp: '22 Sep, 11:48', state: 'done' },
    ],
  },
  {
    id: 'o-9803',
    code: '#ORD-2026-9803',
    guide: '#FS-88190',
    date: '15 Sep 2026',
    destination: 'Sector 7 · Invernadero 2',
    total: 96400,
    currency: 'MXN',
    status: 'held',
    timeline: [
      { label: 'Salida de Planta FISINOR Norte', timestamp: '15 Sep, 08:40', state: 'done' },
      { label: 'Control Biológico de Aduana Local', timestamp: '15 Sep, 16:10', state: 'done' },
      {
        label: 'Retenido por Bioseguridad — Revisión de Consejo',
        timestamp: '16 Sep, 09:00',
        state: 'current',
      },
      { label: 'Dictamen: liberación o destrucción de lote', timestamp: 'Pendiente de dictamen', state: 'pending' },
    ],
  },
  {
    id: 'o-9741',
    code: '#ORD-2026-9741',
    guide: '#FS-88021',
    date: '03 Sep 2026',
    destination: 'Sector 4 · Lote 3-C',
    total: 8150,
    currency: 'MXN',
    status: 'delivered',
    timeline: [
      { label: 'Salida de Planta FISINOR Norte', timestamp: '03 Sep, 10:12', state: 'done' },
      { label: 'Entregado — Firma: C. Duarte', timestamp: '04 Sep, 09:35', state: 'done' },
    ],
  },
  {
    id: 'o-9690',
    code: '#ORD-2026-9690',
    guide: '#FS-87968',
    date: '27 Ago 2026',
    destination: 'Sector 9 · Ceja de Gulfo',
    total: 23780,
    currency: 'MXN',
    status: 'delivered',
    timeline: [
      { label: 'Salida de Planta FISINOR Norte', timestamp: '27 Ago, 08:55', state: 'done' },
      { label: 'Entregado — Firma: J. Refuerzo', timestamp: '28 Ago, 12:20', state: 'done' },
    ],
  },
  {
    id: 'o-9612',
    code: '#ORD-2026-9612',
    guide: '#FS-87901',
    date: '18 Ago 2026',
    destination: 'Módulo V · Almacén Frío 1',
    total: 61020,
    currency: 'MXN',
    status: 'processing',
    timeline: [
      { label: 'Verificación de inventario en planta', timestamp: '19 Ago, 08:00', state: 'current' },
      { label: 'Salida de Planta FISINOR Norte', timestamp: 'Pendiente', state: 'pending' },
      { label: 'Entrega en cámara fría', timestamp: 'Pendiente', state: 'pending' },
    ],
  },
]

export const portalSubscriptions: PortalSubscription[] = [
  {
    id: 's-4410',
    code: 'FS-SUB-4410',
    name: 'Plan de Suministro Continuo Bio-Suelo',
    description: 'Reabastecimiento automático de fertilizantes biopoliméricos con ajuste por temporada.',
    price: 18900,
    period: 'mes',
    renewalLabel: 'Próxima entrega programada: 12 Oct 2026',
    features: [
      '2 tambos de BioSuelo R3 por ciclo',
      'Ajuste estacional de dosis incluido',
      'Prioridad en rutas de distribución',
    ],
  },
  {
    id: 's-4382',
    code: 'FS-SUB-4382',
    name: 'Monitoreo Bio-Sintético 24/7',
    description: 'Red de sensores de deriva sintética y auditoría periódica de parcela.',
    price: 9450,
    period: 'mes',
    renewalLabel: 'Próximo barrido de sensores: 05 Oct 2026',
    features: [
      '8 sensores activos en el perímetro',
      'Reporte semanal de tasa de deriva',
      'Alertas en tiempo real a la Central',
    ],
  },
]

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'standard',
    name: 'Plan Estándar',
    description: 'Suministro programado para parcelas de hasta 50 ha con dosis de mantenimiento.',
  },
  {
    id: 'industrial',
    name: 'Plan Industrial',
    description: 'Volúmenes altos para agroindustria, con rutas dedicadas y tambos presurizados.',
  },
  {
    id: 'trials',
    name: 'Módulo de Ensayos',
    description: 'Lotes experimentales supervisados por personal de FISINOR. Requiere bitácora de campo.',
  },
]

export const distributionFrequencies: DistributionFrequency[] = [
  { id: 'weekly', label: 'Semanal' },
  { id: 'biweekly', label: 'Quincenal' },
  { id: 'monthly', label: 'Mensual' },
  { id: 'bimonthly', label: 'Bimestral' },
]

export const environmentalClauses: EnvironmentalClause[] = [
  {
    id: 'c-1',
    text: 'El cliente acepta que los subproductos biológicos no germinados podrán ser retirados por personal de FISINOR sin aviso previo y sin responsabilidad de restitución.',
  },
  {
    id: 'c-2',
    text: 'FISINOR no se hace responsable por divergencias fenotípicas en cultivos colindantes derivadas de la deriva sintética del programa.',
  },
  {
    id: 'c-3',
    text: 'El cliente autoriza el monitoreo biométrico continuo del perímetro tratado, así como el archivo permanente de muestras de suelo en los servidores del Complejo Norte.',
  },
]

export const supportFaqs: SupportFaq[] = [
  {
    id: 'faq-1',
    question: '¿Puedo cambiar la dosis sugerida de un producto Nivel 2?',
    answer:
      'Sí, dentro de la banda técnica indicada en la Ficha Técnica. Cualquier ajuste fuera de banda debe registrarse en su bitácora y notificarse a su asesor agronómico asignado.',
  },
  {
    id: 'faq-2',
    question: '¿Por qué mi pedido aparece "Retenido por Bioseguridad"?',
    answer:
      'Los lotes seleccionados al azar por el Consejo de Bioseguridad pasan a cuarentena documental. El dictamen tarda entre 24 y 72 h; no requiere acción de su parte.',
  },
  {
    id: 'faq-3',
    question: '¿Qué hago si detecto deriva sintética fuera de mi perímetro?',
    answer:
      'Use la acción "Reportar Desviación en Campo" o abra un ticket de Anomalía en Cultivo Tratado. Un técnico visitará el sitio dentro de las próximas 48 h.',
  },
  {
    id: 'faq-4',
    question: '¿Cómo accedo a productos de Nivel 3?',
    answer:
      'Requiere Licencia Fisinor Nivel 3 o Autorización de Sub-estación vigente. Puede solicitarla en Ajustes de Cuenta → Bioseguridad y Licencias.',
  },
  {
    id: 'faq-5',
    question: '¿Los tambos retornables se recogen en mi lote?',
    answer:
      'Sí. Deje los tambos sellados en el punto de carga; la unidad de recolección pasa cada quincena. No limpie el interior con agua de pozo.',
  },
]

export const chatWelcome = {
  author: 'MIRA · Central FISINOR',
  text: 'Central FISINOR en línea. Soy MIRA, la asistente virtual del portal. ¿En qué puedo ayudarle hoy?',
}

export const chatQuickReplies: ChatQuickReply[] = [
  {
    id: 'hours',
    label: 'Horarios de la Central',
    response:
      'La Central de Operaciones atiende de 06:00 a 22:00 h, los 365 días del año. El canal de emergencias en campo (Buzón Rojo) permanece abierto 24/7.',
  },
  {
    id: 'order',
    label: 'Estatus de mi pedido',
    response:
      'Su pedido #ORD-2026-9921 se encuentra En Tránsito por la ruta Hermosillo–Costa. ETA estimado: 02 Oct antes de las 14:00 h.',
  },
  {
    id: 'drift',
    label: 'Reportar una deriva',
    response:
      'Entendido. Registré su intención de reporte. Si la deriva es visible a simple vista, active el protocolo de confinamiento y abra un ticket de Anomalía en Cultivo Tratado para priorizar la visita técnica.',
  },
  {
    id: 'human',
    label: 'Hablar con un asesor',
    response:
      'Su solicitud fue turnada al equipo agronómico de la Estación Módulo V. Un asesor le contactará en operaciones@agrocosta.mx dentro de las próximas 4 horas hábiles.',
  },
]

export const sdsDocument: { code: string; sections: SdsSection[] } = {
  code: 'FS-SDS-ES-2026',
  sections: [
    {
      title: 'Identificación y composición',
      body: 'Biopolímero de uso agrícola de la línea FISINOR. La composición exacta es propiedad del Departamento de Desarrollo y se entrega bajo carta de confidencialidad.',
    },
    {
      title: 'Manipulación segura',
      body: 'Utilice guantes de nitrilo y careta durante la transferencia. Evite el contacto prolongado con piel expuesta. En caso de derrame, contenga con arena vegetal y notifique a la Central dentro de las 2 h.',
    },
    {
      title: 'Almacenamiento',
      body: 'Conservar entre 4 °C y 28 °C, alejado de radiación solar directa. No almacene junto a semillas convencionales ni fertilizantes salinos de terceros.',
    },
    {
      title: 'Primeros auxilios y disposición',
      body: 'En contacto ocular, enjuague 15 minutos y acuda a la unidad médica de su estación. Los envases vacíos son retornables; no los perfore ni los destine a uso doméstico.',
    },
  ],
}

export const deliveryAddresses: DeliveryAddress[] = [
  {
    id: 'a-1',
    label: 'Sector 4 · Lote 12-B',
    detail: 'Carretera Hermosillo–Kino Bay km 71, s/n',
    contact: 'Contacto: J. Refuerzo · +52 (662) 118 4471',
    primary: true,
  },
  {
    id: 'a-2',
    label: 'Módulo V · Costa de Hermosillo',
    detail: 'Estación Costera, Zona de Aspersión 2',
    contact: 'Contacto: C. Duarte · +52 (662) 204 9930',
    primary: false,
  },
  {
    id: 'a-3',
    label: 'Sector 7 · Invernadero 2',
    detail: 'Acceso por brecha del Kilómetro 9, puerta biológica B',
    contact: 'Acceso restringido — solo personal autorizado',
    primary: false,
  },
]

export const licenseRecords: LicenseRecord[] = [
  {
    id: 'lic-1',
    name: 'Certificado de Bioseguridad',
    level: 'Nivel 2',
    status: 'active',
    expiry: 'Vigente hasta 14 Mar 2027',
  },
  {
    id: 'lic-2',
    name: 'Autorización de Sub-estación',
    level: 'Nivel 2',
    status: 'active',
    expiry: 'Vigente hasta 02 Ene 2027',
  },
  {
    id: 'lic-3',
    name: 'Licencia Fisinor para Inóculos Restringidos',
    level: 'Nivel 3',
    status: 'pending',
    expiry: 'Solicitud en revisión — radicada el 12 Sep 2026',
  },
]

export const notificationPrefs: NotificationPref[] = [
  {
    id: 'maintenance',
    label: 'Avisos de mantenimiento programado',
    description: 'Obras y lavados de red en su estación asignada.',
    enabled: true,
  },
  {
    id: 'drift',
    label: 'Alertas de deriva sintética',
    description: 'Notificaciones del perímetro monitoreado 24/7.',
    enabled: true,
  },
  {
    id: 'billing',
    label: 'Facturación y estados de cuenta',
    description: 'Documentos fiscales y recordatorios de pago.',
    enabled: true,
  },
  {
    id: 'newsletter',
    label: 'Boletín agronómico FISINOR',
    description: 'Resultados de ensayos y nuevos lanzamientos.',
    enabled: false,
  },
]

export const accountGeneralFields = {
  businessName: 'AgroCosta del Noroeste S. de R.L. de C.V.',
  rfc: 'ACN150422KJ3',
  representative: 'Ing. Marco Antonio Cárdenas',
  emergencyPhone: '+52 (662) 481 9022',
  billingEmail: 'facturacion@agrocosta.mx',
  notificationsEmail: 'operaciones@agrocosta.mx',
}
