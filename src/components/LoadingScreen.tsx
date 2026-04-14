import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEMS...');

  const texts = [
    'CONNECTING TO NEURAL NETWORK...',
    'SYNCING REPOSITORIES...',
    'LOADING 3D ASSETS...',
    'COMPILING SHADERS...',
    'READY FOR INTERFACE...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        const next = prev + Math.random() * 15;
        
        // Update text based on progress
        const textIdx = Math.floor((next / 100) * texts.length);
        if (texts[textIdx]) setLoadingText(texts[textIdx]);
        
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-cyber-dark flex flex-col items-center justify-center p-10 font-orbitron"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-2">
          <span className="text-cyber-neon text-sm tracking-widest">{loadingText}</span>
          <span className="text-cyber-neon text-sm">{Math.min(100, Math.round(progress))}%</span>
        </div>
        
        <div className="h-1 w-full bg-white/10 relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-cyber-neon shadow-[0_0_15px_#00f3ff]"
          />
        </div>
        
        <div className="mt-8 grid grid-cols-4 gap-2">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="h-1 bg-cyber-neon/20"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
