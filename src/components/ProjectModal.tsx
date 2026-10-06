import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, CheckCircle, Sparkles, Lock } from 'lucide-react';
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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  // Kept in a ref so a new onClose identity on each parent render doesn't re-run the focus effect.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Escape closes the dialog; focus moves into it on open and returns to the trigger on close.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const current = selectedProject || FEATURED_PROJECTS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      
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
          ref={closeButtonRef}
          onClick={() => {
            soundFx.playChime('click');
            onClose();
          }}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-pink-800 hover:bg-pink-100 hover:text-pink-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
          aria-label="Close project details"
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
              aria-pressed={current.id === proj.id}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 ${
                current.id === proj.id
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-200'
                  : 'bg-pink-50/80 text-pink-900 hover:bg-pink-100'
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
              <span className="text-sm font-semibold text-slate-600">
                {current.companyOrContext}, {current.period}
              </span>
            </div>
            <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {current.title}
            </h2>
            <p className="text-sm font-semibold text-pink-700 mt-1">
              {current.subtitle}
            </p>
          </div>

          {current.image && (
            <img
              src={current.image}
              alt={`Screenshot of ${current.title}`}
              className="w-full rounded-2xl border border-pink-100 object-cover object-top"
            />
          )}

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
          <div className="pt-4 border-t border-pink-100 flex flex-wrap items-center gap-3">
            {current.liveUrl && (
              <a
                href={current.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-pink-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                <span>Live demo</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}

            {current.githubUrl ? (
              <a
                href={current.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-pink-300 bg-white px-5 py-2.5 text-sm font-bold text-pink-800 hover:bg-pink-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>View code</span>
              </a>
            ) : (
              <p className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                <Lock className="h-4 w-4" aria-hidden="true" />
                The code isn't public, but I can walk you through it.
              </p>
            )}

            <a
              href="#contacto"
              onClick={() => {
                soundFx.playChime('click');
                onClose();
              }}
              className="sm:ml-auto inline-flex items-center gap-2 rounded-full px-1 py-2.5 text-sm font-bold text-pink-800 underline underline-offset-4 hover:text-pink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            >
              Ask me about this project
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
