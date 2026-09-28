import React, { useState } from 'react';
import { Download, Code2, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audioChimes';

interface HeaderProps {
  onOpenCv: () => void;
  onOpenCodeDetails?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCv, onOpenCodeDetails }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    soundFx.enabled = next;
    if (next) soundFx.playChime('click');
  };

  const navItems = [
    { label: 'Home', href: '#inicio' },
    { label: 'About Me', href: '#sobre-mi' },
    { label: 'Experience', href: '#experiencia' },
    { label: 'Skills', href: '#habilidades' },
    { label: 'Projects', href: '#proyectos' },
    { label: 'Education', href: '#educacion' },
    { label: 'Contact', href: '#contacto' },
  ];

  const handleNavClick = (href: string) => {
    soundFx.playChime('hover');
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <div className="glass-panel flex items-center justify-between rounded-2xl px-4 py-2.5 shadow-sm border border-pink-100/80">
          
          {/* Logo Brand matching mockup */}
          <a
            href="#inicio"
            onClick={() => soundFx.playChime('hover')}
            className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            id="header-logo"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-pink-400 bg-white/95 shadow-sm shadow-pink-200 transition-all group-hover:border-pink-500 group-hover:shadow-md">
              <span className="font-extrabold tracking-tight text-pink-600 text-base">DL</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-800 text-sm sm:text-base tracking-tight">
                  {PERSONAL_INFO.name}
                </span>
                <span className="hidden xs:inline-block h-1.5 w-1.5 rounded-full bg-pink-500 animate-ping"></span>
              </div>
              <span className="text-[11px] font-semibold tracking-wider text-pink-500 uppercase">
                {PERSONAL_INFO.shortRole}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="rounded-lg px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-600 transition-colors hover:text-pink-600 hover:bg-pink-50/70"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundActive ? 'Mute sound effects' : 'Enable sound effects'}
              className={`rounded-full p-2 text-slate-500 transition-all hover:bg-pink-100/60 ${
                soundActive ? 'bg-pink-100 text-pink-600 shadow-inner' : ''
              }`}
              id="header-sound-btn"
            >
              {soundActive ? <Volume2 className="h-4 w-4 text-pink-600" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Code button */}
            <button
              onClick={() => {
                soundFx.playChime('click');
                if (onOpenCodeDetails) onOpenCodeDetails();
                else handleNavClick('#habilidades');
              }}
              title="View Tech Stack"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-pink-200 bg-white/90 text-slate-600 transition-transform hover:scale-105 hover:border-pink-400 hover:text-pink-600"
              id="header-code-btn"
            >
              <Code2 className="h-4 w-4" />
            </button>

            {/* Download CV Pill Button matching mockup */}
            <button
              onClick={() => {
                soundFx.playChime('open');
                onOpenCv();
              }}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-pink-300 transition-all hover:from-pink-600 hover:to-rose-600 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              id="header-cv-btn"
            >
              <span>CV</span>
              <Download className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-1.5 text-slate-700 hover:bg-pink-50"
              aria-label="Open menu"
              id="header-mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-4 mt-2 rounded-2xl glass-panel p-4 shadow-xl border border-pink-200/80 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-pink-50 hover:text-pink-600"
              >
                <span>{item.label}</span>
                <Sparkles className="h-3.5 w-3.5 text-pink-300" />
              </button>
            ))}
            <div className="pt-2 border-t border-pink-100 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCv();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-2.5 text-sm font-semibold text-white shadow-sm"
              >
                <Download className="h-4 w-4" />
                <span>Download Full CV</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
