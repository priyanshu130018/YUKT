import { useState, useRef } from 'react';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useTools } from '../../context/ToolContext';
import { FiUpload } from 'react-icons/fi';

export default function ImageToPDF() {
  const [images, setImages] = useState([]); const [loading, setLoading] = useState(false); const [url, setUrl] = useState(null);
  const fileRef = useRef(); const { addHistory } = useTools();

  const onFiles = (e) => { setImages(prev=>[...prev,...Array.from(e.target.files).map(f=>({file:f,url:URL.createObjectURL(f)}))]); setUrl(null); };

  const convert = async () => {
    if(!images.length) return; setLoading(true);
    try {
      const {jsPDF} = await import('jspdf');
      const doc = new jsPDF(); let first=true;
      for(const {url,file} of images){
        await new Promise(res=>{
          const img=new Image(); img.onload=()=>{
            const pw=doc.internal.pageSize.getWidth(), ph=doc.internal.pageSize.getHeight();
            const r=Math.min(pw/img.width,ph/img.height); const w=img.width*r, h=img.height*r;
            if(!first) doc.addPage(); first=false;
            doc.addImage(img,file.type.includes('png')?'PNG':'JPEG',(pw-w)/2,(ph-h)/2,w,h);
            res();
          }; img.src=url;
        });
      }
      setUrl(URL.createObjectURL(doc.output('blob')));
      addHistory({toolName:'Image to PDF',category:'pdf-tools',action:`Converted ${images.length} images to PDF`});
    } catch(e){alert('Error: '+e.message);}
    setLoading(false);
  };

  return (
    <ToolLayout toolId="image-to-pdf">
      <div className="flex-1 flex flex-col items-center p-8 max-w-2xl mx-auto w-full">
        <h2 className="text-[#1a1a1a] dark:text-white text-3xl font-black mb-10 uppercase tracking-tight text-center">Images to PDF Architect</h2>
        <label onClick={()=>fileRef.current?.click()} className="w-full border-2 border-dashed border-gray-200 dark:border-[#ffffff10] bg-white dark:bg-zinc-900/40 rounded-2xl p-12 text-center cursor-pointer hover:border-[#1a1a1a] dark:hover:border-white hover:bg-gray-50 dark:hover:bg-white/5 mb-8 transition-all group shadow-sm">
          <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-all">
            <FiUpload className="text-gray-400 group-hover:text-[#1a1a1a] dark:text-white" size={32}/>
          </div>
          <p className="text-[#1a1a1a] dark:text-white font-black uppercase tracking-widest text-sm">Upload images (each = 1 PDF page)</p>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tight mt-2 italic opacity-60">Supports multi-selection for sequential synthesis</p>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={onFiles} className="hidden"/>
        </label>
        {images.length>0&&<div className="w-full grid grid-cols-4 sm:grid-cols-6 gap-3 mb-8">
          {images.map((i,idx)=><div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 dark:border-[#ffffff05] shadow-sm">
            <img src={i.url} alt="" className="w-full h-full object-cover"/>
            <span className="absolute top-1 left-1 bg-[#1a1a1a]/80 dark:bg-white/80 text-white dark:text-[#1a1a1a] text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-lg">{String(idx+1).padStart(2,'0')}</span>
          </div>)}
        </div>}
        <div className="flex gap-4 w-full">
          <button onClick={convert} disabled={!images.length||loading} className="flex-1 py-4 rounded-xl text-white dark:text-[#1a1a1a] font-black uppercase tracking-widest bg-[#1a1a1a] dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-200 transition-all shadow-xl disabled:opacity-50 active:scale-95">
            {loading?'Synthesizing...':images.length?`Execute ${images.length} Image Fusion`:'Awaiting Assets'}
          </button>
          {images.length>0&&<button onClick={()=>{setImages([]);setUrl(null);}} className="p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-[#ffffff10] text-gray-400 hover:text-red-600 transition-all shadow-sm group">
            <FiUpload className="rotate-45 group-active:scale-110 transition-transform" />
          </button>}
        </div>
        {url&&<a href={url} download="synthesis.pdf" className="flex items-center gap-3 px-12 py-5 rounded-2xl bg-green-500 text-white font-black uppercase tracking-widest shadow-2xl hover:bg-green-600 transition-all mt-10 active:scale-95">
          Download Encoded PDF
        </a>}
      </div>
    </ToolLayout>
  );
}
