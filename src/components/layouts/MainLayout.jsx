import Navbar from '../Navbar/Navbar';
import ToolNavbar from '../Navbar/ToolNavbar';
import Footer from '../Footer/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0a0a0a]">
      <Navbar />
      <ToolNavbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
