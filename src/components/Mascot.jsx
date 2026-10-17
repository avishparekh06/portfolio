import React from 'react';

// Own line-art mascot: a developer lounging on a sofa with a laptop, headphones and a mug, a
// plant behind and a cat in front, with a changing icon above the head. Placeholder-style
// drawing; swap for a commissioned illustration any time.
const ICONS = [
    // lightbulb
    <g key="bulb"><circle cx="0" cy="0" r="8" /><path d="M-3 10h6M-2 13h4M-3 -2l3 4 3-4" /></g>,
    // cup
    <g key="cup"><path d="M-8 -5h14v11a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4z" /><path d="M6 -2h3a3 3 0 0 1 0 7H6" /><path d="M-4 -9q2-3 0-6M1 -9q2-3 0-6" /></g>,
    // ball
    <g key="ball"><circle cx="0" cy="0" r="9" /><path d="M0 -4l5 3.5-2 5.5h-6l-2-5.5z" /><path d="M0 -4V-9M5 -0.5l5-2M3 5l3 5M-3 5l-3 5M-5 -0.5l-5-2" /></g>,
    // game controller
    <g key="pad"><rect x="-12" y="-7" width="24" height="14" rx="6" /><path d="M-6 -2v5M-8.5 0.5h5" /><circle cx="5" cy="-1" r="1.4" /><circle cx="8.5" cy="2" r="1.4" /></g>,
];

export const ICON_COUNT = ICONS.length;

const BG = '#ececec';
const INK = '#0a0a0a';

const Mascot = ({ icon = 0, className = '', style }) => (
    <svg
        viewBox="0 0 320 200"
        role="img"
        aria-label="Illustration of a developer lounging on a sofa with a laptop, a plant and a cat"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
    >
        {/* floor */}
        <path d="M14 180H306" strokeWidth="1.5" />
        <path d="M40 186h60M180 186h90" strokeWidth="1" />

        {/* plant behind, left */}
        <g>
            <path d="M42 146l4 34h22l4-34z" fill={BG} />
            <path d="M42 152h30" />
            <path d="M57 146C44 130 40 112 50 96" />
            <path d="M57 146C60 124 70 108 84 100" />
            <path d="M57 146C48 136 30 130 22 114" />
            <path d="M57 146C68 138 84 138 96 126" />
            <path d="M57 146C56 128 58 112 62 94" />
            <path d="M50 96c8 2 11 9 8 17-8-2-11-9-8-17z" fill={BG} />
            <path d="M84 100c-2 8-9 12-17 10 2-8 9-12 17-10z" fill={BG} />
            <path d="M22 114c8-3 15 1 17 9-8 3-15-1-17-9z" fill={BG} />
            <path d="M96 126c-5 6-13 7-20 3 5-6 13-7 20-3z" fill={BG} />
        </g>

        <g className="mascot-bob">
            {/* sofa */}
            <path d="M92 132h150a8 8 0 0 1 8 8v14a6 6 0 0 1-6 6H92a6 6 0 0 1-6-6v-14a8 8 0 0 1 6-8z" fill={BG} />
            <path d="M92 132c-8-4-10-16-4-24 4-5 10-6 14-4" />
            <path d="M242 132v-28a10 10 0 0 1 10-10h6a8 8 0 0 1 8 8v30" />
            <path d="M104 160v14M238 160v14" />
            <path d="M120 134v22M180 134v22" strokeWidth="1.2" />

            {/* mug on the arm, with steam */}
            <path d="M246 86h14v10a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4z" fill={BG} />
            <path d="M260 89h3a3 3 0 0 1 0 6h-3" />
            <path className="mascot-steam" d="M250 80q3-4 0-8M256 80q3-4 0-8" strokeWidth="1.5" />

            {/* legs: thigh to knee, shin down to foot */}
            <path d="M132 130L184 112l32 18 6 14" />
            <path d="M126 138L180 122l28 20 4 8" />
            <path d="M212 150h14" />

            {/* torso in a hoodie, leaning back */}
            <path d="M128 132c0-22 16-40 40-46l22 22c-8 14-22 24-40 26z" fill={BG} />
            <path d="M150 112c6 4 14 6 22 4" strokeWidth="1.5" />
            <path d="M162 88c4 8 12 12 20 12" strokeWidth="1.5" />

            {/* arm reaching to the laptop */}
            <path d="M174 100c12 4 22 10 30 18" />
            <path d="M204 118l6 2-2 5" strokeWidth="1.5" />

            {/* laptop on the knees */}
            <path d="M188 124l44-10 6 8-44 12z" fill={BG} />
            <path d="M200 118l12-36 38-6-14 36z" fill={BG} />
            <circle cx="224" cy="96" r="3.5" strokeWidth="1.5" />

            {/* head: hair, headphones, face */}
            <circle cx="174" cy="72" r="14" fill={BG} />
            <path d="M161 68c1-12 17-16 25-6 3-2 6 0 6 3" />
            <path d="M163 74a12 12 0 0 1 22-8" strokeWidth="2.6" />
            <rect x="158" y="70" width="6" height="10" rx="3" fill={INK} />
            <path d="M184 75h.1M178 78q3 2 6 0" strokeWidth="2.2" />

            {/* icon above head */}
            <g transform="translate(206 34)">{ICONS[icon % ICONS.length]}</g>
            <path d="M232 22v6M229 25h6M154 40v5M151.5 42.5h5" strokeWidth="1.4" />
        </g>

        {/* cat */}
        <g>
            <ellipse cx="258" cy="168" rx="17" ry="11" fill={INK} />
            <circle cx="244" cy="156" r="9" fill={INK} />
            <path d="M237 150l-3-10 9 5zM249 148l5-9 3 11z" fill={INK} />
            <path d="M240 156h.1M247 156h.1" stroke={BG} strokeWidth="2" />
            <path d="M233 158l-9-1M233 161l-8 3M255 158l9-1" stroke={INK} strokeWidth="1" />
            <path className="mascot-tail" d="M274 172c10 0 16-8 12-18-2-5 2-10 8-10" strokeWidth="3.2" />
        </g>
    </svg>
);

export default Mascot;
