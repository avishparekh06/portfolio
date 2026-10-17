import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { projects } from '../data';

const Projects = () => (
    <section id="projects" style={{ padding: 'clamp(64px, 12cqh, 140px) 0' }}>
        <div className="page">
            <Reveal>
                <p className="micro" style={{ marginBottom: 20 }}>Selected projects / 2025 – 2026</p>
            </Reveal>
            {projects.map((p) => (
                <Reveal key={p.title}>
                    <hr className="rule" />
                    <article className="row split" style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) minmax(0, 2fr) minmax(0, 2.4fr)', gap: 24, padding: '32px 16px', margin: '0 -16px' }}>
                        <span className="micro">{p.date}</span>
                        <div>
                            <h3 style={{ margin: 0, fontSize: 'clamp(36px, 4.6cqw, 68px)', lineHeight: 1 }}>
                                <span className="serif">{p.title[0]}</span>
                                <span className="sans-display">{p.title.slice(1)}</span>
                            </h3>
                            {p.subtitle && <p className="micro" style={{ margin: '10px 0 0' }}>{p.subtitle}</p>}
                            {p.award && <p className="micro award" style={{ margin: '10px 0 0' }}>★ {p.award}</p>}
                            <p className="micro" style={{ margin: '14px 0 0', lineHeight: 1.8 }}>{p.tech.join(' · ')}</p>
                        </div>
                        <div>
                            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
                                {p.bullets.map((b) => (
                                    <li key={b} style={{ fontSize: 15, lineHeight: 1.55, paddingLeft: 16, position: 'relative' }}>
                                        <span aria-hidden="true" className="bullet" />{b}
                                    </li>
                                ))}
                            </ul>
                            {p.github && (
                                <a href={p.github} target="_blank" rel="noopener noreferrer" className="micro link" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 18, color: 'inherit' }}>
                                    View code <ArrowUpRight size={12} aria-hidden="true" />
                                </a>
                            )}
                        </div>
                    </article>
                </Reveal>
            ))}
            <hr className="rule" />
        </div>
    </section>
);

export default Projects;
