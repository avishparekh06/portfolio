import React from 'react';
import Reveal from './Reveal';
import { profile } from '../data';

const Contact = () => (
    <section id="contact" style={{ padding: 'clamp(64px, 12cqh, 140px) 0 40px' }}>
        <div className="page">
            <Reveal>
                <h2 style={{ margin: 0, fontSize: 'clamp(52px, min(14cqw, 34cqh), 220px)', lineHeight: 0.95 }}>
                    <span className="serif">Let&rsquo;s</span> <span className="sans-display">talk.</span>
                </h2>
            </Reveal>
            <Reveal delay={0.1}>
                <a href={`mailto:${profile.email}`} className="link sans-display" style={{ display: 'inline-block', marginTop: 'clamp(24px, 5cqh, 56px)', fontSize: 'clamp(22px, 3.6cqw, 52px)' }}>
                    {profile.email}
                </a>
            </Reveal>

            <hr className="rule" style={{ marginTop: 'clamp(48px, 10cqh, 120px)' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 20, padding: '20px 0 8px' }}>
                <span className="micro">{profile.phone}</span>
                <span className="micro">{profile.location}</span>
                <a className="micro link" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="micro link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="micro link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                <span className="micro">© 2026 Avish Parekh</span>
            </div>
        </div>
    </section>
);

export default Contact;
