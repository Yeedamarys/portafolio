export interface Project {
  id: string;
  title: string;
  subtitle: string;
  companyOrContext: string;
  period: string;
  category: 'Full Stack' | 'Frontend' | 'ERP' | 'Mobile';
  outcome: string; // One plain sentence: what the project lets its users do
  myRole?: string;
  description: string;
  highlights: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  architectureNotes?: string;
  featured: boolean;
  image?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  subtext: string;
  category: 'Mobile' | 'Patrones' | 'Backend' | 'Frontend' | 'Lenguajes' | 'Cloud' | 'Data & Ops' | 'Metodologías';
  iconType: 'mobile' | 'layers' | 'server' | 'monitor' | 'code' | 'cloud' | 'database' | 'users';
  level: number; // 1-100
}

export interface WorkExperience {
  id: string;
  year: string;
  period: string;
  company: string;
  role: string;
  responsibilities: string[];
  tag?: string;
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
  percentage: number;
}
