import React from 'react';
import { ExternalLink, Github, Lock, ArrowRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { soundFx } from '../utils/audioChimes';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2';

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject }) => {
  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
          Projects
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          What each one does, my role, and the stack behind it.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {FEATURED_PROJECTS.map((proj) => (
          <article
            key={proj.id}
            className="glass-panel rounded-3xl border border-pink-200/90 shadow-lg overflow-hidden flex flex-col"
          >
            {proj.image && (
              <img
                src={proj.image}
                alt={`Screenshot of ${proj.title}`}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[16/10] object-cover object-top border-b border-pink-100"
              />
            )}

            <div className="p-6 sm:p-7 flex flex-col flex-1">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">{proj.companyOrContext}</span>
                <span className="ml-2">{proj.period}</span>
              </p>

              <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-heading">
                {proj.title}
              </h3>

              <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                {proj.outcome}
              </p>

              {proj.myRole && (
                <p className="mt-3 text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">My role:</span> {proj.myRole}
                </p>
              )}

              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {proj.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-lg bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-800 border border-pink-200/60"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playChime('open');
                    onSelectProject(proj);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-pink-700 ${focusRing}`}
                >
                  <span>See details</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-full border border-pink-300 bg-white px-4 py-2 text-sm font-semibold text-pink-800 transition-colors hover:bg-pink-50 ${focusRing}`}
                  >
                    <span>Live demo</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}

                {proj.githubUrl ? (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-full border border-pink-300 bg-white px-4 py-2 text-sm font-semibold text-pink-800 transition-colors hover:bg-pink-50 ${focusRing}`}
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    <span>Code</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    Code not public
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
