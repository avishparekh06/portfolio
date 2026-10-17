import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Mascot from './Mascot';
import { profile } from '../data';

const Hero = () => {
    const reduced = useReducedMotion();
    // the name rises once the loader hands over, so the entrance isn't spent behind it
    const [ready, setReady] = useState(() => document.documentElement.dataset.loading !== '1');
    useEffect(() => {
        const on = () => setReady(true);
        window.addEventListener('loader-done', on);
        return () => window.removeEventListener('loader-done', on);
    }, []);
    const rise = (delay) => ({
        initial: reduced ? false : { y: '105%' },
        animate: { y: reduced || ready ? 0 : '105%' },
        transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
    });

    return (
        <section id="home" className="hero-section" style={{ position: 'relative', minHeight: '100cqh', paddingTop: 64, display: 'flex', flexDirection: 'column' }}>
            <div className="page hero-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div className="reveal-item" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20 }}>
                    <span className="micro" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                        Open to internship &amp; full-time roles
                    </span>
                    <span className="micro">{profile.location}</span>
                </div>

                <h1 className="hero-name" style={{ margin: 'clamp(12px, 4cqh, 64px) 0 0', lineHeight: 0.92, fontSize: 'clamp(44px, min(14.5cqw, 25cqh), 232px)', display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '0.22em', whiteSpace: 'nowrap' }}>
                    {/* both words share one baseline; the clip boxes only mask the rise */}
                    <span style={{ display: 'block', overflow: 'hidden', padding: '0 0.08em 0.08em 0.06em' }}>
                        <motion.span className="serif" style={{ display: 'inline-block' }} {...rise(0.1)}>{profile.name[0]}</motion.span>
                    </span>
                    <span style={{ display: 'block', overflow: 'hidden', padding: '0 0.04em 0.08em 0' }}>
                        <motion.span className="sans-display" style={{ display: 'inline-block' }} {...rise(0.22)}>{profile.name[1]}</motion.span>
                    </span>
                    <sup className="micro hero-ut" style={{ fontSize: 'clamp(10px, 1.4cqw, 18px)', alignSelf: 'flex-start', marginLeft: '-0.1em', paddingTop: '0.6em' }}>(UT)</sup>
                </h1>

                <div className="hero-micro reveal-item" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 'clamp(16px, 3cqh, 36px)' }}>
                    {['Software Engineer', 'AI Builder', 'CS @ UT Austin', 'Austin, TX', '2026'].map((t) => (
                        <span key={t} className="micro">{t}</span>
                    ))}
                </div>

                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.9fr) minmax(0, 1fr)', alignItems: 'end', gap: 24, paddingBottom: 32, marginTop: 16 }} className="hero-bottom">
                    <p className="micro reveal-item" style={{ maxWidth: 260, lineHeight: 1.7, color: 'var(--ink)' }}>
                        ✦<br />Software engineer &amp; AI builder, studying computer science at UT Austin.
                    </p>
                    <Mascot style={{ width: '100%', maxWidth: 'min(640px, 64cqh)', justifySelf: 'center' }} />
                    <p className="micro reveal-item" style={{ maxWidth: 300, lineHeight: 1.7, color: 'var(--ink)', justifySelf: 'end' }}>
                        ✦<br />{profile.intro}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
