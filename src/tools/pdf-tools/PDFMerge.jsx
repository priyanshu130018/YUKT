import { useState, useRef } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useTools } from '../../context/ToolContext';
import { FiUpload, FiX } from 'react-icons/fi';

export default function PDFMerge() {
  const [files, setFiles] = useState([]); const [loading, setLoading] = useState(false); const [url, setUrl] = useState(null);
  const fileRef = useRef(); const { addHistory } = useTools();

  const addFiles = (e) => { setFiles(prev=>[...prev,...Array.from(e.target.files).filter(f=>f.type==='application/pdf')]); setUrl(null); };
  const remove = (i) => setFiles(prev=>prev.filter((_,idx)=>idx!==i));

  const merge = async () => {
    if(files.length<2) return; setLoading(true);
    try {
      const {PDFDocument} = await import('pdf-lib');
      const merged = await PDFDocument.create();
      for(const f of files){ const buf=await f.arrayBuffer(); const doc=await PDFDocument.load(buf); const pages=await merged.copyPages(doc,doc.getPageIndices()); pages.forEach(p=>merged.addPage(p)); }
      const bytes=await merged.save();
      setUrl(URL.createObjectURL(new Blob([bytes],{type:'application/pdf'})));
      addHistory({toolName:'PDF Merger',category:'pdf-tools',action:`Merged ${files.length} PDFs`});
    } catch(e){alert('Error: '+e.message);}
    setLoading(false);
  };

  return (
    <ToolLayout toolId="pdf-merger">
      <div className="flex-1 flex flex-col items-center p-8 max-w-2xl mx-auto w-full">
        <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-10 uppercase tracking-tight text-center">PDF Sequential Merger</h2>
        <label onClick={()=>fileRef.current?.click()} className="w-full border-2 border-dashed border-gray-200 dark:border-[#ffffff10] bg-white dark:bg-zinc-900/40 rounded-2xl p-12 text-center cursor-pointer hover:border-[#1a1a1a] dark:hover:border-white hover:bg-gray-50 dark:hover:bg-white/5 mb-8 transition-all group shadow-sm">
          <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-all">
            <FiUpload className="text-gray-400 group-hover:text-[#1a1a1a] dark:text-white" size={32}/>
          </div>
          <p className="text-[#1a1a1a] dark:text-white font-black uppercase tracking-widest text-sm">Add PDF documents to merge</p>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tight mt-2 italic opacity-60">Sequence is determined by upload order</p>
          <input ref={fileRef} type="file" accept=".pdf" multiple onChange={addFiles} className="hidden"/>
        </label>
        {files.map((f,i)=>(
          <div key={i} className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-[#ffffff10] mb-3 transition-all group hover:border-[#1a1a1a]/10 dark:hover:border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-gray-300 dark:text-zinc-600 text-[10px] font-black w-6">#{String(i+1).padStart(2,'0')}</span>
              <span className="text-[#1a1a1a] dark:text-white text-sm font-black truncate">{f.name}</span>
            </div>
            <button onClick={()=>remove(i)} className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
              <FiX size={16}/>
            </button>
          </div>
        ))}
        <button onClick={merge} disabled={files.length<2||loading} className="w-full py-4 rounded-xl text-white dark:text-[#1a1a1a] font-black uppercase tracking-widest bg-[#1a1a1a] dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-200 transition-all shadow-xl disabled:opacity-50 active:scale-95 mt-6">
          {loading?'Executing Merge...':files.length<2?'Awaiting Documents':`Synthesize ${files.length} PDFs`}
        </button>
        {url&&<a href={url} download="merged_document.pdf" className="flex items-center gap-3 px-12 py-5 rounded-2xl bg-green-500 text-white font-black uppercase tracking-widest shadow-2xl hover:bg-green-600 transition-all mt-10 active:scale-95">
          Download Merged Asset
        </a>}
      </div>
    </ToolLayout>
  );
}
