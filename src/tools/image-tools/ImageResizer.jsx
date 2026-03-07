import { useState, useRef } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useTools } from '../../context/ToolContext';
import { FiUpload } from 'react-icons/fi';

export default function ImageResizer() {
  const [img, setImg] = useState(null); const [orig, setOrig] = useState(null);
  const [w, setW] = useState(''); const [h, setH] = useState(''); const [lock, setLock] = useState(true);
  const [result, setResult] = useState(null);
  const fileRef = useRef();
  const { addHistory } = useTools();

  const onFile = (e) => { const f=e.target.files[0]; if(!f) return; const url=URL.createObjectURL(f); const i=new Image(); i.onload=()=>{setImg(url);setOrig({w:i.width,h:i.height});setW(i.width);setH(i.height);setResult(null);}; i.src=url; };
  const onW = (v) => { setW(v); if(lock&&orig) setH(Math.round(+v*orig.h/orig.w)); };
  const onH = (v) => { setH(v); if(lock&&orig) setW(Math.round(+v*orig.w/orig.h)); };
  const resize = () => {
    const c=document.createElement('canvas'); c.width=+w; c.height=+h; const i=new Image(); i.onload=()=>{ c.getContext('2d').drawImage(i,0,0,+w,+h); setResult(c.toDataURL()); addHistory({toolName:'Image Resizer',category:'image-tools',action:`Resized to ${w}×${h}`}); }; i.src=img;
  };

  return (
    <ToolLayout toolId="image-resizer">
      <div className="flex-1 flex flex-col items-center p-8 max-w-4xl mx-auto w-full">
        <h2 className="text-black dark:text-white text-3xl font-black mb-8 uppercase tracking-tight text-center">Image Resizer</h2>
        
        {!img ? (
          <label onClick={()=>fileRef.current?.click()} className="w-full h-64 border-2 border-dashed border-gray-200 dark:border-[#ffffff10] bg-white dark:bg-zinc-900/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[black] dark:hover:border-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
            <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-all">
              <FiUpload className="text-gray-400 group-hover:text-black dark:text-white" size={32}/>
            </div>
            <p className="text-black dark:text-white font-black uppercase tracking-widest text-sm">Upload Image to Resize</p>
            <p className="text-gray-400 text-xs mt-2 uppercase tracking-tight">Supports PNG, JPG, WEBP — Max 10MB</p>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden"/>
          </label>
        ) : (
          <div className="w-full space-y-8">
            <div className="bg-white dark:bg-zinc-900/40 rounded-2xl p-6 border border-gray-100 dark:border-[#ffffff10] shadow-sm flex flex-col items-center">
              <div className="relative group overflow-hidden rounded-xl border border-gray-100 dark:border-[#ffffff05] mb-4 bg-gray-50 dark:bg-black/40 p-2">
                <img src={img} alt="Original" className="max-h-64 rounded-lg object-contain shadow-sm"/>
                <div className="absolute inset-0 bg-[#0a0a0a]/5 opacity-0 group-hover:opacity-100 transition-all"/>
              </div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Master File: {orig?.w} × {orig?.h}px</p>
              <button 
                onClick={() => {setImg(null); setResult(null);}} 
                className="mt-4 text-xs font-black text-red-600 uppercase tracking-widest hover:underline"
              >
                Change Image
              </button>
            </div>

            <div className="bg-white dark:bg-zinc-900/40 rounded-2xl p-8 border border-gray-100 dark:border-[#ffffff10] shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                <div className="space-y-2">
                  <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1">Width (px)</label>
                  <input type="number" value={w} onChange={e=>onW(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-[#ffffff10] text-black dark:text-white font-black focus:ring-1 focus:ring-[black] dark:focus:ring-white outline-none"/>
                </div>
                <div className="flex flex-col items-center pb-3">
                  <button onClick={()=>setLock(!lock)} className={`p-2 rounded-lg transition-all shadow-sm ${lock?'bg-[black] text-white dark:bg-white dark:text-black':'bg-gray-100 text-gray-400 dark:bg-white/5'}`}>
                    {lock ? '🔒' : '🔓'}
                  </button>
                  <span className="text-[8px] font-black uppercase tracking-tighter mt-1 text-gray-400">{lock?'Synced':'Free'}</span>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest ml-1">Height (px)</label>
                  <input type="number" value={h} onChange={e=>onH(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-[#ffffff10] text-black dark:text-white font-black focus:ring-1 focus:ring-[black] dark:focus:ring-white outline-none"/>
                </div>
              </div>
              <button onClick={resize} className="w-full mt-8 py-4 rounded-xl text-white dark:text-black font-black uppercase tracking-widest bg-[black] dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-200 transition-all shadow-lg active:scale-[0.98]">Process Resizing</button>
            </div>
          </div>
        )}

        {result && (
          <div className="w-full mt-8 bg-[black] dark:bg-white rounded-2xl p-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-5 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"/>
            <div className="mb-6 p-2 bg-white/10 dark:bg-black/5 rounded-xl backdrop-blur-sm border border-white/5 dark:border-black/5 shadow-2xl">
              <img src={result} alt="Resized Result" className="max-h-64 rounded-lg shadow-sm border border-white/10 dark:border-black/10"/>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <p className="text-white dark:text-black font-black uppercase tracking-widest text-lg">Resizing Complete</p>
                <p className="text-white/60 dark:text-black/60 text-xs font-bold uppercase mt-1">Output Size: {w} × {h}px</p>
              </div>
              <a href={result} download={`yukt_resized_${w}x${h}.png`} className="flex items-center gap-3 px-10 py-4 rounded-xl bg-white dark:bg-black text-black dark:text-white font-black uppercase tracking-widest shadow-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all active:scale-95">
                Download Final Image
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
