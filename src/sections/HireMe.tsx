import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const HireMe = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-cyber-dark text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/5 blur-[100px]" />
      
      <button 
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-cyber-neon hover:gap-4 transition-all group"
      >
        <ArrowLeft size={20} />
        <span className="font-orbitron text-sm tracking-widest">RETURN_TO_BASE</span>
      </button>

      <div className="max-w-2xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 text-center"
        >
          <div className="w-20 h-20 bg-cyber-neon/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyber-neon/30">
            <Mail className="text-cyber-neon" size={40} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">Hire Me</h1>
          <p className="text-gray-400 text-lg mb-12 font-light">
            Looking for a developer who can blend high-end aesthetics with powerful functionality? 
            Let's build the future together.
          </p>

          <div className="space-y-4">
            <a 
              href="mailto:psyduckbry@gmail.com" 
              className="group block p-6 border border-white/10 rounded-xl hover:border-cyber-neon/50 hover:bg-white/5 transition-all text-left relative overflow-hidden"
            >
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <span className="text-xs text-cyber-neon uppercase font-mono mb-1 block">Primary Protocol</span>
                  <span className="text-xl font-bold">psyduckbry@gmail.com</span>
                </div>
                <Send className="text-cyber-neon group-hover:translate-x-2 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-cyber-neon/5 translate-y-full group-hover:translate-y-0 transition-transform" />
            </a>
          </div>

          <div className="mt-12 pt-12 border-t border-white/5 text-gray-500 text-sm font-mono uppercase tracking-[4px]">
            Connection Status: Encrypted
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HireMe;
