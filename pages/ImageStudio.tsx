
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';

const ImageStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16">("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const url = await generateImage(prompt, aspectRatio);
      setImageUrl(url);
    } catch (err) {
      alert("حدث خطأ في توليد الصورة");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="glass-effect p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-lg">إعدادات التصميم</h3>
          <div>
            <label className="block text-xs text-slate-400 mb-2">وصف الشخصية أو الصورة</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="شخصية انمي محاربة، ملابس ذهبية، في غابة سحرية..."
              className="w-full h-32 bg-[#0f172a] rounded-xl p-3 text-sm border border-white/10 outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-2">نسبة العرض</label>
            <div className="flex gap-2">
              {(["1:1", "16:9", "9:16"] as const).map(ratio => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`flex-1 py-2 rounded-lg border transition-all text-xs ${
                    aspectRatio === ratio ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'border-white/10'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {isGenerating ? "جاري التصميم..." : "تصميم الصورة ✨"}
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 flex items-center justify-center">
        {imageUrl ? (
          <div className="glass-effect p-4 rounded-3xl w-full">
            <img src={imageUrl} alt="Generated" className="w-full rounded-2xl shadow-xl max-h-[600px] object-contain" />
            <div className="mt-4 flex justify-end">
              <a href={imageUrl} download="ai-image.png" className="bg-white/5 px-4 py-2 rounded-lg text-sm hover:bg-white/10">حفظ الصورة</a>
            </div>
          </div>
        ) : (
          <div className="w-full h-[400px] border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-slate-500">
            <span className="text-6xl mb-4">🖼️</span>
            <p>سيظهر تصميمك هنا</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageStudio;
