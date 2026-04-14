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
import { Terminal } from 'lucide-react';
import Background3D from './components/Background3D';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'hire'>('main');

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
              
              <div className="pointer-events-auto">
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
              <div>UPTIME: 24:00:00:12</div>
              <div>LOCATION: EARTH</div>
              <div>TEMP: 18°C</div>
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
