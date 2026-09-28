import React, { useState } from 'react';
import { X, ExternalLink, Github, CheckCircle, Layers, Sparkles, Server, Database, ShieldCheck } from 'lucide-react';
import { Project } from '../types';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { soundFx } from '../utils/audioChimes';

interface ProjectModalProps {
  selectedProject: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  selectedProject,
  isOpen,
  onClose,
  onSelectProject,
}) => {
  if (!isOpen) return null;

  const current = selectedProject || FEATURED_PROJECTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => {
          soundFx.playChime('click');
          onClose();
        }}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl rounded-3xl glass-panel p-6 sm:p-8 lg:p-10 shadow-2xl border border-pink-200 z-10 my-8 max-h-[90vh] overflow-y-auto bg-white/95">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playChime('click');
            onClose();
          }}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-slate-500 hover:bg-pink-100 hover:text-pink-700 transition-all"
          aria-label="Close modal"
          id="project-modal-close-btn"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-pink-100">
          {FEATURED_PROJECTS.map((proj) => (
            <button
              key={proj.id}
              onClick={() => {
                soundFx.playChime('hover');
                onSelectProject(proj);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                current.id === proj.id
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-200 scale-105'
                  : 'bg-pink-50/80 text-slate-700 hover:bg-pink-100'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        {/* Main Project Details */}
        <div className="space-y-6">
          
          {/* Header info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">
                {current.category}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {current.companyOrContext} • {current.period}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {current.title}
            </h2>
            <p className="text-sm font-semibold text-pink-600 mt-1">
              {current.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="rounded-2xl bg-gradient-to-r from-pink-50/70 to-rose-50/50 p-5 border border-pink-100/90 text-sm sm:text-base text-slate-700 leading-relaxed">
            {current.description}
          </div>

          {/* Key Achievements & Engineering Highlights */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-500" />
              Technical Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-pink-100 shadow-sm text-xs sm:text-sm text-slate-700"
                >
                  <CheckCircle className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Stack Badges */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Technologies Implemented
            </h3>
            <div className="flex flex-wrap gap-2">
              {current.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700 border border-pink-200/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Call to Action */}
          <div className="pt-4 border-t border-pink-100 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Would you like to explore the repository or live demo?
            </p>
            <a
              href="#contacto"
              onClick={() => {
                soundFx.playChime('click');
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:from-pink-600 hover:to-rose-600 transition-all"
            >
              <span>Discuss this project</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
