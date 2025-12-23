
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const items = [
    { id: 'DASHBOARD', label: 'الرئيسية', icon: '🏠' },
    { id: 'SPORTS_HUB', label: 'كأس أفريقيا', icon: '🏆' },
    { id: 'VIDEO_GEN', label: 'تحريك ذكي', icon: '🎬' },
    { id: 'IMAGE_GEN', label: 'تصميم صور', icon: '🎨' },
    { id: 'MUSIC_GEN', label: 'صوت وموسيقى', icon: '🎵' },
    { id: 'VIDEO_EDITOR', label: 'محرر فيديو', icon: '✂️' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-[#111827] border-l border-white/5 flex flex-col items-center md:items-stretch transition-all">
      <div className="p-8 mb-4 hidden md:block">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/40">G</div>
           <span className="text-xl font-bold tracking-tight">ذكاء <span className="text-cyan-500">فلاش</span></span>
        </div>
      </div>
      <nav className="flex-1 w-full space-y-1 p-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as AppView)}
            className={`w-full flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl transition-all duration-300 ${
              currentView === item.id 
                ? 'bg-cyan-600/10 text-cyan-400 border border-cyan-500/20' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="hidden md:block font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-6 mt-auto border-t border-white/5 w-full text-center hidden md:block">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Free AI Edition</p>
      </div>
    </aside>
  );
};

export default Sidebar;
