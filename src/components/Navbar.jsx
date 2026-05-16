import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = ['home', 'about', 'experience', 'projects', 'contact'];
            const current = sections.find(id => {
                const el = document.getElementById(id);
                if (!el) return false;
                const { top, bottom } = el.getBoundingClientRect();
                return top <= 80 && bottom >= 80;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Experience', href: '#experience', id: 'experience' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    return (
        <nav
            style={{
                position: 'fixed',
                width: '100%',
                zIndex: 50,
                height: 64,
                backgroundColor: '#fffaf0',
                borderBottom: scrolled ? '1px solid #e5e5e5' : '1px solid transparent',
                transition: 'border-color 0.3s',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            backgroundColor: '#0a0a0a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fffaf0',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 800,
                            fontSize: 13,
                            letterSpacing: '-0.5px',
                        }}
                    >
                        AP
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#3a3a3a' }}>
                        Avish Parekh
                    </span>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex" style={{ alignItems: 'center', gap: 4 }}>
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                style={{
                                    padding: '8px 14px',
                                    borderRadius: 9999,
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: isActive ? '#0a0a0a' : '#6a6a6a',
                                    backgroundColor: isActive ? '#f5f0e0' : 'transparent',
                                    textDecoration: 'none',
                                    transition: 'color 0.15s, background-color 0.15s',
                                }}
                                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#0a0a0a'; }}
                                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#6a6a6a'; }}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </div>

                {/* Right */}
                <div className="hidden md:flex" style={{ alignItems: 'center', gap: 8 }}>
                    <a
                        href="https://github.com/avishparekh06"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#6a6a6a', textDecoration: 'none', padding: '8px 12px' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#6a6a6a'}
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/avishparekh"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: '#6a6a6a', textDecoration: 'none', padding: '8px 12px' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#6a6a6a'}
                    >
                        LinkedIn
                    </a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: 36, padding: '0 16px', fontSize: 13 }}>
                        <FileText size={13} /> Resume
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0a0a0a', padding: 8 }}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden"
                        style={{
                            position: 'absolute',
                            top: 64,
                            left: 0,
                            right: 0,
                            backgroundColor: '#fffaf0',
                            borderBottom: '1px solid #e5e5e5',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        padding: '12px 0',
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 500,
                                        fontSize: 16,
                                        color: '#0a0a0a',
                                        textDecoration: 'none',
                                        borderBottom: '1px solid #f0ebe0',
                                    }}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 12, justifyContent: 'center' }}>
                                <FileText size={14} /> Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
