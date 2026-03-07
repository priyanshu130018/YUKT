import { useState, useRef } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useTools } from '../../context/ToolContext';
import { FiUpload } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';

export default function ImageCompressor() {
  const [orig, setOrig] = useState(null); const [compressed, setCompressed] = useState(null);
  const [quality, setQuality] = useState(80); const [loading, setLoading] = useState(false);
  const fileRef = useRef(); const { addHistory } = useTools();

  const onFile = (e) => { const f=e.target.files[0]; if(!f) return; setOrig({file:f,url:URL.createObjectURL(f),size:f.size}); setCompressed(null); };

  const compress = async () => {
    if(!orig) return; setLoading(true);
    try {
      const res=await imageCompression(orig.file,{maxSizeMB:10,useWebWorker:true,initialQuality:quality/100});
      setCompressed({url:URL.createObjectURL(res),size:res.size,file:res});
      addHistory({toolName:'Image Compressor',category:'image-tools',action:`${(orig.size/1024).toFixed(0)}KB → ${(res.size/1024).toFixed(0)}KB`});
    } catch{}
    setLoading(false);
  };

  const ratio = orig&&compressed ? (100-(compressed.size/orig.size)*100).toFixed(1) : null;

  return (
    <ToolLayout toolId="image-compressor">
      <div className="flex-1 flex flex-col items-center p-8 max-w-4xl mx-auto w-full">
        <h2 className="text-black dark:text-white text-3xl font-black mb-8 uppercase tracking-tight text-center">Image Compressor</h2>
        
        {!orig && (
          <label onClick={()=>fileRef.current?.click()} className="w-full h-64 border-2 border-dashed border-gray-200 dark:border-[#ffffff10] bg-white dark:bg-zinc-900/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[black] dark:hover:border-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group shadow-sm">
            <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-all">
              <FiUpload className="text-gray-400 group-hover:text-black dark:text-white" size={32}/>
            </div>
            <p className="text-black dark:text-white font-black uppercase tracking-widest text-sm">Upload Image to Compress</p>
            <p className="text-gray-400 text-xs mt-2 uppercase tracking-tight">Reduces file size while maintaining quality</p>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden"/>
          </label>
        )}

        {orig && (<>
          <div className="w-full bg-white dark:bg-zinc-900/40 rounded-2xl p-8 border border-gray-100 dark:border-[#ffffff10] shadow-lg mb-8 transition-colors">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-1 w-full">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                  <span className="text-gray-500">Compression Level (Quality)</span>
                  <span className="text-black dark:text-white font-black text-sm">{quality}%</span>
                </div>
                <input type="range" min="10" max="100" value={quality} onChange={e=>setQuality(+e.target.value)} className="w-full accent-[black] dark:accent-white cursor-pointer"/>
              </div>
              <button 
                onClick={compress} 
                disabled={loading} 
                className="w-full sm:w-auto px-10 py-4 rounded-xl text-white dark:text-black font-black uppercase tracking-widest bg-[black] dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-200 transition-all shadow-lg disabled:opacity-50 active:scale-95"
              >
                {loading ? 'Processing...' : 'Run Compression'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {[
              {u:orig.url, s:orig.size, l:'Original Master File', type:'source'},
              {u:compressed?.url, s:compressed?.size, l:compressed?`Compressed Result (-${ratio}%)`:'Pending...', type:'result'}
            ].map((item, idx)=>(
              <div key={idx} className={`bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-[#ffffff10] shadow-sm flex flex-col ${item.type==='result'&&compressed?'ring-2 ring-[black]/20 dark:ring-white/20 bg-gray-50/50 dark:bg-white/10':''}`}>
                <p className="text-black dark:text-white text-[10px] font-black uppercase tracking-widest mb-4">{item.l}</p>
                <div className="flex-1 bg-gray-50 dark:bg-black/40 rounded-xl overflow-hidden border border-gray-100 dark:border-[#ffffff05] mb-4 p-2">
                  {item.u ? (
                    <img src={item.u} alt="" className="w-full h-48 object-contain rounded-lg"/>
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center text-gray-300 dark:text-zinc-700 font-black italic">Awaiting optimization...</div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[black] dark:text-white font-black text-lg transition-all">{(item.s/1024||0).toFixed(1)} <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-zinc-500">KB</span></p>
                  {item.type==='result' && item.u && (
                    <a href={item.u} download="optimized_image.jpg" className="px-6 py-2 rounded-lg bg-[black] dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 dark:hover:bg-gray-200 transition-all shadow-md">
                      Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => {setOrig(null); setCompressed(null);}} 
            className="mt-8 text-xs font-black text-red-600 uppercase tracking-widest hover:underline"
          >
            Start Over with New File
          </button>
        </>)}
      </div>
    </ToolLayout>
  );
}
