import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Mascot, { ICON_COUNT } from './Mascot';
import { ScrollRootContext } from '../scrollRoot';

const SEEN_KEY = 'ap-loader-seen';

// Stops the monitor screen from scrolling while the loader covers it.
const setScrollLocked = (el, locked) => {
    if (el) el.style.overflow = locked ? 'hidden' : '';
};

const seenBefore = () => {
    try {
        return sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
        return false;
    }
};

// First-visit loader: the mascot plays while a counter runs to 100, then tumbles and the
// whole screen slides away. Shown once per session; reduced motion gets a quick fade.
const Loader = () => {
    const reduced = useReducedMotion();
    const root = useContext(ScrollRootContext);
    const [open, setOpen] = useState(() => !seenBefore());
    const [pct, setPct] = useState(0);
    const [icon, setIcon] = useState(0);
    const [tumble, setTumble] = useState(false);

    useEffect(() => {
        if (!open) return undefined;
        const scroller = root.current;
        setScrollLocked(scroller, true);
        const total = reduced ? 400 : 2200;
        const start = performance.now();
        const tick = setInterval(() => {
            const t = Math.min(1, (performance.now() - start) / total);
            setPct(Math.round(t * t * (3 - 2 * t) * 100));
            if (t >= 1) clearInterval(tick);
        }, 40);
        const swap = setInterval(() => setIcon((i) => (i + 1) % ICON_COUNT), 520);
        const fall = setTimeout(() => setTumble(true), total + 100);
        const done = setTimeout(() => {
            try {
                sessionStorage.setItem(SEEN_KEY, '1');
            } catch {
                /* storage unavailable: loader just shows again next visit */
            }
            setScrollLocked(scroller, false);
            setOpen(false);
        }, total + (reduced ? 200 : 900));
        return () => {
            clearInterval(tick);
            clearInterval(swap);
            clearTimeout(fall);
            clearTimeout(done);
            setScrollLocked(scroller, false);
        };
    }, [open, reduced, root]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="loader"
                    role="status"
                    aria-label="Loading"
                    initial={{ y: 0, opacity: 1 }}
                    exit={reduced ? { opacity: 0 } : { y: '-100%' }}
                    transition={{ duration: reduced ? 0.25 : 0.8, ease: [0.76, 0, 0.24, 1] }}
                    style={{ position: 'absolute', inset: 0, zIndex: 100, backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <span className="micro" style={{ position: 'absolute', top: '24%', left: '50%', transform: 'translateX(-50%)' }}>Loading...</span>
                    <Mascot icon={icon} className={tumble ? 'mascot-tumble' : ''} style={{ width: 'min(420px, 62cqw)' }} />
                    <span className="micro" style={{ position: 'absolute', left: 'clamp(20px, 3.2cqw, 48px)', bottom: 28 }}>Avish Parekh — Portfolio</span>
                    <span className="micro" style={{ position: 'absolute', right: 'clamp(20px, 3.2cqw, 48px)', bottom: 28 }}>{String(pct).padStart(2, '0')}%</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
