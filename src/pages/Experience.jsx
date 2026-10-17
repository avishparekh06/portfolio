import React from 'react';
import Gallery from '../components/Gallery';
import arrange from './order';
import { experiences } from '../data';

// Roles as tiles grouped by the year they started, newest first.
const Experience = ({ onOpen }) => {
    const { items, groups } = arrange(
        experiences.map((e) => ({
            id: e.company,
            title: e.company,
            kicker: e.title,
            date: e.period,
            tags: e.tags,
            bullets: e.bullets,
        })),
    );
    return <Gallery groups={groups} onOpen={(item) => onOpen({ section: 'Experience', items, index: items.indexOf(item) })} />;
};

export default Experience;
