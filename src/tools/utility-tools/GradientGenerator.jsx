import { useState } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';

export default function GradientGenerator() {
  const [c1, setC1] = useState('#4F46E5'); const [c2, setC2] = useState('#22C55E');
  const [type, setType] = useState('linear'); const [angle, setAngle] = useState(135);
  const grad = type==='linear' ? `linear-gradient(${angle}deg, ${c1}, ${c2})` : `radial-gradient(circle, ${c1}, ${c2})`;
  const css = `background: ${grad};`;

  return (
    <ToolLayout toolId="gradient-generator">
      <div className="flex-1 flex items-center justify-center p-8 max-w-4xl mx-auto w-full">
        <div className="w-full">
          <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-10 uppercase tracking-tight text-center">Gradient Field Generator</h2>
          
          <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-[#ffffff10] shadow-2xl transition-colors flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left Column: Preview & Controls */}
            <div className="flex-1 space-y-8">
              <div className="w-full h-64 rounded-3xl transition-all shadow-2xl border-8 border-gray-50 dark:border-[#ffffff05] relative group overflow-hidden" style={{background:grad}}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#1a1a1a]/10 pointer-events-none">
                  <p className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Field Composition Preview</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-gray-400 text-[8px] font-black uppercase tracking-widest ml-1">Composition Protocol</label>
                    <div className="flex p-1 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl gap-1">
                      {['linear','radial'].map(t=>(
                        <button key={t} onClick={()=>setType(t)} 
                          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${type===t ? 'bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a] shadow-lg' : 'text-gray-400 hover:text-[#1a1a1a] dark:text-white dark:hover:bg-white/10'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {type==='linear' && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest ml-1">
                        <span className="text-gray-400">Angular Orientation</span>
                        <span className="text-[#1a1a1a] dark:text-white">{angle}°</span>
                      </div>
                      <input type="range" min="0" max="360" value={angle} onChange={e=>setAngle(+e.target.value)} 
                        className="w-full accent-[#1a1a1a] dark:accent-white cursor-pointer"/>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    {[[c1,setC1,'Primary Node'],[c2,setC2,'Secondary Node']].map(([v,s,l])=>(
                      <div key={l} className="flex-1 space-y-2">
                        <label className="text-gray-400 text-[8px] font-black uppercase tracking-widest ml-1">{l}</label>
                        <input type="color" value={v} onChange={e=>s(e.target.value)} 
                          className="w-full h-14 rounded-xl cursor-pointer border-4 border-white dark:border-[#ffffff20] shadow-sm bg-gray-50 dark:bg-zinc-800 hover:scale-105 transition-transform appearance-none"/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Exportable Specification */}
            <div className="w-full lg:w-[320px] xl:w-[380px] flex flex-col">
              <div className="bg-[#1a1a1a] dark:bg-white rounded-3xl p-8 relative flex-1 flex flex-col group shadow-xl transition-colors min-h-[280px]">
                <div className="absolute inset-0 bg-white/5 dark:bg-[#1a1a1a]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"/>
                <label className="text-white/40 dark:text-[#1a1a1a]/40 text-[8px] font-black uppercase tracking-widest block mb-4">Exportable Specification</label>
                <div className="flex-1">
                  <code className="block text-white dark:text-[#1a1a1a] text-[12px] font-black font-mono break-all leading-relaxed opacity-90">{css}</code>
                </div>
                <button onClick={()=>navigator.clipboard.writeText(css)} 
                  className="mt-8 w-full py-4 rounded-xl bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white shadow-2xl hover:scale-[1.02] transition-all active:scale-95 font-black text-xs uppercase tracking-widest">
                  Copy CSS
                </button>
                <div className="mt-4 text-center">
                  <span className="text-white/20 dark:text-[#1a1a1a]/20 text-[8px] font-black uppercase tracking-[0.3em]">YUKT PROTOCOL V1.0</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
