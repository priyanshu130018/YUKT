import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xl bg-[#003366] shadow-md">Y</div>
              <span className="font-black text-2xl tracking-tighter text-[#003366]">YUKT</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed font-medium italic">High-availability suite of browser-resident utilities. Zero account registry protocol. 100% private local execution.</p>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-10">
            {[['Tools','/'],['Service','/'],['About','#about'],['Contact','/']].map(([l,p]) => (
              <a key={l} href={p} className="text-[#003366] hover:text-blue-700 font-black transition-colors text-xs uppercase tracking-[0.2em]">{l}</a>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10 flex flex-col items-center">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Government-Standard Data Security</p>
          <p className="text-gray-300 text-[9px] font-bold italic">© {new Date().getFullYear()} YUKT Platform Control — Digital Sovereignty Guaranteed.</p>
        </div>
      </div>
    </footer>
  );
}
