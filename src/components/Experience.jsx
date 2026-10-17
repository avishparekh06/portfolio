import React from 'react';
import Reveal from './Reveal';
import { experiences } from '../data';

const Experience = () => (
    <section id="experience" style={{ padding: 'clamp(64px, 12cqh, 140px) 0' }}>
        <div className="page">
            <Reveal>
                <p className="micro" style={{ marginBottom: 20 }}>Selected experience / 2024 – 2026</p>
            </Reveal>
            {experiences.map((e) => (
                <Reveal key={e.company}>
                    <hr className="rule" />
                    <article className="row split" style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) minmax(0, 2fr) minmax(0, 2.4fr)', gap: 24, padding: '32px 16px', margin: '0 -16px' }}>
                        <span className="micro">{e.period}</span>
                        <div>
                            <h3 className="serif" style={{ margin: 0, fontSize: 'clamp(36px, 4.6cqw, 68px)', lineHeight: 1 }}>{e.company}</h3>
                            <p className="micro" style={{ margin: '10px 0 0' }}>{e.title}</p>
                            <p className="micro" style={{ margin: '14px 0 0', lineHeight: 1.8 }}>{e.tags.join(' · ')}</p>
                        </div>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
                            {e.bullets.map((b) => (
                                <li key={b} style={{ fontSize: 15, lineHeight: 1.55, paddingLeft: 16, position: 'relative' }}>
                                    <span aria-hidden="true" className="bullet" />{b}
                                </li>
                            ))}
                        </ul>
                    </article>
                </Reveal>
            ))}
            <hr className="rule" />
        </div>
    </section>
);

export default Experience;
