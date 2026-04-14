import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Code2, TestTube2, Rocket, ArrowUpRight, Sparkles } from 'lucide-react';

const steps = [
  { id: 'idea', icon: <Lightbulb size={32} />, label: "Idea", desc: "Conceptualizing unique digital experiences." },
  { id: 'build', icon: <Code2 size={32} />, label: "Build", desc: "Writing clean, scalable, high-performance code." },
  { id: 'test', icon: <TestTube2 size={32} />, label: "Test", desc: "Rigorous debugging and user-experience testing." },
  { id: 'deploy', icon: <Rocket size={32} />, label: "Deploy", desc: "Launching to the global neural network." },
  { id: 'improve', icon: <Sparkles size={32} />, label: "Improve", desc: "Continuous optimization and feature scaling." }
];

const Process = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Droplet distortion variants
  const dropletVariants = {
    idle: { 
      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
      scale: 1
    },
    animate: {
      borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    hover: {
      scale: 1.1,
      borderRadius: "50%",
      boxShadow: "0 0 30px rgba(0, 243, 255, 0.4)"
    }
  };

  return (
    <section className="py-24 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center neon-text-cyan flex items-center justify-center gap-4 uppercase tracking-tighter">
          <div className="h-[2px] w-12 bg-cyber-neon" />
          WORKFLOW PROTOCOL
          <div className="h-[2px] w-12 bg-cyber-neon" />
        </h2>
        
        <div className="relative">
          {/* Animated Connecting SVG Line */}
          <div className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2 hidden md:block">
            <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <motion.path
                d="M 0 50 Q 250 80 500 50 Q 750 20 1000 50"
                fill="transparent"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                strokeDasharray="10 5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f3ff" />
                  <stop offset="100%" stopColor="#ff00ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="grid md:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring" }}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
                className="flex flex-col items-center text-center group cursor-crosshair"
              >
                <div className="relative mb-8">
                  {/* Droplet Shape */}
                  <motion.div
                    variants={dropletVariants}
                    animate="animate"
                    whileHover="hover"
                    className={`w-24 h-24 flex items-center justify-center relative z-10 
                      ${i < 2 ? 'bg-cyber-neon/10 border-cyber-neon/30' : 
                        i === 3 ? 'bg-cyber-pink/10 border-cyber-pink/30' : 
                        'bg-cyber-green/10 border-cyber-green/30'} 
                      border transition-colors duration-500 overflow-hidden backdrop-blur-sm`}
                  >
                    <AnimatePresence mode="wait">
                      {step.id === 'deploy' && activeStep === i ? (
                        <motion.div
                          key="rocket"
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: -50, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="text-cyber-pink"
                        >
                          <Rocket size={36} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="icon"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`
                            ${i < 2 ? 'text-cyber-neon' : 
                              i === 3 ? 'text-cyber-pink' : 
                              'text-cyber-green'}
                          `}
                        >
                          {step.icon}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Party Popper Effect behind 'Improve' */}
                    {step.id === 'improve' && activeStep === i && (
                      <div className="absolute inset-0 z-0 pointer-events-none">
                        {[...Array(10)].map((_, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ x: 0, y: 0, scale: 0 }}
                            animate={{ 
                              x: (Math.random() - 0.5) * 60, 
                              y: (Math.random() - 0.5) * 60, 
                              scale: [0, 1, 0] 
                            }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="absolute left-1/2 top-1/2 w-1 h-1 bg-cyber-green rounded-full"
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Ripple Effect */}
                  <div className="absolute -inset-4 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />
                </div>
                
                <h3 className={`text-xl font-orbitron font-black mb-3 
                  ${i < 2 ? 'text-cyber-neon' : 
                    i === 3 ? 'text-cyber-pink' : 
                    'text-cyber-green'} transition-colors duration-300`}>
                  {step.label}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[150px]">{step.desc}</p>
                
                <div className="mt-4 text-[10px] font-mono opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  Phase_0{i + 1}
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
