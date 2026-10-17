import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import DisplayWord from './DisplayWord';

const HEIGHTS = [29, 22, 33, 26]; // cqh; staggered like the reference's thumbnails

// Tiles grouped by year; the groups and tiles share the screen width, so nothing scrolls sideways.
// Tiles "load in" like the reference: each opens from the top, then its content fades up.
const Gallery = ({ groups, onOpen }) => {
    const reduced = useReducedMotion();
    let n = 0;
    const solo = groups.length === 1 && !groups[0].year; // Projects: no year groups

    return (
        <div className={`gallery${solo ? ' gallery-solo' : ''}`}>
            {groups.map((g) => (
                <div className="gallery-group" key={g.year ?? 'all'} role="group" aria-label={g.year ?? undefined} style={{ '--n': g.items.length }}>
                    {g.year && <span className="gallery-year">{g.year}</span>}
                    <div className="gallery-tiles">
                        {g.items.map((item) => {
                            const i = n++;
                            const h = HEIGHTS[i % HEIGHTS.length];
                            const delay = 0.2 + i * 0.07;
                            return (
                                <div className="tile-slot" key={item.id}>
                                    {solo && <span className="tile-num" aria-hidden="true">{item.number}</span>}
                                <motion.button
                                    type="button"
                                    className="tile"
                                    style={{ height: `${h}cqh` }}
                                    initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
                                    animate={{ clipPath: 'inset(0 0 0% 0)' }}
                                    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={() => onOpen(item)}
                                    aria-label={`${item.title}, ${item.date}. Open details`}
                                >
                                    <motion.span
                                        className="tile-inner"
                                        initial={reduced ? false : { opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.45, delay: delay + 0.3 }}
                                    >
                                        <span className="tile-top">
                                            {!solo && <span className="micro">{item.number}</span>}
                                            <span className="micro">{item.date}</span>
                                        </span>
                                        <span className="tile-title"><DisplayWord word={item.title} /></span>
                                        <span className="tile-foot">
                                            {item.kicker && <span className="micro">{item.kicker}</span>}
                                            <span className="micro">{item.tags.slice(0, 3).join(' · ')}</span>
                                        </span>
                                    </motion.span>
                                </motion.button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
