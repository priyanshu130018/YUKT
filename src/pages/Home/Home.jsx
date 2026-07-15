import { Link } from 'react-router-dom';
import MainLayout from '../../components/layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiZap, FiShield, FiLock, FiStar, FiUsers, FiCheckCircle, FiArrowRight, FiCpu, FiEye, FiGlobe } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const features = [
  { icon: FiCpu, title: 'Local Processing', desc: 'Every computation runs inside your browser. Files never leave your device — no cloud uploads, no server round-trips.' },
  { icon: FiShield, title: 'Privacy First', desc: 'Zero analytics, zero tracking, zero data collection. What you process is yours alone, always.' },
  { icon: FiZap, title: 'No Registration', desc: 'No accounts, no subscriptions, no emails. Open the tool and start working instantly — no barriers.' },
  { icon: FiGlobe, title: 'Works Everywhere', desc: 'Any modern browser, any device. Desktop, tablet, or mobile — YUKT adapts to your workflow.' },
];

export default function Home() {
  return (
    <MainLayout>
      {/* ──── Hero ──── */}
      <section className="relative overflow-hidden py-20 px-6 flex items-center justify-center min-h-[65vh] border-b border-gray-100 dark:border-white/5 transition-colors">
        <div className="absolute inset-0 bg-white dark:bg-[#1a1a1a] transition-colors" />

        {/* Ambient glow blobs */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-800px md:w-1100px h-600px bg-gray-100/60 dark:bg-white/0.03 blur-[120px] rounded-[100%] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-0 right-0 w-300px h-300px bg-gray-200/40 dark:bg-white/0.02 blur-[100px] rounded-[100%] pointer-events-none"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-bold text-[#1a1a1a] dark:text-white mb-8 tracking-wide shadow-sm backdrop-blur-sm hover:scale-105 transition-transform cursor-default select-none">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
            Official Registry: 30+ Professional Web Tools
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 leading-tight tracking-tight text-[#1a1a1a] dark:text-white"
          >
            Your Ultimate
            <br />
            <span className="relative">
              <span className="text-[#1a1a1a] dark:text-white">
                Kit of Tools
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeUp}
            className="text-gray-500 dark:text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Standardized, privacy-compliant utilities for modern workflows. Open-access protocol with zero registration requirements and instant local processing.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/priyanshu130018/YUKT"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-base bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] hover:opacity-90 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Explore Repository
              <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur text-gray-700 dark:text-white font-bold text-base hover:bg-gray-50 dark:hover:bg-white/10 transition-all shadow-sm hover:scale-105 active:scale-95 uppercase tracking-widest">
              Documentation
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ──── About ──── */}
      <section id="about" className="py-24 px-6 bg-white dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-white/5 transition-colors">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400 dark:text-white/30 mb-3">Background</p>
              <h2 className="text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight">About YUKT</h2>
              <div className="w-16 h-1 bg-[#1a1a1a] dark:bg-white mx-auto mt-5 rounded-full" />
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6 text-gray-600 dark:text-gray-300 text-[17px] leading-[1.85] text-justify">
              <p>
                <span className="text-[#1a1a1a] dark:text-white font-black">YUKT.me — Your Ultimate Kit of Tools.</span><br />
                YUKT.me is a high-availability suite of browser-based utilities designed to support everyday administrative tasks and modern utility workflows. From bitmap image optimization and document processing to cryptographic key generation and data transformation, the platform provides a comprehensive toolkit built for efficiency, reliability, and privacy.
              </p>
              <p>
                All tools within YUKT operate entirely within the user's browser environment by utilizing modern web technologies and client-side execution frameworks. This architecture ensures that files, credentials, and sensitive data remain strictly on the user's device. No server-side uploads, temporary storage, or data tracking mechanisms are used, preserving full user privacy and control.
              </p>
              <p>
                YUKT follows a strictly free-to-use philosophy. The platform requires no user registration, authentication, or subscription plans, enabling immediate access to all available tools without barriers.
              </p>
              <p>
                Designed with a modern responsive interface, YUKT delivers a seamless experience across desktops, tablets, and mobile devices. Whether you are a utility user, student, designer, or professional, YUKT provides a fast, secure, and accessible environment for completing essential tasks directly in your browser.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      

      {/* ──── Why YUKT ──── */}
      <section className="py-24 px-6 bg-gray-50/60 dark:bg-[#111] border-b border-gray-100 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400 dark:text-white/30 mb-3">Value Proposition</p>
              <h2 className="text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight">Why YUKT?</h2>
              <div className="w-16 h-1 bg-[#1a1a1a] dark:bg-white mx-auto mt-5 rounded-full" />
            </motion.div>

            

            {/* Stat cards */}
            <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-14">
              {[
                { icon: FiZap, title: '30+', label: 'Free Utilities' },
                { icon: FiUsers, title: 'High-Level', label: 'Availability' },
                { icon: FiStar, title: '4.9/5', label: 'Reliability Index' },
                { icon: FiShield, title: '100%', label: 'Private Compute' }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="group bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:shadow-white/5 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden text-center">
                  <div className="absolute inset-0 bg-linear-to-b from-gray-50/80 to-transparent dark:from-white/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="w-14 h-14 rounded-2xl mb-5 mx-auto flex items-center justify-center bg-gray-50 dark:bg-white/10 text-[#1a1a1a] dark:text-white group-hover:bg-[#1a1a1a] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-[#1a1a1a] transition-all duration-300 relative z-10">
                    <stat.icon size={24} />
                  </div>
                  <h3 className="text-[#1a1a1a] dark:text-white font-black text-3xl mb-1 relative z-10">{stat.title}</h3>
                  <p className="text-gray-400 dark:text-white/40 text-[10px] font-black uppercase tracking-widest relative z-10">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Checklist */}
            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-3 max-w-4xl mx-auto">
              {[
                'Zero account registration required',
                'No server-side file processing',
                'No data tracking or analytics collection',
                'No output watermarks or branding',
                'Works offline after first load',
                'Free forever — no subscriptions',
                'Open-source, auditable codebase',
                'Universal device compatibility',
              ].map((text, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex items-center gap-3.5 bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10 hover:border-green-200 dark:hover:border-green-500/20 hover:shadow-md transition-all group">
                  <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-100 dark:group-hover:bg-green-500/20 transition-colors">
                    <FiCheckCircle className="text-green-500" size={15} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──── Philosophy ──── */}
      <section className="py-20 px-6 bg-white dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-white/5 transition-colors">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400 dark:text-white/30 mb-3">Core Philosophy</p>
              <h2 className="text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight">Built Different</h2>
              <div className="w-16 h-1 bg-[#1a1a1a] dark:bg-white mx-auto mt-5 rounded-full" />
            </motion.div>
            <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
              {features.map(({ icon: Icon, title, desc }) => (
                <motion.div key={title} variants={fadeUp}
                  className="group bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10 hover:border-[#1a1a1a] dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg dark:hover:shadow-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/10 flex items-center justify-center mb-6 group-hover:bg-[#1a1a1a] dark:group-hover:bg-white transition-colors">
                    <Icon size={22} className="text-[#1a1a1a] dark:text-white group-hover:text-white dark:group-hover:text-[#1a1a1a] transition-colors" />
                  </div>
                  <h3 className="font-black text-[#1a1a1a] dark:text-white text-lg mb-3 uppercase tracking-tight">{title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──── How to Use ──── */}
      <section className="py-24 px-6 bg-white dark:bg-[#1a1a1a] transition-colors">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="text-center mb-20">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400 dark:text-white/30 mb-3">Protocol</p>
              <h2 className="text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tight">How to Use</h2>
              <div className="w-16 h-1 bg-[#1a1a1a] dark:bg-white mx-auto mt-5 rounded-full" />
            </motion.div>

            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector */}
              <div className="hidden md:block absolute top-10 left-[calc(1/6*100%+2rem)] right-[calc(1/6*100%+2rem)] h-px bg-linear-to-r from-gray-200 dark:from-white/10 via-gray-300 dark:via-white/20 to-gray-200 dark:to-white/10 z-0" />

              {[
                { step: '01', title: 'Find Tool', desc: 'Search or browse the registry to find the right tool for your task.' },
                { step: '02', title: 'Process', desc: 'Securely input your data. All processing happens locally on your device.' },
                { step: '03', title: 'Download', desc: 'Get your results instantly. Nothing is uploaded to our servers.' }
              ].map((h, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="flex flex-col items-center text-center relative z-10 group">
                  <div className="w-20 h-20 rounded-2xl bg-white dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 shadow-lg flex items-center justify-center text-3xl font-black text-gray-200 dark:text-white/20 mb-8 group-hover:border-[#1a1a1a] dark:group-hover:border-white group-hover:text-[#1a1a1a] dark:group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    {h.step}
                  </div>
                  <h3 className="text-[#1a1a1a] dark:text-white font-black text-xl mb-3 uppercase tracking-tight">{h.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium max-w-200px">{h.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──── Footer CTA ──── */}
      <section className="py-20 px-6 bg-[#1a1a1a] dark:bg-black">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="max-w-3xl mx-auto text-center">
          <motion.p variants={fadeUp} className="text-[10px] font-black uppercase tracking-[0.35em] text-white/30 mb-3">Get Started</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-black text-white mb-4 tracking-tight">Start Using YUKT Now</motion.h2>
          <motion.p variants={fadeUp} className="text-white/40 font-medium mb-10 max-w-lg mx-auto">No signup. No cost. Your data stays on your device.</motion.p>
          <motion.div variants={fadeUp}>
            <Link to="/clock"
              className="inline-flex items-center gap-2.5 px-10 py-4 bg-white text-[#1a1a1a] font-black rounded-xl uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl">
              <FiZap size={16} />
              Explore All Tools
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </MainLayout>
  );
}
