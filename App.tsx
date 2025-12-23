
import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VideoStudio from './pages/VideoStudio';
import ImageStudio from './pages/ImageStudio';
import MusicStudio from './pages/MusicStudio';
import VideoEditor from './pages/VideoEditor';
import SportsHub from './pages/SportsHub';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('DASHBOARD');

  const renderView = () => {
    switch (currentView) {
      case 'DASHBOARD': return <Dashboard setView={setCurrentView} />;
      case 'VIDEO_GEN': return <VideoStudio />;
      case 'IMAGE_GEN': return <ImageStudio />;
      case 'MUSIC_GEN': return <MusicStudio />;
      case 'VIDEO_EDITOR': return <VideoEditor />;
      case 'SPORTS_HUB': return <SportsHub />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {currentView === 'DASHBOARD' && "لوحة التحكم الذكية"}
              {currentView === 'VIDEO_GEN' && "استوديو التحريك المجاني"}
              {currentView === 'IMAGE_GEN' && "استوديو الصور والشخصيات"}
              {currentView === 'MUSIC_GEN' && "استوديو الصوت والموسيقى"}
              {currentView === 'VIDEO_EDITOR' && "محرر الفيديو الذكي"}
              {currentView === 'SPORTS_HUB' && "كأس أمم أفريقيا - مباشر"}
            </h1>
            <p className="text-slate-500 text-sm mt-1">يعمل بواسطة Gemini Flash (المستوى المجاني)</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-xs font-bold border border-cyan-500/30 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                الوضع المجاني نشط
             </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
