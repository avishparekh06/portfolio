import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Fade-and-rise on first view; disabled for reduced motion.
const Reveal = ({ children, delay = 0, style, as = 'div' }) => {
    const reduced = useReducedMotion();
    const Tag = motion[as];
    return (
        <Tag
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            style={style}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
