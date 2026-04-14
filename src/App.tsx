import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Process from './sections/Process';
import NowPlaying from './sections/NowPlaying';
import Contact from './sections/Contact';
import { Volume2, VolumeX, Terminal, Search } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Global scanner line and vignette are handled via CSS in index.css

  return (
    <div className="relative bg-cyber-dark min-h-screen selection:bg-cyber-neon selection:text-black">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <CustomCursor />
          
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
            
            <div className="flex gap-6 pointer-events-auto">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 glass rounded-full hover:border-cyber-neon/50 transition-all group"
              >
                {isMuted ? (
                  <VolumeX size={20} className="text-gray-500 group-hover:text-cyber-neon" />
                ) : (
                  <Volume2 size={20} className="text-cyber-neon" />
                )}
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
            <NowPlaying />
            <Process />
            <Contact />
          </main>

          {/* Overlay effects */}
          <div className="scan-line" />
          <div className="vignette" />
        </>
      )}
    </div>
  );
}

export default App;
