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

const Background3D = () => {
  const { scrollYProgress } = useScroll();
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Apply blur as user scrolls down
      setBlur(latest * 15);
    });
  }, [scrollYProgress]);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none transition-all duration-300"
      style={{ filter: `blur(${blur}px)` }}
    >
      <Canvas camera={{ position: [0, 0, 8] }}>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;
