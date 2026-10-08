import React, { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { Background } from './components/ui';
import {
  AboutTile,
  ContactTile,
  EducationTile,
  ExperienceTile,
  IdentityTile,
  LanguagesTile,
  MonogramTile,
  ProjectsTile,
  SkillsTile,
} from './components/tiles';
import { ContactDialog, CvDialog, ExperienceDialog, ProjectDialog } from './components/dialogs';
import { SHARED } from './data/portfolioData';
import { LanguageProvider, useI18n } from './i18n/LanguageContext';
import { soundFx } from './utils/audioChimes';

type DialogType = 'project' | 'experience' | 'contact' | 'cv' | null;

const Portfolio: React.FC = () => {
  const { t } = useI18n();
  const [dialog, setDialog] = useState<DialogType>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  // Kept outside `dialog` so a closing dialog keeps its content during the exit animation.
  const [projectIndex, setProjectIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [contactSubject, setContactSubject] = useState('');

  const open = (type: Exclude<DialogType, null>, from: DOMRect | null = null) => {
    soundFx.playChime('open');
    setOrigin(from);
    setDialog(type);
  };
  const close = useCallback(() => setDialog(null), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-neon focus:px-4 focus:py-2 focus:font-semibold focus:text-night"
      >
        {t.ui.skip}
      </a>
      <Background />
      <Header onOpenCv={(from) => open('cv', from)} />

      {/* Each tile reveals on entering the viewport. */}
      <main
        id="main"
        className="mx-auto grid max-w-[1320px] grid-cols-1 gap-5 px-4 pb-12 pt-6 sm:px-6 lg:grid-cols-12 lg:gap-6"
      >
        <IdentityTile
          onOpenCv={(from) => open('cv', from)}
          onOpenContact={(from) => {
            setContactSubject('');
            open('contact', from);
          }}
        />
        {/* DOM order is the desktop order; on mobile, order-* classes move the monogram below the projects */}
        <MonogramTile />
        <ProjectsTile
          onOpenProject={(index, from) => {
            setProjectIndex(index);
            open('project', from);
          }}
        />
        {/* Stacked columns keep each row's two sides close in height; the last tile in a column fills it */}
        <div className="order-4 flex flex-col gap-5 lg:order-none lg:col-span-4 lg:gap-6 [&>*:last-child]:flex-1">
          {/* Languages first so "English B2" is visible in the first viewport */}
          <LanguagesTile />
          <EducationTile />
        </div>
        <div className="order-5 flex flex-col gap-5 lg:order-none lg:col-span-5 lg:gap-6 [&>*:last-child]:flex-1">
          <ExperienceTile
            onOpenExperience={(index, from) => {
              setExperienceIndex(index);
              open('experience', from);
            }}
          />
          <SkillsTile />
        </div>
        <div className="order-6 flex flex-col gap-5 lg:order-none lg:col-span-7 lg:gap-6 [&>*:last-child]:flex-1">
          <AboutTile />
          <ContactTile
            onOpenContact={(from) => {
              setContactSubject('');
              open('contact', from);
            }}
          />
        </div>
      </main>

      <footer className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-2 px-4 pb-8 text-sm text-ink-muted sm:px-6">
        <p>
          © {new Date().getFullYear()} {SHARED.name}. {t.ui.footer.rights}
        </p>
        <p>{t.ui.footer.built}</p>
      </footer>

      <ProjectDialog
        open={dialog === 'project'}
        onClose={close}
        origin={origin}
        index={projectIndex}
        onIndexChange={setProjectIndex}
        onAsk={(title) => {
          setContactSubject(title);
          setOrigin(null);
          setDialog('contact');
        }}
      />
      <ExperienceDialog open={dialog === 'experience'} onClose={close} origin={origin} index={experienceIndex} />
      <ContactDialog open={dialog === 'contact'} onClose={close} origin={origin} initialSubject={contactSubject} />
      <CvDialog open={dialog === 'cv'} onClose={close} origin={origin} />
    </>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
    </MotionConfig>
  );
}
