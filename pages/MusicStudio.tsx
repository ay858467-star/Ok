
import React, { useState } from 'react';
import { generateSpeech, decodeBase64, decodeAudioData } from '../services/geminiService';

const MusicStudio: React.FC = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Kore');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const voices = [
    { id: 'Kore', name: 'كوري (ذكوري)', icon: '👨' },
    { id: 'Puck', name: 'باك (حيوي)', icon: '🤖' },
    { id: 'Charon', name: 'شارون (عميق)', icon: '👴' },
    { id: 'Fenrir', name: 'فينرير (قوي)', icon: '🐺' },
  ];

  const handleGenerate = async () => {
    if (!text) return;
    setIsGenerating(true);
    try {
      const base64 = await generateSpeech(text, voice);
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const decoded = decodeBase64(base64);
      const audioBuffer = await decodeAudioData(decoded, audioCtx);
      
      // Convert buffer to wav blob (simplified: creating a blob from PCM)
      // For simplicity in this demo, we can use the Web Audio API to play directly
      // but to provide a 'URL', we'd normally need a wav encoder.
      // Let's create a visual feedback that it's ready and play it.
      
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
      
      setAudioUrl("audio_generated"); // Indicator
      alert("تم توليد الصوت وتشغيله بنجاح!");
    } catch (err) {
      alert("حدث خطأ في توليد الصوت");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="glass-effect p-8 rounded-3xl border border-pink-500/20">
        <h3 className="text-xl font-bold mb-6 text-pink-400">توليد حوار وموسيقى</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">النص المراد تحويله لصوت</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="اكتب الحوار هنا... سيقوم الذكاء الاصطناعي بنطقه بطريقة درامية."
              className="w-full h-40 bg-[#0f172a] rounded-2xl p-4 border border-white/10 outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-4">اختر نبرة الصوت</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {voices.map(v => (
                <button
                  key={v.id}
                  onClick={() => setVoice(v.id)}
                  className={`p-4 rounded-2xl border transition-all ${
                    voice === v.id ? 'bg-pink-600/20 border-pink-500 text-pink-400' : 'border-white/10'
                  }`}
                >
                  <span className="text-2xl block mb-1">{v.icon}</span>
                  <span className="text-xs">{v.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !text}
            className="w-full bg-pink-600 hover:bg-pink-500 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-500/20 transition-all disabled:opacity-50"
          >
            {isGenerating ? "جاري التوليد..." : "توليد وتشغيل الصوت 🎙️"}
          </button>
        </div>
      </div>
      
      <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5">
        <h4 className="text-sm font-bold mb-2">كيف تعمل؟</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          نحن نستخدم موديل Gemini 2.5 Flash Native Audio لتحويل النصوص إلى صوت طبيعي بدقة 24kHz. 
          يمكنك استخدامه لتسجيل حوارات لشخصيات فيديوهاتك أو تعليق صوتي (Voiceover).
        </p>
      </div>
    </div>
  );
};

export default MusicStudio;
