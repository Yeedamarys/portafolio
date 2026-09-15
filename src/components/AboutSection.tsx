import React from 'react';
import { User, Sparkles, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-mi" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* About Me Card */}
        <div className="glass-panel relative rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-pink-200/90 overflow-hidden max-w-4xl mx-auto">
          
          {/* Subtle background decorative shapes */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-pink-100/50 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header Row: Icon + "Sobre mí" + ✨💖 */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100/80 text-pink-600 shadow-sm">
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                Sobre mí
              </h2>
            </div>
            
            {/* Sparkles / Heart Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/70 text-pink-500 shadow-sm">
              <Sparkles className="h-4 w-4" />
              <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
            </div>
          </div>

          {/* Body Text */}
          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mb-8">
            <p>
              Desarrolladora Full Stack con experiencia entregando módulos administrativos y sitios web en producción, integrando arquitecturas limpias, autenticación, y servicios en la nube (Cloudinary).
            </p>
            <p>
              He trabajado en la personalización de plataformas ERP (Odoo), el desarrollo de paneles administrativos en tiempo real y la implementación de facturación electrónica conectada al SRI.
            </p>
          </div>

          {/* Highlight Callout Box matching Mockup 2 & 4 */}
          <div className="rounded-2xl bg-gradient-to-r from-pink-50/90 via-rose-50/70 to-pink-50/90 p-5 sm:p-6 border border-pink-200 shadow-sm mb-8">
            <p className="text-pink-900 font-medium text-sm sm:text-base leading-relaxed">
              {PERSONAL_INFO.jobObjective}
            </p>
          </div>

          {/* Footer Signature Row matching mockup */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-pink-100/80">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Firma Profesional
            </span>

            {/* Handwritten Signature */}
            <div className="flex items-center gap-2 select-none group cursor-default">
              <span className="font-signature text-3xl sm:text-4xl text-pink-600 tracking-wide transform -rotate-2 group-hover:scale-105 transition-transform">
                Damarys León
              </span>
              <div className="flex items-center gap-0.5 text-pink-500">
                <Heart className="h-4 w-4 fill-pink-500 animate-pulse" />
                <Heart className="h-3 w-3 fill-rose-400" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
