import { Project, SkillItem, WorkExperience, Education, Language } from '../types';

export const PERSONAL_INFO = {
  name: "Damarys León",
  initials: "DL",
  title: "Desarrolladora Full Stack",
  shortRole: "FULL STACK DEV",
  tagline: "Construyo soluciones digitales que combinan tecnología, creatividad y propósito.",
  location: "Quito, Ecuador",
  phone: "+593 995515379",
  whatsappUrl: "https://wa.me/593995515379?text=Hola%20Damarys,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad",
  email: "damarysleon88@gmail.com",
  status: "Disponible para trabajar",
  linkedin: "https://www.linkedin.com/in/damarys-leon",
  github: "https://github.com/damarysleon",
  instagram: "https://instagram.com/damarys.dev",
  quote: "La tecnología también puede ser una forma de crear un mundo mejor",
  aboutSummary: [
    "Desarrolladora Full Stack con experiencia entregando módulos administrativos y sitios web en producción, integrando arquitecturas limpias, autenticación, y servicios en la nube (Cloudinary).",
    "He trabajado en la personalización de plataformas ERP (Odoo), el desarrollo de paneles administrativos en tiempo real y la implementación de facturación electrónica conectada al SRI."
  ],
  jobObjective: "Busco un rol junior/semi-senior de desarrollo full stack donde aportar código mantenible y orientado a producto."
};

export const SKILLS: SkillItem[] = [
  {
    id: 'skill-flutter',
    name: 'Flutter',
    subtext: 'Android Studio',
    category: 'Mobile',
    iconType: 'mobile',
    level: 85
  },
  {
    id: 'skill-clean-arch',
    name: 'Clean Architecture',
    subtext: 'SOLID, Clean Code',
    category: 'Patrones',
    iconType: 'layers',
    level: 90
  },
  {
    id: 'skill-node-express',
    name: 'Node.js & Express',
    subtext: 'Laravel, Spring Boot',
    category: 'Backend',
    iconType: 'server',
    level: 92
  },
  {
    id: 'skill-react-js',
    name: 'React & JavaScript',
    subtext: 'Tailwind CSS, Bootstrap',
    category: 'Frontend',
    iconType: 'monitor',
    level: 95
  },
  {
    id: 'skill-languages',
    name: 'Java, JS, Python',
    subtext: 'C#, C++',
    category: 'Lenguajes',
    iconType: 'code',
    level: 88
  },
  {
    id: 'skill-rest-cloud',
    name: 'REST API & Cloudinary',
    subtext: 'Servicios en la nube, SRI',
    category: 'Cloud',
    iconType: 'cloud',
    level: 94
  },
  {
    id: 'skill-data-ops',
    name: 'PostgreSQL, MySQL, Mongo',
    subtext: 'Docker, CI/CD, Git/GitHub, phpMyAdmin',
    category: 'Data & Ops',
    iconType: 'database',
    level: 88
  },
  {
    id: 'skill-agile',
    name: 'Scrum, Kanban',
    subtext: 'Jira, Sprints, Agile workflows',
    category: 'Metodologías',
    iconType: 'users',
    level: 92
  }
];

export const EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp-sodi',
    year: '2025',
    period: '2025',
    company: 'SODI CORP S.A.S',
    role: 'Desarrolladora Full Stack',
    responsibilities: [
      'Colaboré en las modificaciones de diseño de la página web de la empresa.',
      'Desarrollé e implementé funciones en el módulo administrativo utilizando Odoo 17.',
      'Contribuí a mejorar la organización de los datos y la fiabilidad del sistema para los procesos administrativos internos.'
    ]
  },
  {
    id: 'exp-perfor',
    year: '2026',
    period: 'Agosto 2026',
    company: 'Perfor Construcciones',
    role: 'Desarrolladora Full Stack',
    responsibilities: [
      'Desarrollé una página web con una sección informativa y un módulo administrativo desde el cual el administrador puede modificar las pantallas en tiempo real (imágenes, información, contacto, ubicación) y agregar nuevos módulos.',
      'Integré el servicio de Cloudinary para optimizar el rendimiento en la carga de imágenes.'
    ]
  },
  {
    id: 'exp-narubi',
    year: '2026',
    period: '2026 (septiembre)',
    company: 'Narubi — Sistema de Facturación / Punto de Venta',
    role: 'Desarrolladora Full Stack',
    responsibilities: [
      'Desarrollé el panel administrativo del sistema de facturación y punto de venta.',
      'Implementé la firma electrónica conectada con el SRI para la generación de facturas.',
      'Utilicé REST API, Cloudinary, arquitectura limpia y JWT para la autenticación segura.',
      'Colaboré bajo metodología ágil, gestionando el trabajo con Jira.'
    ]
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'proj-narubi',
    title: 'Sistema de Facturación & POS',
    subtitle: 'Firma electrónica SRI & Módulo Administrativo',
    companyOrContext: 'Narubi',
    period: 'Septiembre 2026',
    category: 'Full Stack',
    description: 'Sistema integral de facturación electrónica y punto de venta con emisión legal conectada a los web services del SRI (Servicio de Rentas Internas de Ecuador). Incluye catálogo dinámico de productos, control de inventario, auditoría de transacciones y panel analítico para administración de ventas.',
    highlights: [
      'Firma electrónica digital en formato XML con sellado de tiempo y validación directa en línea ante el SRI.',
      'Autenticación robusta basada en JSON Web Tokens (JWT) y arquitectura limpia desacoplada.',
      'Gestión multimedia optimizada con CDN Cloudinary para comprobantes y activos de catálogo.',
      'Gestión ágil del ciclo de desarrollo documentada en sprints con Jira.'
    ],
    technologies: ['Node.js', 'Express', 'React', 'TypeScript', 'SRI Web Services', 'Cloudinary', 'JWT', 'PostgreSQL'],
    featured: true
  },
  {
    id: 'proj-perfor',
    title: 'Sitio Web Empresarial & CMS en Tiempo Real',
    subtitle: 'Portal corporativo con panel autoadministrable',
    companyOrContext: 'Perfor Construcciones',
    period: 'Agosto 2026',
    category: 'Full Stack',
    description: 'Plataforma web corporativa de alta velocidad diseñada para destacar obras de ingeniería y perforación. Dispone de un CMS interno que permite a los directores actualizar contenido, sedes geolocalizadas, proyectos concluidos y galerías fotográficas en tiempo real sin requerir despliegues técnicos.',
    highlights: [
      'Panel administrativo reactivo con edición en tiempo real de textos, mapas de ubicación y datos de contacto.',
      'Pipeline de carga y compresión automática de imágenes pesadas a través del API de Cloudinary.',
      'Diseño altamente responsive y optimizado para métricas Core Web Vitals (carga < 1s).',
      'Arquitectura modular extensible para la adición de nuevos tipos de servicios.'
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Cloudinary', 'REST API'],
    featured: true
  },
  {
    id: 'proj-sodi',
    title: 'Módulo Administrativo ERP (Odoo 17)',
    subtitle: 'Personalización de procesos y optimización de datos',
    companyOrContext: 'SODI CORP S.A.S',
    period: '2025',
    category: 'ERP',
    description: 'Personalización e implementación de módulos administrativos a la medida dentro del ecosistema Odoo 17 para la gestión corporativa. Se reestructuraron flujos de trabajo, control documental y coherencia de registros.',
    highlights: [
      'Desarrollo de vistas y modelos específicos adaptados a la lógica comercial interna de la empresa.',
      'Optimización de la fiabilidad y consistencia de las consultas de datos en PostgreSQL.',
      'Modernización de interfaces de usuario para agilizar los procesos cotidianos del personal administrativo.'
    ],
    technologies: ['Python', 'Odoo 17', 'PostgreSQL', 'XML / QWeb', 'JavaScript'],
    featured: true
  },
  {
    id: 'proj-mobile',
    title: 'Aplicación Móvil con Clean Architecture',
    subtitle: 'Flutter & Android Studio para operaciones de campo',
    companyOrContext: 'Proyecto Especial',
    period: '2025 - 2026',
    category: 'Mobile',
    description: 'Aplicación multiplataforma construida con Flutter bajo principios rigurosos de Clean Architecture y SOLID, garantizando alta escalabilidad, desacoplamiento de capas y consumo eficiente de APIs REST.',
    highlights: [
      'Separación limpia de capas: Domain (Use cases/Entities), Data (Repositories/DataSources) y Presentation (BLoC/Provider).',
      'Consumo fluido de endpoints RESTful y almacenamiento local en SQLite.',
      'Interfaz de usuario intuitiva con micro-interacciones a 60fps en Android e iOS.'
    ],
    technologies: ['Flutter', 'Dart', 'Android Studio', 'Clean Architecture', 'SOLID', 'REST API'],
    featured: false
  }
];

export const EDUCATION: Education = {
  degree: 'Ingeniería en Software',
  institution: 'Universidad de las Fuerzas Armadas ESPE',
  period: '2022 - Presente',
  currentLevel: 'Octavo Nivel',
  description: 'Formación académica rigurosa en ingeniería de software, arquitectura de sistemas, desarrollo full stack, algoritmos avanzados, bases de datos y metodologías ágiles en una de las instituciones de mayor prestigio del Ecuador.'
};

export const LANGUAGES: Language[] = [
  {
    language: 'Español',
    level: 'Nativo',
    percentage: 100
  },
  {
    language: 'Inglés',
    level: 'B2',
    percentage: 75
  }
];
