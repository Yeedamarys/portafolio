import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Download, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { motionTokens, springs } from '../lib/motion';
import { SHARED } from '../data/portfolioData';
import { useI18n } from '../i18n/LanguageContext';
import { Lang } from '../types';
import { soundFx } from '../utils/audioChimes';

interface HeaderProps {
  onOpenCv: (origin: DOMRect) => void;
}

const LANGS: { code: Lang; name: string }[] = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenCv }) => {
  const { t, lang, setLang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const nav = t.ui.nav;
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = ['proyectos', 'experiencia', 'habilidades', 'sobre-mi', 'contacto'];
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
        else visible.delete(entry.target.id);
      }
      const active = [...visible].sort((a, b) => b[1] - a[1])[0];
      setActiveSection(active ? '#' + active[0] : '');
    }, { rootMargin: '-90px 0px -30% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach(id => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  const items = [
    // Same order as the tiles on the page
    { label: nav.projects, href: '#proyectos' },
    { label: nav.experience, href: '#experiencia' },
    { label: nav.skills, href: '#habilidades' },
    { label: nav.about, href: '#sobre-mi' },
    { label: nav.contact, href: '#contacto' },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    desktop.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundFx.enabled = next;
    if (next) soundFx.playChime('click');
  };

  return (
    <motion.header initial={{ opacity: 0, y: reduce ? 0 : -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0.12 : 0.5, ease: motionTokens.easing.smooth }} ref={headerRef} className="sticky top-0 z-50 mx-auto max-w-[1320px] px-4 pt-3 sm:px-6">
      <div className="glass navbar-surface flex items-center justify-between gap-2 rounded-2xl px-2 py-2 sm:px-4">
        <a href="#inicio" className="flex items-center gap-2.5 rounded-xl">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-neon/50 font-display text-sm font-semibold text-neon-soft">
            {SHARED.initials}
          </span>
          <span className="hidden font-semibold text-ink sm:block">{SHARED.name}</span>
        </a>

        <nav aria-label={nav.label} className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.href ? 'location' : undefined}
              className="nav-link relative whitespace-nowrap rounded-xl px-2 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink aria-[current=location]:text-neon-soft xl:px-3"
            >
              {activeSection === item.href && <motion.span layoutId="desktop-nav-active" className="nav-active absolute inset-0 rounded-xl" aria-hidden="true" transition={reduce ? { duration: 0 } : springs.snappy} />}
              <span className="relative">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div role="group" aria-label={t.ui.lang.label} className="flex rounded-full border border-chrome/25 p-0.5">
            {LANGS.map(({ code, name }) => (
              <button
                key={code}
                type="button"
                lang={code}
                aria-label={name}
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
                className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
                  lang === code ? 'bg-chrome text-night' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={t.ui.sound.label}
            aria-pressed={soundOn}
            className={`hidden h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/[0.08] sm:grid ${
              soundOn ? 'text-neon-soft' : 'text-ink-muted'
            }`}
          >
            {soundOn ? <Volume2 className="h-4 w-4" aria-hidden="true" /> : <VolumeX className="h-4 w-4" aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={(e) => {
              soundFx.playChime('open');
              onOpenCv(e.currentTarget.getBoundingClientRect());
            }}
            className="portfolio-button button-primary inline-flex items-center gap-1.5 rounded-full bg-neon px-3.5 py-2 text-xs font-bold text-night transition-colors hover:bg-neon-soft"
          >
            {t.ui.cv.button}
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            ref={menuButtonRef}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-white/[0.08] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
      {menuOpen && (
        <motion.nav id="mobile-menu" aria-label={nav.label}
          initial="closed" animate="open" exit="closed"
          variants={{
            closed: { opacity: 0, y: reduce ? 0 : -10, scale: reduce ? 1 : 0.98,
              transition: { duration: 0.15, when: 'afterChildren' } },
            open: { opacity: 1, y: 0, scale: 1,
              transition: { duration: reduce ? 0.1 : 0.22, ease: motionTokens.easing.smooth,
                staggerChildren: reduce ? 0 : 0.045, delayChildren: reduce ? 0 : 0.04 } },
          }}
          className="glass mobile-nav mt-3 origin-top-right rounded-2xl p-2 lg:hidden">
          {items.map((item) => (
            <motion.a key={item.href} href={item.href}
              aria-current={activeSection === item.href ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
              variants={{ closed: { opacity: 0, x: reduce ? 0 : -12 }, open: { opacity: 1, x: 0 } }}
              transition={{ duration: reduce ? 0 : 0.18 }}
              className="flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 font-semibold text-ink-soft transition-colors hover:bg-white/[0.06] hover:text-ink aria-[current=location]:bg-neon/10 aria-[current=location]:text-neon-soft">
              {item.label}<ChevronRight className="h-4 w-4 text-neon-soft" aria-hidden="true" />
            </motion.a>
          ))}
        </motion.nav>
      )}
      </AnimatePresence>
    </motion.header>
  );
};
