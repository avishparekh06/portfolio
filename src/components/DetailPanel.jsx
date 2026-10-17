import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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

const CLOSE_MS = 520; // must match the detail-out animation in index.css

// Full-screen black sheet for a tile: the title in giant type on the left, and the write-up on
// the right in large, quiet sentences. Arrow keys step through items, Esc closes.
//
// Opening and closing are plain CSS animations on the sheet (see .detail in index.css). The sheet
// stays mounted, fully wiped away, until the close animation ends, so there is no frame at the
// end where it can flash back.
const DetailPanel = ({ detail, onClose, onStep }) => {
    const reduced = useReducedMotion();
    const closeRef = useRef(null);
    const openerRef = useRef(null);

    // keep the last detail on screen while it wipes away
    const [shown, setShown] = useState(detail);
    if (detail && detail !== shown) setShown(detail);
    const closing = !detail && !!shown;
    const item = shown ? shown.items[shown.index] : null;
    const isOpen = !!detail;

    // remember what opened the sheet (before focus moves into it)
    useEffect(() => {
        if (isOpen && !openerRef.current) openerRef.current = document.activeElement;
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return undefined;
        closeRef.current?.focus();
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onStep(1);
            if (e.key === 'ArrowLeft') onStep(-1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose, onStep]);

    // After the wipe finishes: unmount, then hand focus back to the tile that opened it.
    const finishClose = () => {
        setShown(null);
        const el = openerRef.current;
        openerRef.current = null;
        if (el && el.isConnected) el.focus({ preventScroll: true });
    };
    useEffect(() => {
        if (!closing) return undefined;
        const t = setTimeout(finishClose, CLOSE_MS + 250); // safety net if the animation event never fires
        return () => clearTimeout(t);
    }, [closing]);

    if (!item) return null;

    return (
        <div
            className={`detail${closing ? ' is-closing' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            onAnimationEnd={(e) => {
                if (closing && e.target === e.currentTarget) finishClose();
            }}
        >
            <div className="detail-bar">
                <span className="detail-where">
                    {shown.section}
                    <span>{shown.index + 1} of {shown.items.length}</span>
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
        </div>
    );
};

export default DetailPanel;
