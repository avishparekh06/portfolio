import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder, Trophy } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "MyToyota",
            description: "Developed car recommendation platform that customizes vehicle matching based on financial and personal preferences. Engineered RAG pipeline generating embeddings for user profiles and car data. Integrated Gemini API and ElevenLabs for context-aware voice interactions reducing dealership call time by 15%.",
            tech: ["RAG", "Gemini API", "ElevenLabs", "HackTX Winner"],
            github: "https://github.com/avishparekh06",
            live: "#",
            featured: true
        },
        {
            title: "AI Interview Trainer",
            description: "Built AI-powered interview practice tool with React/TailwindCSS frontend and voice-based interaction. Reached 95%+ accuracy in grading and feedback by integrating OpenAI language models. Implemented question generation, response validation, and feedback delivery.",
            tech: ["React", "TailwindCSS", "OpenAI API", "V API"],
            github: "https://github.com/avishparekh06",
            live: "#",
            featured: false
        },
        {
            title: "Crypto Market Analytics",
            description: "Created React app displaying real-time market data for 10,000+ cryptocurrencies through CoinGecko API integration. Showcased key market metrics including price, market cap, and 24h percent changes through interactive components.",
            tech: ["React", "CoinGecko API", "Data Visualization"],
            github: "https://github.com/avishparekh06",
            live: "#",
            featured: false
        }
    ];

    return (
        <section id="projects" className="py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all group flex flex-col h-full"
                        >
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <Folder size={40} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                                        {project.featured && (
                                            <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded-full border border-yellow-500/20 flex items-center gap-1">
                                                <Trophy size={12} /> Winner
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-4">
                                        <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
                                            <Github size={20} />
                                        </a>
                                        <a href={project.live} className="text-gray-400 hover:text-white transition-colors">
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-medium text-slate-300 bg-slate-700/50 px-3 py-1 rounded-full">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
