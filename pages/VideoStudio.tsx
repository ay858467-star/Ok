
import React, { useState, useRef } from 'react';
import { generateImage, generateVideoVeo } from '../services/geminiService';

const VideoStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<'FREE' | 'VEO'>('FREE');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [status, setStatus] = useState('');
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [storyboard, setStoryboard] = useState<string[]>([]);
  
  const [startImage, setStartImage] = useState<string | null>(null);
  const [endImage, setEndImage] = useState<string | null>(null);

  const fileInputStart = useRef<HTMLInputElement>(null);
  const fileInputEnd = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'start') setStartImage(reader.result as string);
        else setEndImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateBaseImage = async () => {
    if (!prompt) return;
    setIsGeneratingImage(true);
    try {
      const url = await generateImage(`A high quality cinematic base frame for: ${prompt}`, "16:9");
      setStartImage(url);
    } catch (err) {
      alert("فشل في توليد الصورة الأساسية");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setResultVideo(null);
    setStoryboard([]);

    try {
      if (mode === 'FREE') {
        setStatus("جاري توليد مشاهد التحريك المجانية...");
        const frames = await Promise.all([
          generateImage(`Frame 1: ${prompt}`, "16:9"),
          generateImage(`Frame 2 (slight movement): ${prompt}`, "16:9"),
          generateImage(`Frame 3 (action progressing): ${prompt}`, "16:9"),
          generateImage(`Frame 4 (final position): ${prompt}`, "16:9"),
        ]);
        setStoryboard(frames);
        setStatus("تم إنشاء التحريك المتسلسل!");
      } else {
        setStatus("جاري تحريك الصور باستخدام Veo-3...");
        const url = await generateVideoVeo(
          prompt, 
          setStatus, 
          startImage || undefined, 
          endImage || undefined
        );
        setResultVideo(url);
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ. وضع Veo-3 يتطلب مفتاح API مدفوع أو الوصول التجريبي.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* قسم المدخلات */}
      <div className="glass-effect p-6 md:p-8 rounded-[2rem] border border-cyan-500/20 shadow-2xl">
        <div className="flex flex-wrap gap-2 mb-8 bg-[#0f172a] p-1.5 rounded-2xl w-fit border border-white/5">
          <button 
            onClick={() => setMode('FREE')}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'FREE' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' : 'text-slate-400 hover:text-white'}`}
          >
            التحريك المجاني (إطارات)
          </button>
          <button 
            onClick={() => setMode('VEO')}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'VEO' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white'}`}
          >
            تحريك Veo-3 (فيديو)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* الجانب الأيمن: النص والإعدادات */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-3">وصف الحركة (Animation Prompt)</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثال: اجعل الشخصية تبتسم وتلوح بيدها ببطء..."
                className="w-full h-40 bg-[#070b14] rounded-2xl p-5 text-white border border-white/10 focus:border-cyan-500 outline-none resize-none transition-all shadow-inner"
              />
            </div>
            
            <button
              onClick={handleGenerateBaseImage}
              disabled={isGeneratingImage || !prompt}
              className="w-full py-3 px-6 rounded-xl border border-cyan-500/30 text-cyan-400 text-sm font-bold hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGeneratingImage ? "جاري التصميم..." : "✨ توليد صورة أساسية للتحريك"}
            </button>
          </div>

          {/* الجانب الأيسر: التحكم بالصور */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-400">إطارات التحكم (اختياري)</label>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => fileInputStart.current?.click()}
                className="aspect-video border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all overflow-hidden relative group"
              >
                <input type="file" ref={fileInputStart} onChange={(e) => handleFileChange(e, 'start')} className="hidden" accept="image/*" />
                {startImage ? (
                  <img src={startImage} alt="Start" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-3xl mb-2">🖼️</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">صورة البداية</span>
                  </>
                )}
                {startImage && <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold">تغيير</div>}
              </div>

              <div 
                onClick={() => fileInputEnd.current?.click()}
                className="aspect-video border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all overflow-hidden relative group"
              >
                <input type="file" ref={fileInputEnd} onChange={(e) => handleFileChange(e, 'end')} className="hidden" accept="image/*" />
                {endImage ? (
                  <img src={endImage} alt="End" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-3xl mb-2">🏁</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">صورة النهاية</span>
                  </>
                )}
                {endImage && <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold">تغيير</div>}
              </div>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              * نصيحة: استخدام صورة بداية ونهاية يضمن دقة عالية في عملية التحريك (Morphing).
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`w-full py-5 rounded-2xl font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 ${
              mode === 'FREE' ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20' : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                {status}
              </>
            ) : (
              <>🚀 ابدأ التحريك الذكي الآن</>
            )}
          </button>
        </div>
      </div>

      {/* قسم النتائج */}
      {(storyboard.length > 0 || resultVideo) && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <h3 className="text-xl font-bold">النتيجة النهائية</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>

          {mode === 'FREE' && storyboard.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {storyboard.map((img, i) => (
                <div key={i} className="glass-effect p-2 rounded-2xl group cursor-zoom-in">
                  <div className="relative overflow-hidden rounded-xl aspect-video">
                    <img src={img} alt={`Frame ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px]">إطار {i+1}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {resultVideo && (
            <div className="max-w-4xl mx-auto glass-effect p-3 rounded-[2.5rem] shadow-2xl border border-white/10">
              <video src={resultVideo} controls autoPlay loop className="w-full rounded-[2rem] shadow-2xl" />
              <div className="p-6 flex justify-between items-center">
                 <div>
                    <h4 className="font-bold text-lg">فيديو متحرك بواسطة Veo-3</h4>
                    <p className="text-sm text-slate-500">تم التحريك بناءً على الصور والمطالبة المرفقة</p>
                 </div>
                 <a 
                  href={resultVideo} 
                  download="ai-animation.mp4" 
                  className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                >
                  <span>📥</span> تحميل MP4
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoStudio;
