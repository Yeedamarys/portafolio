// Geometry of the "DL" monogram, in letter units (letters are 2 units tall).
// The SVG fallback and the 3D extrusion are drawn from the same measurements.
export const MONOGRAM = {
  stroke: 0.38,
  dStem: 0.6, // where the D's bowl starts
  dRadius: 1,
  lStart: 1.95,
  lEnd: 3.25,
  height: 2,
};

const { stroke: s, dStem, dRadius: r, lStart, lEnd, height: h } = MONOGRAM;

// SVG coordinates (y grows downward). D uses evenodd for its counter.
export const MONOGRAM_SVG = {
  viewBox: `-0.25 -0.25 ${lEnd + 0.5} ${h + 0.5}`,
  d: `M0 0H${dStem}A${r} ${r} 0 0 1 ${dStem} ${h}H0Z M${s} ${s}H${dStem}A${r - s} ${r - s} 0 0 1 ${dStem} ${h - s}H${s}Z`,
  l: `M${lStart} 0H${lStart + s}V${h - s}H${lEnd}V${h}H${lStart}Z`,
};
