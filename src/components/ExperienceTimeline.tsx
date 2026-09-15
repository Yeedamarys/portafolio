import React from 'react';
import { Briefcase, Calendar, Building2, CheckCircle, Sparkles } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { soundFx } from '../utils/audioChimes';

export const ExperienceTimeline: React.FC = () => {
  return (
    <div className="glass-panel relative rounded-3xl p-6 sm:p-8 lg:p-9 shadow-lg border border-pink-200/90 h-full">
      
      {/* Header matching mockup */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100/80 text-pink-600 shadow-sm">
          <Briefcase className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
            Experiencia Profesional
          </h2>
          <p className="text-xs text-pink-600 font-medium">Trayectoria & Entregas en Producción</p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-pink-500 before:via-rose-400 before:to-pink-200">
        
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.id}
            onMouseEnter={() => soundFx.playChime('hover')}
            className="group relative transition-all duration-300"
          >
            {/* Timeline Dot Marker matching mockup */}
            <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 flex h-5 w-5 items-center justify-center">
              <span className="h-3 w-3 rounded-full bg-pink-500 ring-4 ring-white shadow-sm transition-transform group-hover:scale-125 group-hover:bg-rose-600"></span>
            </div>

            {/* Date Tag */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-pink-600 uppercase tracking-wider bg-pink-50/90 px-2.5 py-0.5 rounded-full border border-pink-200/60">
                {exp.period}
              </span>
            </div>

            {/* Company & Role */}
            <div className="mb-2.5">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{exp.company}</span>
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-pink-600">
                {exp.role}
              </p>
            </div>

            {/* Bullet Points with pink arrows matching mockup */}
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-pink-500 font-bold shrink-0 mt-0.5">▶</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

    </div>
  );
};
