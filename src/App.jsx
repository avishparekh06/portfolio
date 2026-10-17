import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Loader from './components/Loader';
import Frame from './components/Frame';
import Transition from './components/Transition';
import DetailPanel from './components/DetailPanel';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import { ScrollRootContext } from './scrollRoot';
import { labelOf, pageFromHash, pushPage } from './pages/meta';

const OPEN_MS = 520; // black band swells to full screen
const HOLD_MS = 650; // "Loading - NN%" runs; the page is swapped at the end
const CLOSE_MS = 600; // black retracts upward, revealing the new page

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Opening a specific link (e.g. #/experience) skips the mascot loader, which only belongs to the
// home page, and plays that page's own black-screen transition instead.
const bootTarget = () => {
  const to = pageFromHash();
  if (to === 'home') return null;
  // the loader isn't running, so release everything it would have kept hidden
  delete document.documentElement.dataset.loading;
  return to;
};

// The whole site lives inside a monitor on a gray stage. Navigation works like the reference:
// separate pages, a numbered menu with a hover band, and a black loading transition between them.
function App() {
  const reduced = useReducedMotion();
  const scrollRef = useRef(null);
  const monitorRef = useRef(null);
  const timers = useRef([]);
  const [boot] = useState(bootTarget); // page to open straight into, or null for home
  const [page, setPage] = useState(() => (boot && prefersReduced() ? boot : 'home'));
  // covered by black from the very first paint, so the wrong page never flashes
  const [tr, setTr] = useState(() =>
    boot && !prefersReduced() ? { to: boot, label: labelOf(boot), top: 0, bottom: 0, phase: 'hold' } : null,
  ); // { to, label, top, bottom, phase }
  const [pct, setPct] = useState(0);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    // so arrow keys / space scroll the screen right away
    scrollRef.current?.focus({ preventScroll: true });
  }, []);

  const swap = useCallback((to, push) => {
    setPage(to);
    setDetail(null);
    if (push) pushPage(to);
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Runs the rest of a transition: optional swell, the "Loading" hold, swap the page, retract.
  const schedule = useCallback(
    (to, push, openMs) => {
      const startHold = performance.now() + openMs;
      if (openMs) timers.current.push(setTimeout(() => setTr((t) => t && { ...t, phase: 'hold' }), openMs));
      const tick = setInterval(() => {
        const t = Math.min(1, Math.max(0, (performance.now() - startHold) / HOLD_MS));
        setPct(Math.round(t * t * (3 - 2 * t) * 100));
      }, 40);
      timers.current.push(tick);
      timers.current.push(
        setTimeout(() => {
          clearInterval(tick);
          setPct(100);
          swap(to, push);
          setTr((t) => t && { ...t, phase: 'close' });
        }, openMs + HOLD_MS),
      );
      timers.current.push(setTimeout(() => setTr(null), openMs + HOLD_MS + CLOSE_MS));
    },
    [swap],
  );

  const go = useCallback(
    (to, rect, push = true) => {
      if (tr || to === page) return;
      setDetail(null);
      if (reduced) {
        swap(to, push);
        return;
      }
      const box = monitorRef.current.getBoundingClientRect();
      const top = rect ? Math.max(0, rect.top - box.top) : box.height * 0.45;
      const bottom = rect ? Math.max(0, box.bottom - rect.bottom) : box.height * 0.45;
      setPct(0);
      setTr({ to, label: labelOf(to), top, bottom, phase: 'open' });
      schedule(to, push, OPEN_MS);
    },
    [tr, page, reduced, swap, schedule],
  );

  // First paint on a non-home link: the black screen is already up, so go straight to "Loading".
  useEffect(() => {
    if (boot && !prefersReduced()) schedule(boot, false, 0);
    return () => {
      timers.current.forEach((t) => { clearTimeout(t); clearInterval(t); });
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Browser back/forward moves between pages through the same transition.
  const goRef = useRef(go);
  useEffect(() => {
    goRef.current = go;
  }, [go]);
  useEffect(() => {
    const onPop = () => goRef.current(pageFromHash(), null, false);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const stepDetail = useCallback((dir) => {
    setDetail((d) => d && { ...d, index: (d.index + dir + d.items.length) % d.items.length });
  }, []);

  const content = {
    home: <Home />,
    projects: <Projects onOpen={setDetail} />,
    about: <About />,
    experience: <Experience onOpen={setDetail} />,
    contact: <Contact />,
  }[page];

  return (
    <div className="stage">
      <div className="stage-head micro" aria-hidden="true">
        <span>Avish Parekh</span>
        <span className="gap">Portfolio</span>
        <span>Vol.01 / 2026</span>
      </div>
      <div className="monitor-wrap">
        <div className="monitor" ref={monitorRef}>
          <ScrollRootContext.Provider value={scrollRef}>
            {!boot && <Loader />}
            <div ref={scrollRef} className="screen-scroll" tabIndex={0} aria-label="Portfolio" inert={!!detail}>
              <main>
                <Frame page={page} onNavigate={go} locked={!!tr}>
                  {content}
                </Frame>
              </main>
            </div>
            <DetailPanel detail={detail} onClose={() => setDetail(null)} onStep={stepDetail} />
            {tr && <Transition tr={tr} pct={pct} />}
          </ScrollRootContext.Provider>
        </div>
      </div>
      <div className="stand" aria-hidden="true" />
    </div>
  );
}

export default App;
