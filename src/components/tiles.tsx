import React, { Suspense, lazy, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import { SHARED, whatsappUrl } from '../data/portfolioData';
import { useI18n } from '../i18n/LanguageContext';
import { motionTokens, springs } from '../lib/motion';
import { MONOGRAM_SVG } from '../lib/monogram';
import { soundFx } from '../utils/audioChimes';
import { Tile, btnPrimary, btnSecondary, chip, useCoarsePointer, useReduce } from './ui';

const Monogram3D = lazy(() => import('./Monogram3D'));

const headingClass = 'font-display text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl';

/* ---------- Identity ---------- */

interface IdentityTileProps {
  onOpenCv: (origin: DOMRect) => void;
  onOpenContact: (origin: DOMRect) => void;
}

export const IdentityTile: React.FC<IdentityTileProps> = ({ onOpenCv, onOpenContact }) => {
  const { t } = useI18n();
  const p = t.personal;

  return (
    <Tile id="inicio" labelledBy="identity-name" lit className="order-1 rounded-[32px] p-6 sm:p-9 lg:order-none lg:col-span-7">
      <h1
        id="identity-name"
        className="font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-ink"
      >
        {SHARED.firstName}
        <br />
        <span className="text-neon">{SHARED.lastName}</span>
      </h1>

      <p className="mt-5 font-display text-base font-medium text-chrome sm:text-lg">{p.title}</p>
      <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-ink-soft sm:text-lg">{p.offer}</p>

      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-2 font-medium text-ink">
          <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
          {p.status}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-neon-soft" aria-hidden="true" />
          {p.location}
        </span>
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a href="#proyectos" className={btnPrimary}>
          {t.ui.hero.seeProjects}
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>
        <button
          type="button"
          className={btnSecondary}
          onClick={(e) => onOpenCv(e.currentTarget.getBoundingClientRect())}
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          {t.ui.cv.open}
        </button>
        {/* No horizontal padding so it lines up with the content edge when it wraps */}
        <button
          type="button"
          className="inline-flex items-center gap-2 py-3 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
          onClick={(e) => onOpenContact(e.currentTarget.getBoundingClientRect())}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {t.ui.hero.writeMe}
        </button>
      </div>
    </Tile>
  );
};

/* ---------- 3D monogram ---------- */

function canRun3D(): boolean {
  try {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return false;
    if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) return false;
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Glass-like SVG version: shown while three.js loads, and permanently with reduced motion or no WebGL. */
const MonogramStatic: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  const id = useId();
  const body = `${id}-body`;
  const sheen = `${id}-sheen`;
  return (
    <svg
      viewBox={MONOGRAM_SVG.viewBox}
      aria-hidden="true"
      className={`absolute left-1/2 top-1/2 w-[58%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)] transition-opacity duration-700 ${hidden ? 'opacity-0' : 'opacity-100'}`}
    >
      <defs>
        {/* Translucent pink body, denser at the bottom like thick glass */}
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8fcb" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff4fae" stopOpacity="0.85" />
        </linearGradient>
        {/* Chrome specular sweep across the top-left */}
        <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="0.8">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="30%" stopColor="#d9d4e0" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[MONOGRAM_SVG.d, MONOGRAM_SVG.l].map((d) => (
        <g key={d}>
          <path d={d} fill={`url(#${body})`} fillRule="evenodd" />
          <path d={d} fill={`url(#${sheen})`} fillRule="evenodd" />
          <path d={d} fill="none" fillRule="evenodd" stroke="#ffd1ea" strokeOpacity="0.9" strokeWidth="0.025" />
        </g>
      ))}
    </svg>
  );
};

export const MonogramTile: React.FC = () => {
  const { t } = useI18n();
  const reduce = useReduce();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [load3D, setLoad3D] = useState(false);
  const [ready, setReady] = useState(false);

  // Load three.js only after the page is idle and the tile is on screen, and only on capable devices.
  useEffect(() => {
    if (reduce || !canRun3D()) return;
    const el = hostRef.current;
    if (!el) return;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = () => setLoad3D(true);
      if (typeof window.requestIdleCallback === 'function') idleHandle = window.requestIdleCallback(start, { timeout: 1500 });
      else timeoutHandle = window.setTimeout(start, 400);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, [reduce]);

  const show3D = load3D && !reduce;

  return (
    <Tile as="div" tilt={false} lit className="order-3 overflow-hidden rounded-[32px] lg:order-none lg:col-span-5" innerClassName="h-full">
      <div
        ref={hostRef}
        role="img"
        aria-label={t.ui.monogram.label}
        className="relative h-56 sm:h-72 lg:h-full lg:min-h-[320px]"
      >
        <MonogramStatic hidden={show3D && ready} />
        {show3D && (
          <Suspense fallback={null}>
            <Monogram3D onReady={() => setReady(true)} />
          </Suspense>
        )}
      </div>
    </Tile>
  );
};

/* ---------- Projects ---------- */

interface ProjectsTileProps {
  onOpenProject: (index: number, origin: DOMRect) => void;
}

export const ProjectsTile: React.FC<ProjectsTileProps> = ({ onOpenProject }) => {
  const { t } = useI18n();
  const reduce = useReduce();
  const coarse = useCoarsePointer();
  const projects = t.projects;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ui = t.ui.projects;

  const select = (next: number, dir: number, focusTab = false) => {
    const wrapped = (next + projects.length) % projects.length;
    if (wrapped === index) return;
    setDirection(dir);
    setIndex(wrapped);
    if (focusTab) tabRefs.current[wrapped]?.focus();
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(index + 1, 1, true),
      ArrowLeft: () => select(index - 1, -1, true),
      Home: () => select(0, -1, true),
      End: () => select(projects.length - 1, 1, true),
    };
    const action = keys[e.key];
    if (action) {
      e.preventDefault();
      action();
    }
  };

  const project = projects[index];
  const slide = reduce ? 0 : motionTokens.distance.lg;
  const panelVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * slide }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: -dir * slide,
      transition: { duration: motionTokens.duration.fast, ease: motionTokens.easing.sharp },
    }),
  };

  return (
    <Tile
      id="proyectos"
      labelledBy="projects-heading"
      lit
      className="order-2 rounded-[32px] p-6 sm:p-8 lg:order-none lg:col-span-8"
      innerClassName="flex h-full flex-col"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="projects-heading" className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
          {ui.heading}
        </h2>
        <div
          role="tablist"
          aria-label={ui.tabsLabel}
          onKeyDown={onTabKeyDown}
          className="flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-neon/20 bg-black/25 p-1 [scrollbar-width:none] sm:gap-1"
        >
          {projects.map((proj, i) => {
            const selected = i === index;
            return (
              <button
                key={proj.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`project-tab-${proj.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="project-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i, i > index ? 1 : -1)}
                className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition-colors sm:px-3.5 ${
                  selected ? 'text-night' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="project-tab-pill"
                    className="absolute inset-0 rounded-full bg-neon"
                    transition={reduce ? { duration: 0 } : springs.snappy}
                  />
                )}
                <span className="relative">{proj.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="project-panel"
        ref={panelRef}
        role="tabpanel"
        aria-labelledby={`project-tab-${project.id}`}
        className="relative mt-6 flex-1 overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={coarse && !reduce ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              const { offset, velocity } = motionTokens.swipe;
              if (info.offset.x < -offset || info.velocity.x < -velocity) select(index + 1, 1);
              else if (info.offset.x > offset || info.velocity.x > velocity) select(index - 1, -1);
            }}
            className="grid h-full touch-pan-y gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8"
          >
            <div className="flex flex-col">
              <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-muted">
                <span className="font-semibold text-ink-soft">{project.companyOrContext}</span>
                <span className="ml-2 tabular">{project.period}</span>
                <span className="ml-2">{project.category}</span>
              </p>
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-ink-soft">{project.outcome}</p>
              {project.myRole && (
                <p className="mt-3 text-sm text-ink-muted">
                  <span className="font-semibold text-ink-soft">{ui.myRole}:</span> {project.myRole}
                </p>
              )}

              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={ui.technologies}>
                {project.technologies.map((tech) => (
                  <li key={tech} className={chip}>
                    {tech}
                  </li>
                ))}
              </ul>

              {/* Pinned to the bottom so a tall row doesn't leave an empty band under the actions */}
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                <button
                  type="button"
                  className={btnPrimary}
                  onClick={() => {
                    if (panelRef.current) onOpenProject(index, panelRef.current.getBoundingClientRect());
                  }}
                >
                  {ui.details}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                    {ui.live}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                    <Github className="h-4 w-4" aria-hidden="true" />
                    {ui.code}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    {ui.codePrivate}
                  </span>
                )}
              </div>
            </div>

            {project.image ? (
              <img
                src={project.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="max-h-80 w-full rounded-2xl border border-neon/20 object-cover object-top"
              />
            ) : (
              // A column of the same tile, separated by a hairline rather than boxed into a second card
              <div className="border-t border-white/[0.08] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-sm font-semibold text-chrome">{ui.highlights}</p>
                <ul className="mt-3 space-y-3">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {coarse && <p className="mt-4 text-xs text-ink-muted">{ui.swipeHint}</p>}
    </Tile>
  );
};

/* ---------- Skills ---------- */

export const SkillsTile: React.FC = () => {
  const { t } = useI18n();
  return (
    <Tile id="habilidades" labelledBy="skills-heading" className="rounded-[24px] p-6">
      <h2 id="skills-heading" className={headingClass}>
        {t.ui.skills.heading}
      </h2>
      <dl className="mt-4 grid items-start gap-x-6 gap-y-3 sm:grid-cols-2">
        {t.skills.map((skill) => (
          // Category beside the name on phones; above it in the two-column layout, where width is tight
          <div key={skill.id} className="grid grid-cols-[6.5rem_1fr] gap-3 sm:flex sm:flex-col sm:gap-0.5">
            <dt className="pt-0.5 text-xs text-ink-muted sm:pt-0">{skill.category}</dt>
            <dd className="text-sm leading-snug">
              <span className="font-semibold text-ink">{skill.name}</span>
              <span className="block text-ink-muted">{skill.detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Tile>
  );
};

/* ---------- Languages ---------- */

export const LanguagesTile: React.FC = () => {
  const { t } = useI18n();
  return (
    <Tile labelledBy="languages-heading" className="rounded-[24px] p-6">
      <h2 id="languages-heading" className={headingClass}>
        {t.ui.languages.heading}
      </h2>
      <ul className="mt-4 space-y-3">
        {t.languages.map((lang) => (
          <li key={lang.language} className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
            <span className="font-semibold text-ink">{lang.language}</span>
            <span className="text-right text-sm text-neon-soft">{lang.level}</span>
          </li>
        ))}
      </ul>
    </Tile>
  );
};

/* ---------- Experience ---------- */

interface ExperienceTileProps {
  onOpenExperience: (index: number, origin: DOMRect) => void;
}

export const ExperienceTile: React.FC<ExperienceTileProps> = ({ onOpenExperience }) => {
  const { t } = useI18n();
  return (
    <Tile id="experiencia" labelledBy="experience-heading" className="rounded-[28px] p-6 sm:p-7">
      <h2 id="experience-heading" className={headingClass}>
        {t.ui.experience.heading}
      </h2>
      <ol className="mt-4 space-y-1">
        {t.experiences.map((exp, i) => (
          <li key={exp.id}>
            <button
              type="button"
              onClick={(e) => onOpenExperience(i, e.currentTarget.getBoundingClientRect())}
              className="group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-white/[0.05]"
            >
              {/* Date sits above the company on phones, in its own column from sm up */}
              <span className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-4">
                <span className="block text-sm text-neon-soft tabular sm:w-28 sm:shrink-0">{exp.period}</span>
                <span className="block min-w-0">
                  <span className="block font-semibold text-ink">{exp.company}</span>
                  <span className="block text-sm text-ink-muted">{exp.project ?? exp.role}</span>
                </span>
              </span>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
              <span className="sr-only">{t.ui.experience.details}</span>
            </button>
          </li>
        ))}
      </ol>
    </Tile>
  );
};

/* ---------- About ---------- */

export const AboutTile: React.FC = () => {
  const { t } = useI18n();
  const p = t.personal;
  return (
    <Tile id="sobre-mi" labelledBy="about-heading" className="rounded-[28px] p-6 sm:p-7">
      <h2 id="about-heading" className={headingClass}>
        {t.ui.about.heading}
      </h2>
      <p className="mt-4 font-display text-lg leading-snug text-ink sm:text-xl">{p.tagline}</p>
      <div className="mt-4 max-w-[68ch] space-y-3 text-base leading-relaxed text-ink-soft">
        {p.aboutSummary.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="text-neon-soft">{p.jobObjective}</p>
      </div>
      <p className="mt-5 -rotate-2 font-signature text-4xl text-neon">{SHARED.name}</p>
    </Tile>
  );
};

/* ---------- Education ---------- */

export const EducationTile: React.FC = () => {
  const { t } = useI18n();
  const ed = t.education;
  return (
    <Tile id="educacion" labelledBy="education-heading" className="rounded-[28px] p-6 sm:p-7">
      <h2 id="education-heading" className={headingClass}>
        {t.ui.education.heading}
      </h2>
      <p className="mt-4 text-lg font-semibold text-ink">{ed.degree}</p>
      <p className="text-ink-soft">{ed.institution}</p>
      <p className="mt-1 text-sm text-neon-soft">
        <span className="tabular">{ed.period}</span>, {ed.currentLevel}
      </p>
      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ink-muted">{ed.description}</p>
      <blockquote className="mt-5 border-t border-white/[0.08] pt-4 font-display text-base leading-snug text-chrome">
        “{t.personal.quote}”
      </blockquote>
    </Tile>
  );
};

/* ---------- Contact ---------- */

interface ContactTileProps {
  onOpenContact: (origin: DOMRect) => void;
}

export const ContactTile: React.FC<ContactTileProps> = ({ onOpenContact }) => {
  const { t } = useI18n();
  const ui = t.ui.contact;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard
      ?.writeText(SHARED.email)
      .then(() => {
        soundFx.playChime('click');
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      })
      .catch(() => {
        // Clipboard can be blocked; the mailto link next to it still works.
      });
  };

  const linkClass =
    'inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-neon/50 hover:bg-neon/10';

  return (
    <Tile id="contacto" labelledBy="contact-heading" className="rounded-[28px] p-6 sm:p-7">
      <h2 id="contact-heading" className={headingClass}>
        {ui.heading}
      </h2>
      <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-ink-soft">{ui.intro}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          className={btnPrimary}
          onClick={(e) => onOpenContact(e.currentTarget.getBoundingClientRect())}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {ui.form}
        </button>
        <a href={whatsappUrl(t.personal.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <MessageCircle className="h-4 w-4 text-mint" aria-hidden="true" />
          {ui.whatsapp}
        </a>
        <span className="inline-flex max-w-full items-center rounded-full border border-white/[0.1] bg-white/[0.04]">
          <a
            href={`mailto:${SHARED.email}`}
            className="inline-flex min-w-0 items-center gap-2 py-2.5 pl-4 pr-2 text-sm font-semibold text-ink hover:text-neon-soft"
          >
            <Mail className="h-4 w-4 shrink-0 text-neon-soft" aria-hidden="true" />
            <span className="truncate">{SHARED.email}</span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? ui.copied : ui.copy}
            className="mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-white/10 hover:text-ink"
          >
            {copied ? <Check className="h-4 w-4 text-mint" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? ui.copied : ''}
          </span>
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <a href={SHARED.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Linkedin className="h-4 w-4" aria-hidden="true" />
          LinkedIn
        </a>
        <a href={SHARED.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
        <a href={SHARED.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Instagram className="h-4 w-4" aria-hidden="true" />
          Instagram
        </a>
      </div>
    </Tile>
  );
};
