import React, { useEffect, useState } from 'react';
import { Download, Menu, Volume2, VolumeX, X } from 'lucide-react';
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
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundFx.enabled = next;
    if (next) soundFx.playChime('click');
  };

  return (
    <header className="sticky top-0 z-50 mx-auto max-w-[1320px] px-4 pt-3 sm:px-6">
      <div className="glass flex items-center justify-between gap-3 rounded-2xl px-3 py-2 sm:px-4">
        <a href="#inicio" className="flex items-center gap-2.5 rounded-xl">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-neon/50 font-display text-sm font-semibold text-neon-soft">
            {SHARED.initials}
          </span>
          <span className="hidden font-semibold text-ink sm:block">{SHARED.name}</span>
        </a>

        <nav aria-label={nav.label} className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm text-ink-soft transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              {item.label}
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
            className={`grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/[0.08] ${
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
            className="inline-flex items-center gap-1.5 rounded-full bg-neon px-3.5 py-2 text-xs font-bold text-night transition-colors hover:bg-neon-soft"
          >
            {t.ui.cv.button}
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-white/[0.08] md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label={nav.label} className="glass mt-2 rounded-2xl p-2 md:hidden">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 font-semibold text-ink-soft hover:bg-white/[0.06] hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
