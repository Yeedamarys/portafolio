import React from 'react';
import { FolderGit2, Monitor, Receipt, Settings2, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { soundFx } from '../utils/audioChimes';
import laptopImg from '../assets/images/surreal_laptop_3d_1789438018090.jpg';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
  onViewAllProjects: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  const getProjectIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Receipt className="h-5 w-5 text-pink-500" />;
      case 1:
        return <Monitor className="h-5 w-5 text-pink-500" />;
      case 2:
        return <Settings2 className="h-5 w-5 text-pink-500" />;
      default:
        return <FolderGit2 className="h-5 w-5 text-pink-500" />;
    }
  };

  return (
    <div className="space-y-6 flex flex-col justify-between h-full">
      
      {/* 3D Laptop Display Card matching Mockup 4 */}
      <div className="glass-panel relative rounded-3xl overflow-hidden border border-pink-200/90 shadow-lg group">
        <div className="relative aspect-video sm:aspect-[16/10] overflow-hidden bg-gradient-to-tr from-pink-100/50 to-white">
          <img
            src={laptopImg}
            alt="Better Code Brighter Future - 3D Laptop Desk Render"
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay gradient & Tag */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4">
            <div className="glass-pill px-3 py-1.5 rounded-full text-xs font-semibold text-slate-900 border border-white/90 shadow-md">
              <span className="text-pink-600 font-bold">Clean Architecture</span> • Real Production
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects List Card matching Mockup 4 */}
      <div className="glass-panel relative rounded-3xl p-6 sm:p-7 shadow-lg border border-pink-200/90 flex-1 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-100/80 text-pink-600 shadow-sm">
              <FolderGit2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-heading">
                Featured Projects
              </h2>
              <p className="text-xs text-pink-600 font-medium">High Impact Solutions</p>
            </div>
          </div>

          {/* Featured List items */}
          <div className="space-y-3">
            {FEATURED_PROJECTS.slice(0, 3).map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => {
                  soundFx.playChime('open');
                  onSelectProject(proj);
                }}
                onMouseEnter={() => soundFx.playChime('hover')}
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white/90 p-3.5 border border-pink-100/90 shadow-sm transition-all duration-200 hover:border-pink-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50 border border-pink-100 text-pink-600 transition-transform group-hover:scale-110">
                    {getProjectIcon(idx)}
                  </div>
                  <div className="truncate">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-pink-600 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      ({proj.companyOrContext})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-pink-500 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Projects Button matching mockup */}
        <div className="pt-5 mt-4 border-t border-pink-100/80">
          <button
            onClick={() => {
              soundFx.playChime('click');
              onViewAllProjects();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 py-3 px-5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-pink-300 transition-all hover:from-pink-600 hover:to-fuchsia-600 hover:shadow-lg hover:scale-[1.01] active:scale-[0.98]"
            id="featured-view-more-btn"
          >
            <span>View More Projects</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
