import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Database, Globe } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Three.js Particle Network Background */}
            <ThreeBackground />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-slate-800/50 border border-slate-700 text-blue-400 text-sm font-medium mb-6">
                        Aspiring Software Engineer
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Building the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                            Future of Tech
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        I'm a Computer Science student at the <span className="text-orange-400 font-semibold">University of Texas at Austin</span>.
                        I build accessible, pixel-perfect, and performant web experiences.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#projects"
                            className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 rounded-full bg-slate-800 text-white font-medium hover:bg-slate-700 transition-all border border-slate-700"
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                {/* Tech Stack Icons Floating */}
                <div className="mt-20 flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                        <Code size={40} className="text-blue-400" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                    >
                        <Globe size={40} className="text-purple-400" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                    >
                        <Database size={40} className="text-green-400" />
                    </motion.div>
                </div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ChevronDown size={24} />
            </motion.div>
        </section>
    );
};

export default Hero;
