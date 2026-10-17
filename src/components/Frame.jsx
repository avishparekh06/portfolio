import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import DisplayWord from './DisplayWord';
import { MENU, META } from '../pages/meta';
import { profile } from '../data';
import useLoaderReady from '../pages/useLoaderReady';

const Sparkle = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
        <path d="M7 1v12M1 7h12M2.8 2.8l8.4 8.4M11.2 2.8l-8.4 8.4" />
    </svg>
);

// The title: the giant name on the home page, "My Projects" etc. on the others. Each rises out of
// its own mask when the page appears.
const Title = ({ page }) => {
    const reduced = useReducedMotion();
    const ready = useLoaderReady();
    const meta = META[page];
    const rise = (delay) => ({
        initial: reduced ? false : { y: '108%' },
        animate: { y: reduced || ready ? 0 : '108%' },
        transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
    });
    const words = meta ? meta.title : profile.name;
    const size = meta ? 'clamp(40px, min(8.6cqw, 17cqh), 150px)' : 'clamp(44px, min(14.5cqw, 25cqh), 232px)';

    return (
        <h1 className={`page-title${meta ? '' : ' is-home'}`} key={page} style={{ fontSize: size, '--chars': Math.max(...words.map((w) => w.length)) }}>
            <span className="title-mask">
                <motion.span className="serif" style={{ display: 'inline-block' }} {...rise(0.12)}>{words[0]}</motion.span>
            </span>
            <span className="title-mask">
                <motion.span className="sans-display" style={{ display: 'inline-block' }} {...rise(0.22)}>{words[1]}</motion.span>
            </span>
            {!meta && <sup className="micro title-tag">(UT)</sup>}
        </h1>
    );
};

const Note = ({ lines, side }) => (
    <motion.p
        className={`micro title-note title-note-${side}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
    >
        {lines.map((l) => (
            <span key={l} style={{ display: 'block' }}>{l}</span>
        ))}
    </motion.p>
);

// Numbered menu. Hovering an item opens a black band across the screen with a giant ghost of the
// word; clicking starts the page transition from that band.
const MenuRow = ({ page, onNavigate, locked }) => {
    const [hover, setHover] = useState(null);
    const bandRef = useRef(null);
    const navRef = useRef(null);
    const label = MENU.find((m) => m.key === hover)?.label;
    const pointerType = useRef('mouse'); // touch has no hover: the band follows the press instead
    const releaseTimer = useRef(null);
    const press = (key, e) => {
        pointerType.current = e.pointerType;
        if (e.pointerType === 'mouse') return;
        clearTimeout(releaseTimer.current);
        setHover(key);
    };
    const release = (e) => {
        if (e.pointerType === 'mouse') return;
        clearTimeout(releaseTimer.current);
        releaseTimer.current = setTimeout(() => setHover(null), 320);
    };
    useEffect(() => () => clearTimeout(releaseTimer.current), []);

    return (
        <nav
            ref={navRef}
            className="menu-row reveal-item"
            aria-label="Primary"
            onMouseLeave={() => setHover(null)}
            style={{ color: hover ? '#ececec' : 'var(--ink)' }}
        >
            <div ref={bandRef} className="menu-band" aria-hidden="true" style={{ clipPath: hover ? 'inset(0% 0% 0% 0%)' : 'inset(50% 0% 50% 0%)' }}>
                <AnimatePresence mode="wait">
                    {hover && (
                        <motion.span
                            key={hover}
                            className="menu-ghost"
                            initial={{ y: '55%', opacity: 0 }}
                            animate={{ y: '0%', opacity: 1 }}
                            exit={{ y: '-30%', opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <DisplayWord word={label} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            {MENU.map((m, i) => (
                <button
                    key={m.key}
                    type="button"
                    className="menu-item"
                    aria-current={page === m.key ? 'page' : undefined}
                    disabled={locked}
                    onMouseEnter={() => pointerType.current === 'mouse' && setHover(m.key)}
                    onPointerDown={(e) => press(m.key, e)}
                    onPointerUp={release}
                    onPointerCancel={release}
                    onFocus={(e) => e.currentTarget.matches(':focus-visible') && setHover(m.key)}
                    onBlur={() => setHover(null)}
                    onClick={() => {
                        // the band is the swell's origin (on phones it is the full-bleed block behind the row)
                        const band = bandRef.current?.getBoundingClientRect();
                        onNavigate(m.key, band && band.height > 0 ? band : navRef.current?.getBoundingClientRect());
                    }}
                >
                    <span className="menu-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="menu-label">{m.label}</span>
                </button>
            ))}
            <span className="menu-year">©2026</span>
        </nav>
    );
};

// Shared page furniture: top bar, title zone, numbered menu, then the page's own content.
const Frame = ({ page, onNavigate, locked, children }) => {
    const meta = META[page];
    return (
        <div className="frame">
            <header className="topbar reveal-item">
                <div className="topbar-left">
                    <Sparkle />
                    <span className="micro">Open to internships<br />&amp; full-time roles</span>
                </div>
                <button type="button" className="brand" onClick={() => onNavigate('home')} disabled={locked}>
                    AVISH PAREKH<sup>®</sup>
                </button>
                <span className="micro topbar-right">Portfolio<br />Vol.01</span>
            </header>

            <section className="title-zone">
                <Title page={page} />
                {meta && <Note lines={meta.left} side="left" key={`l-${page}`} />}
                {meta && <Note lines={meta.right} side="right" key={`r-${page}`} />}
            </section>

            <MenuRow page={page} onNavigate={onNavigate} locked={locked} />

            <div className="lower" key={page}>
                {children}
            </div>
        </div>
    );
};

export default Frame;
