import React from 'react';
import { GraduationCap, Award, BookOpen, Heart, Sparkles } from 'lucide-react';
import { EDUCATION, PERSONAL_INFO } from '../data/portfolioData';
import saturnBannerImg from '../assets/images/surreal_saturn_3d_1789438052194.jpg';

export const EducationSection: React.FC = () => {
  return (
    <section id="educacion" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Education Card matching Mockup 4 */}
          <div className="lg:col-span-5">
            <div className="glass-panel relative rounded-3xl p-6 sm:p-8 shadow-lg border border-pink-200/90 h-full flex flex-col justify-between">
              
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100/80 text-pink-600 shadow-sm">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                      Educación
                    </h2>
                    <p className="text-xs text-pink-600 font-medium">Formación Universitaria</p>
                  </div>
                </div>

                {/* Institution Card matching mockup */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 border border-pink-100/90 shadow-sm mb-4">
                  {/* ESPE Badge / Emblem */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 border-2 border-emerald-500/30 p-1 shadow-sm text-emerald-800 font-bold text-center">
                    <div className="flex flex-col items-center justify-center leading-none">
                      <span className="text-[10px] tracking-tight uppercase font-extrabold text-emerald-700">ESPE</span>
                      <GraduationCap className="h-4 w-4 text-emerald-600 my-0.5" />
                      <span className="text-[8px] text-emerald-600">Univ.</span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                      {EDUCATION.degree}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700">
                      {EDUCATION.institution}
                    </p>
                    <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-200/80 text-[11px] font-bold text-pink-600">
                      <Sparkles className="h-3 w-3" />
                      <span>{EDUCATION.period} ({EDUCATION.currentLevel})</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-1">
                  {EDUCATION.description}
                </p>
              </div>

              {/* Status footer pill */}
              <div className="mt-6 pt-4 border-t border-pink-100/80 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Universidad de Excelencia</span>
                <span className="text-pink-600 font-bold">8vo Nivel En Curso</span>
              </div>

            </div>
          </div>

          {/* Right Column: Surrealist Banner matching Mockup 4 */}
          <div className="lg:col-span-7">
            <div className="glass-panel relative rounded-3xl overflow-hidden border border-pink-200/90 shadow-lg h-full min-h-[220px] flex items-center group">
              
              {/* Background Image: 3D Saturn render */}
              <img
                src={saturnBannerImg}
                alt="Surrealist 3D Cosmic Saturn Banner"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Soft overlay gradient for high contrast readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-900/40 via-pink-700/20 to-purple-900/30 backdrop-blur-[1px]"></div>

              {/* Surreal Quote Typography matching Mockup 4 */}
              <div className="relative z-10 p-6 sm:p-10 max-w-xl">
                <div className="glass-panel/60 p-6 sm:p-8 rounded-2xl backdrop-blur-md border border-white/60 shadow-xl bg-white/75">
                  <p className="font-signature text-2xl sm:text-3xl md:text-4xl text-pink-700 leading-relaxed drop-shadow-sm">
                    &ldquo;{PERSONAL_INFO.quote}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-pink-500 text-pink-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Filosofía & Vocación Tecnológica
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
