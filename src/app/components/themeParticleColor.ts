/**
 * Color for the hero's decorative particles and globe, per theme. Each one contrasts with its theme's background
 * (Nov 5: the old colors matched the backgrounds, so the animation disappeared on orange, blue and green).
 */
export type Rgb = { r: number; g: number; b: number };

export function themeParticleColor(): Rgb {
  const c = document.documentElement.classList;
  if (c.contains('orange')) return { r: 124, g: 45, b: 18 }; // orange-900 on the orange gradient
  if (c.contains('leaf')) return { r: 7, g: 89, b: 133 }; // sky-800 on the light blue background
  if (c.contains('water')) return { r: 6, g: 95, b: 70 }; // emerald-800 on the light green background
  if (c.contains('light') || c.contains('soft-dark')) return { r: 51, g: 65, b: 85 }; // slate-700 on white
  return { r: 34, g: 211, b: 238 }; // cyan-400 on the dark navy
}
