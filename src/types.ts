export type Lang = 'en' | 'es';

export interface Project {
  id: string;
  short: string; // Tab label
  title: string;
  subtitle: string;
  companyOrContext: string;
  period: string;
  category: string;
  outcome: string; // One plain sentence: what the project lets its users do
  myRole?: string;
  description: string;
  highlights: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string; // Path under /public, e.g. "/projects/narubi.webp"
}

export interface SkillGroup {
  id: string;
  category: string;
  name: string;
  detail: string;
}

export interface WorkExperience {
  id: string;
  period: string;
  company: string;
  project?: string;
  role: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  currentLevel: string;
  description: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface PersonalInfo {
  title: string;
  offer: string;
  tagline: string;
  location: string;
  status: string;
  aboutSummary: string[];
  jobObjective: string;
  quote: string;
  whatsappMessage: string;
}

export interface UiStrings {
  skip: string;
  nav: {
    label: string;
    projects: string;
    about: string;
    skills: string;
    experience: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  lang: { label: string };
  sound: { label: string };
  monogram: { label: string };
  hero: {
    seeProjects: string;
    writeMe: string;
  };
  cv: {
    button: string;
    open: string;
    title: string;
    print: string;
    json: string;
    close: string;
    profile: string;
    experience: string;
    skills: string;
    education: string;
    languages: string;
    signature: string;
  };
  projects: {
    heading: string;
    tabsLabel: string;
    myRole: string;
    details: string;
    live: string;
    code: string;
    codePrivate: string;
    codePrivateLong: string;
    askAbout: string;
    highlights: string;
    technologies: string;
    prev: string;
    next: string;
    close: string;
    swipeHint: string;
  };
  skills: { heading: string };
  languages: { heading: string };
  experience: { heading: string; details: string; close: string };
  about: { heading: string };
  education: { heading: string };
  contact: {
    heading: string;
    intro: string;
    whatsapp: string;
    email: string;
    copy: string;
    copied: string;
    form: string;
    formTitle: string;
    close: string;
    name: string;
    emailField: string;
    subject: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    mailto: string; // {email} is replaced
    error: string; // {email} is replaced
    openMail: string;
    defaultSubject: string; // {name} is replaced
    required: string;
  };
  footer: { rights: string; built: string };
}

export interface Content {
  meta: { title: string };
  personal: PersonalInfo;
  projects: Project[];
  skills: SkillGroup[];
  experiences: WorkExperience[];
  education: Education;
  languages: Language[];
  ui: UiStrings;
}
