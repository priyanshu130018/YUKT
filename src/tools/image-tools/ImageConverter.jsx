import { useState, useRef } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useTools } from '../../context/ToolContext';
import { FiUpload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FMTS = [{mime:'image/png',ext:'png',label:'PNG'},{mime:'image/jpeg',ext:'jpg',label:'JPEG'},{mime:'image/webp',ext:'webp',label:'WebP'},{mime:'image/bmp',ext:'bmp',label:'BMP'}];

export default function ImageConverter() {
  const [img, setImg] = useState(null); const [fmt, setFmt] = useState('image/png'); const [q, setQ] = useState(90); const [result, setResult] = useState(null);
  const fileRef = useRef(); const { addHistory } = useTools();

  const onFile = (e) => { const f=e.target.files[0]; if(!f) return; setImg(URL.createObjectURL(f)); setResult(null); };
  const convert = () => {
    const c=document.createElement('canvas'); const i=new Image();
    i.onload=()=>{ c.width=i.width; c.height=i.height; c.getContext('2d').drawImage(i,0,0); setResult({data:c.toDataURL(fmt,q/100),fmt}); addHistory({toolName:'Image Format Converter',category:'image-tools',action:`Converted to ${FMTS.find(f=>f.mime===fmt)?.label}`}); };
    i.src=img;
  };

  return (
    <ToolLayout toolId="image-format-converter">
      <div className="flex-1 flex flex-col items-center p-6 lg:p-12 max-w-6xl mx-auto w-full overflow-hidden">
        <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-8 uppercase tracking-tight text-center">Format Converter</h2>
        
        <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-[#ffffff10] shadow-2xl transition-colors flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
          
          {/* Left Column: Input & Controls */}
          <div className="flex-1 space-y-8">
            {!img ? (
              <label onClick={()=>fileRef.current?.click()} className="group relative w-full h-[340px] border-4 border-dashed border-gray-100 dark:border-[#ffffff05] bg-gray-50/50 dark:bg-black/10 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-[#1a1a1a]/10 dark:hover:border-white/10 hover:bg-white dark:hover:bg-white/5 transition-all shadow-inner">
                <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <FiUpload className="text-gray-400 dark:text-white" size={28}/>
                </div>
                <div className="text-center">
                  <p className="text-[#1a1a1a] dark:text-white font-black uppercase tracking-widest text-sm mb-2">Ingest Node</p>
                  <p className="text-gray-400 text-[10px] font-medium uppercase tracking-[0.2em]">Select imagery for processing</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden"/>
              </label>
            ) : (
              <div className="space-y-8">
                <div className="relative group bg-gray-50 dark:bg-black/20 rounded-[2rem] p-6 border border-gray-100 dark:border-[#ffffff05] flex flex-col items-center justify-center min-h-[280px]">
                  <img src={img} alt="Current" className="max-h-56 rounded-xl object-contain shadow-2xl transition-transform group-hover:scale-[1.02]"/>
                  <button 
                    onClick={() => {setImg(null); setResult(null);}} 
                    className="absolute top-4 right-4 p-3 rounded-full bg-white dark:bg-zinc-900 text-red-500 shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    title="Remove Image"
                  >
                    <FiUpload className="rotate-180" size={14}/>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50/50 dark:bg-white/5 p-6 rounded-[2rem] border border-gray-100 dark:border-[#ffffff03]">
                    <label className="text-gray-400 text-[8px] font-black uppercase tracking-widest mb-4 block ml-1">Format Specification</label>
                    <div className="flex flex-wrap gap-2">
                      {FMTS.map(f=>(
                        <button 
                          key={f.mime} 
                          onClick={()=>setFmt(f.mime)} 
                          className={`flex-1 min-w-[80px] py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${fmt===f.mime?'bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a] shadow-xl scale-105':'bg-white dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 hover:text-[#1a1a1a] dark:hover:text-white'}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(fmt==='image/jpeg'||fmt==='image/webp') && (
                    <div className="bg-gray-50/50 dark:bg-white/5 p-6 rounded-[2rem] border border-gray-100 dark:border-[#ffffff03]">
                      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest mb-4">
                        <span className="text-gray-400">Resolution Fidelity</span>
                        <span className="text-[#1a1a1a] dark:text-white">{q}%</span>
                      </div>
                      <input type="range" min="10" max="100" value={q} onChange={e=>setQ(+e.target.value)} className="w-full accent-[#1a1a1a] dark:accent-white cursor-pointer"/>
                    </div>
                  )}

                  <button onClick={convert} className="w-full py-5 rounded-[1.5rem] text-white dark:text-[#1a1a1a] font-black uppercase tracking-widest bg-[#1a1a1a] dark:bg-white hover:scale-[1.02] transition-all shadow-2xl active:scale-95 text-xs">
                    Initialize Conversion
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Result Output */}
          <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="result"
                  className="bg-[#1a1a1a] dark:bg-white rounded-[2.5rem] p-8 lg:p-10 relative flex-1 flex flex-col group shadow-2xl transition-colors min-h-[400px]"
                >
                  <div className="absolute inset-0 bg-white/5 dark:bg-[#1a1a1a]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"/>
                  <label className="text-white/40 dark:text-[#1a1a1a]/40 text-[8px] font-black uppercase tracking-widest block mb-6">Converted Output Result</label>
                  
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="p-4 bg-white/5 dark:bg-[#1a1a1a]/5 rounded-[2rem] border border-white/10 dark:border-[#1a1a1a]/10 mb-8 shadow-inner group-hover:scale-[1.02] transition-transform">
                      <img src={result.data} alt="Result" className="max-h-64 rounded-xl object-contain"/>
                    </div>
                    
                    <a href={result.data} download={`yukt_converted.${FMTS.find(f=>f.mime===result.fmt)?.ext}`} className="w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all active:scale-95 text-xs">
                      Export {FMTS.find(f=>f.mime===result.fmt)?.label}
                    </a>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <span className="text-white/20 dark:text-[#1a1a1a]/20 text-[6px] font-black uppercase tracking-[0.4em]">YUKT IMAGERY PROTOCOL V2.0</span>
                  </div>
                </motion.div>
              ) : (
                <div key="empty" className="flex-1 rounded-[2.5rem] border-2 border-dashed border-gray-100 dark:border-[#ffffff05] flex flex-col items-center justify-center p-12 text-center opacity-40 grayscale">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                    <FiUpload className="text-gray-300 dark:text-zinc-700" size={32}/>
                  </div>
                  <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] leading-relaxed">
                    Output buffer empty.<br/>Awaiting system processing.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </ToolLayout>
  );
}
