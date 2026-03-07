import MainLayout from '../../components/layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiInfo, FiServer, FiShield, FiCpu } from 'react-icons/fi';

export default function About() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 rounded-3xl bg-[black] text-white flex items-center justify-center mx-auto mb-6 shadow-xl">
            <FiInfo size={32} />
          </div>
          <h1 className="text-5xl font-black text-[black] uppercase tracking-tighter italic mb-4">About YUKT</h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">Your Ultimate Kit of Tools — Technical Specification</p>
        </motion.div>

        <div className="space-y-12">
          <section className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-black dark:text-white text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
              <FiCpu /> The Philosophy
            </h2>
            <div className="prose prose-slate max-w-none text-gray-600 font-medium leading-relaxed">
              <p>
                YUKT was architected with a single objective: to provide a high-performance, professional toolkit that respects user privacy by design. We believe that common utilities—like image compressors, PDF mergers, and code formatters—should not require data transmission to remote servers.
              </p>
              <p>
                By shifting the compute workload from the cloud to the client, YUKT ensures that your sensitive documents and data packets never leave your local terminal. This "Local-First" approach eliminates latency, prevents data harvesting, and provides a truly secure environment for professional workflows.
              </p>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <FiShield className="text-emerald-500 mb-4" size={24} />
              <h3 className="text-[black] font-black text-lg mb-4 uppercase tracking-tight">Privacy Protocol</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Our protocol dictates a zero-server-storage policy. All features, including Favorite tracking and Tool History, are managed via your browser's LocalStorage. We do not implement tracking cookies or third-party telemetry.
              </p>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <FiServer className="text-black mb-4" size={24} />
              <h3 className="text-[black] font-black text-lg mb-4 uppercase tracking-tight">Client-Side Compute</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                We leverage modern Web APIs, Canvas API, and WebAssembly (Wasm) to perform complex operations like image manipulation and video processing directly within the browser thread.
              </p>
            </section>
          </div>

          <section className="bg-[black] p-12 rounded-3xl text-white text-center">
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter italic">Open Access Protocol</h2>
            <p className="text-black font-medium mb-8 max-w-2xl mx-auto">
              YUKT is free to use for individuals and corporations. No account registry, no subscription tiers, and no advertisements. Just pure, functional utilities.
            </p>
            <div className="flex justify-center gap-4">
              <div className="px-6 py-2 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-[0.2em]">v2.4.0-Stable</div>
              <div className="px-6 py-2 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-[0.2em]">Build: Node-293</div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
