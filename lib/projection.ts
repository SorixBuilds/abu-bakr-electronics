// Equirectangular projection into a square viewBox with padding.
// Bounds hug the city spread (not the national extent) so the constellation fills its canvas.
const B = { minLon: 65.5, maxLon: 76.0, minLat: 24.0, maxLat: 35.0 };

export function project(lat: number, lon: number, size = 1000, pad = 80) {
  const x = pad + ((lon - B.minLon) / (B.maxLon - B.minLon)) * (size - pad * 2);
  const y = pad + ((B.maxLat - lat) / (B.maxLat - B.minLat)) * (size - pad * 2);
  return { x, y };
}

/** Quadratic Bézier arc; control point offset perpendicular to the chord by 18% of its length. */
export function arcPath(a: { x: number; y: number }, b: { x: number; y: number }, bend = 0.18) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  // perpendicular, always bowing "upwards" for a consistent look
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const cx = mx + nx * len * bend;
  const cy = my + ny * len * bend;
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}
