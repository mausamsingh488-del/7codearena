const fs = require('fs');
const css = fs.readFileSync('7codearena_live.css', 'utf8');

// Find color classes or hex codes
const hexCodes = css.match(/#[0-9a-fA-F]{3,8}/g) || [];
const counts = {};
hexCodes.forEach(c => {
  const norm = c.toLowerCase();
  counts[norm] = (counts[norm] || 0) + 1;
});

const sortedColors = Object.entries(counts).sort((a,b) => b[1] - a[1]);
console.log('Top colors used in 7CodeArena CSS:');
console.log(sortedColors.slice(0, 30));

// Search for background gradients and shadows
const gradients = [...new Set(css.match(/linear-gradient\([^)]+\)/g) || [])];
console.log('\nGradients in CSS:');
console.log(gradients.slice(0, 10));

// Search for key classes like arena, battle, hero, card, navbar
const customClasses = [...new Set(css.match(/\.[a-zA-Z0-9_-]*(?:battle|arena|universe|card|nav|hero|badge|chip|glow)[a-zA-Z0-9_-]*/gi) || [])];
console.log('\nDomain classes:');
console.log(customClasses.slice(0, 40));
