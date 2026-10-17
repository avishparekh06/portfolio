export const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'contact'];

// Camera waypoints, one per section; the journey runs mostly down -z with a gentle sway.
export const WAYPOINTS = [
  [0, 0, 14],
  [-1.5, 0.6, -8],
  [1.5, 0.2, -30],
  [-1, 0.8, -52],
  [0, 0.2, -74],
];

// Where each section's world sits: ahead of its waypoint, offset to the side opposite the text.
export const WORLD_CENTERS = [
  [4, 0, 2],
  [-4.5, 0, -20],
  [4.5, 0, -42],
  [0, 0, -64],
  [0, 0, -86],
];

// Background tint per section; all within the cream family.
export const PALETTE_STOPS = ['#fffaf0', '#fbf0e0', '#f6efe2', '#fdf1e4', '#fff6e6'];
