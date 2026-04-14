import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Code2, TestTube2, Rocket, Sparkles } from 'lucide-react';

const steps = [
  { id: 'idea', icon: <Lightbulb size={32} />, label: "Idea", desc: "Conceptualizing unique digital experiences." },
  { id: 'build', icon: <Code2 size={32} />, label: "Build", desc: "Writing clean, scalable, high-performance code." },
  { id: 'test', icon: <TestTube2 size={32} />, label: "Test", desc: "Rigorous debugging and user-experience testing." },
  { id: 'deploy', icon: <Rocket size={32} />, label: "Deploy", desc: "Launching to the global neural network." },
  { id: 'improve', icon: <Sparkles size={32} />, label: "Improve", desc: "Continuous optimization and feature scaling." }
];

const Process = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Droplet distortion variants
  const dropletVariants = {
    idle: { 
      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
    },
    animate: {
      borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section className="py-24 px-4 bg-transparent relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center neon-text-cyan flex items-center justify-center gap-4 uppercase tracking-tighter">
          <div className="h-[2px] w-12 bg-cyber-neon" />
          WORKFLOW PROTOCOL
          <div className="h-[2px] w-12 bg-cyber-neon" />
        </h2>
        
        <div className="relative">
          {/* Main Progress Bar Background */}
          <div className="absolute top-[48px] left-0 w-full h-[2px] bg-white/5 hidden md:block px-10">
            {/* The Moving Progress Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-cyber-neon via-cyber-pink to-cyber-green relative"
            >
              {/* Glowing Head of the Progress Bar */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[4px] shadow-[0_0_15px_#fff]" />
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: i * 0.5 } // Staggered reveal matching progress bar
                } : {}}
                className="flex flex-col items-center text-center group cursor-crosshair pb-10"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="relative mb-8">
                  {/* Droplet Shape */}
                  <motion.div
                    variants={dropletVariants}
                    animate="animate"
                    whileHover={{ scale: 1.1, borderRadius: "50%" }}
                    className={`w-24 h-24 flex items-center justify-center relative z-10 
                      ${i < 2 ? 'bg-cyber-neon/10 border-cyber-neon/30' : 
                        i === 3 ? 'bg-cyber-pink/10 border-cyber-pink/30' : 
                        'bg-cyber-green/10 border-cyber-green/30'} 
                      border transition-all duration-500 overflow-visible backdrop-blur-sm`}
                  >
                    {/* The Icon Animation */}
                    <motion.div
                      animate={isInView ? {
                        scale: [1, 1.4, 1],
                        rotate: [0, 10, -10, 0],
                        filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                      } : {}}
                      transition={{ delay: i * 0.5, duration: 1 }}
                      className={`
                        ${i < 2 ? 'text-cyber-neon' : 
                          i === 3 ? 'text-cyber-pink' : 
                          'text-cyber-green'}
                      `}
                    >
                      {step.id === 'deploy' && hoveredIdx === i ? (
                        <motion.div
                          initial={{ x: 0, y: 0, rotate: -25, opacity: 1 }}
                          animate={{ x: 150, y: -600, opacity: 0 }}
                          transition={{ duration: 1, ease: "easeIn" }}
                          className="relative"
                        >
                          <Rocket size={44} />
                          {/* Rocket Trail */}
                          <div className="absolute -bottom-10 -left-6 w-5 h-16 bg-gradient-to-t from-transparent via-orange-500 to-cyber-pink blur-md -rotate-[20deg]" />
                        </motion.div>
                      ) : (
                        step.icon
                      )}
                    </motion.div>

                    {/* Sequential "Active" Ring */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}
                      transition={{ delay: i * 0.5, duration: 0.8 }}
                      className="absolute inset-0 border-2 border-white rounded-full pointer-events-none"
                    />

                    {/* Party Popper behind Improve */}
                    {step.id === 'improve' && (hoveredIdx === i || (isInView && i===4)) && (
                      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
                        {[...Array(15)].map((_, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ x: 0, y: 0, scale: 0 }}
                            animate={{ 
                              x: (Math.random() - 0.5) * 150, 
                              y: (Math.random() - 0.5) * 150, 
                              scale: [0, 1, 0],
                              rotate: Math.random() * 360
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute left-1/2 top-1/2 text-cyber-green font-mono text-[10px]"
                          >
                            {'{ }'}
                          </motion.div>
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
    </section>
  );
};

export default Process;
