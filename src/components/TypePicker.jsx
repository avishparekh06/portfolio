import React, { useEffect, useState } from 'react';

const TYPES = ['a', 'b', 'c', 'd', 'e', 'f'];
const NAMES = {
    a: 'Instrument Serif + Inter Tight',
    b: 'Playfair Display + Space Grotesk',
    c: 'Cormorant Garamond + Manrope',
    d: 'Fraunces + DM Sans',
    e: 'DM Serif Display + Archivo',
    f: 'Bodoni Moda + Instrument Sans',
};

const initial = () => {
    try {
        const q = new URLSearchParams(window.location.search).get('type');
        if (TYPES.includes(q)) return q;
        const saved = localStorage.getItem('ap-type');
        if (TYPES.includes(saved)) return saved;
    } catch {
        /* storage blocked: fall back to the default pairing */
    }
    return 'a';
};

// Temporary: lets you click through font pairings on the live page.
const TypePicker = () => {
    const [type, setType] = useState(initial);

    useEffect(() => {
        document.documentElement.dataset.type = type;
        try {
            localStorage.setItem('ap-type', type);
        } catch {
            /* ignore */
        }
    }, [type]);

    return (
        <div className="type-picker" role="group" aria-label="Font pairing">
            <span>Type · {NAMES[type]}</span>
            {TYPES.map((t) => (
                <button key={t} type="button" aria-pressed={type === t} title={NAMES[t]} onClick={() => setType(t)}>
                    {t}
                </button>
            ))}
        </div>
    );
};

export default TypePicker;
