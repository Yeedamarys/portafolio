import React, { useState } from 'react';
import { Cpu, Smartphone, Layers, Server, Monitor, Code, Cloud, Database, Users, Sparkles, Filter } from 'lucide-react';
import { SKILLS } from '../data/portfolioData';
import { SkillItem } from '../types';
import { soundFx } from '../utils/audioChimes';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Patterns', 'Cloud', 'Data & Ops', 'Methodologies'];

  const filteredSkills = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const getIcon = (type: SkillItem['iconType']) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="h-5 w-5 text-pink-500" />;
      case 'layers':
        return <Layers className="h-5 w-5 text-pink-500" />;
      case 'server':
        return <Server className="h-5 w-5 text-pink-500" />;
      case 'monitor':
        return <Monitor className="h-5 w-5 text-pink-500" />;
      case 'code':
        return <Code className="h-5 w-5 text-pink-500" />;
      case 'cloud':
        return <Cloud className="h-5 w-5 text-pink-500" />;
      case 'database':
        return <Database className="h-5 w-5 text-pink-500" />;
      case 'users':
        return <Users className="h-5 w-5 text-pink-500" />;
      default:
        return <Cpu className="h-5 w-5 text-pink-500" />;
    }
  };

  return (
    <div className="glass-panel relative rounded-3xl p-6 sm:p-8 lg:p-9 shadow-lg border border-pink-200/90 h-full flex flex-col">
      
      {/* Header matching mockup */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100/80 text-pink-600 shadow-sm">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
              Technical Skills
            </h2>
            <p className="text-xs text-pink-600 font-medium">Stack & Technologies</p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playChime('hover');
                setActiveCategory(cat);
              }}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-pink-600 text-white shadow-sm shadow-pink-300 scale-105'
                  : 'bg-white/80 text-slate-600 hover:bg-pink-50 hover:text-pink-600 border border-pink-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills List matching Mockup 3 */}
      <div className="space-y-3 overflow-y-auto pr-1 flex-1">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            onMouseEnter={() => soundFx.playChime('hover')}
            className="group relative rounded-2xl bg-white/90 p-3.5 sm:p-4 border border-pink-100/80 shadow-sm transition-all duration-300 hover:shadow-md hover:border-pink-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-3">
              {/* Left: Icon + Title + Subtext */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50 border border-pink-100 text-pink-600 transition-transform group-hover:scale-110">
                  {getIcon(skill.iconType)}
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight truncate">
                      {skill.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 truncate font-normal">
                    {skill.subtext}
                  </p>
                </div>
              </div>

              {/* Right: Category Pill matching mockup */}
              <div className="shrink-0 flex items-center gap-2">
                <span className="rounded-full bg-pink-50/90 px-3 py-1 text-xs font-semibold text-pink-600 border border-pink-200/60">
                  {skill.category}
                </span>
              </div>
            </div>

            {/* Subtle interactive progress indicator */}
            <div className="mt-3 w-full bg-pink-50 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-700 group-hover:opacity-100 opacity-80"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-pink-100/60 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 text-pink-600 font-medium">
          <Sparkles className="h-3.5 w-3.5" /> Clean Code & Scalability
        </span>
        <span>{filteredSkills.length} technologies</span>
      </div>

    </div>
  );
};
