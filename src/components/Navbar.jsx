import React, { useContext, useEffect, useState } from 'react';
import { ScrollRootContext } from '../scrollRoot';
import { profile } from '../data';

const links = [
    { name: 'About', href: '#about' },
    { name: 'Works', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

// True while a fully-open black curtain sits under the nav (same progress as Curtain's scroll
// offsets), measured against the monitor screen rather than the window.
const overCurtain = (root) => {
    if (!root) return false;
    const box = root.getBoundingClientRect();
    return [...root.querySelectorAll('[data-curtain]')].some((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top - box.top;
        const progress = (box.height - top) / (box.height + r.height);
        return top <= 32 && top + r.height > 32 && progress >= 0.4;
    });
};

// Solid gray on the page, solid black while a curtain is open, so it never fights the content.
const Navbar = () => {
    const root = useContext(ScrollRootContext);
    const [dark, setDark] = useState(false);
    useEffect(() => {
        const scroller = root.current;
        if (!scroller) return undefined;
        const update = () => setDark(overCurtain(scroller));
        update();
        scroller.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            scroller.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [root]);

    return (
    <header
        style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
            backgroundColor: dark ? 'var(--black)' : 'var(--bg)',
            color: dark ? '#ececec' : 'var(--ink)',
            borderBottom: `1px solid ${dark ? 'transparent' : 'var(--line)'}`,
            transition: 'background-color 0.25s, color 0.25s',
        }}
    >
        <nav
            className="page"
            aria-label="Primary"
            style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}
        >
            <a href="#home" style={{ color: 'inherit', textDecoration: 'none', fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '-0.02em' }}>
                AVISH PAREKH<sup style={{ fontSize: 9, marginLeft: 2 }}>®</sup>
            </a>
            <ul className="nav-links" style={{ display: 'flex', gap: 28, listStyle: 'none', margin: 0, padding: 0 }}>
                {links.map((l) => (
                    <li key={l.name}>
                        <a href={l.href} className="micro" style={{ color: 'inherit', textDecoration: 'none' }}>{l.name}</a>
                    </li>
                ))}
            </ul>
            <div style={{ display: 'flex', gap: 20 }}>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="micro nav-social" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="micro nav-social" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="micro" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 4 }}>Resume</a>
            </div>
        </nav>
    </header>
    );
};

export default Navbar;
