/**
 * Horizontal offset (px) for each pill in the open orb menu, giving the
 * gentle curve from orb-nav-open.png: first and last pills line up with the
 * orb, the middle pill sits furthest left.
 */
export function orbCurveOffset(index, count, depth = 48) {
  if (count < 2) return 0;
  return -Math.round(depth * Math.sin((Math.PI * index) / (count - 1)));
}
