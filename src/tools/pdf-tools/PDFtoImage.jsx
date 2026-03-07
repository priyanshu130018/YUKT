import { useState, useRef } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useTools } from '../../context/ToolContext';
import { FiUpload } from 'react-icons/fi';

export default function PDFtoImage() {
  const [pages, setPages] = useState([]); const [loading, setLoading] = useState(false);
  const fileRef = useRef(); const { addHistory } = useTools();

  const onFile = async (e) => {
    const f=e.target.files[0]; if(!f) return; setLoading(true); setPages([]);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const pdf=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;
      const rendered=[];
      for(let i=1;i<=Math.min(pdf.numPages,5);i++){
        const page=await pdf.getPage(i); const vp=page.getViewport({scale:1.5});
        const c=document.createElement('canvas'); c.width=vp.width; c.height=vp.height;
        await page.render({canvasContext:c.getContext('2d'),viewport:vp}).promise;
        rendered.push({url:c.toDataURL('image/png'),page:i});
      }
      setPages(rendered);
      addHistory({toolName:'PDF to Image',category:'pdf-tools',action:`Converted ${rendered.length} pages from ${f.name}`});
    } catch(e){alert('Error: '+e.message);}
    setLoading(false);
  };

  return (
    <ToolLayout toolId="pdf-to-image">
      <div className="flex-1 flex flex-col items-center p-8 max-w-2xl mx-auto w-full">
        <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-2 uppercase tracking-tight text-center">PDF to Image Converter</h2>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-10 opacity-60">Extract up to 5 sequential frames</p>
        <label onClick={()=>fileRef.current?.click()} className="w-full border-2 border-dashed border-gray-200 dark:border-[#ffffff10] bg-white dark:bg-zinc-900/40 rounded-2xl p-12 text-center cursor-pointer hover:border-[#1a1a1a] dark:hover:border-white hover:bg-gray-50 dark:hover:bg-white/5 mb-10 transition-all group shadow-sm">
          <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-all">
            <FiUpload className="text-gray-400 group-hover:text-[#1a1a1a] dark:text-white" size={32}/>
          </div>
          <p className="text-[#1a1a1a] dark:text-white font-black uppercase tracking-widest text-sm">{loading?'Executing Extraction...':'Upload PDF Document'}</p>
          <input ref={fileRef} type="file" accept=".pdf" onChange={onFile} className="hidden" disabled={loading}/>
        </label>
        {pages.length>0&&<div className="w-full grid sm:grid-cols-2 gap-6">
          {pages.map(({url,page})=>(
            <div key={page} className="bg-white dark:bg-zinc-900/40 rounded-2xl overflow-hidden border border-gray-100 dark:border-[#ffffff10] shadow-xl group hover:border-[#1a1a1a]/10 dark:hover:border-white/10 transition-all">
              <div className="p-3 bg-gray-50 dark:bg-[#1a1a1a]/40 border-b border-gray-100 dark:border-[#ffffff05]">
                <img src={url} alt={`Page ${page}`} className="w-full object-contain rounded-lg shadow-sm bg-white"/>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Mark #{String(page).padStart(2,'0')}</span>
                <a href={url} download={`page_${page}.png`} className="px-6 py-2 rounded-xl bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 dark:hover:bg-gray-200 transition-all shadow-md active:scale-95">
                  Export PNG
                </a>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </ToolLayout>
  );
}
