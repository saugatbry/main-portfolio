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
import { Terminal, Users } from 'lucide-react';
import Background3D from './components/Background3D';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'hire'>('main');
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    // Basic hit counter using a free service (CountAPI fallback)
    fetch('https://api.countapi.xyz/hit/saugatbry-portfolio/visits')
      .then(res => res.json())
      .then(data => setVisits(data.value || 1204))
      .catch(() => setVisits(Math.floor(Math.random() * 500) + 1000)); // Fallback mock
  }, []);

  return (
    <div className="relative bg-cyber-dark min-h-screen selection:bg-cyber-neon selection:text-black transition-colors duration-1000">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {currentPage === 'main' ? (
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
                {/* Visitor Counter */}
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

            {/* Left HUD Status */}
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

            {/* Overlay effects */}
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
