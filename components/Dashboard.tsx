
import React from 'react';
import { AppView } from '../types';

interface DashboardProps {
  setView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const features = [
    {
      title: 'كأس أمم أفريقيا 🏆',
      desc: 'شاهد نتائج المباريات المباشرة، أخبار البطولة، وابحث عن روابط البث المجانية لحظة بلحظة.',
      icon: '⚽',
      view: 'SPORTS_HUB',
      color: 'orange'
    },
    {
      title: 'تحريك الصور (Img2Vid)',
      desc: 'حول صورك الثابتة إلى فيديوهات مذهلة. ارفع صورة البداية وصورة النهاية ودع Veo-3 يتكفل بالباقي.',
      icon: '✨',
      view: 'VIDEO_GEN',
      color: 'cyan'
    },
    {
      title: 'تصميم الشخصيات',
      desc: 'صمم شخصيات فريدة وعوالم خيالية بدقة 4K لاستخدامها كإطارات أساسية في فيديوهاتك.',
      icon: '🎨',
      view: 'IMAGE_GEN',
      color: 'purple'
    },
    {
      title: 'الأصوات الدرامية',
      desc: 'أنشئ تعليقاً صوتياً أو حوارات بين شخصيات متعددة لتضيفها إلى فيديوهاتك المتحركة.',
      icon: '🎙️',
      view: 'MUSIC_GEN',
      color: 'pink'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
      {features.map((f, i) => (
        <div 
          key={i}
          onClick={() => setView(f.view as AppView)}
          className="glass-effect p-8 rounded-[2rem] cursor-pointer hover:translate-y-[-8px] transition-all group border border-white/5 relative overflow-hidden"
        >
          <div className={`absolute -right-4 -top-4 w-32 h-32 bg-${f.color}-500/10 rounded-full blur-3xl group-hover:bg-${f.color}-500/20 transition-all`}></div>
          <div className={`text-4xl mb-6 bg-${f.color}-500/20 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner border border-${f.color}-500/20`}>
            {f.icon}
          </div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{f.title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-cyan-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
             <span>ابدأ الآن</span>
             <span className="text-lg">←</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
