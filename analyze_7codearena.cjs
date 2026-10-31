const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function analyze() {
  console.log('Fetching CSS and JS bundles from 7codearena.com...');
  const css = await fetchUrl('https://7codearena.com/assets/index-D5CxPviw.css');
  const js = await fetchUrl('https://7codearena.com/assets/index-0Qz5bYLn.js');

  fs.writeFileSync(path.join(__dirname, '7codearena_live.css'), css);
  fs.writeFileSync(path.join(__dirname, '7codearena_live.js'), js);

  console.log(`Saved CSS: ${css.length} chars, JS: ${js.length} chars`);

  // Analyze CSS: colors, fonts, theme
  const colors = [...new Set(css.match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsl\([^)]+\)/g) || [])];
  const fonts = [...new Set(css.match(/font-family:[^;]+/g) || [])];
  
  // Extract CSS variables:
  const rootVars = [...new Set(css.match(/--[a-zA-Z0-9_-]+:\s*[^;]+/g) || [])];

  console.log('\n--- CSS VARIABLES & THEME ---');
  console.log(rootVars.slice(0, 30));

  console.log('\n--- FONTS USED ---');
  console.log(fonts);

  // Analyze JS: Routes, Keywords, Features, Endpoints, Navigation
  const routeMatches = [...new Set(js.match(/path:\s*["'][^"']+["']/g) || [])];
  console.log('\n--- ROUTES DETECTED IN JS ---');
  console.log(routeMatches);

  // Look for headings, universe roadmap details, battle features
  const titles = [...new Set(js.match(/["'][A-Za-z0-9\s]{4,30}(?:Roadmap|Battle|Arena|Universe|Gladiator|Leaderboard|Profile|Challenge)[A-Za-z0-9\s]{0,30}["']/gi) || [])];
  console.log('\n--- KEYWORDS / HEADINGS IN JS ---');
  console.log(titles.slice(0, 40));

  // Search for API endpoints
  const apiMatches = [...new Set(js.match(/["'](?:https?:\/\/|\/api\/)[^"']+["']/g) || [])];
  console.log('\n--- API ENDPOINTS FOUND ---');
  console.log(apiMatches.filter(m => !m.includes('w3.org') && !m.includes('googletagmanager')).slice(0, 20));
}

analyze().catch(console.error);
