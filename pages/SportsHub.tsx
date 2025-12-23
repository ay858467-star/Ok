
import React, { useState, useEffect } from 'react';
import { searchAFCONInfo } from '../services/geminiService';

const SportsHub: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('نتائج مباريات كأس أمم أفريقيا اليوم والقنوات الناقلة المجانية');

  const fetchSportsData = async () => {
    setLoading(true);
    try {
      const result = await searchAFCONInfo(query);
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSportsData();
  }, []);

  return (
    <div className="space-y-6 pb-20">
      <div className="glass-effect p-6 rounded-[2rem] border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-orange-400 flex items-center gap-2">
              <span>⚽</span> مباشر كأس أمم أفريقيا
            </h2>
            <p className="text-slate-400 text-sm mt-1">تغطية حية وروابط بث مجانية مدعومة بالذكاء الاصطناعي</p>
          </div>
          <button 
            onClick={fetchSportsData}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-500 px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '🔄 تحديث النتائج'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-40 bg-slate-800 rounded-2xl"></div>
                <div className="h-40 bg-slate-800 rounded-2xl"></div>
              </div>
            ) : (
              <div className="glass-effect p-6 rounded-2xl border border-white/5 bg-[#0f172a] prose prose-invert max-w-none">
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {data?.text || "جاري جلب آخر أخبار البطولة..."}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass-effect p-6 rounded-2xl border border-white/5">
              <h3 className="font-bold mb-4 text-orange-400">🔗 روابط رسمية وبث مجاني</h3>
              <div className="space-y-3">
                {data?.sources?.length > 0 ? (
                  data.sources.map((chunk: any, i: number) => (
                    chunk.web && (
                      <a 
                        key={i}
                        href={chunk.web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5"
                      >
                        <div className="text-xs text-orange-500 font-bold mb-1">مصدر موثوق</div>
                        <div className="text-sm font-medium line-clamp-1">{chunk.web.title}</div>
                      </a>
                    )
                  ))
                ) : (
                  <p className="text-xs text-slate-500">سيتم عرض الروابط هنا فور توفرها...</p>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl shadow-lg shadow-green-500/10">
              <h3 className="font-bold text-white mb-2">💡 نصيحة المشاهدة</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                ابحث دائماً عن قناة "beIN Sports الإخبارية" على يوتيوب أو القنوات المحلية الأرضية للحصول على أفضل جودة مجانية وبدون انقطاع.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsHub;
