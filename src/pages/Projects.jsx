import React from 'react';
import Gallery from '../components/Gallery';
import arrange from './order';
import { projects } from '../data';

// Projects as tiles in the same order as the resume (MyToyota first), with no year grouping.
const Projects = ({ onOpen }) => {
    const { items, groups } = arrange(
        projects.map((p) => ({
            id: p.title,
            title: p.title,
            kicker: p.subtitle,
            date: p.date,
            tags: p.tech,
            bullets: p.bullets,
            award: p.award,
            link: p.github,
        })),
        { byYear: false },
    );
    return <Gallery groups={groups} onOpen={(item) => onOpen({ section: 'Projects', items, index: items.indexOf(item) })} />;
};

export default Projects;
