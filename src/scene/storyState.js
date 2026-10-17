// Mutable story state written by useJourney on scroll and read by the 3D worlds every frame.
// `local[i]` is progress through section i (0..1). `active.<group>` is the index of the card
// the reader is on (-1 when none), so each 3D object can highlight whatever the text is about.
export const story = {
  progress: 0,
  local: [0, 0, 0, 0, 0],
  active: { skills: -1, experience: -1, projects: -1 },
};
