import React, { useState } from 'react';
import { Header } from './components/Header';
import { Surreal3DCanvas } from './components/Surreal3DCanvas';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { LanguagesCard } from './components/LanguagesCard';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { FeaturedProjects } from './components/FeaturedProjects';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';
import { Project } from './types';
import { FEATURED_PROJECTS } from './data/portfolioData';

export default function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const handleViewAllProjects = () => {
    setSelectedProject(FEATURED_PROJECTS[0]);
    setProjectModalOpen(true);
  };

  const handleViewProjectsScroll = () => {
    const el = document.querySelector('#experiencia');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF4F7] text-slate-800 selection:bg-pink-500 selection:text-white">
      {/* 3D Surreal Particle Canvas */}
      <Surreal3DCanvas />

      {/* Main Content Wrap */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Header */}
        <Header
          onOpenCv={() => setCvModalOpen(true)}
          onOpenCodeDetails={handleViewAllProjects}
        />

        {/* Main Body */}
        <main className="flex-1 space-y-8 sm:space-y-12">
          
          {/* 1. Hero Section */}
          <HeroSection
            onOpenCv={() => setCvModalOpen(true)}
            onViewProjects={handleViewProjectsScroll}
          />

          {/* 2. Middle Row matching Mockup 4: Sobre Mí | Habilidades Técnicas | Idiomas */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Sobre mí */}
              <div className="lg:col-span-4 flex flex-col">
                <AboutSection />
              </div>

              {/* Habilidades Técnicas */}
              <div className="lg:col-span-5 flex flex-col" id="habilidades">
                <SkillsSection />
              </div>

              {/* Idiomas + 3D Headphones */}
              <div className="md:col-span-2 lg:col-span-3 flex flex-col">
                <LanguagesCard />
              </div>

            </div>
          </section>

          {/* 3. Lower Row matching Mockup 4: Experiencia Profesional | Proyectos Destacados (with 3D Laptop) */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="experiencia">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Experiencia Profesional */}
              <div className="lg:col-span-7 flex flex-col">
                <ExperienceTimeline />
              </div>

              {/* Proyectos Destacados */}
              <div className="lg:col-span-5 flex flex-col" id="proyectos">
                <FeaturedProjects
                  onSelectProject={handleSelectProject}
                  onViewAllProjects={handleViewAllProjects}
                />
              </div>

            </div>
          </section>

          {/* 4. Educación & Surrealist Saturn Banner */}
          <EducationSection />

          {/* 5. Contact Form for Recruiters */}
          <ContactSection />

        </main>

        {/* Footer */}
        <Footer />

      </div>

      {/* Modals */}
      <ProjectModal
        isOpen={projectModalOpen}
        selectedProject={selectedProject}
        onClose={() => setProjectModalOpen(false)}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />

    </div>
  );
}
