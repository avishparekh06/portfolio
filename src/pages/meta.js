// Menu order, labels and the page furniture (title + two small notes) for each page.
export const MENU = [
    { key: 'projects', label: 'Projects' },
    { key: 'about', label: 'About' },
    { key: 'experience', label: 'Experience' },
    { key: 'contact', label: 'Contact' },
];

export const PAGES = ['home', ...MENU.map((m) => m.key)];

export const META = {
    home: null,
    projects: { title: ['My', 'Projects'], left: ['Selected projects', 'Built since 2025'], right: ['Select a tile', 'for the details'] },
    about: { title: ['About', 'Me'], left: ['Studying CS', 'at UT Austin'], right: ['Based in', 'Austin, Texas'] },
    experience: { title: ['My', 'Experience'], left: ['Selected roles', 'From 2024 to 2026'], right: ['Select a role', 'for the details'] },
    contact: { title: ["Let's", 'talk.'], left: ['Open to internships', '& full-time roles'], right: ['Austin, TX', '(972) 207-1875'] },
};

export const labelOf = (key) => MENU.find((m) => m.key === key)?.label ?? 'Home';

export const pageFromHash = () => {
    let h = window.location.hash.replace(/^#\/?/, '');
    if (h === 'works') h = 'projects'; // old links
    return PAGES.includes(h) ? h : 'home';
};

export const pushPage = (key) => {
    try {
        window.history.pushState(null, '', key === 'home' ? '#/' : `#/${key}`);
    } catch {
        /* history unavailable (sandboxed frame): navigation still works in-app */
    }
};
