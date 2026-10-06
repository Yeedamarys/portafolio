import React, { useState } from 'react';
import { Header } from './components/Header';
import { Surreal3DCanvas } from './components/Surreal3DCanvas';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { LanguagesCard } from './components/LanguagesCard';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { FeaturedProjects } from './components/FeaturedProjects';
import { GithubStatsCard } from './components/GithubStatsCard';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';
import { Project } from './types';

export default function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const handleViewProjectsScroll = () => {
    const el = document.querySelector('#proyectos');
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
          onOpenCodeDetails={handleViewProjectsScroll}
        />

        {/* Main Body */}
        <main className="flex-1 space-y-8 sm:space-y-12">
          
          {/* 1. Hero Section */}
          <HeroSection
            onOpenCv={() => setCvModalOpen(true)}
            onViewProjects={handleViewProjectsScroll}
          />

          {/* 2. Projects: first thing after the hero, since recruiters look for them first */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24" id="proyectos">
            <FeaturedProjects onSelectProject={handleSelectProject} />
          </section>

          {/* 3. Middle Row: About Me | Technical Skills | Languages */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* About Me */}
              <div className="lg:col-span-4 flex flex-col">
                <AboutSection />
              </div>

              {/* Technical Skills */}
              <div className="lg:col-span-5 flex flex-col" id="habilidades">
                <SkillsSection />
              </div>

              {/* Languages + 3D Headphones */}
              <div className="md:col-span-2 lg:col-span-3 flex flex-col">
                <LanguagesCard />
              </div>

            </div>
          </section>

          {/* 4. Professional Experience */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24" id="experiencia">
            <ExperienceTimeline />
          </section>

          {/* 4. GitHub Live Activity Widget (Matching reference image) */}
          <GithubStatsCard />

          {/* 5. Education & Surrealist Saturn Banner */}
          <EducationSection />

          {/* 6. Contact Form */}
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
