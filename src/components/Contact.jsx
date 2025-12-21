import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-slate-950 text-white flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-blue-400 font-medium mb-4">What's Next?</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                        I'm currently looking for new opportunities, whether it's an internship or a full-time position.
                        My inbox is always open!
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
                        <a
                            href="mailto:avishparekh@utexas.edu"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 group"
                        >
                            <Mail size={20} />
                            Say Hello
                        </a>

                        <div className="flex items-center gap-2 text-gray-400">
                            <Phone size={18} className="text-blue-400" />
                            <span>(972) 207-1875</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400">
                            <MapPin size={18} className="text-blue-400" />
                            <span>Austin, TX</span>
                        </div>
                    </div>

                    <div className="mt-20 pt-10 border-t border-slate-800 flex flex-col items-center">
                        <div className="flex gap-6 mb-4">
                            <a href="https://github.com/avishparekh06" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><Github size={24} /></a>
                            <a href="https://linkedin.com/in/avishparekh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
                            <a href="mailto:avishparekh@utexas.edu" className="text-gray-400 hover:text-blue-400 transition-colors"><Mail size={24} /></a>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Designed & Built by <span className="text-blue-400">Avish Parekh</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
