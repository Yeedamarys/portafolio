import React from 'react';
import { Globe, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';
import { LANGUAGES } from '../data/portfolioData';
import headphonesImg from '../assets/images/pink_headphones_3d_1789438033155.jpg';

export const LanguagesCard: React.FC = () => {
  return (
    <div className="glass-panel relative rounded-3xl p-6 sm:p-7 shadow-lg border border-pink-200/90 h-full flex flex-col justify-between overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-36 w-36 rounded-full bg-pink-200/30 blur-2xl"></div>

      <div>
        {/* Header matching mockup */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100/80 text-pink-600 shadow-sm">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 font-heading">
              Languages
            </h2>
            <p className="text-xs text-pink-600 font-medium">Global Communication</p>
          </div>
        </div>

        {/* Languages List */}
        <div className="space-y-4 mb-6">
          {LANGUAGES.map((lang) => (
            <div key={lang.language} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-pink-500" />
                  {lang.language}
                </span>
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100">
                  {lang.level}
                </span>
              </div>
              
              {/* Progress bar matching mockup */}
              <div className="w-full bg-pink-100/70 h-2.5 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 h-full rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${lang.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Headphones Asset Display matching Mockup 4 */}
      <div className="relative mt-2 rounded-2xl overflow-hidden border border-pink-200/80 bg-gradient-to-b from-white to-pink-50 p-2 shadow-inner group">
        <div className="relative aspect-square max-w-[200px] mx-auto overflow-hidden rounded-xl">
          <img
            src={headphonesImg}
            alt="3D Pink Headphones - Deep Work & Communication"
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-2 left-2 right-2 glass-pill px-2.5 py-1 rounded-xl text-center text-[10px] font-bold text-slate-700 shadow-sm border border-white/90">
            <span className="text-pink-600">Focus</span> • Deep Work & Collaboration
          </div>
        </div>
      </div>

    </div>
  );
};
