import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, ExternalLink, Download, Check, Sparkles, Code, Terminal, Bot } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audioChimes';
import heroDeveloperImg from '../assets/images/hero_developer_3d_1789438002404.jpg';

interface HeroSectionProps {
  onOpenCv: () => void;
  onViewProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCv, onViewProjects }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);

  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    setTiltStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  const copyEmail = () => {
    soundFx.playChime('click');
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="inicio" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Responsive 1 col on mobile, 2 cols on lg desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Profile Card matching Mockup 1 & 4 */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div
              ref={cardRef}
              className="glass-panel relative rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xl border border-pink-200/90 overflow-hidden transition-all duration-300 hover:border-pink-300"
              id="hero-profile-card"
            >
              {/* Background 3D Code Watermark matching mockup */}
              <div className="pointer-events-none absolute -right-6 -bottom-6 text-pink-200/35 select-none font-mono text-9xl font-black rotate-[-12deg]">
                &lt;/&gt;
              </div>

              {/* Avatar Row + Status Badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                {/* DL Monogram Avatar Badge */}
                <div className="relative group">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border-2 border-pink-400 bg-gradient-to-br from-white to-pink-50/70 p-1 shadow-md shadow-pink-200 transition-transform group-hover:scale-105">
                    <span className="font-extrabold tracking-tight text-pink-600 text-2xl sm:text-3xl font-heading">
                      {PERSONAL_INFO.initials}
                    </span>
                  </div>
                  {/* Status Indicator Dot */}
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                  </span>
                </div>

                {/* Pill: Available for work */}
                <div className="glass-pill flex items-center gap-2 rounded-full px-3.5 py-1.5 shadow-sm border border-pink-200/80">
                  <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
                  <span className="text-xs sm:text-sm font-semibold text-pink-900/90 whitespace-nowrap">
                    {PERSONAL_INFO.status}
                  </span>
                </div>
              </div>

              {/* Greeting */}
              <div className="mb-2">
                <span className="text-sm sm:text-base font-semibold text-pink-600 tracking-wide flex items-center gap-1.5">
                  Hello, I'm <span className="inline-block animate-wave origin-bottom-right">👋</span>
                </span>
              </div>

              {/* Main Heading: Damarys León */}
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-slate-900 mb-2 leading-tight">
                Damarys <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">León</span>
              </h1>

              {/* Subheading: FULL STACK DEVELOPER */}
              <h2 className="text-xs sm:text-sm font-bold tracking-wider text-pink-600 uppercase mb-4">
                {PERSONAL_INFO.title}
              </h2>

              {/* Catchphrase */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {PERSONAL_INFO.tagline}
              </p>

              {/* Contact Info List */}
              <div className="space-y-3 mb-8 text-xs sm:text-sm">
                {/* Location */}
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100/70 text-pink-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{PERSONAL_INFO.location}</span>
                </div>

                {/* Phone */}
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  onClick={() => soundFx.playChime('click')}
                  className="flex items-center gap-3 text-slate-700 hover:text-pink-600 transition-colors group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100/70 text-pink-600 group-hover:bg-pink-200">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-medium group-hover:underline">{PERSONAL_INFO.phone}</span>
                </a>

                {/* Email with instant copy */}
                <div className="flex items-center justify-between gap-3 text-slate-700">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    onClick={() => soundFx.playChime('click')}
                    className="flex items-center gap-3 hover:text-pink-600 transition-colors group truncate"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100/70 text-pink-600 group-hover:bg-pink-200">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="font-medium truncate group-hover:underline">{PERSONAL_INFO.email}</span>
                  </a>

                  <button
                    onClick={copyEmail}
                    title="Copy email"
                    className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100 transition-all border border-pink-200/60"
                  >
                    {copiedEmail ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold">
                        <Check className="h-3 w-3" /> Copied
                      </span>
                    ) : (
                      'Copy'
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons matching mockup */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 pt-2">
                {/* View Projects */}
                <button
                  onClick={() => {
                    soundFx.playChime('click');
                    onViewProjects();
                  }}
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-pink-300 transition-all hover:from-pink-600 hover:to-rose-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  id="hero-projects-btn"
                >
                  <span>View Projects</span>
                  <ExternalLink className="h-4 w-4" />
                </button>

                {/* Download CV */}
                <button
                  onClick={() => {
                    soundFx.playChime('open');
                    onOpenCv();
                  }}
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 rounded-full border border-pink-300 bg-white/95 px-5 py-3 text-sm font-semibold text-pink-700 shadow-sm transition-all hover:bg-pink-50 hover:border-pink-400 hover:scale-[1.02] active:scale-[0.98]"
                  id="hero-cv-btn"
                >
                  <Download className="h-4 w-4 text-pink-500" />
                  <span>Download CV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Surreal 3D Composition matching Mockup 4 */}
          <div
            className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={visualRef}
              style={{
                transform: `rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-lg lg:max-w-none transform-style-3d group cursor-pointer"
            >
              {/* Surreal Ambient Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-300/40 via-rose-200/30 to-purple-300/30 blur-2xl -z-10 group-hover:opacity-100 transition-opacity"></div>

              {/* Central 3D Render Image */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-b from-white to-pink-50/50 shadow-2xl shadow-pink-200/60">
                <img
                  src={heroDeveloperImg}
                  alt="Damarys León - 3D Full Stack Developer Visual"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Floating 3D Badges & Surreal Overlays */}
                
                {/* 1. JS Glass Badge */}
                <div className="absolute top-5 right-5 glass-pill px-3.5 py-1.5 rounded-2xl shadow-lg border border-white/80 flex items-center gap-2 animate-bounce duration-1000">
                  <span className="h-6 w-6 rounded-lg bg-yellow-400/90 text-slate-900 font-extrabold text-xs flex items-center justify-center shadow-inner">
                    JS
                  </span>
                  <span className="text-xs font-bold text-slate-800">TypeScript & Node</span>
                </div>

                {/* 2. Floating Robot / Coffee Cup Badge */}
                <div className="absolute bottom-5 left-5 glass-pill px-3.5 py-2 rounded-2xl shadow-lg border border-pink-200/90 flex items-center gap-2.5 max-w-[220px]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-500 text-white shadow-sm shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-pink-600 leading-tight">Big dreams, Better code</p>
                    <p className="text-[10px] text-slate-500">Full Stack & Solutions</p>
                  </div>
                </div>

                {/* 3. Glowing Code Watermark */}
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 glass-pill p-2 rounded-xl border border-pink-300 shadow-md">
                  <Code className="h-5 w-5 text-pink-500" />
                </div>

                {/* 4. Real-time indicator */}
                <div className="absolute bottom-5 right-5 hidden sm:flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 border border-white/80">
                  <Sparkles className="h-3.5 w-3.5 text-pink-500" />
                  <span>SRI • Cloudinary • Odoo</span>
                </div>
              </div>

              {/* Floating Orbiting Spheres effect */}
              <div className="hidden lg:block absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 opacity-80 blur-[1px] shadow-lg animate-pulse"></div>
              <div className="hidden lg:block absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-tr from-fuchsia-300 to-pink-200 opacity-70 blur-[2px] shadow-lg"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
