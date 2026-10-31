const fs = require('fs');
const js = fs.readFileSync('7codearena_live.js', 'utf8');

// Search for 7-Universe details
const universeMatches = js.match(/universe[0-9a-zA-Z\s_-]{0,50}/gi) || [];
console.log('Universe references:', [...new Set(universeMatches)].slice(0, 30));

// Search for battle levels and ranks
const rankMatches = js.match(/(?:level|rank|gladiator|warrior|master|bronze|silver|gold|platinum|diamond)[0-9a-zA-Z\s_-]{0,30}/gi) || [];
console.log('Rank/level matches:', [...new Set(rankMatches)].slice(0, 30));

// Search for sections on homepage
const homeSnippets = js.match(/<h[1-3][^>]*>[^<]+<\/h[1-3]>/gi) || [];
console.log('Headings in JSX:', [...new Set(homeSnippets)].slice(0, 30));

// Extract sections mentioning "PvP", "Battle", "Roadmap", "Arena"
const battleSnippets = [];
const regex = /["']([^"']{10,120}(?:Battle|Arena|Roadmap|7-Universe|Gladiator|PvP)[^"']{10,120})["']/gi;
let m;
while ((m = regex.exec(js)) !== null && battleSnippets.length < 25) {
  battleSnippets.push(m[1]);
}
console.log('Battle & Arena phrases:\n', battleSnippets);
