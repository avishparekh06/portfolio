import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data';

const Contact = () => {
    const reduced = useReducedMotion();
    const fade = (delay) => ({
        initial: reduced ? false : { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    });
    return (
        <div className="contact-grid">
            <motion.div className="contact-side" {...fade(0.25)}>
                <p className="micro">Phone</p>
                <p>{profile.phone}</p>
                <p className="micro">Location</p>
                <p>{profile.location}</p>
            </motion.div>
            <motion.a href={`mailto:${profile.email}`} className="contact-mail sans-display link" {...fade(0.33)}>
                {profile.email}
            </motion.a>
            <motion.ul className="contact-links" {...fade(0.41)}>
                {[['GitHub', profile.github], ['LinkedIn', profile.linkedin], ['Resume', '/resume.pdf']].map(([name, href]) => (
                    <li key={name}>
                        <a href={href} target="_blank" rel="noopener noreferrer" className="micro link">
                            {name} <ArrowUpRight size={12} aria-hidden="true" />
                        </a>
                    </li>
                ))}
            </motion.ul>
        </div>
    );
};

export default Contact;
