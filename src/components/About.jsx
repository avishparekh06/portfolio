import React from 'react';
import Reveal from './Reveal';
import { education, skills } from '../data';

const Row = ({ label, children }) => (
    <Reveal>
        <hr className="rule" />
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) minmax(0, 3fr)', gap: 24, padding: '28px 0' }} className="split">
            <span className="micro">{label}</span>
            <div>{children}</div>
        </div>
    </Reveal>
);

const About = () => (
    <section id="about" style={{ padding: 'clamp(64px, 12cqh, 140px) 0' }}>
        <div className="page">
            <Reveal>
                <p className="serif" style={{ margin: '0 0 clamp(48px, 9cqh, 96px)', fontSize: 'clamp(32px, 5.2cqw, 76px)', lineHeight: 1.08, maxWidth: '18ch' }}>
                    Computer science student building AI-driven systems.
                </p>
            </Reveal>

            <Row label="Education">
                <p className="sans-display" style={{ margin: 0, fontSize: 'clamp(22px, 2.4cqw, 34px)' }}>{education.school}</p>
                <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.6 }}>
                    {education.degree}. {education.details}.
                </p>
                <p className="micro" style={{ marginTop: 14 }}>GPA {education.gpa} · {education.graduation}</p>
            </Row>

            <Row label="Coursework">
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.9 }}>{education.coursework.join(' / ')}</p>
            </Row>

            {skills.map((s) => (
                <Row key={s.name} label={s.name}>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.9 }}>{s.tools.join(' / ')}</p>
                </Row>
            ))}
            <hr className="rule" />
        </div>
    </section>
);

export default About;
