import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BatteryModel } from './BatteryModel';

export default function HeroBatteryCanvas() {
  return (
    <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <BatteryModel />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
