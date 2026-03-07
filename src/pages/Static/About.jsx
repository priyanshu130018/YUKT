import MainLayout from '../../components/layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiShield, FiCpu, FiGlobe, FiLock, FiZap, FiUsers, FiCheckCircle, FiCode } from 'react-icons/fi';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
const stagger = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const stats = [
  { value: '30+', label: 'Utilities', icon: FiZap },
  { value: '100%', label: 'Private', icon: FiShield },
  { value: '0', label: 'Accounts', icon: FiUsers },
  { value: '∞', label: 'Free', icon: FiGlobe },
];

const features = [
  { icon: FiCpu, title: 'Local Processing', desc: 'Every computation runs inside your browser. Files never leave your device — no cloud uploads, no server round-trips.' },
  { icon: FiShield, title: 'Privacy First', desc: 'Zero analytics, zero tracking, zero data collection. What you process is yours alone, always.' },
  { icon: FiZap, title: 'No Registration', desc: 'No accounts, no subscriptions, no emails. Open the tool and start working instantly — no barriers.' },
  { icon: FiGlobe, title: 'Works Everywhere', desc: 'Any modern browser, any device. Desktop, tablet, or mobile — YUKT adapts to your workflow.' },
];

export default function About() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative py-20 px-6 border-b border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-[#1a1a1a]" />
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-600 dark:text-white uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            YUKT Platform — Technical Reference
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black text-[#1a1a1a] dark:text-white tracking-tight mb-6 leading-tight">
            About <span className="opacity-30">YUKT</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            <p>
              <span className="text-[#1a1a1a] dark:text-white font-black">YUKT.me — Your Ultimate Kit of Tools.</span><br /><br />

              YUKT.me is a high-availability suite of browser-based utilities designed to support everyday administrative tasks and modern utility workflows. From bitmap image optimization and document processing to cryptographic key generation and data transformation, the platform provides a comprehensive toolkit built for efficiency, reliability, and privacy.
              All tools within YUKT operate entirely within the user's browser environment by utilizing modern web technologies and client-side execution frameworks. This architecture ensures that files, credentials, and sensitive data remain strictly on the user's device. No server-side uploads, temporary storage, or data tracking mechanisms are used, preserving full user privacy and control.
              YUKT follows a strictly free-to-use philosophy. The platform requires no user registration, authentication, or subscription plans, enabling immediate access to all available tools without barriers.
              Designed with a modern responsive interface, YUKT delivers a seamless experience across desktops, tablets, and mobile devices. Whether you are a utility user, student, designer, or professional, YUKT provides a fast, secure, and accessible environment for completing essential tasks directly in your browser.
            </p>
          </motion.p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-gray-50/50 dark:bg-[#111] border-b border-gray-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <motion.div key={label} variants={fadeUp}
                className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1a1a1a] dark:group-hover:bg-white transition-colors">
                  <Icon size={20} className="text-gray-600 dark:text-white group-hover:text-white dark:group-hover:text-[#1a1a1a] transition-colors" />
                </div>
                <p className="text-3xl font-black text-[#1a1a1a] dark:text-white mb-1">{value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-6 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Core Philosophy</p>
              <h2 className="text-4xl font-black text-[#1a1a1a] dark:text-white tracking-tight">Built Different</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">What We Stand For</p>
              <h2 className="text-4xl font-black text-[#1a1a1a] dark:text-white tracking-tight">Privacy by Design</h2>
            </motion.div>
            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-4">
              {[
                'Zero account registration required',
                'No server-side file processing',
                'No data tracking or analytics collection',
                'No output watermarks or branding',
                'Works offline after first load',
                'Free forever — no subscriptions',
                'Open-source, auditable codebase',
                'Universal device compatibility',
              ].map(text => (
                <div key={text} className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/10">
                  <FiCheckCircle className="text-green-500 shrink-0" size={18} />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#1a1a1a] dark:bg-black">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="max-w-3xl mx-auto text-center">
          <motion.p variants={fadeUp} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Get Started</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-black text-white mb-6 tracking-tight">Start Using YUKT Now</motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 mb-10 font-medium">No signup. No cost. Just tools that work.</motion.p>
          <motion.a variants={fadeUp} href="/"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#1a1a1a] font-black rounded-xl uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl">
            <FiZap size={18} />
            Explore All Tools
          </motion.a>
        </motion.div>
      </section>
    </MainLayout>
  );
}
