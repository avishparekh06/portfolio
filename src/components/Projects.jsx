import React from 'react';
import { motion } from 'framer-motion';
import { Github, Trophy } from 'lucide-react';

const projects = [
    {
        title: 'MyToyota',
        subtitle: null,
        award: '1st Place · Best Toyota Hack, HackTX',
        date: 'October 2025',
        description: 'Car recommendation platform customizing vehicle matching based on financial and personal preferences. Engineered a RAG pipeline with embeddings for user profiles and car data. Integrated Gemini API and ElevenLabs for context-aware voice interactions, reducing dealership call time by 15%.',
        tech: ['RAG', 'Gemini API', 'ElevenLabs', 'Voice AI', 'Python'],
        github: 'https://github.com/avishparekh06',
        cardColor: '#ff4d8b',
        textColor: '#ffffff',
    },
    {
        title: 'Pintos',
        subtitle: 'Operating Systems Kernel',
        award: null,
        date: 'April 2026',
        description: 'Engineered a complete user program pipeline with argument passing, syscall handling, and process synchronization. Built a virtual memory subsystem with on-demand paging, frame table, swap, clock eviction, and stack growth detection. Implemented a full file system with extensible inodes, nested subdirectories, and buffer cache.',
        tech: ['C', 'OS', 'Virtual Memory', 'File Systems', 'Systems Programming'],
        github: 'https://github.com/avishparekh06',
        cardColor: '#1a3a3a',
        textColor: '#ffffff',
    },
    {
        title: 'charmV5',
        subtitle: 'ARM Pipeline Emulator',
        award: null,
        date: 'November 2025',
        description: 'Developed a full 5-stage ARM pipeline emulator in C covering fetch, decode, execute, memory, and writeback stages. Designed hazard control, forwarding logic, and pipeline registers to handle data and control hazards across stages.',
        tech: ['C', 'ARM Architecture', 'CPU Pipeline', 'Computer Architecture'],
        github: 'https://github.com/avishparekh06',
        cardColor: '#b8a4ed',
        textColor: '#0a0a0a',
    },
    {
        title: 'AI Interview Trainer',
        subtitle: null,
        award: null,
        date: 'January 2025',
        description: 'AI-powered interview practice tool with voice-based interaction and real-time feedback. Reached 95%+ accuracy in grading by integrating OpenAI language models for response evaluation.',
        tech: ['React', 'TailwindCSS', 'OpenAI API', 'VAPI', 'Python'],
        github: 'https://github.com/avishparekh06',
        cardColor: '#ffb084',
        textColor: '#0a0a0a',
    },
    {
        title: 'Crypto Market Analytics',
        subtitle: null,
        award: null,
        date: 'December 2024',
        description: 'Real-time market data dashboard for 10,000+ cryptocurrencies via CoinGecko API integration. Interactive components display price, market cap, and 24h percent changes with live data.',
        tech: ['React', 'CoinGecko API', 'Data Visualization', 'JavaScript'],
        github: 'https://github.com/avishparekh06',
        cardColor: '#e8b94a',
        textColor: '#0a0a0a',
    },
];

const Projects = () => {
    return (
        <section id="projects" style={{ backgroundColor: '#faf5e8', padding: '96px 0' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 56 }}
                >
                    <p className="section-label" style={{ marginBottom: 12 }}>Projects</p>
                    <h2 className="display-lg">Things I've Built</h2>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: index * 0.08 }}
                            style={{
                                backgroundColor: project.cardColor,
                                borderRadius: 24,
                                padding: 32,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'default',
                            }}
                            whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(0,0,0,0.12)' }}
                        >
                            {/* Top row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {project.award && (
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 5,
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: 11,
                                            fontWeight: 600,
                                            color: project.textColor,
                                            backgroundColor: 'rgba(255,255,255,0.25)',
                                            padding: '3px 10px',
                                            borderRadius: 9999,
                                        }}>
                                            <Trophy size={10} aria-hidden="true" />
                                            {project.award}
                                        </span>
                                    )}
                                    <span style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: 12,
                                        fontWeight: 500,
                                        color: project.textColor,
                                        opacity: 0.65,
                                    }}>
                                        {project.date}
                                    </span>
                                </div>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${project.title} GitHub`}
                                    style={{
                                        color: project.textColor,
                                        opacity: 0.65,
                                        padding: 6,
                                        borderRadius: 8,
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        transition: 'opacity 0.15s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '0.65'}
                                >
                                    <Github size={16} />
                                </a>
                            </div>

                            {/* Title + subtitle */}
                            <div style={{ marginBottom: 12 }}>
                                <h3 style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 22,
                                    color: project.textColor,
                                    letterSpacing: '-0.5px',
                                    lineHeight: 1.15,
                                    marginBottom: project.subtitle ? 4 : 0,
                                }}>
                                    {project.title}
                                </h3>
                                {project.subtitle && (
                                    <p style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: 13,
                                        fontWeight: 500,
                                        color: project.textColor,
                                        opacity: 0.65,
                                    }}>
                                        {project.subtitle}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 14,
                                lineHeight: 1.65,
                                color: project.textColor,
                                opacity: 0.8,
                                flexGrow: 1,
                                marginBottom: 24,
                            }}>
                                {project.description}
                            </p>

                            {/* Tech tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {project.tech.map((t, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: 12,
                                            fontWeight: 500,
                                            color: project.textColor,
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                            padding: '4px 10px',
                                            borderRadius: 9999,
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
