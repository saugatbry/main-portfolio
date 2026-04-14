import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Rocket, Smartphone, Layers, Terminal } from 'lucide-react';

const MobileApp = () => {
  return (
    <div className="min-h-screen bg-cyber-dark text-white p-6 font-sans selection:bg-cyber-neon overflow-x-hidden">
      {/* Mobile HUD */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <Terminal size={20} className="text-cyber-neon" />
          <span className="font-orbitron font-bold text-xs tracking-widest">SB_MOBILE</span>
        </div>
        <div className="text-[8px] font-mono text-cyber-neon/50">v4.0_MOBILE_OS</div>
      </header>

      {/* Hero Section */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-6xl font-black mb-4 leading-none neon-text-cyan">
            SAUGAT<br />BRY
          </h1>
          <p className="text-cyber-neon font-mono text-xs tracking-widest bg-cyber-neon/10 py-1 px-3 inline-block rounded">
            FUTURE_DEVELOPER
          </p>
        </motion.div>
      </section>

      {/* Main Content Sections */}
      <div className="space-y-16">
        {/* Simplified About */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-6 bg-cyber-neon" />
            <h2 className="font-orbitron font-bold text-sm tracking-widest">BIO_SCAN</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Class 12 student building high-end digital experiences. Specialized in Game Dev, AI, and Full-Stack systems.
          </p>
        </section>

        {/* Vertical Projects */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[2px] w-6 bg-cyber-neon" />
            <h2 className="font-orbitron font-bold text-sm tracking-widest">PROJECTS</h2>
          </div>
          <div className="grid gap-6">
            {[
              { title: "ContentForge", tag: "AI OPS", color: "text-cyber-neon" },
              { title: "TrackCrypto", tag: "FINANCE", color: "text-cyber-pink" },
              { title: "BubuMemorial", tag: "AESTHETIC", color: "text-cyber-green" }
            ].map((p, i) => (
              <div key={i} className="glass p-6 rounded-xl border border-white/5 relative overflow-hidden group">
                <div className={`text-xs font-mono ${p.color} mb-2`}>PROTOCOL_{p.tag}</div>
                <h3 className="text-2xl font-black mb-4">{p.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 uppercase">Deployed 2024</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <Rocket size={14} className={p.color} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Experience Footer */}
        <section className="py-12 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[5px] mb-4">
            Optimized for Mobile Neural Links
          </p>
          <a 
            href="mailto:psyduckbry@gmail.com"
            className="inline-block px-8 py-3 bg-white text-black font-black text-sm uppercase rounded-full shadow-[0_0_20px_white]"
          >
            Contact_Me
          </a>
        </section>
      </div>

      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none" />
    </div>
  );
};

export default MobileApp;
