import { createContext } from 'react';

// Ref to the element that scrolls inside the monitor "screen". Scroll-linked pieces (curtains,
// nav theme, loader scroll lock) read it instead of the window.
export const ScrollRootContext = createContext({ current: null });
