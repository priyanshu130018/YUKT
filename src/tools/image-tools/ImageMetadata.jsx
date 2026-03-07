import { useState, useRef } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useTools } from '../../context/ToolContext';
import { FiUpload } from 'react-icons/fi';

export default function ImageMetadata() {
  const [meta, setMeta] = useState(null);
  const fileRef = useRef(); const { addHistory } = useTools();

  const onFile = (e) => {
    const f=e.target.files[0]; if(!f) return;
    const url=URL.createObjectURL(f); const img=new Image();
    img.onload=()=>{ setMeta({name:f.name,type:f.type,size:f.size,width:img.width,height:img.height,modified:new Date(f.lastModified).toLocaleString(),aspect:(img.width/img.height).toFixed(3),mp:((img.width*img.height)/1e6).toFixed(2),url}); addHistory({toolName:'Image Metadata',category:'image-tools',action:`Viewed: ${f.name}`}); };
    img.src=url;
  };

  return (
    <ToolLayout toolId="image-metadata">
      <div className="flex-1 flex flex-col items-center p-8 max-w-4xl mx-auto w-full">
        <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-8 uppercase tracking-tight text-center">Image Inspector</h2>
        
        {!meta ? (
          <label onClick={()=>fileRef.current?.click()} className="w-full h-56 border-2 border-dashed border-gray-200 dark:border-[#ffffff10] bg-white dark:bg-zinc-900/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1a1a1a] dark:hover:border-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all group shadow-sm">
            <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-all">
              <FiUpload className="text-gray-400 group-hover:text-[#1a1a1a] dark:text-white" size={24}/>
            </div>
            <p className="text-[#1a1a1a] dark:text-white font-black uppercase tracking-widest text-xs font-bold">Upload Image to Inspect Metadata</p>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden"/>
          </label>
        ) : (
          <div className="w-full grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-zinc-900/40 rounded-2xl p-6 border border-gray-100 dark:border-[#ffffff10] shadow-sm flex flex-col items-center h-fit">
              <div className="relative group overflow-hidden rounded-xl border border-gray-100 dark:border-[#ffffff05] mb-4 bg-gray-50 dark:bg-[#1a1a1a]/40 p-2 w-full">
                <img src={meta.url} alt="" className="max-h-64 rounded-lg object-contain shadow-sm mx-auto"/>
              </div>
              <button 
                onClick={() => setMeta(null)} 
                className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
              >
                Inspect Different File
              </button>
            </div>

            <div className="bg-white dark:bg-zinc-900/40 rounded-2xl border border-gray-100 dark:border-[#ffffff10] shadow-xl overflow-hidden divide-y divide-gray-50 dark:divide-[#ffffff05]">
              <div className="px-6 py-4 bg-[#1a1a1a] dark:bg-white transition-colors">
                <h3 className="text-white dark:text-[#1a1a1a] text-[10px] font-black uppercase tracking-[0.2em]">File Properties</h3>
              </div>
              {[
                ['Filename', meta.name],
                ['Media Type', meta.type],
                ['Payload Size', `${(meta.size/1024).toFixed(1)} KB`],
                ['Dimensions', `${meta.width} × ${meta.height} px`],
                ['Resolution', `${meta.mp} Megapixels`],
                ['Aspect Ratio', `${meta.aspect}:1`],
                ['Last Modified', meta.modified]
              ].map(([k,v])=>(
                <div key={k} className="flex flex-col px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <span className="text-gray-400 text-[8px] font-black uppercase tracking-widest mb-1">{k}</span>
                  <span className="text-[#1a1a1a] dark:text-white text-sm font-black break-all">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
