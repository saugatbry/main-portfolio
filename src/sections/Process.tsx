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

const ProcessStep = ({ step, i, isMobile, totalSteps }: { step: any, i: number, isMobile: boolean, totalSteps: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [isTapped, setIsTapped] = useState(false);

  const isActive = isMobile ? isInView || isTapped : false;

  const dropletVariants = {
    idle: { 
      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
    },
    animate: {
      borderRadius: isMobile 
        ? "30% 60% 70% 40% / 50% 60% 30% 60%" 
        : ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: isMobile ? 0 : i * 0.2 }}
      className="flex flex-col items-center text-center group cursor-crosshair pb-10 relative"
      onClick={() => isMobile && setIsTapped(!isTapped)}
    >
      <div className="relative mb-8 pt-4">
        {/* Connection line for mobile */}
        {isMobile && i < totalSteps - 1 && (
          <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-gradient-to-b from-white/10 to-transparent z-0" />
        )}

        <motion.div
          variants={dropletVariants}
          animate="animate"
          whileHover={!isMobile ? { scale: 1.1, borderRadius: "50%" } : {}}
          className={`w-28 h-28 flex items-center justify-center relative z-10 
            ${i < 2 ? 'bg-cyber-neon/10 border-cyber-neon/30' : 
              i === 3 ? 'bg-cyber-green/10 border-cyber-green/30' : 
              'bg-cyber-green/10 border-cyber-green/30'} 
            border transition-all duration-500 overflow-visible backdrop-blur-md
            ${isActive ? 'scale-110 shadow-[0_0_30px_rgba(0,255,159,0.2)]' : ''}`}
        >
          <motion.div
            animate={isActive ? {
              scale: [1, 1.4, 1],
              rotate: [0, 10, -10, 0],
            } : {}}
            className={`
              ${i < 2 ? 'text-cyber-neon' : 
                i === 3 ? 'text-cyber-green' : 
                'text-cyber-green'}
            `}
          >
            {step.id === 'deploy' && isActive ? (
              <motion.div
                initial={{ x: 0, y: 0, rotate: -25, opacity: 1 }}
                animate={{ x: isMobile ? 0 : 150, y: -600, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeIn" }}
                className="relative"
              >
                <Rocket size={44} />
                <div className="absolute -bottom-10 -left-6 w-5 h-16 bg-gradient-to-t from-transparent via-cyber-green to-cyber-neon blur-md -rotate-[20deg]" />
              </motion.div>
            ) : (
              step.icon
            )}
          </motion.div>

          {/* Sequential "Active" Ring */}
          {isActive && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 border-2 border-white rounded-full pointer-events-none"
            />
          )}

          {/* Party Popper behind Improve */}
          {step.id === 'improve' && isActive && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
              {[...Array(isMobile ? 8 : 15)].map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: 0, y: 0, scale: 0 }}
                  animate={{ 
                    x: (Math.random() - 0.5) * (isMobile ? 120 : 150), 
                    y: (Math.random() - 0.5) * (isMobile ? 120 : 150), 
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
        <div className="absolute -inset-4 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />
      </div>
      
      <h3 className={`text-2xl font-orbitron font-black mb-3 
        ${i < 2 ? 'text-cyber-neon' : 
          i === 3 ? 'text-cyber-green' : 
          'text-cyber-green'} transition-colors duration-300`}>
        {step.label}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">{step.desc}</p>
      
      <div className="mt-4 text-[10px] font-mono opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
        Phase_0{i + 1}
      </div>
    </motion.div>
  );
};

const Process = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-24 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black mb-20 text-center neon-text-cyan flex items-center justify-center gap-4 uppercase tracking-tighter text-cyber-green shadow-cyber-green/20">
          <div className="h-[2px] w-8 md:w-12 bg-cyber-green shadow-[0_0_10px_rgba(0,255,159,0.5)]" />
          WORKFLOW PROTOCOL
          <div className="h-[2px] w-8 md:w-12 bg-cyber-green shadow-[0_0_10px_rgba(0,255,159,0.5)]" />
        </h2>
        
        <div className="relative">
          {/* Main Progress Bar Background */}
          {!isMobile && (
            <div className="absolute top-[60px] left-0 w-full h-[2px] bg-white/5 px-10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-cyber-neon via-cyber-green to-cyber-green relative"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[4px] shadow-[0_0_15px_#fff]" />
              </motion.div>
            </div>
          )}
          
          <div className="grid md:grid-cols-5 gap-16 md:gap-8 relative z-10">
            {steps.map((step, i) => (
              <ProcessStep key={i} step={step} i={i} isMobile={isMobile} totalSteps={steps.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
