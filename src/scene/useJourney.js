import { useEffect, useRef } from 'react';
import { sectionProgress } from '../lib/scrollMath.js';
import { activeIndex, localProgress } from '../lib/story.js';
import { SECTION_IDS } from './path.js';
import { story } from './storyState.js';

const GROUPS = ['skills', 'experience', 'projects'];

// Returns a ref holding 0..1 journey progress and keeps the shared `story` state current:
// per-section progress, plus the card the reader is on in each group (cards opt in with
// data-story="<group>"). Anchors are re-measured when the document resizes so nothing drifts.
export default function useJourney() {
  const progress = useRef(0);

  useEffect(() => {
    let boxes = [];
    const measure = () => {
      boxes = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, height: r.height };
      }).filter(Boolean);
    };
    const update = () => {
      const vh = window.innerHeight;
      const anchors = boxes.map((b) => b.top + b.height / 2);
      progress.current = sectionProgress(anchors, window.scrollY, vh);
      story.progress = progress.current;
      boxes.forEach((b, i) => {
        story.local[i] = localProgress(b.top, b.height, window.scrollY, vh);
      });
      GROUPS.forEach((g) => {
        const rects = [...document.querySelectorAll(`[data-story="${g}"]`)].map((el) =>
          el.getBoundingClientRect(),
        );
        story.active[g] = activeIndex(rects, vh);
      });
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
