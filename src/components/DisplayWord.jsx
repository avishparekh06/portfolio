import React from 'react';

// Mixed display type: first letter italic serif, the rest tight sans.
const DisplayWord = ({ word }) => (
    <>
        <span className="serif">{word[0]}</span>
        <span className="sans-display">{word.slice(1)}</span>
    </>
);

export default DisplayWord;
