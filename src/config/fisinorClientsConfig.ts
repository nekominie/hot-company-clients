export interface FisinorClientsConfig {
  brand: BrandConfig
  documentTitles: {
    base: string
    pages: Record<string, string>
  }
  showcase: ShowcaseConfig
  login: LoginConfig
  register: RegisterConfig
  recover: RecoverConfig
  portal: PortalConfig
}

export interface BrandConfig {
  name: string
  shortName: string
  division: string
  portalLabel: string
  logo: string
}

export interface ShowcaseFeature {
  id: string
  title: string
  description: string
}

export interface ShowcaseConfig {
  welcomeTag: string
  headline: string
  subheadline: string
  featuresLabel: string
  features: ShowcaseFeature[]
  systemStatus: string
  legalNote: string
  backgroundImage: string
  backgroundAlt: string
}

export interface LoginConfig {
  title: string
  subtitle: string
  identifierLabel: string
  identifierPlaceholder: string
  passwordLabel: string
  passwordPlaceholder: string
  showPasswordLabel: string
  hidePasswordLabel: string
  rememberLabel: string
  forgotLabel: string
  forgotHref: string
  submitLabel: string
  createAccount: {
    title: string
    description: string
    linkLabel: string
    href: string
  }
  securityNote: string
  legal: string
}

export interface RegisterFieldConfig {
  label: string
  placeholder: string
}

export interface RegisterSelectOptionConfig {
  value: string
  label: string
}

export interface RegisterConfig {
  title: string
  subtitle: string
  sections: {
    access: {
      label: string
      requiredHint: string
    }
    personal: {
      label: string
      optionalLabel: string
    }
  }
  fields: {
    username: RegisterFieldConfig
    email: RegisterFieldConfig
    firstName: RegisterFieldConfig
    paternalLastname: RegisterFieldConfig
    maternalLastname: RegisterFieldConfig
    phone: RegisterFieldConfig
  }
  partnerType: {
    label: string
    placeholder: string
    options: RegisterSelectOptionConfig[]
  }
  submitLabel: string
  termsNote: string
  loginPrompt: string
  loginLinkLabel: string
  loginLinkHref: string
}

export interface RecoverConfig {
  title: string
  subtitle: string
  emailLabel: string
  emailPlaceholder: string
  submitLabel: string
  successTitle: string
  successMessage: string
  securityNote: string
  loginPrompt: string
  loginLinkLabel: string
  loginLinkHref: string
}

export interface PortalNavItemConfig {
  id: string
  label: string
  routeName: string
}

export interface PortalQuickActionConfig {
  id: string
  label: string
  target: 'catalog' | 'sds' | 'support'
}

export interface PortalConfig {
  brand: {
    versionLabel: string
  }
  header: {
    stationLabel: string
    biosecurityBadge: string
    clientIdLabel: string
    accountLabel: string
    logoutLabel: string
    menuLabel: string
  }
  banner: {
    dismissLabel: string
  }
  sidebar: {
    nav: PortalNavItemConfig[]
    footerTitle: string
    footerValue: string
  }
  common: {
    close: string
    back: string
    continueLabel: string
    cancel: string
    viewTracking: string
    download: string
    addToOrder: string
    addedToOrder: string
    levelLabel: string
    save: string
  }
  dashboard: {
    title: string
    subtitle: string
    quickActionsTitle: string
    quickActions: PortalQuickActionConfig[]
    recentTitle: string
    recentSubtitle: string
    recentColumns: Record<'code' | 'date' | 'destination' | 'total' | 'status', string>
    viewAllOrders: string
    sdsModalTitle: string
  }
  catalog: {
    title: string
    subtitle: string
    filterAllLabel: string
    levelWarning: string
    concentrationLabel: string
    doseLabel: string
    sheetLabel: string
    stockLabels: Record<'available' | 'limited' | 'restricted', string>
    levelLabels: Record<1 | 2 | 3, string>
  }
  orders: {
    title: string
    subtitle: string
    columns: Record<'code' | 'date' | 'destination' | 'total' | 'status' | 'tracking', string>
    statusLabels: Record<'processing' | 'transit' | 'held' | 'delivered', string>
    trackingTitle: string
    destinationLabel: string
    guideLabel: string
    heldNoticeTitle: string
    heldNoticeText: string
  }
  subscriptions: {
    title: string
    subtitle: string
    newButton: string
    statusLabels: Record<'active', string>
    featuresLabel: string
    wizard: {
      title: string
      steps: string[]
      planLabel: string
      frequencyLabel: string
      clausesLabel: string
      clausesHint: string
      acceptLabel: string
      summaryTitle: string
      summaryPlan: string
      summaryFrequency: string
      confirmButton: string
      confirmationTitle: string
      confirmationText: string
      closeButton: string
    }
  }
  support: {
    title: string
    subtitle: string
    ticketTitle: string
    ticketSubtitle: string
    fields: {
      type: string
      typePlaceholder: string
      orderRef: string
      orderRefPlaceholder: string
      severity: string
      description: string
      descriptionPlaceholder: string
      contact: string
      submit: string
    }
    severities: { id: string; label: string }[]
    ticketSuccess: string
    faqTitle: string
    chatTitle: string
    chatSubtitle: string
    chatAuthorBot: string
    chatAuthorUser: string
    chatPlaceholder: string
    chatSendLabel: string
    chatQuickLabel: string
    chatDisclaimer: string
  }
  settings: {
    title: string
    subtitle: string
    tabs: { id: string; label: string }[]
    general: {
      fields: Record<
        'businessName' | 'rfc' | 'representative' | 'emergencyPhone' | 'billingEmail' | 'notificationsEmail',
        string
      >
      helper: string
      savedNote: string
    }
    addresses: {
      addLabel: string
      primaryLabel: string
      helper: string
    }
    biosecurity: {
      statusLabels: Record<'active' | 'pending', string>
      requestLabel: string
      requestNote: string
    }
    notifications: {
      helper: string
    }
  }
}

export const fisinorClientsConfig: FisinorClientsConfig = {
  brand: {
    name: 'FISINOR S.A. de C.V.',
    shortName: 'FISINOR',
    division: 'Fisiología e Ingeniería Sintética del Noroeste',
    portalLabel: 'Portal de Clientes',
    logo: '/img/icon_fisinor.png',
  },

  documentTitles: {
    base: 'FISINOR | Portal de Clientes',
    pages: {
      login: 'Inicio de sesión',
      register: 'Crear cuenta',
      recover: 'Recuperar contraseña',
      'portal-dashboard': 'Resumen General',
      'portal-catalog': 'Catálogo de Productos',
      'portal-orders': 'Mis Pedidos y Envíos',
      'portal-subscriptions': 'Suscripciones y Contratos',
      'portal-support': 'Atención y Soporte',
      'portal-settings': 'Ajustes de Cuenta',
    },
  },

  showcase: {
    welcomeTag: 'Complejo Norte · Hermosillo, Sonora',
    headline: 'Tu programa de suscripción, bajo control absoluto.',
    subheadline:
      'Un solo acceso para los servicios, expedientes y beneficios de tu plan FISINOR. Disponible las 24 horas desde cualquier dispositivo autorizado.',
    featuresLabel: 'Desde el portal puedes:',
    features: [
      {
        id: 'expediente',
        title: 'Expediente biométrico',
        description: 'Consulta el estado de tus registros, marcadores y resultados de laboratorio.',
      },
      {
        id: 'suscripcion',
        title: 'Gestión de suscripción',
        description: 'Administra pagos, renovaciones y beneficios activos de tu plan.',
      },
      {
        id: 'citas',
        title: 'Citas y procedimientos',
        description: 'Programa y reagenda sesiones de seguimiento con tu especialista asignado.',
      },
      {
        id: 'avisos',
        title: 'Avisos del campus',
        description: 'Recibe comunicados y notificaciones personalizadas del programa.',
      },
    ],
    systemStatus: 'Sistemas de suscriptores · ACTIVO [HERMOSILLO]',
    legalNote:
      'El acceso a este portal está sujeto a los Términos de Integración y al Aviso de Privacidad Genético vigentes.',
    backgroundImage: '/img/fisinor_landing.jpeg',
    backgroundAlt: 'Investigador de FISINOR trabajando en laboratorio con iluminación azul institucional',
  },

  login: {
    title: 'Bienvenido de vuelta.',
    subtitle: 'Ingresa tus credenciales de suscriptor para acceder a tus servicios.',
    identifierLabel: 'Correo electrónico o ID de suscriptor',
    identifierPlaceholder: 'nombre@correo.com · FSC-0000',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: 'Ingresa tu contraseña',
    showPasswordLabel: 'Mostrar contraseña',
    hidePasswordLabel: 'Ocultar contraseña',
    rememberLabel: 'Mantener la sesión abierta',
    forgotLabel: '¿Olvidaste tu contraseña?',
    forgotHref: '/recover',
    submitLabel: 'Iniciar sesión',
    createAccount: {
      title: '¿Aún no tienes una cuenta?',
      description: 'Activa tu acceso en línea y administra tus servicios como suscriptor.',
      linkLabel: 'Crear cuenta de suscriptor',
      href: '/register',
    },
    securityNote: 'Conexión cifrada. Toda sesión queda registrada en los sistemas de auditoría de FISINOR.',
    legal: '© FISINOR S.A. de C.V. — Todos los derechos reservados.',
  },

  register: {
    title: 'Crea tu cuenta de suscriptor.',
    subtitle: 'Registra tus datos de acceso para activar tu portal en línea.',
    sections: {
      access: {
        label: 'Datos de acceso',
        requiredHint: 'Campo obligatorio',
      },
      personal: {
        label: 'Datos personales',
        optionalLabel: 'Opcional',
      },
    },
    fields: {
      username: { label: 'Nombre de usuario', placeholder: 'Ej. usuario.fisinor' },
      email: { label: 'Correo electrónico', placeholder: 'nombre@correo.com' },
      firstName: { label: 'Nombres', placeholder: 'Ej. María Fernanda' },
      paternalLastname: { label: 'Apellido paterno', placeholder: 'Ej. García' },
      maternalLastname: { label: 'Apellido materno', placeholder: 'Ej. López' },
      phone: { label: 'Número de celular', placeholder: 'Ej. 662 123 4567' },
    },
    partnerType: {
      label: 'Tipo de socio de negocio',
      placeholder: 'Seleccione el tipo de socio',
      options: [],
    },
    submitLabel: 'Crear cuenta',
    termsNote:
      'Al crear tu cuenta aceptas los Términos de Integración y el Aviso de Privacidad Genético de FISINOR.',
    loginPrompt: '¿Ya tienes una cuenta?',
    loginLinkLabel: 'Inicia sesión',
    loginLinkHref: '/',
  },

  recover: {
    title: 'Recupera tu acceso.',
    subtitle:
      'Ingresa el correo electrónico asociado a tu suscripción y te enviaremos las instrucciones para restablecer tu contraseña.',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'nombre@correo.com',
    submitLabel: 'Enviar instrucciones',
    successTitle: 'Instrucciones enviadas.',
    successMessage:
      'Si el correo está registrado en FISINOR, recibirás en unos minutos un enlace para restablecer tu contraseña. Revisa también tu carpeta de correo no deseado.',
    securityNote: 'Por tu seguridad, el enlace de recuperación expira en 30 minutos y es de un solo uso.',
    loginPrompt: '¿Recordaste tu contraseña?',
    loginLinkLabel: 'Vuelve al inicio de sesión',
    loginLinkHref: '/',
  },

  portal: {
    brand: {
      versionLabel: 'Portal de Clientes v2.4',
    },
    header: {
      stationLabel: 'Estación Asignada:',
      biosecurityBadge: 'Certificado de Bioseguridad Activo (Nivel 2)',
      clientIdLabel: 'ID de Cliente',
      accountLabel: 'Ajustes de Cuenta',
      logoutLabel: 'Cerrar sesión',
      menuLabel: 'Abrir menú de navegación',
    },
    banner: {
      dismissLabel: 'Descartar aviso',
    },
    sidebar: {
      nav: [
        { id: 'dashboard', label: 'Resumen General', routeName: 'portal-dashboard' },
        { id: 'catalog', label: 'Catálogo de Productos', routeName: 'portal-catalog' },
        { id: 'orders', label: 'Mis Pedidos y Envíos', routeName: 'portal-orders' },
        { id: 'subscriptions', label: 'Suscripciones y Contratos', routeName: 'portal-subscriptions' },
        { id: 'support', label: 'Atención al Cliente y Soporte', routeName: 'portal-support' },
        { id: 'settings', label: 'Ajustes de Cuenta', routeName: 'portal-settings' },
      ],
      footerTitle: 'Certificado de Bioseguridad',
      footerValue: 'Nivel 2 · Vigente',
    },
    common: {
      close: 'Cerrar',
      back: 'Atrás',
      continueLabel: 'Continuar',
      cancel: 'Cancelar',
      viewTracking: 'Ver rastreo',
      download: 'Descargar PDF',
      addToOrder: 'Añadir a Pedido',
      addedToOrder: 'Añadido al pedido ✓',
      levelLabel: 'Nivel',
      save: 'Guardar cambios',
    },
    dashboard: {
      title: 'Resumen General',
      subtitle: 'Panorama operativo del ciclo actual para su estación asignada.',
      quickActionsTitle: 'Acciones Rápidas',
      quickActions: [
        { id: 'restock', label: 'Solicitar Reabastecimiento', target: 'catalog' },
        { id: 'sds', label: 'Descargar Ficha de Seguridad (SDS)', target: 'sds' },
        { id: 'deviation', label: 'Reportar Desviación en Campo', target: 'support' },
      ],
      recentTitle: 'Actividad Reciente',
      recentSubtitle: 'Últimos 3 pedidos y su estado de entrega.',
      recentColumns: {
        code: 'Pedido',
        date: 'Fecha',
        destination: 'Destino',
        total: 'Total',
        status: 'Estado',
      },
      viewAllOrders: 'Ver todos los pedidos',
      sdsModalTitle: 'Ficha de Seguridad (SDS)',
    },
    catalog: {
      title: 'Catálogo de Productos',
      subtitle:
        'Línea B2B autorizada para su licencia y estación. Las dosis son sugeridas; valide con su asesor agronómico.',
      filterAllLabel: 'Todos',
      levelWarning: 'Requiere Licencia Fisinor Nivel 3 o Autorización de Sub-estación',
      concentrationLabel: 'Concentración',
      doseLabel: 'Dosis sugerida',
      sheetLabel: 'Ficha Técnica / MSDS',
      stockLabels: {
        available: 'Disponible',
        limited: 'Existencia limitada',
        restricted: 'Bajo autorización',
      },
      levelLabels: { 1: 'Nivel 1', 2: 'Nivel 2', 3: 'Nivel 3' },
    },
    orders: {
      title: 'Mis Pedidos y Envíos',
      subtitle: 'Historial de compras y rastreo de entregas a sus lotes registrados.',
      columns: {
        code: 'Pedido',
        date: 'Fecha',
        destination: 'Destino',
        total: 'Total',
        status: 'Estado',
        tracking: 'Rastreo',
      },
      statusLabels: {
        processing: 'Procesando',
        transit: 'En Tránsito',
        held: 'Retenido por Bioseguridad',
        delivered: 'Entregado',
      },
      trackingTitle: 'Rastreo de Pedido',
      destinationLabel: 'Destino',
      guideLabel: 'Guía',
      heldNoticeTitle: 'Pedido en cuarentena documental',
      heldNoticeText:
        'El lote permanece en revisión del Consejo de Bioseguridad. El dictamen tarda entre 24 y 72 h; de confirmarse contaminación cruzada, procederá la incineración documentada del contenido.',
    },
    subscriptions: {
      title: 'Suscripciones y Contratos',
      subtitle: 'Programas de suministro y monitoreo activos en su estación.',
      newButton: 'Solicitar Nueva Suscripción',
      statusLabels: { active: 'Vigente' },
      featuresLabel: 'Incluye',
      wizard: {
        title: 'Solicitar Nueva Suscripción',
        steps: ['Plan', 'Frecuencia', 'Cláusulas', 'Confirmación'],
        planLabel: 'Seleccione un plan',
        frequencyLabel: 'Frecuencia de distribución',
        clausesLabel: 'Cláusulas de Responsabilidad Ambiental',
        clausesHint: 'Para continuar debe aceptar todas las cláusulas del programa.',
        acceptLabel: 'He leído y acepto esta cláusula',
        summaryTitle: 'Resumen de su solicitud',
        summaryPlan: 'Plan',
        summaryFrequency: 'Frecuencia',
        confirmButton: 'Confirmar solicitud',
        confirmationTitle: 'Solicitud recibida.',
        confirmationText:
          'Su solicitud de suscripción {folio} ha sido recibida y está bajo revisión por la Dirección Operativa de FISINOR.',
        closeButton: 'Volver al inicio',
      },
    },
    support: {
      title: 'Atención al Cliente y Soporte',
      subtitle: 'Canales directos con la Central de Operaciones FISINOR.',
      ticketTitle: 'Ticket de Incidencia Técnica',
      ticketSubtitle: 'Respuesta estimada: 4 horas hábiles.',
      fields: {
        type: 'Tipo de incidencia',
        typePlaceholder: 'Seleccione el tipo de incidencia',
        orderRef: 'Pedido relacionado (opcional)',
        orderRefPlaceholder: 'Ej. #ORD-2026-9921',
        severity: 'Severidad',
        description: 'Descripción del hallazgo',
        descriptionPlaceholder:
          'Describa el hallazgo, la ubicación exacta (sector/lote) y cualquier cambio observado.',
        contact: 'Correo de contacto',
        submit: 'Crear ticket',
      },
      severities: [
        { id: 'low', label: 'Bajo' },
        { id: 'medium', label: 'Medio' },
        { id: 'high', label: 'Alto' },
        { id: 'critical', label: 'Crítico' },
      ],
      ticketSuccess: 'Ticket {folio} creado. El equipo técnico de su estación le contactará dentro del tiempo estimado.',
      faqTitle: 'Preguntas Frecuentes',
      chatTitle: 'Buzón Directo con la Central',
      chatSubtitle: 'Asistencia inmediata de MIRA, la asistente virtual de FISINOR.',
      chatAuthorBot: 'MIRA · Central FISINOR',
      chatAuthorUser: 'Usted',
      chatPlaceholder: 'Escriba su mensaje…',
      chatSendLabel: 'Enviar mensaje',
      chatQuickLabel: 'Consultas frecuentes:',
      chatDisclaimer: 'MIRA es una asistente automatizada. Para emergencias en campo use el Buzón Rojo.',
    },
    settings: {
      title: 'Ajustes de Cuenta',
      subtitle: 'Información operativa y documental de su cuenta de cliente.',
      tabs: [
        { id: 'general', label: 'Información General' },
        { id: 'addresses', label: 'Direcciones de Entrega (Lotes/Sectores)' },
        { id: 'biosecurity', label: 'Bioseguridad y Licencias' },
        { id: 'notifications', label: 'Notificaciones' },
      ],
      general: {
        fields: {
          businessName: 'Nombre de la Razón Social',
          rfc: 'RFC',
          representative: 'Representante Legal',
          emergencyPhone: 'Teléfono de Emergencia en Campo',
          billingEmail: 'Correo de Facturación',
          notificationsEmail: 'Correo de Notificaciones',
        },
        helper: 'Los cambios en la razón social o el RFC requieren validación documental ante la Dirección Operativa.',
        savedNote: 'Cambios guardados en su expediente local (modo de prueba).',
      },
      addresses: {
        addLabel: 'Agregar dirección',
        primaryLabel: 'Principal',
        helper: 'Las direcciones determinan las rutas de distribución y los puntos de carga retornable.',
      },
      biosecurity: {
        statusLabels: { active: 'Vigente', pending: 'En revisión' },
        requestLabel: 'Solicitar Licencia Nivel 3',
        requestNote: 'Su solicitud de Licencia Nivel 3 fue registrada; requiere auditoría presencial del predio.',
      },
      notifications: {
        helper: 'Seleccione qué comunicados desea recibir de la Central.',
      },
    },
  },
}
