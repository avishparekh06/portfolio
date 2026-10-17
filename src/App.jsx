import React, { useEffect, useRef } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Curtain from './components/Curtain';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { ScrollRootContext } from './scrollRoot';

// The whole site lives inside a monitor on a gray stage, like the reference. The "screen" is
// the scroll container; everything inside sizes itself against it (container units).
function App() {
  const scrollRef = useRef(null);

  useEffect(() => {
    // so arrow keys / space scroll the screen right away
    scrollRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="stage">
      <div className="stage-head micro" aria-hidden="true">
        <span>Avish Parekh</span>
        <span className="gap">Portfolio</span>
        <span>Vol.01 / 2026</span>
      </div>
      <div className="monitor-wrap">
        <div className="monitor">
        <ScrollRootContext.Provider value={scrollRef}>
          <Loader />
          <Navbar />
          <div ref={scrollRef} className="screen-scroll" tabIndex={0} aria-label="Portfolio">
            <main>
              <Hero />
              <Curtain title="About" index={1} />
              <About />
              <Curtain title="Works" index={2} />
              <Experience />
              <Curtain title="Projects" index={3} />
              <Projects />
              <Curtain title="Contact" index={4} />
              <Contact />
            </main>
          </div>
        </ScrollRootContext.Provider>
        </div>
      </div>
      <div className="stand" aria-hidden="true" />
    </div>
  );
}

export default App;
