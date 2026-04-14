import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { useScroll } from 'framer-motion';

const Scene = () => {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 32, 64]} scale={2.4}>
          <MeshDistortMaterial
            color="#00f3ff"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.1}
            metalness={0.8}
            wireframe
          />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1, 32, 64]} scale={1.8}>
          <MeshDistortMaterial
            color="#ff00ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>
    </>
  );
};

const Background3D = () => {
  const { scrollYProgress } = useScroll();
  const [blur, setBlur] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    const scrollUnsub = scrollYProgress.onChange((latest) => {
      setBlur(latest * 15);
    });

    return () => {
       window.removeEventListener('mousemove', handleMouseMove);
       scrollUnsub();
    };
  }, [scrollYProgress]);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none transition-all duration-300"
      style={{ filter: `blur(${blur}px)` }}
    >
      <Canvas camera={{ position: [0, 0, 8] }}>
        <Suspense fallback={null}>
          <group 
            rotation={[mousePos.y * 0.2, mousePos.x * 0.2, 0]}
            position={[mousePos.x * 0.5, -mousePos.y * 0.5, 0]}
          >
            <Scene />
          </group>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;
