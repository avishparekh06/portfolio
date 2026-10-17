import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Small label that trails the cursor with a little spring lag; rests at a spot inside `boundsRef`
// until the pointer first moves. Used by the loader and the page-transition screen.
const CursorLabel = ({ boundsRef, children, animate, transition, rest = [0.62, 0.27] }) => {
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const sx = useSpring(px, { stiffness: 260, damping: 28, mass: 0.6 });
    const sy = useSpring(py, { stiffness: 260, damping: 28, mass: 0.6 });

    const labelRef = useRef(null);

    useLayoutEffect(() => {
        // The bounds element's ref is attached after this child's layout effect on first mount, so on
        // touch screens (no pointer to follow) fall back to the label's own container.
        const coarse = window.matchMedia('(pointer: coarse)').matches;
        const el = boundsRef.current || (coarse ? labelRef.current?.offsetParent : null);
        const box = el?.getBoundingClientRect();
        if (!box) return;
        px.set(box.width * rest[0]);
        py.set(box.height * rest[1]);
        sx.jump(px.get());
        sy.jump(py.get());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const onMove = (e) => {
            const box = boundsRef.current?.getBoundingClientRect();
            if (!box) return;
            px.set(e.clientX - box.left + 16);
            py.set(e.clientY - box.top + 18);
        };
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
    }, [boundsRef, px, py]);

    return (
        <motion.span
            ref={labelRef}
            className="micro"
            animate={animate}
            transition={transition}
            style={{ position: 'absolute', left: 0, top: 0, x: sx, y: sy, color: 'inherit', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 3 }}
        >
            {children}
        </motion.span>
    );
};

export default CursorLabel;
