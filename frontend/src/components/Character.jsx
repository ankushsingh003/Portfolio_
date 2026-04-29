import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const GlassObject = () => {
  const mesh = useRef();
  
  useFrame((state) => {
    const { mouse } = state;
    if (mesh.current) {
      // Horizontal Slide
      const targetX = mouse.x * 3;
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, 0.05);
      
      // Rotation follow
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -mouse.y * 0.5, 0.1);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.x * 0.5, 0.1);
    }
  });

  return (
    <mesh ref={mesh} scale={1.5}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <MeshDistortMaterial 
        color="#da7fa8" 
        speed={2} 
        distort={0.4} 
        radius={1}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const Character = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100vh',
      zIndex: 5,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <GlassObject />
          </Float>
          <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Character;
