import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is mobile or touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 1024;
    
    if (isTouchDevice || isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.role === 'button';
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:block">
      {/* Main Outer Crosshair Ring */}
      <motion.div
        className="absolute top-0 left-0 w-10 h-10 border border-cyber-neon/40 rounded-full flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 90 : 0
        }}
      >
        {/* Crosshair Notches */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-cyber-neon" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-cyber-neon" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-cyber-neon" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-cyber-neon" />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 bg-cyber-neon rounded-full shadow-[0_0_15px_#00f3ff]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />

      {/* HUD Coordinates Display */}
      <motion.div
        className="absolute top-0 left-0 ml-6 mt-6 font-mono text-[8px] text-cyber-neon/50 uppercase tracking-widest flex flex-col items-start gap-1"
        style={{
          x: cursorX,
          y: cursorY
        }}
      >
        <div className="bg-cyber-neon/10 px-1">X: {mousePos.x}</div>
        <div className="bg-cyber-neon/10 px-1">Y: {mousePos.y}</div>
        <div className="flex items-center gap-1">
          <div className={`w-1 h-1 rounded-full ${isHovering ? 'bg-cyber-pink animate-pulse' : 'bg-cyber-neon animate-pulse'}`} />
          <span>{isHovering ? 'TARGET_LOCKED' : 'SCANNING...'}</span>
        </div>
      </motion.div>

      {/* Trailing Glow Spray */}
      {isHovering && (
        <motion.div
          layoutId="cursor-glow"
          className="absolute top-0 left-0 w-32 h-32 bg-cyber-neon/5 rounded-full blur-3xl"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%"
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;
