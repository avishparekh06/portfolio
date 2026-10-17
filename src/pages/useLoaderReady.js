import { useEffect, useState } from 'react';

// False while the first-visit loader is playing; true once it has handed over to the page.
export default function useLoaderReady() {
    const [ready, setReady] = useState(() => document.documentElement.dataset.loading !== '1');
    useEffect(() => {
        const on = () => setReady(true);
        window.addEventListener('loader-done', on);
        return () => window.removeEventListener('loader-done', on);
    }, []);
    return ready;
}
