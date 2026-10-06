import React, { useEffect, useState } from 'react';
import { AlertCircle, Check, ChevronLeft, ChevronRight, Download, ExternalLink, Github, Lock, Mail, MapPin, Phone, Printer, Send } from 'lucide-react';
import { SHARED } from '../data/portfolioData';
import { fill, useI18n } from '../i18n/LanguageContext';
import { soundFx } from '../utils/audioChimes';
import { Dialog, btnPrimary, btnSecondary, chip, useReduce } from './ui';

interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  origin: DOMRect | null;
}

/* ---------- Project details ---------- */

interface ProjectDialogProps extends BaseDialogProps {
  index: number;
  onIndexChange: (index: number) => void;
  onAsk: (projectTitle: string) => void;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({ open, onClose, origin, index, onIndexChange, onAsk }) => {
  const { t } = useI18n();
  const ui = t.ui.projects;
  const projects = t.projects;
  const project = projects[index] ?? projects[0];
  const step = (delta: number) => onIndexChange((index + delta + projects.length) % projects.length);

  return (
    <Dialog open={open} onClose={onClose} origin={origin} labelledBy="project-dialog-title" closeLabel={ui.close}>
      <h2 id="project-dialog-title" className="pr-12 font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
        {project.title}
      </h2>
      <p className="mt-1 text-neon-soft">{project.subtitle}</p>
      <p className="mt-2 text-sm text-ink-muted">
        <span className="font-semibold text-ink-soft">{project.companyOrContext}</span>
        <span className="ml-2 tabular">{project.period}</span>
        <span className="ml-2">{project.category}</span>
      </p>

      {project.image && (
        <img
          src={project.image}
          alt=""
          className="mt-5 w-full rounded-2xl border border-neon/20 object-cover object-top"
        />
      )}

      <p className="mt-5 text-base leading-relaxed text-ink-soft">{project.description}</p>

      <h3 className="mt-6 text-sm font-semibold text-chrome">{ui.highlights}</h3>
      <ul className="mt-3 space-y-2.5">
        {project.highlights.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft sm:text-base">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mt-6 text-sm font-semibold text-chrome">{ui.technologies}</h3>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <li key={tech} className={chip}>
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-5">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
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
          <p className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
            <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
            {ui.codePrivateLong}
          </p>
        )}
        <button type="button" onClick={() => onAsk(project.title)} className="text-sm font-semibold text-neon-soft underline underline-offset-4 hover:text-ink">
          {ui.askAbout}
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button type="button" onClick={() => step(-1)} className={`${btnSecondary} px-4 py-2`}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          {ui.prev}
        </button>
        <span className="text-sm text-ink-muted tabular" aria-hidden="true">
          {index + 1} / {projects.length}
        </span>
        <button type="button" onClick={() => step(1)} className={`${btnSecondary} px-4 py-2`}>
          {ui.next}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </Dialog>
  );
};

/* ---------- Experience details ---------- */

interface ExperienceDialogProps extends BaseDialogProps {
  index: number;
}

export const ExperienceDialog: React.FC<ExperienceDialogProps> = ({ open, onClose, origin, index }) => {
  const { t } = useI18n();
  const exp = t.experiences[index] ?? t.experiences[0];
  return (
    <Dialog open={open} onClose={onClose} origin={origin} labelledBy="experience-dialog-title" closeLabel={t.ui.experience.close} size="md">
      <h2 id="experience-dialog-title" className="pr-12 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
        {exp.company}
      </h2>
      <p className="mt-1 text-ink-soft">
        {exp.role}
        {exp.project ? `, ${exp.project}` : ''}
      </p>
      <p className="mt-1 text-sm text-neon-soft tabular">{exp.period}</p>
      <ul className="mt-5 space-y-3">
        {exp.responsibilities.map((item) => (
          <li key={item} className="flex gap-2.5 leading-relaxed text-ink-soft">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </Dialog>
  );
};

/* ---------- Contact form ---------- */

interface ContactDialogProps extends BaseDialogProps {
  initialSubject?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'mailto' | 'error';

export const ContactDialog: React.FC<ContactDialogProps> = ({ open, onClose, origin, initialSubject = '' }) => {
  const { t } = useI18n();
  const reduce = useReduce();
  const ui = t.ui.contact;
  const [form, setForm] = useState({ name: '', email: '', subject: initialSubject, message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [feedback, setFeedback] = useState('');

  // Formspree form ID (e.g. "xyzabcd"), set in .env.local as VITE_FORMSPREE_ID.
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

  useEffect(() => {
    if (open) {
      setForm((prev) => ({ ...prev, subject: initialSubject }));
      setStatus('idle');
    }
  }, [open, initialSubject]);

  const subjectLine = () => form.subject || fill(ui.defaultSubject, { name: form.name });

  const mailtoUrl = () => {
    const body = `${form.message}\n\n${form.name}\n${form.email}`;
    return `mailto:${SHARED.email}?subject=${encodeURIComponent(subjectLine())}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    soundFx.playChime('click');

    // Without a form service configured, hand the message to the visitor's email app.
    if (!formspreeId) {
      window.location.href = mailtoUrl();
      setStatus('mailto');
      setFeedback(fill(ui.mailto, { email: SHARED.email }));
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, _subject: subjectLine(), message: form.message }),
      });
      if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);

      setStatus('success');
      setFeedback(ui.success);
      soundFx.playChime('success');
      if (!reduce) {
        // Loaded on demand: only visitors who send a message download it.
        import('canvas-confetti')
          .then(({ default: confetti }) =>
            confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 }, colors: ['#FF4FAE', '#FF8FCB', '#D9D4E0'] }),
          )
          .catch(() => {});
      }
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      // Keep what the visitor typed so nothing is lost, and point to a channel that works.
      console.error('Contact form failed:', err);
      setStatus('error');
      setFeedback(fill(ui.error, { email: SHARED.email }));
    }
  };

  const field =
    'w-full rounded-xl border border-neon/25 bg-black/30 px-4 py-2.5 text-ink placeholder:text-ink-muted transition-colors focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/30';
  const label = 'mb-1.5 block text-sm font-semibold text-ink-soft';

  return (
    <Dialog open={open} onClose={onClose} origin={origin} labelledBy="contact-dialog-title" closeLabel={ui.close} size="md">
      <h2 id="contact-dialog-title" className="pr-12 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
        {ui.formTitle}
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={label}>
              {ui.name} <span className="font-normal text-ink-muted">({ui.required})</span>
            </label>
            <input
              id="contact-name"
              data-autofocus=""
              type="text"
              required
              autoComplete="name"
              placeholder={ui.namePlaceholder}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={label}>
              {ui.emailField} <span className="font-normal text-ink-muted">({ui.required})</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              autoComplete="email"
              placeholder={ui.emailPlaceholder}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={field}
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className={label}>
            {ui.subject}
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder={ui.subjectPlaceholder}
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="contact-message" className={label}>
            {ui.message} <span className="font-normal text-ink-muted">({ui.required})</span>
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            placeholder={ui.messagePlaceholder}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${field} resize-y`}
          />
        </div>

        <div aria-live="polite">
          {(status === 'success' || status === 'mailto') && (
            <p className="flex items-start gap-2 rounded-xl border border-mint/30 bg-mint/10 p-3 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
              {feedback}
            </p>
          )}
          {status === 'error' && (
            <div role="alert" className="flex items-start gap-2 rounded-xl border border-neon/40 bg-neon/10 p-3 text-sm text-ink">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-neon-soft" aria-hidden="true" />
              <div className="space-y-1">
                <p>{feedback}</p>
                <a href={mailtoUrl()} className="font-semibold text-neon-soft underline underline-offset-2 hover:text-ink">
                  {ui.openMail}
                </a>
              </div>
            </div>
          )}
        </div>

        <button type="submit" disabled={status === 'loading'} className={`${btnPrimary} w-full`}>
          {status === 'loading' ? (
            ui.sending
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              {ui.send}
            </>
          )}
        </button>
      </form>
    </Dialog>
  );
};

/* ---------- CV (printable sheet) ---------- */

export const CvDialog: React.FC<BaseDialogProps> = ({ open, onClose, origin }) => {
  const { t, lang } = useI18n();
  const ui = t.ui.cv;
  const p = t.personal;

  const downloadJson = () => {
    soundFx.playChime('click');
    const data = {
      name: SHARED.name,
      contact: { email: SHARED.email, phone: SHARED.phone, location: p.location, linkedin: SHARED.linkedin, github: SHARED.github },
      title: p.title,
      summary: p.aboutSummary,
      objective: p.jobObjective,
      experience: t.experiences,
      skills: t.skills,
      education: t.education,
      languages: t.languages,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_Damarys_Leon_FullStack_${lang.toUpperCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sectionTitle = 'text-sm font-bold text-pink-700';

  return (
    <Dialog open={open} onClose={onClose} origin={origin} labelledBy="cv-title" closeLabel={ui.close} tone="paper" printable>
      <div className="flex flex-wrap items-center gap-2 pr-12 print:hidden">
        <button
          type="button"
          onClick={() => {
            soundFx.playChime('click');
            window.print();
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-pink-700 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-800"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          {ui.print}
        </button>
        <button
          type="button"
          onClick={downloadJson}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {ui.json}
        </button>
      </div>

      <div className="mt-6 space-y-6 text-slate-800 print:mt-0">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="sr-only">{ui.title}</p>
            <h2 id="cv-title" className="font-display text-3xl font-semibold tracking-[-0.02em] text-slate-900">
              {SHARED.name}
            </h2>
            <p className="mt-1 font-semibold text-pink-700">{p.title}</p>
          </div>
          <ul className="space-y-1 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-pink-700" aria-hidden="true" />
              {p.location}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-pink-700" aria-hidden="true" />
              {SHARED.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-pink-700" aria-hidden="true" />
              {SHARED.email}
            </li>
          </ul>
        </header>

        <section>
          <h3 className={sectionTitle}>{ui.profile}</h3>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
            {p.aboutSummary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="font-semibold text-slate-900">{p.jobObjective}</p>
          </div>
        </section>

        <section>
          <h3 className={sectionTitle}>{ui.experience}</h3>
          <div className="mt-2 space-y-4">
            {t.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-slate-900">
                    {exp.company}
                    {exp.project ? <span className="font-normal text-slate-600">, {exp.project}</span> : null}
                  </p>
                  <p className="text-sm text-slate-600 tabular">{exp.period}</p>
                </div>
                <p className="text-sm text-pink-700">{exp.role}</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {exp.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className={sectionTitle}>{ui.skills}</h3>
          <dl className="mt-2 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {t.skills.map((skill) => (
              <div key={skill.id}>
                <dt className="font-semibold text-slate-900">{skill.name}</dt>
                <dd className="text-slate-600">{skill.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="grid gap-6 sm:grid-cols-2">
          <section>
            <h3 className={sectionTitle}>{ui.education}</h3>
            <p className="mt-2 font-semibold text-slate-900">{t.education.degree}</p>
            <p className="text-sm text-slate-700">{t.education.institution}</p>
            <p className="text-sm text-slate-600">
              {t.education.period}, {t.education.currentLevel}
            </p>
          </section>
          <section>
            <h3 className={sectionTitle}>{ui.languages}</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {t.languages.map((l) => (
                <li key={l.language} className="flex justify-between gap-4">
                  <span className="font-semibold text-slate-900">{l.language}</span>
                  <span className="text-slate-700">{l.level}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
          <span>{ui.signature}</span>
          <span className="font-signature text-3xl text-pink-700">{SHARED.name}</span>
        </footer>
      </div>
    </Dialog>
  );
};
