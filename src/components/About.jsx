import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

const skillCategories = [
    { name: 'Languages', color: '#1a3a3a', textColor: '#ffffff', tools: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'C', 'Go', 'Rust', 'Swift', 'R'] },
    { name: 'Frontend', color: '#b8a4ed', textColor: '#0a0a0a', tools: ['React', 'Next.js', 'TailwindCSS', 'MUI', 'HTML/CSS'] },
    { name: 'Backend & Tools', color: '#ffb084', textColor: '#0a0a0a', tools: ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'Docker', 'AWS', 'GCP', 'Git'] },
    { name: 'AI / ML', color: '#e8b94a', textColor: '#0a0a0a', tools: ['OpenAI API', 'Gemini API', 'RAG Pipelines', 'PyTorch', 'TensorFlow', 'OpenCV', 'Pandas', 'NumPy'] },
    { name: 'Databases', color: '#ff4d8b', textColor: '#ffffff', tools: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Supabase'] },
];

const About = () => {
    const education = {
        school: 'The University of Texas at Austin',
        degree: 'Bachelor of Science, Computer Science',
        gpa: '3.90',
        graduation: 'May 2028',
        details: 'Major in Mathematics · Minor in Business',
        coursework: [
            'Data Structures & Algorithms', 'Operating Systems', 'Computer Architecture',
            'Machine Learning', 'Object-Oriented Programming', 'Linear Algebra',
            'Multivariable Calculus', 'Discrete Mathematics', 'Probability & Statistics',
        ],
    };

    return (
        <section id="about" style={{ backgroundColor: '#faf5e8', padding: '96px 0' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 56 }}
                >
                    <p className="section-label" style={{ marginBottom: 12 }}>About Me</p>
                    <h2 className="display-lg">Background &amp; Skills</h2>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, alignItems: 'start' }}>
                    {/* Education card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{
                            backgroundColor: '#fffaf0',
                            borderRadius: 16,
                            border: '1px solid #e5e5e5',
                            padding: 32,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                            <GraduationCap size={16} style={{ color: '#6a6a6a' }} />
                            <span className="section-label">Education</span>
                        </div>

                        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18, color: '#0a0a0a', marginBottom: 6, letterSpacing: '-0.3px' }}>
                            {education.school}
                        </h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#3a3a3a', fontWeight: 500, marginBottom: 4 }}>
                            {education.degree}
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#6a6a6a', marginBottom: 24 }}>
                            {education.details}
                        </p>

                        {/* GPA + Graduation row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                            <div style={{ backgroundColor: '#1a3a3a', borderRadius: 12, padding: '16px', textAlign: 'center' }}>
                                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: '#ffffff', letterSpacing: '-1px', lineHeight: 1 }}>
                                    {education.gpa}
                                </div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontWeight: 500 }}>GPA</div>
                            </div>
                            <div style={{ backgroundColor: '#f5f0e0', borderRadius: 12, padding: '16px', textAlign: 'center', border: '1px solid #e5e5e5' }}>
                                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#0a0a0a', marginTop: 4 }}>
                                    {education.graduation}
                                </div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6a6a6a', marginTop: 4, fontWeight: 500 }}>Graduation</div>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                                <BookOpen size={12} style={{ color: '#9a9a9a' }} />
                                <span className="section-label">Coursework</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {education.coursework.map((course, i) => (
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
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Skills — colored category cards */}
                    <div>
                        <p className="section-label" style={{ marginBottom: 20 }}>Technical Skills</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {skillCategories.map((cat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.07 }}
                                    style={{
                                        backgroundColor: cat.color,
                                        borderRadius: 16,
                                        padding: '20px 24px',
                                    }}
                                >
                                    <p style={{
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontWeight: 700,
                                        fontSize: 15,
                                        color: cat.textColor,
                                        marginBottom: 12,
                                        letterSpacing: '-0.2px',
                                    }}>
                                        {cat.name}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {cat.tools.map((tool, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 500,
                                                    color: cat.textColor,
                                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                                    padding: '3px 10px',
                                                    borderRadius: 9999,
                                                }}
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
