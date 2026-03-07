import MainLayout from '../../components/layouts/MainLayout';
import { motion } from 'framer-motion';
import { FiMail, FiMessageSquare, FiGithub, FiTwitter } from 'react-icons/fi';

export default function Contact() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 rounded-3xl bg-[black] text-white flex items-center justify-center mx-auto mb-6 shadow-xl">
            <FiMail size={32} />
          </div>
          <h1 className="text-5xl font-black text-[black] uppercase tracking-tighter italic mb-4">Contact Us</h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">Platform Synchronization & Feedback</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-black dark:text-white text-2xl font-black uppercase tracking-tight">Get in Touch</h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              Have questions about our client-side processing or want to suggest a new tool for the YUKT registry? Reach out through our official channels.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <FiMail className="text-black dark:text-white" size={24} />
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Registry</p>
                  <p className="text-[black] font-black">support@yukt.me</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <FiMessageSquare className="text-black dark:text-white" size={24} />
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Technical Board</p>
                  <p className="text-[black] font-black">community.yukt.me</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="flex-1 p-4 bg-gray-50 rounded-2xl flex items-center justify-center text-[black] hover:bg-[black] hover:text-white transition-all gap-2 font-black text-xs uppercase tracking-widest">
                <FiGithub /> GitHub
              </a>
              <a href="#" className="flex-1 p-4 bg-gray-50 rounded-2xl flex items-center justify-center text-[black] hover:bg-[#0a0a0a] hover:text-white transition-all gap-2 font-black text-xs uppercase tracking-widest">
                <FiTwitter /> Twitter
              </a>
            </div>
          </div>

          <form className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Identity Name</label>
              <input type="text" placeholder="e.g. John Doe" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[black] transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Email Terminal</label>
              <input type="email" placeholder="name@company.com" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[black] transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Protocol Message</label>
              <textarea rows="4" placeholder="How can we assist you?" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[black] transition-all resize-none"></textarea>
            </div>
            <button className="w-full py-4 bg-[black] text-white font-black rounded-xl uppercase tracking-widest text-sm hover:shadow-lg transition-all active:scale-[0.98]">
              Dispatch Message
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
