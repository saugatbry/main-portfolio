import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code2, TestTube2, Rocket, ArrowUpRight } from 'lucide-react';

const steps = [
  { icon: <Lightbulb size={32} />, label: "Idea", desc: "Conceptualizing unique digital experiences." },
  { icon: <Code2 size={32} />, label: "Build", desc: "Writing clean, scalable, high-performance code." },
  { icon: <TestTube2 size={32} />, label: "Test", desc: "Rigorous debugging and user-experience testing." },
  { icon: <Rocket size={32} />, label: "Deploy", desc: "Launching to the global neural network." },
  { icon: <ArrowUpRight size={32} />, label: "Improve", desc: "Continuous optimization and feature scaling." }
];

const Process = () => {
  return (
    <section className="py-24 px-4 bg-black/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center neon-text-cyan">WORKFLOW PROTOCOL</h2>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-cyber-neon/10 -translate-y-1/2 hidden md:block" />
          
          <div className="grid md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-cyber-dark border border-white/10 mb-6 group-hover:border-cyber-neon group-hover:shadow-[0_0_20px_#00f3ff44] transition-all duration-300 relative">
                  <span className="text-cyber-neon group-hover:scale-110 transition-transform">{step.icon}</span>
                  <div className="absolute -inset-2 rounded-full border border-cyber-neon/0 group-hover:border-cyber-neon/20 animate-ping" />
                </div>
                
                <h3 className="text-xl font-orbitron font-bold mb-3 text-white">{step.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                
                <div className="mt-4 text-[10px] font-mono text-cyber-neon/40 group-hover:text-cyber-neon transition-colors">
                  PHASE_0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-5">
        <div className="w-full h-full border border-cyber-neon rounded-full animate-pulse-slow" />
      </div>
    </section>
  );
};

export default Process;
