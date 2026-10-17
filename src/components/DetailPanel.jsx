import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import DisplayWord from './DisplayWord';

const EASE = [0.22, 1, 0.36, 1];

// The sentences are the resume's own. Figures inside them (70%, 57M+, 3,000+) are set in the serif.
const FIGURE = /(\d[\d,.]*(?:[kKmMbB]|\+%?|%\+?)?)/g;
const withFigures = (text) =>
    text.split(FIGURE).map((part, i) => (i % 2 === 1 ? <span key={i} className="serif">{part}</span> : part));

// Rises out of its own mask.
const Rise = ({ delay, reduced, children }) => (
    <span className="detail-mask">
        <motion.span
            style={{ display: 'block' }}
            initial={reduced ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay, ease: EASE }}
        >
            {children}
        </motion.span>
    </span>
);

// Full-screen black sheet for a tile: the title in giant type on the left, and the write-up on
// the right in large, quiet sentences. Arrow keys step through items, Esc closes.
const DetailPanel = ({ detail, onClose, onStep }) => {
    const reduced = useReducedMotion();
    const closeRef = useRef(null);
    const item = detail ? detail.items[detail.index] : null;

    // remember what opened the sheet, so closing hands focus back to it
    const openerRef = useRef(null);
    const isOpen = !!item;
    useEffect(() => {
        if (!isOpen) return undefined;
        openerRef.current = document.activeElement;
        return () => {
            const el = openerRef.current;
            openerRef.current = null;
            if (el && el.isConnected) el.focus({ preventScroll: true });
        };
    }, [isOpen]);

    useEffect(() => {
        if (!item) return undefined;
        closeRef.current?.focus();
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onStep(1);
            if (e.key === 'ArrowLeft') onStep(-1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [item, onClose, onStep]);

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    key="sheet"
                    className="detail"
                    role="dialog"
                    aria-modal="true"
                    aria-label={item.title}
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                    exit={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="detail-bar">
                        <span className="detail-where">
                            {detail.section}
                            <span>{detail.index + 1} of {detail.items.length}</span>
                        </span>
                        <div className="detail-actions">
                            <button type="button" onClick={() => onStep(-1)}>Previous</button>
                            <button type="button" onClick={() => onStep(1)}>Next</button>
                            <button ref={closeRef} type="button" onClick={onClose}>Close</button>
                        </div>
                    </div>

                    <div className="detail-main" key={item.id}>
                        <header className="detail-head">
                            <h2 className="detail-title" style={{ '--chars': Math.max(...item.title.split(' ').map((w) => w.length)) }}>
                                <Rise delay={0.4} reduced={reduced}><DisplayWord word={item.title} /></Rise>
                            </h2>
                            <div className="detail-meta">
                                {item.kicker && <p className="detail-role">{item.kicker}</p>}
                                <p>{item.date}</p>
                                {item.award && <p className="detail-role">{item.award}</p>}
                                <p className="detail-tags">{item.tags.join(', ')}</p>
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="detail-link">
                                        View code <ArrowUpRight size={13} aria-hidden="true" />
                                    </a>
                                )}
                            </div>
                        </header>

                        <ul className="detail-rows">
                            {item.bullets.map((text, i) => (
                                <motion.li
                                    key={text}
                                    className="detail-row"
                                    initial={reduced ? false : { opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.55 + i * 0.1, ease: EASE }}
                                >
                                    {withFigures(text)}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DetailPanel;
