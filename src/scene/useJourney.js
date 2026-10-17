import { useEffect, useRef } from 'react';
import { sectionProgress } from '../lib/scrollMath.js';
import { SECTION_IDS } from './path.js';

// Returns a ref holding 0..1 journey progress. Re-measures section anchors when the
// document resizes (fonts/images loading) so the camera never drifts.
export default function useJourney() {
  const progress = useRef(0);

  useEffect(() => {
    let anchors = [];
    const measure = () => {
      anchors = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.top + window.scrollY + r.height / 2;
      }).filter((v) => v !== null);
    };
    const update = () => {
      progress.current = sectionProgress(anchors, window.scrollY, window.innerHeight);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, []);

  return progress;
}
