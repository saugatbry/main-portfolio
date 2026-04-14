import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';

const Scene = () => {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 100, 200]} scale={2.4}>
          <MeshDistortMaterial
            color="#00f3ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
            wireframe
          />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1, 100, 200]} scale={1.8}>
          <MeshDistortMaterial
            color="#ff00ff"
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0}
            metalness={1}
          />
        </Sphere>
      </Float>
    </>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Game Developer",
    "Web Developer",
    "AI Builder",
    "Full-Stack Engineer"
  ];
  const [isDeleting, setIsDeleting] = useState(false);

  const scrollToContent = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 150;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setText(currentRole.substring(0, isDeleting ? text.length - 1 : text.length + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyber-neon font-mono tracking-widest block mb-4">
            [ SYSTEM ONLINE ]
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 neon-text-cyan">
            SAUGAT BRY
          </h1>
          <div className="h-12">
            <p className="text-xl md:text-3xl font-orbitron text-cyber-neon opacity-80">
              {text}<span className="animate-pulse">|</span>
            </p>
          </div>
          
          <motion.div 
            className="mt-12 flex flex-col md:flex-row gap-6 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button onClick={scrollToContent} className="btn-cyber group">
              <span className="relative z-10">ENTER EXPERIENCE</span>
              <div className="absolute inset-0 bg-cyber-neon/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button onClick={scrollToContent} className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 font-orbitron tracking-widest hover:bg-white/10 transition-all uppercase">
              Play Portfolio
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cyber-neon/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-cyber-neon rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
