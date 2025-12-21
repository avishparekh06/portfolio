import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Layout, Terminal, BookOpen, Calculator } from 'lucide-react';

const About = () => {
    const education = {
        school: "The University of Texas at Austin",
        degree: "Bachelor of Science, Computer Science",
        gpa: "3.9",
        graduation: "May 2027",
        details: "Major in Mathematics and Minor in Business",
        coursework: ["Data Structures & Algorithms", "Computer Architecture", "Object-Oriented Programming", "Linear Algebra", "Honors Multivariable Calculus", "Discrete Math", "Probability"]
    };

    const skills = [
        { name: "Languages", icon: <Code2 />, tools: ["Python", "Java", "C++", "JavaScript/TypeScript", "SQL", "Go", "Rust", "Swift"] },
        { name: "Frontend", icon: <Layout />, tools: ["React", "Next.js", "Tailwind CSS", "MUI", "HTML/CSS"] },
        { name: "Backend / Tools", icon: <Server />, tools: ["Node.js", "Flask", "FastAPI", "Docker", "AWS", "Git", "Firebase"] },
        { name: "AI / ML", icon: <Terminal />, tools: ["OpenAI API", "Gemini API", "PyTorch", "TensorFlow", "Pandas", "RAG Pipelines"] },
    ];

    return (
        <section id="about" className="py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-semibold mb-6">Education</h3>
                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors mb-8">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-xl font-bold text-white">{education.school}</h4>
                                <span className="text-blue-400 font-medium whitespace-nowrap">{education.graduation}</span>
                            </div>
                            <p className="text-lg text-gray-300 mb-1">{education.degree}</p>
                            <p className="text-gray-400 mb-4">{education.details} • GPA: <span className="text-white font-semibold">{education.gpa}</span></p>

                            <div className="border-t border-slate-700 pt-4">
                                <p className="text-sm text-gray-400 font-semibold mb-2 flex items-center gap-2">
                                    <BookOpen size={16} /> Relevant Coursework:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {education.coursework.map((course, i) => (
                                        <span key={i} className="text-xs bg-slate-900 text-gray-300 px-2 py-1 rounded">
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold mb-4">Summary</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            I am a Computer Science student at UT Austin with a strong 3.9 GPA, driven by a passion for building scalable software and AI-driven solutions. My experience ranges from developing marketplace platforms to engineering complex RAG pipelines for AI applications.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors h-full"
                            >
                                <div className="text-blue-400 mb-4">{skill.icon}</div>
                                <h4 className="text-xl font-semibold mb-2">{skill.name}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skill.tools.map((tool, i) => (
                                        <span key={i} className="text-sm text-gray-400">• {tool}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
