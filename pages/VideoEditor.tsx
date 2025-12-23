
import React, { useState, useRef } from 'react';

const VideoEditor: React.FC = () => {
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState('');
  const [speed, setSpeed] = useState(1);
  const [qualityBoost, setQualityBoost] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(URL.createObjectURL(file));
    }
  };

  const handleApply = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      alert("تمت معالجة الفيديو بنجاح! تم تطبيق التعديلات الذكية.");
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="glass-effect p-6 rounded-3xl space-y-6">
          <h3 className="font-bold border-b border-white/5 pb-2">أدوات المونتاج</h3>
          
          <div>
            <label className="block text-xs text-slate-400 mb-2">إضافة نص / ترجمة</label>
            <input 
              type="text" 
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="اكتب النص هنا..."
              className="w-full bg-[#0f172a] rounded-lg p-2 text-sm border border-white/10 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-2">سرعة الفيديو ({speed}x)</label>
            <input 
              type="range" min="0.5" max="3" step="0.1" 
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between">
             <label className="text-sm">تحسين الجودة ذكياً</label>
             <button 
              onClick={() => setQualityBoost(!qualityBoost)}
              className={`w-12 h-6 rounded-full transition-all relative ${qualityBoost ? 'bg-emerald-500' : 'bg-slate-700'}`}
             >
               <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${qualityBoost ? 'right-7' : 'right-1'}`} />
             </button>
          </div>

          <button 
            onClick={handleApply}
            disabled={!videoFile || isProcessing}
            className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-xl font-bold transition-all disabled:opacity-30"
          >
            {isProcessing ? "جاري المعالجة..." : "تطبيق التعديلات ✅"}
          </button>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-4">
        <div className="glass-effect aspect-video rounded-3xl flex items-center justify-center relative overflow-hidden group">
          {videoFile ? (
            <>
              <video src={videoFile} controls className="w-full h-full object-contain" />
              {subtitle && (
                <div className="absolute bottom-12 w-full text-center">
                  <span className="bg-black/60 px-4 py-1 rounded text-xl font-bold text-white shadow-lg">
                    {subtitle}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div 
              onClick={() => fileInput.current?.click()}
              className="text-center cursor-pointer hover:scale-110 transition-transform"
            >
              <span className="text-6xl block mb-4">📤</span>
              <p className="text-slate-400">انقر لرفع فيديو والبدء في المونتاج</p>
              <input type="file" ref={fileInput} onChange={handleFile} className="hidden" accept="video/*" />
            </div>
          )}
        </div>

        <div className="glass-effect p-4 rounded-2xl flex gap-4 overflow-x-auto">
          {/* Mock Timeline */}
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="min-w-[120px] h-20 bg-slate-800 rounded-lg flex-shrink-0 border border-white/5 relative opacity-50">
               <div className="absolute top-1 left-1 text-[10px]">00:0{i}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
