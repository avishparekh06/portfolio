import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import CursorLabel from './CursorLabel';
import DisplayWord from './DisplayWord';

const EASE = [0.76, 0, 0.24, 1];

// Page transition (as in the reference): the menu band swells to a full black screen carrying the
// destination's name and a "Loading - NN%" label that follows the cursor; once the new page has
// been swapped in underneath, the black retracts upward.
const Transition = ({ tr, pct }) => {
    const ref = useRef(null);
    const { phase, top, bottom, label } = tr;
    const start = `inset(${top}px 0px ${bottom}px 0px)`;
    const target = phase === 'close' ? 'inset(0px 0px 100% 0px)' : 'inset(0px 0px 0px 0px)';

    return (
        <motion.div
            ref={ref}
            className="transition-screen"
            aria-hidden="true"
            initial={{ clipPath: start }}
            animate={{ clipPath: target }}
            transition={{ duration: phase === 'open' ? 0.52 : phase === 'close' ? 0.6 : 0, ease: EASE }}
        >
            <motion.div
                className="transition-word"
                initial={{ opacity: 0.14, y: '12%' }}
                animate={{ opacity: phase === 'close' ? 0.12 : phase === 'hold' ? 1 : 0.32, y: phase === 'close' ? '-8%' : '0%' }}
                transition={{ duration: phase === 'close' ? 0.4 : 0.5, ease: 'easeOut' }}
            >
                <DisplayWord word={label} />
            </motion.div>
            <CursorLabel
                boundsRef={ref}
                rest={[0.1, 0.35]}
                animate={{ opacity: phase === 'close' ? 0 : 1 }}
                transition={{ duration: 0.4 }}
            >
                Loading - {String(pct).padStart(2, '0')}%
            </CursorLabel>
        </motion.div>
    );
};

export default Transition;
