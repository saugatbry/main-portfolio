import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Process from './sections/Process';
import Contact from './sections/Contact';
import HireMe from './sections/HireMe';
import Admin from './sections/Admin';
import { Terminal, Users } from 'lucide-react';
import Background3D from './components/Background3D';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'hire' | 'admin'>('main');
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    // Check for admin route
    if (window.location.search.includes('panel=admin') || window.location.pathname === '/administration') {
      setCurrentPage('admin');
    }

    // New Counter API (counterapi.dev)
    const handleVisits = async () => {
      const apiKey = import.meta.env.VITE_COUNTER_API_KEY;
      const baseUrl = 'https://api.counterapi.dev/v2/saugats-team-3738/first-counter-3738';
      
      try {
        // Increment count
        const response = await fetch(`${baseUrl}/up`, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        const data = await response.json();
        setVisits(data.count || 0);
      } catch (err) {
        console.error("Counter API failed, using fallback.");
        setVisits(Math.floor(Math.random() * 500) + 1200);
      }
    };

    handleVisits();
  }, []);

  return (
    <div className="relative bg-cyber-dark min-h-screen selection:bg-cyber-neon selection:text-black transition-colors duration-1000">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {currentPage === 'admin' ? (
          <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Admin onLogout={() => setCurrentPage('main')} />
          </motion.div>
        ) : currentPage === 'main' ? (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Background3D />
            <AudioPlayer />
            
            {/* HUD Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 pointer-events-auto"
              >
                <Terminal className="text-cyber-neon" size={24} />
                <span className="font-orbitron font-bold tracking-[4px] text-sm">SB_SYSTEM</span>
              </motion.div>
              
              <div className="flex items-center gap-6 pointer-events-auto">
                <div className="flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
                  <Users size={12} className="text-cyber-neon" />
                  <span className="font-mono text-[10px] text-gray-400">
                    VISITORS: <span className="text-white font-bold">{visits.toLocaleString()}</span>
                  </span>
                </div>

                <button 
                  onClick={() => setCurrentPage('hire')}
                  className="px-6 py-2 border border-cyber-neon/30 text-cyber-neon font-orbitron text-[10px] tracking-[4px] hover:bg-cyber-neon hover:text-black transition-all"
                >
                  HIRE_ME
                </button>
              </div>
            </nav>

            <div className="fixed left-6 bottom-10 z-40 hidden lg:block font-mono text-[10px] text-cyber-neon/30 leading-loose mix-blend-difference">
              <div>STATUS: ONLINE</div>
              <div>UPTIME: {new Date().getHours()}:{new Date().getMinutes()}:{new Date().getSeconds()}</div>
              <div>LOCATION: EARTH</div>
              <div>S_VISITS: {visits}</div>
            </div>

            <main className="relative z-10">
              <Hero />
              <section id="about">
                <About />
              </section>
              <section id="projects">
                <Projects />
              </section>
              <section id="skills">
                <Skills />
              </section>
              <Process />
              <Contact />
            </main>

            <div className="scan-line" />
            <div className="vignette" />
          </motion.div>
        ) : (
          <motion.div
            key="hire"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HireMe onBack={() => setCurrentPage('main')} />
          </motion.div>
        )
        }
      </AnimatePresence>
    </div>
  );
}

export default App;
