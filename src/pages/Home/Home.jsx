import { Link } from 'react-router-dom';
import MainLayout from '../../components/layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiZap, FiShield, FiLock, FiStar, FiUsers, FiCheckCircle } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-6 flex items-center justify-center min-h-[60vh] border-b border-gray-100 dark:border-[#ffffff10] transition-colors">
        <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a] transition-colors" />
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1000px] h-[600px] bg-gray-100/50 dark:bg-gray-800/20 blur-[120px] rounded-[100%] pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gray-200/40 dark:bg-gray-900/20 blur-[100px] rounded-[100%] pointer-events-none" 
        />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-zinc-900/80 border border-gray-200 dark:border-[#ffffff10] text-sm font-bold text-black dark:text-white mb-8 tracking-wide shadow-sm backdrop-blur-sm hover:scale-105 transition-transform cursor-default">
            <span className="w-2 h-2 rounded-full bg-[#0a0a0a] dark:bg-white animate-pulse" />
            Official Registry: 37+ Professional Web Tools
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-black dark:text-white">
            Your Ultimate<br />
            <span className="text-black dark:text-white">Kit of Tools</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-gray-600 dark:text-white text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Standardized, privacy-compliant utilities for modern workflows. Open-access protocol with zero registration requirements and instant local processing.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/clock"
              className="px-10 py-4 rounded-xl text-white font-bold text-lg bg-[#0a0a0a] hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 uppercase tracking-widest">
              Explore Repository
            </Link>
            <a href="#about"
              className="px-10 py-4 rounded-xl border border-gray-200 dark:border-[#ffffff10] bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-white font-bold text-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all shadow-sm hover:scale-105 active:scale-95 uppercase tracking-widest">
              Documentation
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white dark:bg-[#0a0a0a] border-b border-gray-50 dark:border-[#ffffff10] transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-black dark:text-white text-4xl font-black mb-10 uppercase tracking-tighter"
          >
            About
          </motion.h2>
            <div className="space-y-6 text-gray-500 dark:text-white text-lg leading-relaxed font-medium text-justify">
              <p>
                <span className="text-black dark:text-white font-black">YUKT.me — Your Ultimate Kit of Tools.</span><br />
                YUKT.me is a high-availability suite of browser-based utilities designed to support everyday administrative tasks and modern developer workflows. From bitmap image optimization and document processing to cryptographic key generation and data transformation, the platform provides a comprehensive toolkit built for efficiency, reliability, and privacy.
              </p>
              <p>
                All tools within YUKT operate entirely within the user’s browser environment by utilizing modern web technologies and client-side execution frameworks. This architecture ensures that files, credentials, and sensitive data remain strictly on the user’s device. No server-side uploads, temporary storage, or data tracking mechanisms are used, preserving full user privacy and control.
              </p>
              <p>
                YUKT follows a strictly free-to-use philosophy. The platform requires no user registration, authentication, or subscription plans, enabling immediate access to all available tools without barriers.
              </p>
              <p>
                Designed with a modern responsive interface, YUKT delivers a seamless experience across desktops, tablets, and mobile devices. Whether you are a developer, student, designer, or professional, YUKT provides a fast, secure, and accessible environment for completing essential tasks directly in your browser.
              </p>
            </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 px-6 bg-gray-50/50 dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-[#ffffff10] transition-colors">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-black dark:text-white text-4xl font-black mb-4 uppercase tracking-widest">Why YUKT?</h2>
            <div className="w-20 h-1.5 bg-[#0a0a0a] dark:bg-white mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: FiZap, title: '37+', label: 'Free Utilities' },
              { icon: FiUsers, title: 'High-Level', label: 'Availability' },
              { icon: FiStar, title: '4.9/5', label: 'Reliability Index' },
              { icon: FiShield, title: '100%', label: 'Private Compute' }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white dark:bg-zinc-900 p-10 rounded-3xl border border-gray-100 dark:border-[#ffffff10] shadow-xl dark:shadow-2xl text-center group hover:-translate-y-3 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-zinc-900/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 rounded-2xl mb-6 mx-auto flex items-center justify-center bg-gray-50 dark:bg-zinc-900 text-black dark:text-white group-hover:bg-[#0a0a0a] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all shadow-inner relative z-10 group-hover:scale-110 group-hover:rotate-6">
                  <stat.icon size={28} />
                </div>
                <h3 className="text-gray-900 dark:text-white font-black text-3xl mb-1 relative z-10">{stat.title}</h3>
                <p className="text-gray-400 dark:text-white text-xs font-black uppercase tracking-widest relative z-10">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-y-6 gap-x-12 max-w-4xl mx-auto"
          >
            {[
              'Zero account registry required',
              'Internal processing (Zero data transmission)',
              'No output watermarking protocols',
              'Universal cross-platform compatibility',
              'No distribution or installation mandatory',
              'Cyclic tool repository updates'
            ].map((text, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 bg-white/80 dark:bg-zinc-900/80 p-4 rounded-2xl shadow-sm border border-gray-50 dark:border-[#ffffff10] hover:shadow-md hover:-translate-y-1 transition-all">
                <FiCheckCircle className="text-green-500 shrink-0" size={20} />
                <span className="text-gray-600 dark:text-white font-bold text-sm tracking-tight">{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Procedural Section */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0a] transition-colors">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-black dark:text-white text-4xl font-black mb-4 uppercase tracking-widest">How to Use</h2>
            <div className="w-20 h-1.5 bg-[#0a0a0a] dark:bg-white mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12 relative"
          >
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[15%] left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-900 to-transparent z-0" />
            
            {[
              { step: '01', title: 'Find Tool', desc: 'Search or browse the registry to find the right tool for your task.' },
              { step: '02', title: 'Process', desc: 'Securely input your data. All processing happens locally on your device.' },
              { step: '03', title: 'Download', desc: 'Get your results instantly. Nothing is uploaded to our servers.' }
            ].map((h, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-20 h-20 rounded-full bg-white dark:bg-zinc-900 border-4 border-gray-50 dark:border-[#ffffff10] shadow-xl flex items-center justify-center text-3xl font-black text-gray-200 dark:text-white mb-8 select-none group-hover:text-black dark:text-white group-hover:scale-110 transition-all duration-300">
                  {h.step}
                </div>
                <h3 className="text-black dark:text-white font-black text-2xl mb-4 uppercase tracking-tighter">{h.title}</h3>
                <p className="text-gray-500 dark:text-white text-sm leading-relaxed px-6 font-bold">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
