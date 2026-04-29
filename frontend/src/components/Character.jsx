import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const Model = () => {
  const group = useRef();
  const { mouse } = useThree();
  
  // Use a safer loading approach
  const gltf = useGLTF('https://models.readyplayer.me/64859065961d68019053356e.glb', true);

  useEffect(() => {
    console.log("3D Model Loaded Successfully");
    if (group.current) {
      gsap.from(group.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  }, [gltf]);

  useFrame(() => {
    if (group.current) {
      const head = group.current.getObjectByName('Head');
      if (head) {
        head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, mouse.x * 0.5, 0.1);
        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -mouse.y * 0.5, 0.1);
      }
    }
  });

  return <primitive ref={group} object={gltf.scene} scale={2.5} position={[0, -2.5, 0]} />;
};

// Fallback component to show while loading or if it fails
const LoadingPlaceholder = () => (
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#da7fa8" wireframe />
  </mesh>
);

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
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 40 }}
        onCreated={() => console.log("3D Canvas Created")}
        onError={(e) => console.error("3D Canvas Error:", e)}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Suspense fallback={<LoadingPlaceholder />}>
          <Model />
          <Environment preset="city" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Character;
