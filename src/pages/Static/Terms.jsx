import MainLayout from '../../components/layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiFileText, FiCheckCircle, FiAlertCircle, FiShield } from 'react-icons/fi';

export default function Terms() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 rounded-3xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl">
            <FiFileText size={32} />
          </div>
          <h1 className="text-5xl font-black text-[#1a1a1a] uppercase tracking-tighter italic mb-4">Terms of Service</h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">Legal Framework & Usage License</p>
        </motion.div>

        <div className="space-y-12">
          <section className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm transition-all hover:border-[#1a1a1a]">
            <h2 className="text-[#1a1a1a] dark:text-white text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
              <FiCheckCircle className="text-emerald-500" /> Usage License
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-4">
              YUKT grants you a non-exclusive, worldwide, royalty-free license to use the available tools for personal, educational, or commercial purposes. There are no restrictions on the volume of operations you can perform.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <FiAlertCircle className="text-amber-500 mb-4" size={24} />
              <h3 className="text-[#1a1a1a] font-black text-lg mb-4 uppercase tracking-tight">Disclaimer</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Tools are provided "as is" without warranty of any kind. While we strive for 100% accuracy, YUKT is not liable for any losses or damages resulting from the use of its computational outputs.
              </p>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <FiShield className="text-[#1a1a1a] mb-4" size={24} />
              <h3 className="text-[#1a1a1a] font-black text-lg mb-4 uppercase tracking-tight">Data Sovereignty</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                You retain full ownership and responsibility for any data you process using YUKT. Since we never see or store your data, its security remains your sole responsibility.
              </p>
            </section>
          </div>

          <section className="bg-[#1a1a1a] p-10 rounded-3xl text-white">
            <h3 className="text-xl font-black uppercase tracking-tight mb-6 italic">Prohibited Activities</h3>
            <ul className="grid md:grid-cols-2 gap-4 text-sm font-medium text-gray-300">
              <li className="flex items-center gap-2 italic">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Automated scraping of the platform
              </li>
              <li className="flex items-center gap-2 italic">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Reverse engineering the compute kernels
              </li>
              <li className="flex items-center gap-2 italic">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Redistributing the tools as a paid service
              </li>
              <li className="flex items-center gap-2 italic">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Bypassing site security measures
              </li>
            </ul>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
