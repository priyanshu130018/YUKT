import MainLayout from '../../components/layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEyeOff, FiDatabase } from 'react-icons/fi';

export default function Privacy() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl">
            <FiShield size={32} />
          </div>
          <h1 className="text-5xl font-black text-[#1a1a1a] uppercase tracking-tighter italic mb-4">Privacy Policy</h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">Data Sovereignty & Security Protocol</p>
        </motion.div>

        <div className="space-y-8">
          <section className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FiLock size={20} />
              </div>
              <h2 className="text-[#1a1a1a] text-xl font-black uppercase tracking-tight">Zero Transmission Policy</h2>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed">
              YUKT implements a strict hardware-local processing model. When you use any tool on this platform—be it the Image Resizer, PDF Merger, or Password Generator—your files and data are processed entirely within your browser's execution thread. We do not transmit, upload, or store your content on any remote server.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <FiEyeOff className="text-[#1a1a1a] mb-4" size={24} />
              <h3 className="text-[#1a1a1a] font-black text-lg mb-4 uppercase tracking-tight">No Cookies</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                We do not use tracking cookies, advertising IDs, or third-party analytics pixels. Your session is anonymous and private.
              </p>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <FiDatabase className="text-amber-500 mb-4" size={24} />
              <h3 className="text-[#1a1a1a] font-black text-lg mb-4 uppercase tracking-tight">Local Storage</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Data like your 'Favorites' or 'Tool History' is stored exclusively in your browser's LocalStorage. You can purge this data at any time via the platform settings.
              </p>
            </section>
          </div>

          <section className="bg-gray-50 p-10 rounded-3xl border border-gray-100 prose prose-slate max-w-none">
            <h3 className="text-[#1a1a1a] font-black uppercase tracking-tight mb-4">Operational Compliance</h3>
            <p className="text-gray-600 font-medium text-sm">
              This platform is compliant with GDPR, CCPA, and other global data protection regulations by virtue of its decentralized architecture. Since no personal data is collected or processed by YUKT servers, your data sovereignty is maintained by default.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
