import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, GraduationCap, Briefcase, Cpu, CheckCircle2, Heart } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, SKILLS, EDUCATION, LANGUAGES } from '../data/portfolioData';
import { soundFx } from '../utils/audioChimes';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playChime('click');
    window.print();
  };

  const handleDownloadJson = () => {
    soundFx.playChime('click');
    const cvData = {
      personalInfo: PERSONAL_INFO,
      education: EDUCATION,
      skills: SKILLS,
      experience: EXPERIENCES,
      languages: LANGUAGES,
    };
    const blob = new Blob([JSON.stringify(cvData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_Damarys_Leon_FullStack.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:m-0">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity print:hidden"
        onClick={() => {
          soundFx.playChime('click');
          onClose();
        }}
      ></div>

      {/* CV Sheet */}
      <div className="relative w-full max-w-4xl rounded-3xl bg-white p-6 sm:p-10 shadow-2xl border border-pink-200 z-10 my-6 max-h-[92vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-3 mb-8 pb-4 border-b border-pink-100 print:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              Curriculum Vitae • Damarys León
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-pink-200 bg-pink-50 text-xs font-semibold text-pink-700 hover:bg-pink-100 transition-colors"
              title="Imprimir o guardar como PDF"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-xs font-semibold text-white shadow-sm hover:from-pink-600 hover:to-rose-600 transition-all"
              title="Descargar datos estructurados"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Datos JSON</span>
            </button>

            <button
              onClick={() => {
                soundFx.playChime('click');
                onClose();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors ml-2"
              aria-label="Cerrar modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CV Printable Document */}
        <div className="space-y-6 text-slate-800">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-pink-200/80">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Damarys <span className="text-pink-600">León</span>
              </h1>
              <p className="text-sm sm:text-base font-bold text-pink-600 uppercase tracking-wider mt-1">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                {PERSONAL_INFO.tagline}
              </p>
            </div>

            {/* Contact details list */}
            <div className="space-y-1.5 text-xs text-slate-600 bg-pink-50/60 p-3.5 rounded-2xl border border-pink-100 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-pink-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-pink-500" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-pink-500" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Perfil Profesional */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-2">
              Perfil Profesional
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>{PERSONAL_INFO.aboutSummary[0]}</p>
              <p>{PERSONAL_INFO.aboutSummary[1]}</p>
              <p className="font-semibold text-pink-900 bg-pink-50 p-2.5 rounded-xl border border-pink-100">
                {PERSONAL_INFO.jobObjective}
              </p>
            </div>
          </div>

          {/* Experiencia Laboral */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-3 flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" /> Experiencia Laboral
            </h2>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="p-3.5 rounded-2xl bg-pink-50/40 border border-pink-100">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-slate-900">{exp.company}</h3>
                    <span className="text-xs font-semibold text-pink-600">{exp.period}</span>
                  </div>
                  <p className="text-xs font-bold text-pink-700 mb-2">{exp.role}</p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-pink-500 font-bold">▪</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Stack & Habilidades */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-2 flex items-center gap-1.5">
              <Cpu className="h-4 w-4" /> Habilidades Técnicas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {SKILLS.map((skill) => (
                <div key={skill.id} className="p-2 rounded-xl bg-white border border-pink-100 shadow-2xs">
                  <p className="font-bold text-slate-800">{skill.name}</p>
                  <p className="text-[10px] text-slate-500">{skill.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Educación & Idiomas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-2xl bg-pink-50/40 border border-pink-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-1 flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" /> Educación
              </h2>
              <p className="text-sm font-bold text-slate-900">{EDUCATION.degree}</p>
              <p className="text-xs font-semibold text-slate-700">{EDUCATION.institution}</p>
              <p className="text-xs text-pink-600 font-medium">{EDUCATION.period} ({EDUCATION.currentLevel})</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-pink-50/40 border border-pink-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Idiomas
              </h2>
              <div className="space-y-1 text-xs">
                {LANGUAGES.map((l) => (
                  <div key={l.language} className="flex justify-between">
                    <span className="font-semibold text-slate-800">{l.language}</span>
                    <span className="text-pink-600 font-bold">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="pt-4 border-t border-pink-100 flex items-center justify-between text-xs text-slate-500">
            <span>Firma Profesional</span>
            <span className="font-signature text-2xl text-pink-600">Damarys León 💖</span>
          </div>

        </div>

      </div>
    </div>
  );
};
