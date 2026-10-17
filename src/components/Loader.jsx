import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CursorLabel from './CursorLabel';
import Mascot, { ICON_COUNT } from './Mascot';
import { ScrollRootContext } from '../scrollRoot';

// Stops the monitor screen from scrolling while the loader covers it.
const setScrollLocked = (el, locked) => {
    if (el) el.style.overflow = locked ? 'hidden' : '';
};

const heroMascot = () => document.querySelector('.hero-bottom svg');

const LOAD_MS = 2600; // mascot lounges, icon cycles
const FALL_MS = 520; // sofa drops away, he is left in the air; the scene falls to the hero spot
const LAND_MS = 480; // every part springs back; the hero reveals

// Same sequence as the reference: centered mascot + "Loading..."; then the sofa tilts and drops,
// he falls with his legs up and the cat jumps, the whole scene lands in the hero spot and
// reassembles, and the hero reveals.
// Reduced motion gets a quick cross-fade instead of the fall.
const Loader = () => {
    const reduced = useReducedMotion();
    const root = useContext(ScrollRootContext);
    const [open, setOpen] = useState(true);
    const [icon, setIcon] = useState(0);
    const [phase, setPhase] = useState('load'); // 'load' -> 'fall' -> 'land'
    const [move, setMove] = useState({ mx: 0, my: 0 });
    const mascotRef = useRef(null);
    const overlayRef = useRef(null);

    // Match the hero mascot's size, and park the "Loading..." label, before the first paint.
    useLayoutEffect(() => {
        const hero = heroMascot();
        if (hero && mascotRef.current) mascotRef.current.style.width = `${hero.getBoundingClientRect().width}px`;
    }, []);

    useEffect(() => {
        const scroller = root.current;
        setScrollLocked(scroller, true);
        const swap = setInterval(() => setIcon((i) => (i + 1) % ICON_COUNT), 520);

        const reveal = () => {
            document.documentElement.dataset.reveal = '1'; // nav + hero text fade in
            window.dispatchEvent(new Event('loader-done')); // hero name rises
        };
        const finish = () => {
            delete document.documentElement.dataset.loading; // swap in the real hero mascot
            setScrollLocked(scroller, false);
            setOpen(false);
        };

        const load = reduced ? 400 : LOAD_MS;
        const t1 = setTimeout(() => {
            if (reduced) {
                reveal();
                setPhase('land');
                return;
            }
            const hero = heroMascot();
            const mine = mascotRef.current;
            const next = { mx: 0, my: 0 };
            if (hero && mine) {
                const h = hero.getBoundingClientRect();
                const m = mine.getBoundingClientRect();
                next.mx = h.left + h.width / 2 - (m.left + m.width / 2);
                next.my = h.top + h.height / 2 - (m.top + m.height / 2);
            }
            setMove(next);
            setPhase('fall');
        }, load);
        const t2 = reduced ? null : setTimeout(() => { reveal(); setPhase('land'); }, load + FALL_MS);
        const t3 = setTimeout(finish, load + (reduced ? 300 : FALL_MS + LAND_MS));
        return () => {
            clearInterval(swap);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            setScrollLocked(scroller, false);
        };
    }, [reduced, root]);

    if (!open) return null;
    const falling = phase === 'fall';
    const landing = phase === 'land';
    const settled = falling || landing;
    // gravity: accelerate into the drop
    const drop = { duration: reduced ? 0 : FALL_MS / 1000, ease: [0.55, 0, 1, 0.45] };

    return (
        <div
            ref={overlayRef}
            role="status"
            aria-label="Loading"
            style={{ color: 'var(--ink)', position: 'absolute', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: landing ? 'none' : 'auto' }}
        >
            {/* background: same color as the hero, so it simply goes away once the scene has landed */}
            <motion.div
                animate={{ opacity: landing ? 0 : 1 }}
                transition={{ duration: reduced ? 0.25 : 0.2 }}
                style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--bg)' }}
            />
            <CursorLabel
                boundsRef={overlayRef}
                animate={{ opacity: landing ? 0 : 1 }}
                transition={{ duration: 0.5, delay: landing ? 0.35 : 0 }}
            >
                Loading...
            </CursorLabel>

            <motion.div
                ref={mascotRef}
                animate={{ x: settled ? move.mx : 0, y: settled ? move.my : 0 }}
                transition={drop}
                style={{ position: 'relative', width: 'min(420px, 62cqw)' }}
            >
                <Mascot
                    icon={landing ? 0 : icon}
                    pose={reduced ? 'idle' : falling ? 'fall' : landing ? 'recover' : 'idle'}
                    style={{ width: '100%', display: 'block' }}
                />
            </motion.div>
        </div>
    );
};

export default Loader;
