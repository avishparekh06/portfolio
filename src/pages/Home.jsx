import React from 'react';
import Mascot from '../components/Mascot';
import { profile } from '../data';

// Home: the loader lands on this mascot (it finds it by `.hero-bottom svg`).
const Home = () => (
    <div className="hero-bottom">
        <p className="micro reveal-item">
            ✦<br />Software engineer &amp; AI builder, studying computer science at UT Austin.
        </p>
        <Mascot />
        <p className="micro reveal-item blurb-right">
            ✦<br />{profile.intro}
        </p>
    </div>
);

export default Home;
