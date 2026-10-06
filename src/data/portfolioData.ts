import { Project, SkillItem, WorkExperience, Education, Language } from '../types';

export const PERSONAL_INFO = {
  name: "Damarys León",
  initials: "DL",
  title: "Full Stack Developer",
  shortRole: "FULL STACK DEV",
  tagline: "I build digital solutions that combine technology, creativity, and purpose.",
  location: "Quito, Ecuador",
  phone: "+593 995515379",
  whatsappUrl: "https://wa.me/593995515379?text=Hello%20Damarys,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity",
  email: "damarysleon88@gmail.com",
  status: "Available for work",
  linkedin: "https://www.linkedin.com/in/damarys-leon",
  github: "https://github.com/Yeedamarys",
  instagram: "https://instagram.com/damarys.dev",
  quote: "Technology can also be a way to create a better world",
  aboutSummary: [
    "Full Stack Developer with experience delivering administrative modules and production websites, integrating clean architectures, authentication, and cloud services (Cloudinary).",
    "I have worked on customizing ERP platforms (Odoo), developing real-time admin panels, and implementing electronic invoicing connected to the SRI."
  ],
  jobObjective: "Seeking a junior/semi-senior Full Stack Development role where I can contribute maintainable and product-oriented code."
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
    category: 'Patterns',
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
    category: 'Languages',
    iconType: 'code',
    level: 88
  },
  {
    id: 'skill-rest-cloud',
    name: 'REST API & Cloudinary',
    subtext: 'Cloud Services, SRI Invoicing',
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
    subtext: 'Jira, Sprints, Agile Workflows',
    category: 'Methodologies',
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
    role: 'Full Stack Developer',
    responsibilities: [
      'Collaborated on design updates for the company website.',
      'Developed and implemented features in the administrative module using Odoo 17.',
      'Contributed to improving data organization and system reliability for internal administrative processes.'
    ]
  },
  {
    id: 'exp-perfor',
    year: '2026',
    period: 'August 2026',
    company: 'Perfor Construcciones',
    role: 'Full Stack Developer',
    responsibilities: [
      'Developed a corporate website featuring an informative section and an administrative module allowing real-time screen customization (images, content, contact info, location) and addition of new modules.',
      'Integrated Cloudinary service to optimize image loading performance.'
    ]
  },
  {
    id: 'exp-narubi',
    year: '2026',
    period: 'September 2026',
    company: 'Narubi — Invoicing System / POS',
    role: 'Full Stack Developer',
    responsibilities: [
      'Developed the admin dashboard for the invoicing system and Point of Sale (POS).',
      'Implemented electronic signatures connected to SRI web services for invoice generation.',
      'Utilized REST APIs, Cloudinary, clean architecture, and JWT for secure authentication.',
      'Collaborated under agile methodologies, managing workflows with Jira.'
    ]
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'proj-narubi',
    title: 'Invoicing & POS System',
    subtitle: 'SRI Electronic Signature & Admin Module',
    companyOrContext: 'Narubi',
    period: 'September 2026',
    category: 'Full Stack',
    outcome: 'Businesses issue invoices that are signed electronically and validated directly with Ecuador\'s SRI, from one admin dashboard.',
    myRole: 'Full Stack Developer',
    description: 'Comprehensive electronic invoicing and Point of Sale (POS) system with legal issuance connected to Ecuador\'s SRI (Internal Revenue Service) web services. Features a dynamic product catalog, inventory management, transaction auditing, and sales analytics dashboard.',
    highlights: [
      'XML digital electronic signature with timestamping and direct online validation with SRI.',
      'Robust authentication based on JSON Web Tokens (JWT) and decoupled clean architecture.',
      'Optimized media management with Cloudinary CDN for receipts and catalog assets.',
      'Agile development lifecycle managed and documented in sprints using Jira.'
    ],
    technologies: ['Node.js', 'Express', 'React', 'TypeScript', 'SRI Web Services', 'Cloudinary', 'JWT', 'PostgreSQL'],
    featured: true
  },
  {
    id: 'proj-perfor',
    title: 'Corporate Website & Real-Time CMS',
    subtitle: 'Corporate portal with self-manageable admin panel',
    companyOrContext: 'Perfor Construcciones',
    period: 'August 2026',
    category: 'Full Stack',
    outcome: 'The company updates its own texts, images, contact details and location in real time, without calling a developer.',
    myRole: 'Full Stack Developer',
    description: 'High-speed corporate web platform designed to highlight engineering and drilling projects. Includes an internal CMS enabling managers to update content, geolocated headquarters, completed projects, and photo galleries in real time without technical deployments.',
    highlights: [
      'Reactive administrative panel featuring real-time editing of text, location maps, and contact details.',
      'Automated image compression and upload pipeline via Cloudinary API.',
      'Responsive design, with images served through Cloudinary to keep pages light.',
      'Extensible modular architecture for adding new service types.'
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Cloudinary', 'REST API'],
    featured: true
  },
  {
    id: 'proj-sodi',
    title: 'ERP Admin Module (Odoo 17)',
    subtitle: 'Process customization and data optimization',
    companyOrContext: 'SODI CORP S.A.S',
    period: '2025',
    category: 'ERP',
    outcome: 'Custom Odoo 17 views and models that fit the company\'s internal administrative processes.',
    myRole: 'Full Stack Developer',
    description: 'Customization and implementation of tailored administrative modules within the Odoo 17 ecosystem for corporate management. Restructured workflows, document control, and record consistency.',
    highlights: [
      'Development of custom views and models adapted to internal business logic.',
      'Optimization of PostgreSQL data query reliability and consistency.',
      'User interface modernization to streamline daily administrative operations.'
    ],
    technologies: ['Python', 'Odoo 17', 'PostgreSQL', 'XML / QWeb', 'JavaScript'],
    featured: true
  },
  {
    id: 'proj-mobile',
    title: 'Mobile App with Clean Architecture',
    subtitle: 'Flutter & Android Studio for field operations',
    companyOrContext: 'Special Project',
    period: '2025 - 2026',
    category: 'Mobile',
    outcome: 'A Flutter app for field operations that consumes a REST API and keeps data available offline with SQLite.',
    description: 'Cross-platform mobile application built with Flutter adhering to strict Clean Architecture and SOLID principles, ensuring high scalability, layer decoupling, and efficient REST API consumption.',
    highlights: [
      'Clean layer separation: Domain (Use cases/Entities), Data (Repositories/DataSources), and Presentation (BLoC/Provider).',
      'Smooth RESTful endpoint consumption and local storage with SQLite.',
      'Intuitive UI with micro-interactions on Android and iOS.'
    ],
    technologies: ['Flutter', 'Dart', 'Android Studio', 'Clean Architecture', 'SOLID', 'REST API'],
    featured: false
  }
];

export const EDUCATION: Education = {
  degree: 'Software Engineering',
  institution: 'Universidad de las Fuerzas Armadas ESPE',
  period: '2022 - Present',
  currentLevel: 'Eighth Semester',
  description: 'Rigorous academic training in software engineering, systems architecture, full stack development, advanced algorithms, databases, and agile methodologies at one of Ecuador\'s top prestigious universities.'
};

export const LANGUAGES: Language[] = [
  {
    language: 'Spanish',
    level: 'Native',
    percentage: 100
  },
  {
    language: 'English',
    level: 'B2 (Upper-Intermediate)',
    percentage: 75
  }
];
