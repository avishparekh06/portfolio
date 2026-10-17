import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import useJourney from './useJourney.js';
import CameraRig from './CameraRig.jsx';
import Backdrop from './Backdrop.jsx';
import HeroWorld from './worlds/HeroWorld.jsx';
import AboutWorld from './worlds/AboutWorld.jsx';
import ExperienceWorld from './worlds/ExperienceWorld.jsx';
import ProjectsWorld from './worlds/ProjectsWorld.jsx';
import ContactWorld from './worlds/ContactWorld.jsx';

export default function Scene({ reduced, quality }) {
  const progress = useJourney();
  const [visible, setVisible] = useState(!document.hidden);

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const worldProps = { reduced, shapeScale: quality.shapeScale };

  return (
    <Canvas
      dpr={quality.dpr}
      frameloop={visible ? 'always' : 'never'}
      camera={{ fov: 50, near: 0.1, far: 200, position: [0, 0, 14] }}
      gl={{ antialias: !quality.mobile, powerPreference: 'high-performance' }}
      eventSource={document.body}
      eventPrefix="client"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Backdrop progress={progress} />
      <CameraRig progress={progress} reduced={reduced} />
      <HeroWorld {...worldProps} />
      <AboutWorld {...worldProps} />
      <ExperienceWorld {...worldProps} />
      <ProjectsWorld {...worldProps} />
      <ContactWorld {...worldProps} />
    </Canvas>
  );
}
