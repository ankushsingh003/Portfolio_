import React, { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const Model = () => {
  const group = useRef();
  const { mouse } = useThree();
  
  // Use a high-compatibility casual human model
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/man/model.gltf');

  useEffect(() => {
    if (group.current) {
      gsap.from(group.current.position, {
        y: -10,
        duration: 1.5,
        ease: 'power3.out'
      });
    }
  }, []);

  useFrame((state) => {
    if (group.current) {
      // 1. Horizontal Movement (Sliding along the X-axis)
      const targetX = mouse.x * 2; // Adjust the '2' to increase/decrease slide range
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.05);

      // 2. Head/Neck tracking (Looking at the cursor)
      const head = group.current.getObjectByName('Head') || group.current.getObjectByName('Neck');
      if (head) {
        head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, mouse.x * 0.6, 0.1);
        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -mouse.y * 0.3, 0.1);
      }
    }
  });

  return <primitive ref={group} object={scene} scale={2} position={[0, -2, 0]} />;
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
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Character;
