import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CONTENT } from '../data/portfolioData';
import { Content, Lang } from '../types';

const STORAGE_KEY = 'portfolio-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    // Storage can be blocked (private mode); fall back to the browser language.
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisting is fine; the choice still applies for this visit.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = CONTENT[lang].meta.title;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: CONTENT[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider');
  return ctx;
}

/** Replaces {key} placeholders in a UI string. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}
