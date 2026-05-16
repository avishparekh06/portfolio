import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" style={{ backgroundColor: '#faf5e8', padding: '96px 0 80px' }}>
            {/* Top border */}
            <div style={{ width: '100%', height: 1, backgroundColor: '#e5e5e5', marginBottom: 96 }} />

            <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                    <p className="section-label" style={{ marginBottom: 16 }}>Contact</p>
                    <h2 className="display-lg" style={{ marginBottom: 20 }}>Get In Touch</h2>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 17,
                        color: '#6a6a6a',
                        lineHeight: 1.65,
                        maxWidth: 480,
                        margin: '0 auto 40px',
                    }}>
                        Actively looking for internship and full-time opportunities. Have a role in mind or just want to connect?
                    </p>

                    {/* Primary CTA */}
                    <a
                        href="mailto:avishparekh@utexas.edu"
                        className="btn-primary"
                        style={{ display: 'inline-flex', marginBottom: 48 }}
                    >
                        <Mail size={16} aria-hidden="true" />
                        Say Hello
                        <ArrowUpRight size={14} aria-hidden="true" />
                    </a>

                    {/* Contact details */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginBottom: 64 }}>
                        <a href="mailto:avishparekh@utexas.edu" style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#3a3a3a', textDecoration: 'none', fontWeight: 500 }}
                            onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
                            onMouseLeave={e => e.currentTarget.style.color = '#3a3a3a'}
                        >
                            <Mail size={14} style={{ color: '#9a9a9a' }} />
                            avishparekh@utexas.edu
                        </a>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9a9a9a', fontWeight: 500 }}>
                            <Phone size={14} />
                            (972) 207-1875
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9a9a9a', fontWeight: 500 }}>
                            <MapPin size={14} />
                            Austin, TX
                        </span>
                    </div>

                    {/* Footer */}
                    <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: 40 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
                            {[
                                { href: 'https://github.com/avishparekh06', label: 'GitHub', icon: <Github size={18} /> },
                                { href: 'https://linkedin.com/in/avishparekh', label: 'LinkedIn', icon: <Linkedin size={18} /> },
                                { href: 'mailto:avishparekh@utexas.edu', label: 'Email', icon: <Mail size={18} /> },
                            ].map(({ href, label, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    aria-label={label}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 44,
                                        height: 44,
                                        borderRadius: 12,
                                        border: '1px solid #e5e5e5',
                                        backgroundColor: '#fffaf0',
                                        color: '#6a6a6a',
                                        transition: 'color 0.15s, border-color 0.15s, background-color 0.15s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = '#0a0a0a';
                                        e.currentTarget.style.borderColor = '#0a0a0a';
                                        e.currentTarget.style.backgroundColor = '#f5f0e0';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = '#6a6a6a';
                                        e.currentTarget.style.borderColor = '#e5e5e5';
                                        e.currentTarget.style.backgroundColor = '#fffaf0';
                                    }}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9a9a9a' }}>
                            Designed &amp; Built by Avish Parekh
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
