import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export function BatteryModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={45} />
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-6, 4, 6]} intensity={0.6} color="#009DFF" />
      <spotLight
        position={[-8, 12, 4]}
        angle={0.2}
        penumbra={1}
        intensity={1.5}
        castShadow
        color="#7ED321"
      />

      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <group ref={groupRef}>
          <RoundedBox
            args={[1.5, 2.5, 0.45]}
            radius={0.1}
            smoothness={6}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.15}
              metalness={0.85}
              emissive="#009DFF"
              emissiveIntensity={0.08}
            />
          </RoundedBox>

          {/* Front panel accent */}
          <mesh position={[0, 0, 0.23]}>
            <planeGeometry args={[1.2, 2.1]} />
            <meshStandardMaterial
              color="#111111"
              roughness={0.3}
              metalness={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Glowing status ring */}
          <mesh position={[0, 0.4, 0.24]}>
            <ringGeometry args={[0.28, 0.34, 48]} />
            <meshStandardMaterial
              color="#009DFF"
              emissive="#009DFF"
              emissiveIntensity={2.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Charge indicator bars */}
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[-0.35 + i * 0.23, -0.5, 0.24]}>
              <planeGeometry args={[0.15, 0.06]} />
              <meshStandardMaterial
                color={i < 3 ? '#7ED321' : '#333'}
                emissive={i < 3 ? '#7ED321' : '#000'}
                emissiveIntensity={i < 3 ? 1.2 : 0}
              />
            </mesh>
          ))}

          {/* Top connectors */}
          <mesh position={[-0.42, 1.35, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.18, 16]} />
            <meshStandardMaterial color="#444" metalness={1} roughness={0.2} />
          </mesh>
          <mesh position={[0.42, 1.35, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.18, 16]} />
            <meshStandardMaterial color="#444" metalness={1} roughness={0.2} />
          </mesh>

          {/* Brand stripe */}
          <mesh position={[0, -0.9, 0.24]}>
            <planeGeometry args={[0.9, 0.08]} />
            <meshStandardMaterial
              color="#009DFF"
              emissive="#009DFF"
              emissiveIntensity={1}
            />
          </mesh>
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.5}
        scale={12}
        blur={2.5}
        far={5}
      />
    </>
  );
}
