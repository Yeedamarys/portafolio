import React from 'react';
import { Github, Linkedin, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audioChimes';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-pink-200/80 bg-white/60 backdrop-blur-md py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row matching Mockup 4 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand DL */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-pink-400 bg-white shadow-sm">
              <span className="font-extrabold text-pink-600 text-base">DL</span>
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">{PERSONAL_INFO.name}</p>
              <p className="text-xs text-pink-500 font-semibold uppercase">{PERSONAL_INFO.title}</p>
            </div>
          </div>

          {/* Social Icons matching Mockup 4 */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playChime('hover')}
              aria-label="GitHub de Damarys León"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-slate-700 hover:bg-pink-100 hover:text-pink-600 transition-all"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playChime('hover')}
              aria-label="LinkedIn de Damarys León"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-slate-700 hover:bg-pink-100 hover:text-pink-600 transition-all"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playChime('hover')}
              aria-label="Instagram de Damarys León"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-slate-700 hover:bg-pink-100 hover:text-pink-600 transition-all"
            >
              <Instagram className="h-4 w-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={() => soundFx.playChime('hover')}
              aria-label="Enviar correo"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-slate-700 hover:bg-pink-100 hover:text-pink-600 transition-all"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Location & Contact */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-pink-500" />
              {PERSONAL_INFO.location}
            </span>
            <span className="hidden sm:inline text-pink-300">•</span>
            <span>{PERSONAL_INFO.phone}</span>
            <span className="hidden sm:inline text-pink-300">•</span>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-pink-600">
              {PERSONAL_INFO.email}
            </a>
          </div>

        </div>

        {/* Bottom subtle note */}
        <div className="mt-6 pt-4 border-t border-pink-100/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Damarys León. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="h-3 w-3 fill-pink-500 text-pink-500" /> React, Node.js, Express, TypeScript & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
};
