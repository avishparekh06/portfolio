const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

// "October 2025" or "May 2026 – Aug 2026" (the first date) as a sortable number.
const stamp = (text) => {
    const m = text.match(/([A-Za-z]+)\s+(\d{4})/);
    return m ? Number(m[2]) * 12 + (MONTHS[m[1].slice(0, 3).toLowerCase()] ?? 0) : 0;
};

// Numbers the items in the order they appear on screen, so the tile numbers and the "n of N" in
// the detail sheet always agree with what you see.
//  byYear: true  -> newest first, grouped under year labels (Experience)
//  byYear: false -> the resume's own order, one row with no year labels (Projects)
export default function arrange(items, { byYear = true } = {}) {
    const ordered = byYear ? [...items].sort((a, b) => stamp(b.date) - stamp(a.date)) : [...items];
    const numbered = ordered.map((item, i) => ({
        ...item,
        number: String(i + 1).padStart(2, '0'),
        year: (item.date.match(/\d{4}/) || ['-'])[0],
    }));
    if (!byYear) return { items: numbered, groups: [{ year: null, items: numbered }] };
    const years = [...new Set(numbered.map((x) => x.year))];
    return { items: numbered, groups: years.map((year) => ({ year, items: numbered.filter((x) => x.year === year) })) };
}
