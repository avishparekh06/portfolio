import React, { useEffect, useState } from 'react';

const SERIFS = {
    'instrument': 'Instrument Serif',
    'ebgaramond': 'EB Garamond (swash)',
    'rowan': 'Rowan',
    'boska': 'Boska',
    'gambetta': 'Gambetta',
    'sentient': 'Sentient',
    'erode': 'Erode',
    'zodiak': 'Zodiak',
    'newsreader': 'Newsreader',
    'caslon': 'Libre Caslon',
    'spectral': 'Spectral',
    'playfair': 'Playfair Display',
    'bodoni': 'Bodoni Moda',
    'cormorant': 'Cormorant Garamond',
    'fraunces': 'Fraunces',
    'dmserif': 'DM Serif Display'
};
const SANSES = {
    'intertight': 'Inter Tight',
    'inter': 'Inter',
    'hanken': 'Hanken Grotesk',
    'geist': 'Geist',
    'instrumentsans': 'Instrument Sans',
    'manrope': 'Manrope',
    'space': 'Space Grotesk',
    'dmsans': 'DM Sans',
    'archivo': 'Archivo'
};

const read = (param, list, fallback) => {
    try {
        const q = new URLSearchParams(window.location.search).get(param);
        if (q && list[q]) return q;
        const saved = localStorage.getItem('ap2-' + param);
        if (saved && list[saved]) return saved;
    } catch {
        /* storage blocked: fall back to the default pairing */
    }
    return fallback;
};

// Temporary: lets you mix any serif with any sans on the live page.
const TypePicker = () => {
    const [serif, setSerif] = useState(() => read('serif', SERIFS, 'erode'));
    const [sans, setSans] = useState(() => read('sans', SANSES, 'intertight'));

    useEffect(() => {
        document.documentElement.dataset.serif = serif;
        document.documentElement.dataset.sans = sans;
        try {
            localStorage.setItem('ap2-serif', serif);
            localStorage.setItem('ap2-sans', sans);
        } catch {
            /* ignore */
        }
    }, [serif, sans]);

    return (
        <div className="type-picker" role="group" aria-label="Font pairing">
            <label>
                Serif
                <select value={serif} onChange={(e) => setSerif(e.target.value)}>
                    {Object.entries(SERIFS).map(([k, name]) => (
                        <option key={k} value={k}>{name}</option>
                    ))}
                </select>
            </label>
            <label>
                Sans
                <select value={sans} onChange={(e) => setSans(e.target.value)}>
                    {Object.entries(SANSES).map(([k, name]) => (
                        <option key={k} value={k}>{name}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default TypePicker;
