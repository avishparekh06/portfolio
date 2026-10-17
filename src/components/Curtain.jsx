import React, { useContext, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ScrollRootContext } from '../scrollRoot';

// Section title in the reference's mixed type: first letter italic serif, rest tight sans.
export const DisplayWord = ({ word }) => (
    <>
        <span className="serif">{word[0]}</span>
        <span className="sans-display">{word.slice(1)}</span>
    </>
);

const Title = ({ title }) => (
    <h2 style={{ margin: 0, color: '#ececec', fontSize: 'clamp(56px, min(17cqw, 40cqh), 260px)', lineHeight: 0.95 }}>
        <DisplayWord word={title} />
    </h2>
);

const label = (index) => `(${String(index).padStart(2, '0')})`;

// Reduced motion: a plain black band with the title; nothing scroll-driven.
const StaticCurtain = ({ title, index }) => (
    <div data-curtain aria-label={title} style={{ backgroundColor: 'var(--black)', padding: '18cqh 0', textAlign: 'center' }}>
        <p className="micro" style={{ marginBottom: 12 }}>{label(index)}</p>
        <Title title={title} />
    </div>
);

// Scroll-linked black curtain between sections: a thin band opens to full screen, the title
// rises into it, then the curtain scrolls away into the next section.
const AnimatedCurtain = ({ title, index }) => {
    const ref = useRef(null);
    const container = useContext(ScrollRootContext);
    const { scrollYProgress } = useScroll({ container, target: ref, offset: ['start end', 'end start'] });

    const clip = useTransform(scrollYProgress, [0.12, 0.42], ['inset(49% 0% 49% 0%)', 'inset(0% 0% 0% 0%)']);
    const titleY = useTransform(scrollYProgress, [0.3, 0.52], ['110%', '0%']);
    const titleOut = useTransform(scrollYProgress, [0.72, 0.9], ['0%', '-30%']);
    const titleOpacity = useTransform(scrollYProgress, [0.72, 0.9], [1, 0]);

    return (
        <div ref={ref} data-curtain style={{ height: '170cqh', position: 'relative' }} aria-label={title}>
            <div style={{ position: 'sticky', top: 0, height: '100cqh', overflow: 'hidden' }}>
                <motion.div
                    style={{ clipPath: clip, backgroundColor: 'var(--black)', position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <span className="micro" style={{ position: 'absolute', top: 84, left: 'clamp(20px, 3.2cqw, 48px)' }}>{label(index)}</span>
                    <span className="micro" style={{ position: 'absolute', top: 84, right: 'clamp(20px, 3.2cqw, 48px)' }}>Scroll</span>
                    <motion.div style={{ overflow: 'hidden', paddingBottom: '0.06em', opacity: titleOpacity, y: titleOut }}>
                        <motion.div style={{ y: titleY }}><Title title={title} /></motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

const Curtain = (props) => {
    const reduced = useReducedMotion();
    return reduced ? <StaticCurtain {...props} /> : <AnimatedCurtain {...props} />;
};

export default Curtain;
