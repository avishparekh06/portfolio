import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section
            id="home"
            style={{
                minHeight: '100vh',
                backgroundColor: '#fffaf0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 64,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle warm gradient wash */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,185,74,0.07) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
                aria-hidden="true"
            />

            <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32 }}
                >
                    <span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '4px 14px',
                            borderRadius: 9999,
                            backgroundColor: '#f5f0e0',
                            border: '1px solid #e5e5e5',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                            fontWeight: 500,
                            color: '#3a3a3a',
                        }}
                    >
                        <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} aria-hidden="true" />
                        Open to internship &amp; full-time roles
                    </span>
                </motion.div>

                {/* Name */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                    <h1 className="display-xl" style={{ marginBottom: 20 }}>
                        Avish Parekh.
                    </h1>
                </motion.div>

                {/* Role */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.32 }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 18,
                        fontWeight: 400,
                        color: '#6a6a6a',
                        marginBottom: 12,
                        lineHeight: 1.5,
                    }}
                >
                    Software Engineer &amp; AI Builder
                    <span style={{ margin: '0 10px', color: '#d0ccc0' }}>·</span>
                    <span style={{ color: '#c2773a', fontWeight: 500 }}>CS @ UT Austin</span>
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.42 }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 16,
                        fontWeight: 400,
                        color: '#9a9a9a',
                        lineHeight: 1.6,
                        maxWidth: 500,
                        margin: '0 auto 40px',
                    }}
                >
                    I build scalable products and AI-driven systems — from RAG pipelines and marketplaces
                    to SEO dashboards serving 10,000+ businesses. Incoming at{' '}
                    <span style={{ color: '#3a3a3a', fontWeight: 500 }}>Visa</span>.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}
                >
                    <a href="#projects" className="btn-primary">
                        View My Work
                        <ArrowRight size={15} aria-hidden="true" />
                    </a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        Download Resume
                    </a>
                </motion.div>

            </div>

            {/* Scroll indicator */}
            <motion.div
                style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: '#9a9a9a' }}
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                aria-hidden="true"
            >
                <ChevronDown size={20} />
            </motion.div>
        </section>
    );
};

export default Hero;
