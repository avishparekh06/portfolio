import React from 'react';
import { motion } from 'framer-motion';

const highlightMetrics = (text) => {
    const parts = text.split(/(\d[\d,.]*(?:[kKmMbB]|\+%?|%\+?)?)/g);
    return parts.map((part, i) => {
        if (/^\d[\d,.]*(?:[kKmMbB]|\+%?|%\+?)?$/.test(part) && part.length > 0) {
            return <strong key={i} style={{ color: '#1a3a3a', fontWeight: 600 }}>{part}</strong>;
        }
        return part;
    });
};

const Experience = () => {
    const experiences = [
        {
            title: 'Incoming Software Engineer Intern',
            company: 'Visa',
            period: 'May 2026 – Aug 2026',
            status: 'incoming',
            description: [],
            tags: ['Fintech', 'Payments Infrastructure'],
            accentColor: '#c8a850',
        },
        {
            title: 'Software Engineer Intern',
            company: 'RealWork',
            period: 'May 2025 – Present',
            status: 'current',
            description: [
                'Reduced reporting workload by 40% for 10,000+ businesses by building SEO dashboard with Flask and React.',
                'Aggregated 52M+ keyword and visibility data points to deliver growth insights and improve platform performance.',
                'Increased review conversion by 30% through AI call bots designed with context injection and SMS follow-ups.',
                'Engineered AI system that produced job summaries for each service area using job metadata to boost SEO performance.',
            ],
            tags: ['React', 'Flask', 'AI/ML', 'SEO', 'PostgreSQL'],
            accentColor: '#d4a8b8',
        },
        {
            title: 'Software Engineer Intern',
            company: 'Soche Software',
            period: 'Jan 2025 – May 2025',
            status: null,
            description: [
                'Improved local discovery for 3,000+ users by developing mobile app features for events, happy hours, and live music.',
                'Implemented RAG pipeline to process scraped event data and deliver more accurate, context-aware recommendations.',
                'Enhanced usability and boosted engagement by redesigning UI with modern layouts and responsive components.',
            ],
            tags: ['Mobile Dev', 'RAG', 'OpenAI API', 'UI/UX'],
            accentColor: '#c0b4d8',
        },
        {
            title: 'Software Engineer Intern',
            company: 'Phenom',
            period: 'Aug 2024 – Dec 2024',
            status: null,
            description: [
                'Launched marketplace connecting 900+ photographers and athletes with end-to-end booking and payment workflows.',
                'Streamlined contract bookings by implementing custom API endpoints and database schemas to validate each step.',
                'Increased user traction by creating landing page with Next.js and TailwindCSS to showcase marketplace features.',
            ],
            tags: ['Next.js', 'TailwindCSS', 'API Design', 'Database'],
            accentColor: '#e0c0a0',
        },
        {
            title: 'Software Engineer',
            company: 'CodeAssist',
            period: 'Aug 2024 – Dec 2024',
            status: null,
            description: [
                'Built OpenAI-assisted system to automate evaluation of code quality and design with ReactJS, Flask, and PostgreSQL.',
                'Reduced assessment time 50% by optimizing evaluation workflows for 100+ student code submissions each semester.',
                'Improved reliability and deployment speed by containerizing service with Docker and integrating CI/CD pipelines.',
            ],
            tags: ['ReactJS', 'Flask', 'PostgreSQL', 'Docker', 'CI/CD'],
            accentColor: '#a0c0b8',
        },
    ];

    return (
        <section id="experience" style={{ backgroundColor: '#fffaf0', padding: '96px 0' }}>
            <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 24px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 56 }}
                >
                    <p className="section-label" style={{ marginBottom: 12 }}>Experience</p>
                    <h2 className="display-lg">Where I've Worked</h2>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: index * 0.07 }}
                            style={{
                                backgroundColor: '#fffaf0',
                                borderRadius: 16,
                                border: '1px solid #e5e5e5',
                                padding: '28px 32px',
                                borderLeft: `4px solid ${exp.accentColor}`,
                            }}
                        >
                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: exp.description.length ? 20 : 12 }}>
                                <div>
                                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18, color: '#0a0a0a', letterSpacing: '-0.3px', marginBottom: 6 }}>
                                        {exp.title}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, color: '#1a1a1a' }}>
                                            {exp.company}
                                        </span>
                                        {exp.status === 'incoming' && (
                                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#92670a', backgroundColor: '#e8b94a', padding: '2px 10px', borderRadius: 9999 }}>
                                                Incoming
                                            </span>
                                        )}
                                        {exp.status === 'current' && (
                                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#14532d', backgroundColor: '#86efac', padding: '2px 10px', borderRadius: 9999, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                                                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }} />
                                                Current
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: '#9a9a9a', whiteSpace: 'nowrap' }}>
                                    {exp.period}
                                </span>
                            </div>

                            {/* Bullets */}
                            {exp.description.length > 0 && (
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {exp.description.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#3a3a3a', lineHeight: 1.6 }}>
                                            <span style={{ color: '#d0ccc0', marginTop: 6, flexShrink: 0, fontSize: 6 }}>●</span>
                                            <span>{highlightMetrics(item)}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {exp.description.length === 0 && (
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#9a9a9a', fontStyle: 'italic', marginBottom: 16 }}>
                                    Starting May 2026
                                </p>
                            )}

                            {/* Tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {exp.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: 12,
                                            fontWeight: 500,
                                            color: '#3a3a3a',
                                            backgroundColor: '#f5f0e0',
                                            border: '1px solid #e5e5e5',
                                            padding: '4px 10px',
                                            borderRadius: 6,
                                        }}
                                    >
                                        {tag}
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

export default Experience;
