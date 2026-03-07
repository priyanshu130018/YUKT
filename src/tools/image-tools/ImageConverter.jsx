import { useState, useRef } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useTools } from '../../context/ToolContext';
import { FiUpload } from 'react-icons/fi';

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
      <div className="flex-1 flex flex-col items-center p-8 max-w-2xl mx-auto w-full">
        <h2 className="text-black dark:text-white text-3xl font-black mb-8 uppercase tracking-tight text-center">Format Converter</h2>
        
        {!img ? (
          <label onClick={()=>fileRef.current?.click()} className="w-full h-56 border-2 border-dashed border-gray-200 dark:border-[#ffffff10] bg-white dark:bg-zinc-900/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[black] dark:hover:border-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group shadow-sm">
            <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-all">
              <FiUpload className="text-gray-400 group-hover:text-black dark:text-white" size={24}/>
            </div>
            <p className="text-black dark:text-white font-black uppercase tracking-widest text-xs">Upload Image to Convert</p>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden"/>
          </label>
        ) : (
          <div className="w-full space-y-6">
            <div className="bg-white dark:bg-zinc-900/40 rounded-2xl p-6 border border-gray-100 dark:border-[#ffffff10] shadow-sm flex flex-col items-center relative group">
              <img src={img} alt="Current" className="max-h-48 rounded-lg object-contain shadow-sm border border-gray-100 dark:border-[#ffffff05] p-1"/>
              <button 
                onClick={() => setImg(null)} 
                className="mt-4 text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
              >
                Remove Image
              </button>
            </div>

            <div className="bg-white dark:bg-zinc-900/40 rounded-2xl p-6 border border-gray-100 dark:border-[#ffffff10] shadow-lg space-y-6">
              <div>
                <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-3 block ml-1 text-center">Select Target Format</label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {FMTS.map(f=>(
                    <button 
                      key={f.mime} 
                      onClick={()=>setFmt(f.mime)} 
                      className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 ${fmt===f.mime?'bg-[black] text-white dark:bg-white dark:text-black':'bg-gray-50 text-gray-400 dark:bg-white/5 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {(fmt==='image/jpeg'||fmt==='image/webp') && (
                <div className="w-full px-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                    <span className="text-gray-500">Output Quality</span>
                    <span className="text-black dark:text-white font-black">{q}%</span>
                  </div>
                  <input type="range" min="10" max="100" value={q} onChange={e=>setQ(+e.target.value)} className="w-full accent-[black] dark:accent-white cursor-pointer"/>
                </div>
              )}

              <button onClick={convert} className="w-full py-4 rounded-xl text-white dark:text-black font-black uppercase tracking-widest bg-[black] dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-200 transition-all shadow-lg active:scale-95">Run Conversion</button>
            </div>
          </div>
        )}

        {result && (
          <div className="w-full mt-8 bg-[black] dark:bg-white rounded-2xl p-8 flex flex-col items-center animate-in zoom-in-95 duration-300 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"/>
            <p className="text-white/40 dark:text-black/40 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Converted Result</p>
            <div className="p-2 bg-white/5 dark:bg-black/5 rounded-xl border border-white/10 dark:border-black/10 mb-6 shadow-2xl">
              <img src={result.data} alt="Result" className="max-h-48 rounded-lg object-contain shadow-sm"/>
            </div>
            <a href={result.data} download={`yukt_converted.${FMTS.find(f=>f.mime===result.fmt)?.ext}`} className="flex items-center gap-3 px-10 py-4 rounded-xl bg-white dark:bg-black text-black dark:text-white font-black uppercase tracking-widest shadow-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all active:scale-95">
              Download {FMTS.find(f=>f.mime===result.fmt)?.label}
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
