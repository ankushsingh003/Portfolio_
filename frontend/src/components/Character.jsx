import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const Model = () => {
  const { scene } = useGLTF('https://models.readyplayer.me/64859065961d68019053356e.glb');
  const group = useRef();
  const { mouse } = useThree();

  // Entrance Animation
  useEffect(() => {
    if (group.current) {
      gsap.from(group.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: 'power4.out',
        delay: 1
      });
    }
  }, []);

  // Find the head and neck bones for tracking
  const nodes = useMemo(() => {
    const head = scene.getObjectByName('Head');
    const neck = scene.getObjectByName('Neck');
    return { head, neck };
  }, [scene]);

  useFrame((state) => {
    if (nodes.head && nodes.neck) {
      // Calculate target rotation based on mouse position
      // We map mouse (-1 to 1) to a reasonable rotation range (e.g., -0.5 to 0.5 radians)
      const targetRotationX = mouse.y * 0.5;
      const targetRotationY = mouse.x * 0.5;

      // Smoothly interpolate (lerp) to the target rotation for a natural feel
      nodes.head.rotation.x = THREE.MathUtils.lerp(nodes.head.rotation.x, -targetRotationX, 0.1);
      nodes.head.rotation.y = THREE.MathUtils.lerp(nodes.head.rotation.y, targetRotationY, 0.1);
      
      nodes.neck.rotation.x = THREE.MathUtils.lerp(nodes.neck.rotation.x, -targetRotationX * 0.3, 0.1);
      nodes.neck.rotation.y = THREE.MathUtils.lerp(nodes.neck.rotation.y, targetRotationY * 0.3, 0.1);
    }
  });

  return <primitive ref={group} object={scene} scale={2.5} position={[0, -2.5, 0]} />;
};

const Character = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '80vh',
      zIndex: 5,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Character;
