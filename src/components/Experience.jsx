import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            title: "Software Engineer Intern",
            company: "RealWork",
            period: "May 2025 - Present",
            description: [
                "Reduced reporting workload by 40% for 10,000+ businesses by building SEO dashboard with Flask and React.",
                "Aggregated 52M+ keyword and visibility data points to deliver growth insights and improve platform performance.",
                "Increased review conversion by 30% through AI call bots designed with context injection and SMS follow-ups.",
                "Engineered AI system that produced job summaries for each service area using job metadata to boost SEO performance."
            ],
            tags: ["React", "Flask", "AI/ML", "SEO"]
        },
        {
            title: "Software Engineer Intern",
            company: "Soche Software",
            period: "Jan 2025 - May 2025",
            description: [
                "Improved local discovery for 3,000+ users by developing mobile app features for events, happy hours, and live music.",
                "Developed AI-powered search using OpenAI API to provide personalized activity recommendations from user queries.",
                "Implemented RAG pipeline to process scraped event data and deliver more accurate, context-aware recommendations.",
                "Enhanced usability and boosted engagement by redesigning UI with modern layouts and responsive components."
            ],
            tags: ["Mobile Dev", "OpenAI API", "RAG", "UI/UX"]
        },
        {
            title: "Software Engineer Intern",
            company: "Phenom",
            period: "Aug 2024 - Dec 2024",
            description: [
                "Launched marketplace connecting 900+ photographers and athletes with end-to-end booking and payment workflows.",
                "Streamlined contract bookings by implementing custom API endpoints and database schemas to validate each step.",
                "Increased user traction by creating landing page with Next.js and TailwindCSS to showcase marketplace features."
            ],
            tags: ["Next.js", "TailwindCSS", "API Design", "Database"]
        },
        {
            title: "Software Engineer",
            company: "CodeAssist",
            period: "Aug 2024 - Dec 2024",
            description: [
                "Built OpenAI-assisted system to automate evaluation of code quality and design with ReactJS, Flask, and PostgreSQL.",
                "Reduced assessment time 50% by optimizing evaluation workflows for 100+ student code submissions each semester.",
                "Improved reliability and deployment speed by containerizing service with Docker and integrating CI/CD pipelines."
            ],
            tags: ["ReactJS", "Flask", "PostgreSQL", "Docker", "CI/CD"]
        }
    ];

    return (
        <section id="experience" className="py-20 bg-slate-950 text-white">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 border-l-2 border-slate-800"
                        >
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-950"></div>

                            <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                                <span className="flex items-center text-sm text-gray-500 mt-1 sm:mt-0">
                                    <Calendar size={14} className="mr-1" />
                                    {exp.period}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <Briefcase size={16} className="text-blue-400" />
                                <span className="text-blue-400 font-medium">{exp.company}</span>
                            </div>

                            <div className="text-gray-400 mb-4 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                <ul className="list-disc list-inside space-y-2">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="text-sm leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {exp.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-800 text-xs rounded-full text-gray-300 border border-slate-700">
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
