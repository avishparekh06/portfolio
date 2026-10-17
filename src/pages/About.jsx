import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { education, skills } from '../data';

const Col = ({ n, label, delay, children }) => {
    const reduced = useReducedMotion();
    return (
        <motion.section
            className="about-col"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <p className="micro about-label"><span>{n}</span> {label}</p>
            {children}
        </motion.section>
    );
};

const About = () => (
    <div className="about-grid">
        <Col n="01" label="Education" delay={0.25}>
            <p className="about-lead sans-display">{education.school}</p>
            <p>{education.degree}.<br />{education.details}.</p>
            <p className="micro about-meta">GPA {education.gpa} · {education.graduation}</p>
        </Col>
        <Col n="02" label="Coursework" delay={0.33}>
            <ul className="about-list">
                {education.coursework.map((c) => <li key={c}>{c}</li>)}
            </ul>
        </Col>
        <Col n="03" label="Skills" delay={0.41}>
            {skills.map((s) => (
                <p key={s.name} className="about-skill">
                    <span className="micro">{s.name}</span>
                    {s.tools.join(' / ')}
                </p>
            ))}
        </Col>
    </div>
);

export default About;
