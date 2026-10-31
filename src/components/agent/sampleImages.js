// High-fidelity SVG-based screenshots authentically reflecting 7CodeArena's live UI & theme
// Colors: #00b8a3 (Signature Teal), #0f172a (Dark Slate), #facc15 (Arena Gold), #2566e8 (Blue)

const svgToBase64 = (svgString) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

export const SAMPLE_HOMEPAGE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07090e"/>
      <stop offset="50%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="#07090e"/>
    </linearGradient>
    <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00b8a3"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="900" height="520" fill="url(#bgGrad)" />
  
  <!-- Subtle Grid -->
  <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
    <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#1e293b" stroke-width="0.5" stroke-opacity="0.3"/>
  </pattern>
  <rect width="900" height="520" fill="url(#grid)" />

  <!-- Navbar -->
  <rect x="0" y="0" width="900" height="64" fill="#0b1220" stroke="#1e293b" stroke-width="1"/>
  
  <!-- Logo with 7 Badge -->
  <rect x="30" y="16" width="32" height="32" rx="8" fill="#00b8a3"/>
  <text x="46" y="40" text-anchor="middle" fill="#07090e" font-family="'Josefin Sans', sans-serif" font-weight="900" font-size="20">7</text>
  <text x="72" y="39" fill="#00b8a3" font-family="'Josefin Sans', sans-serif" font-weight="800" font-size="20" letter-spacing="0.5">CODE<tspan fill="#ffffff">ARENA</tspan></text>
  
  <!-- Nav items -->
  <text x="250" y="38" fill="#e2e8f0" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">PvP Battles</text>
  <text x="350" y="38" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">7-Universe</text>
  <text x="450" y="38" fill="#94a3b8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500">7Problem (DSA)</text>
  <text x="570" y="38" fill="#94a3b8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500">7Jobs</text>
  <text x="640" y="38" fill="#94a3b8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500">7Resume</text>

  <!-- Login Button -->
  <rect x="760" y="16" width="110" height="32" rx="6" fill="#00b8a3"/>
  <text x="815" y="37" text-anchor="middle" fill="#07090e" font-family="'Montserrat', sans-serif" font-size="12" font-weight="800">ENTER ARENA</text>

  <!-- Live Ticker Banner -->
  <rect x="180" y="80" width="540" height="28" rx="14" fill="#0f172a" stroke="#00b8a3" stroke-width="1" stroke-opacity="0.6"/>
  <text x="450" y="99" text-anchor="middle" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1">⚡ 7CODEARENA: BATTLE TODAY, HIRED TOMORROW</text>

  <!-- Main Hero Titles -->
  <text x="450" y="160" text-anchor="middle" fill="#ffffff" font-family="'Montserrat', sans-serif" font-weight="900" font-size="34">Connect, Conquer Battles, and</text>
  <text x="450" y="202" text-anchor="middle" fill="url(#tealGrad)" font-family="'Montserrat', sans-serif" font-weight="900" font-size="36" filter="url(#glow)">Level Up Your Career in 7-Universe</text>

  <text x="450" y="238" text-anchor="middle" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="13.5">Engage with a high-performance battle engine designed to test your logic in real-time PvP coding duels.</text>

  <!-- CTA Buttons -->
  <rect x="290" y="260" width="150" height="42" rx="8" fill="#00b8a3"/>
  <text x="365" y="286" text-anchor="middle" fill="#07090e" font-family="'Montserrat', sans-serif" font-size="13" font-weight="800">START 1V1 BATTLE</text>

  <rect x="460" y="260" width="150" height="42" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>
  <text x="535" y="286" text-anchor="middle" fill="#ffffff" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">EXPLORE 7-UNIVERSE</text>

  <!-- 3 Pillar Feature Cards -->
  <!-- Card 1: 1v1 PvP Arena -->
  <rect x="50" y="328" width="245" height="156" rx="12" fill="#0f172a" stroke="#00b8a3" stroke-width="1" stroke-opacity="0.5"/>
  <circle cx="85" cy="365" r="16" fill="#00b8a3" fill-opacity="0.15"/>
  <text x="77" y="372" fill="#00b8a3" font-size="18">⚔️</text>
  <text x="115" y="370" fill="#ffffff" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">PvP Battle Arena</text>
  <text x="70" y="405" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">Race in timed algorithm duels with</text>
  <text x="70" y="425" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">instant judge test case verification.</text>
  <rect x="70" y="445" width="115" height="22" rx="4" fill="#00b8a3" fill-opacity="0.15"/>
  <text x="127" y="460" text-anchor="middle" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700">Arena Room Matches</text>

  <!-- Card 2: 7-Universe Roadmap -->
  <rect x="325" y="328" width="250" height="156" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.5"/>
  <circle cx="360" cy="365" r="16" fill="#38bdf8" fill-opacity="0.15"/>
  <text x="352" y="372" fill="#38bdf8" font-size="18">🌌</text>
  <text x="390" y="370" fill="#ffffff" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">7-Universe Roadmap</text>
  <text x="345" y="405" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">Gamified learning from Syntax basics</text>
  <text x="345" y="425" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">to advanced DSA, Cloud & AI.</text>
  <rect x="345" y="445" width="105" height="22" rx="4" fill="#38bdf8" fill-opacity="0.15"/>
  <text x="397" y="460" text-anchor="middle" fill="#38bdf8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700">Unlock Universes</text>

  <!-- Card 3: 7Jobs & Battle Level -->
  <rect x="605" y="328" width="245" height="156" rx="12" fill="#0f172a" stroke="#facc15" stroke-width="1" stroke-opacity="0.5"/>
  <circle cx="640" cy="365" r="16" fill="#facc15" fill-opacity="0.15"/>
  <text x="632" y="372" fill="#facc15" font-size="18">💼</text>
  <text x="670" y="370" fill="#ffffff" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">7Jobs & 7Resume</text>
  <text x="625" y="405" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">Apply to jobs requiring minimum</text>
  <text x="625" y="425" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">Battle Arena Level qualifications.</text>
  <rect x="625" y="445" width="115" height="22" rx="4" fill="#facc15" fill-opacity="0.15"/>
  <text x="682" y="460" text-anchor="middle" fill="#facc15" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700">Battle Level Gating</text>
</svg>
`;

export const SAMPLE_DASHBOARD_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520">
  <defs>
    <linearGradient id="dashBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="#07090e"/>
    </linearGradient>
  </defs>

  <rect width="900" height="520" fill="url(#dashBg)" />

  <!-- Header -->
  <rect x="0" y="0" width="900" height="60" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <rect x="25" y="16" width="28" height="28" rx="6" fill="#00b8a3"/>
  <text x="39" y="36" text-anchor="middle" fill="#07090e" font-family="'Josefin Sans', sans-serif" font-weight="900" font-size="16">7</text>
  <text x="60" y="36" fill="#00b8a3" font-family="'Josefin Sans', sans-serif" font-weight="800" font-size="18">CODE<tspan fill="#fff">ARENA</tspan> // <tspan fill="#94a3b8" font-size="13" font-weight="500">Student Coder Dashboard</tspan></text>
  
  <rect x="720" y="14" width="155" height="32" rx="16" fill="#1e293b" stroke="#00b8a3" stroke-width="1"/>
  <circle cx="738" cy="30" r="10" fill="#00b8a3"/>
  <text x="755" y="35" fill="#ffffff" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">Alex_Dev · Level 18</text>

  <!-- Left Sidebar / Student Profile Card -->
  <rect x="30" y="80" width="240" height="410" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  
  <circle cx="150" cy="140" r="38" fill="#1e293b" stroke="#00b8a3" stroke-width="2"/>
  <text x="135" y="148" font-size="26">👨‍💻</text>
  
  <text x="150" y="200" text-anchor="middle" fill="#ffffff" font-family="'Montserrat', sans-serif" font-weight="700" font-size="18">Alex Chen</text>
  <text x="150" y="220" text-anchor="middle" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-weight="600" font-size="13">@alex_coder</text>

  <!-- Battle Level Badge -->
  <rect x="55" y="240" width="190" height="32" rx="8" fill="#1e293b" stroke="#facc15" stroke-width="1"/>
  <text x="150" y="261" text-anchor="middle" fill="#facc15" font-family="'Montserrat', sans-serif" font-weight="800" font-size="12">⭐ BATTLE ARENA LEVEL 18</text>

  <line x1="50" y1="290" x2="250" y2="290" stroke="#1e293b" stroke-width="1"/>

  <!-- Stats List -->
  <text x="50" y="325" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="13">PvP Battles:</text>
  <text x="240" y="325" text-anchor="end" fill="#ffffff" font-family="'Montserrat', sans-serif" font-weight="700" font-size="13">142 Matches</text>

  <text x="50" y="355" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="13">Win Rate:</text>
  <text x="240" y="355" text-anchor="end" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-weight="700" font-size="13">68.4% (97W / 45L)</text>

  <text x="50" y="385" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="13">Daily Streak:</text>
  <text x="240" y="385" text-anchor="end" fill="#facc15" font-family="'Montserrat', sans-serif" font-weight="700" font-size="13">🔥 14 Days</text>

  <text x="50" y="415" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="13">7Jobs Eligibility:</text>
  <text x="240" y="415" text-anchor="end" fill="#38bdf8" font-family="'Montserrat', sans-serif" font-weight="700" font-size="13">Tier 2 Jobs Qualified</text>

  <rect x="50" y="445" width="200" height="30" rx="6" fill="#00b8a3" fill-opacity="0.15" stroke="#00b8a3" stroke-width="1"/>
  <text x="150" y="465" text-anchor="middle" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-weight="700" font-size="12">QUEUE LIVE DUEL</text>

  <!-- Right Section: XP Bar & Stats Cards -->
  <rect x="290" y="80" width="580" height="100" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <text x="315" y="112" fill="#ffffff" font-family="'Montserrat', sans-serif" font-weight="700" font-size="16">Experience & Level Progression</text>
  <text x="840" y="112" text-anchor="end" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-weight="700" font-size="14">4,850 / 6,000 XP (80.8%)</text>
  
  <!-- Progress Bar -->
  <rect x="315" y="128" width="530" height="14" rx="7" fill="#1e293b"/>
  <rect x="315" y="128" width="428" height="14" rx="7" fill="#00b8a3"/>
  <text x="315" y="163" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">1,150 XP needed to unlock "Diamond Gladiator" rank & Tier 3 7Jobs access</text>

  <!-- Universe Target Card -->
  <rect x="290" y="200" width="280" height="140" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <text x="310" y="230" fill="#38bdf8" font-family="'Montserrat', sans-serif" font-weight="700" font-size="13">ACTIVE 7-UNIVERSE TARGET</text>
  <text x="310" y="260" fill="#ffffff" font-family="'Montserrat', sans-serif" font-weight="700" font-size="16">Universe 3: Dynamic Prog</text>
  <text x="310" y="285" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">Knapsack Problem, Matrix Chain Mult</text>
  <rect x="310" y="302" width="130" height="24" rx="6" fill="#38bdf8" fill-opacity="0.15"/>
  <text x="375" y="318" text-anchor="middle" fill="#38bdf8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700">8 / 12 Challenges Done</text>

  <!-- 7Jobs Eligibility Card -->
  <rect x="590" y="200" width="280" height="140" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <text x="610" y="230" fill="#facc15" font-family="'Montserrat', sans-serif" font-weight="700" font-size="13">7JOBS PORTAL STATUS</text>
  <text x="610" y="258" fill="#ffffff" font-family="'Montserrat', sans-serif" font-size="13">⭐ Unlocked: SDE-1 Frontend Roles</text>
  <text x="610" y="283" fill="#ffffff" font-family="'Montserrat', sans-serif" font-size="13">🔒 Locked: Backend Systems (Req: Lvl 20)</text>
  <rect x="610" y="302" width="130" height="24" rx="6" fill="#facc15" fill-opacity="0.15"/>
  <text x="675" y="318" text-anchor="middle" fill="#facc15" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700">Level 18 Verified</text>

  <!-- AI Mentor Callout -->
  <rect x="290" y="360" width="580" height="130" rx="12" fill="#091823" stroke="#00b8a3" stroke-width="1" stroke-dasharray="4 4"/>
  <text x="320" y="395" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-weight="800" font-size="15">🎯 7CODEARENA AI COACH RECOMMENDATION:</text>
  <text x="320" y="425" fill="#e2e8f0" font-family="'Noto Sans', sans-serif" font-size="13">"Your 68.4% win rate qualifies you for high-tier battles. Complete 2 more DP challenges in Universe 3 to reach Level 20."</text>
  <text x="320" y="448" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">Reaching Level 20 will unlock full 7Jobs recruiter visibility and SDE-2 Backend interview tracks!</text>
</svg>
`;

export const SAMPLE_ERROR_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520">
  <defs>
    <linearGradient id="ideBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07090e"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>

  <rect width="900" height="520" fill="url(#ideBg)" />

  <!-- Code Editor Header -->
  <rect x="0" y="0" width="900" height="44" fill="#0b1220" stroke="#1e293b" stroke-width="1"/>
  <circle cx="20" cy="22" r="5" fill="#ef4444"/>
  <circle cx="36" cy="22" r="5" fill="#facc15"/>
  <circle cx="52" cy="22" r="5" fill="#00b8a3"/>
  <text x="80" y="27" fill="#e5e7eb" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">7CodeArena PvP Code Runner — Problem: #42 "Two Sum Sorted Array"</text>
  <rect x="760" y="8" width="120" height="28" rx="6" fill="#dc2626"/>
  <text x="820" y="26" text-anchor="middle" fill="#ffffff" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">SUBMIT FAILED</text>

  <!-- Code Editor -->
  <rect x="20" y="60" width="860" height="220" rx="8" fill="#07090e" stroke="#1e293b" stroke-width="1"/>
  <text x="40" y="90" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">1</text>
  <text x="70" y="90" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="13">def</text>
  <text x="105" y="90" fill="#00b8a3" font-family="'JetBrains Mono', monospace" font-size="13">two_sum_sorted</text>
  <text x="230" y="90" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13">(numbers, target):</text>

  <text x="40" y="115" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">2</text>
  <text x="70" y="115" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13">    left = 0</text>

  <text x="40" y="140" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">3</text>
  <text x="70" y="140" fill="#ef4444" font-family="'JetBrains Mono', monospace" font-size="13">    right = len(numbers)   # BUG: should be len(numbers) - 1</text>

  <text x="40" y="165" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">4</text>
  <text x="70" y="165" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="13">    while</text>
  <text x="120" y="165" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13">left &lt; right:</text>

  <text x="40" y="190" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">5</text>
  <text x="70" y="190" fill="#ef4444" font-family="'JetBrains Mono', monospace" font-size="13">        current_sum = numbers[left] + numbers[right]  # &lt;-- ERROR TRIGGER</text>

  <text x="40" y="215" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">6</text>
  <text x="70" y="215" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="13">        if</text>
  <text x="95" y="215" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13">current_sum == target: return [left + 1, right + 1]</text>

  <text x="40" y="240" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">7</text>
  <text x="70" y="240" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="13">        elif</text>
  <text x="110" y="240" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13">current_sum &lt; target: left += 1</text>

  <text x="40" y="265" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="13">8</text>
  <text x="70" y="265" fill="#f43f5e" font-family="'JetBrains Mono', monospace" font-size="13">        else</text>
  <text x="110" y="265" fill="#e2e8f0" font-family="'JetBrains Mono', monospace" font-size="13">: right -= 1</text>

  <!-- Terminal Output -->
  <rect x="20" y="300" width="860" height="200" rx="8" fill="#14090b" stroke="#dc2626" stroke-width="1.5"/>
  <rect x="20" y="300" width="860" height="30" rx="8" fill="#2d0b11"/>
  <text x="35" y="320" fill="#f87171" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700">❌ 7CODEARENA JUDGE RUNNER (Python 3.11)</text>

  <text x="35" y="355" fill="#fca5a5" font-family="'JetBrains Mono', monospace" font-size="13">Traceback (most recent call last):</text>
  <text x="35" y="380" fill="#fca5a5" font-family="'JetBrains Mono', monospace" font-size="13">  File "solution.py", line 5, in two_sum_sorted</text>
  <text x="55" y="405" fill="#f87171" font-family="'JetBrains Mono', monospace" font-size="13">    current_sum = numbers[left] + numbers[right]</text>
  <text x="35" y="435" fill="#ef4444" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="14">IndexError: list index out of range</text>
  <text x="35" y="465" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">Test case 1 failed: Input: numbers = [2, 7, 11, 15], target = 9</text>
  <text x="35" y="485" fill="#64748b" font-family="'Noto Sans', sans-serif" font-size="12">Execution halted in 12ms. Exit code 1.</text>
</svg>
`;

export const SAMPLE_LOGIN_ERROR_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520">
  <defs>
    <linearGradient id="loginBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060911"/>
      <stop offset="50%" stop-color="#0d1527"/>
      <stop offset="100%" stop-color="#05070c"/>
    </linearGradient>
    <filter id="loginGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="900" height="520" fill="url(#loginBg)" />

  <!-- Top Nav Bar -->
  <rect x="0" y="0" width="900" height="56" fill="#0b1220" stroke="#1e293b" stroke-width="1"/>
  <rect x="25" y="14" width="28" height="28" rx="6" fill="#00b8a3"/>
  <text x="39" y="34" text-anchor="middle" fill="#07090e" font-family="'Montserrat', sans-serif" font-weight="900" font-size="16">7</text>
  <text x="60" y="34" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-weight="800" font-size="17">7CODE<tspan fill="#fff">ARENA</tspan></text>
  <text x="210" y="34" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">🔐 Authentication Gateway · Secure Login</text>

  <!-- Centered Login Card -->
  <rect x="230" y="70" width="440" height="425" rx="16" fill="#0e172a" stroke="#ef4444" stroke-width="1.5" filter="url(#loginGlow)"/>

  <!-- Logo in Card -->
  <circle cx="450" cy="105" r="22" fill="#00b8a3" fill-opacity="0.2"/>
  <text x="450" y="112" text-anchor="middle" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-weight="900" font-size="20">7</text>
  <text x="450" y="142" text-anchor="middle" fill="#ffffff" font-family="'Montserrat', sans-serif" font-weight="800" font-size="18">Welcome Back to 7CodeArena</text>
  <text x="450" y="160" text-anchor="middle" fill="#94a3b8" font-family="'Noto Sans', sans-serif" font-size="12">Log in to sync your PvP Elo, Daily Streaks & 7Jobs</text>

  <!-- Red Error Banner -->
  <rect x="255" y="174" width="390" height="56" rx="8" fill="#450a0a" stroke="#ef4444" stroke-width="1"/>
  <text x="272" y="194" fill="#fca5a5" font-family="'Montserrat', sans-serif" font-weight="700" font-size="12">⚠️ AUTH ERROR [CODE: CA-AUTH-401]</text>
  <text x="272" y="210" fill="#fecaca" font-family="'Noto Sans', sans-serif" font-size="11">Google OAuth popup was blocked & OTP verification token expired.</text>
  <text x="272" y="223" fill="#f87171" font-family="'Noto Sans', sans-serif" font-size="10.5">Click "Fix with 7CodeArena AI Agent" below for instant resolution.</text>

  <!-- Form Fields -->
  <!-- Email -->
  <text x="255" y="250" fill="#cbd5e1" font-family="'Montserrat', sans-serif" font-weight="600" font-size="11.5">EMAIL / USERNAME</text>
  <rect x="255" y="258" width="390" height="36" rx="6" fill="#1e293b" stroke="#ef4444" stroke-width="1"/>
  <text x="270" y="281" fill="#f8fafc" font-family="'Noto Sans', sans-serif" font-size="13">alex.chen@7codearena.com</text>

  <!-- Password -->
  <text x="255" y="312" fill="#cbd5e1" font-family="'Montserrat', sans-serif" font-weight="600" font-size="11.5">PASSWORD</text>
  <rect x="255" y="320" width="390" height="36" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="270" y="344" fill="#64748b" font-family="'Noto Sans', sans-serif" font-size="16">••••••••••••••••</text>
  <text x="635" y="343" text-anchor="end" fill="#00b8a3" font-family="'Noto Sans', sans-serif" font-size="11">Forgot?</text>

  <!-- Login Button (Failed state) -->
  <rect x="255" y="368" width="390" height="38" rx="6" fill="#dc2626"/>
  <text x="450" y="392" text-anchor="middle" fill="#ffffff" font-family="'Montserrat', sans-serif" font-weight="700" font-size="13">LOGIN FAILED — RETRY</text>

  <!-- AI Agent Assist Prompt Button -->
  <rect x="255" y="416" width="390" height="34" rx="6" fill="#00b8a3" fill-opacity="0.15" stroke="#00b8a3" stroke-width="1"/>
  <text x="450" y="438" text-anchor="middle" fill="#00b8a3" font-family="'Montserrat', sans-serif" font-weight="700" font-size="12">⚡ FIX LOGIN ISSUE WITH 7CODEARENA AI AGENT</text>

  <text x="450" y="475" text-anchor="middle" fill="#64748b" font-family="'Noto Sans', sans-serif" font-size="11">Don't have an account? <tspan fill="#00b8a3">Register on 7CodeArena</tspan></text>
</svg>
`;

export const SAMPLE_PRESETS = [
  {
    id: 'login-error',
    title: '🔐 Login Page Error (OTP / Auth)',
    subtitle: 'CA-AUTH-401 · OAuth Popup Blocked & OTP Expired',
    dataUrl: svgToBase64(SAMPLE_LOGIN_ERROR_SVG),
    badge: 'Login & Auth Help',
    category: 'login',
    suggestedPrompt: 'I cannot log in to 7CodeArena from the login page! It shows Error CA-AUTH-401 (Google OAuth popup blocked and OTP expired). Can you diagnose this and give me the fastest way to get logged in?'
  },
  {
    id: 'login-video',
    title: '🎥 Video Screen Recording: Login Loop',
    subtitle: 'Screen capture showing infinite spinner on /login',
    isVideo: true,
    videoDuration: '00:08',
    videoThumb: svgToBase64(SAMPLE_LOGIN_ERROR_SVG),
    badge: 'Video Bug Repro',
    category: 'video',
    suggestedPrompt: 'Here is a screen recording video showing what happens when I try to log in on 7CodeArena. The button spins infinitely and then resets. Please analyze the video frames and tell me how to fix this!'
  },
  {
    id: 'homepage',
    title: '🌐 7CodeArena Homepage',
    subtitle: 'Hero, 1v1 PvP Battles & 7-Universe Roadmap',
    dataUrl: svgToBase64(SAMPLE_HOMEPAGE_SVG),
    badge: 'Homepage & Navigation',
    category: 'homepage',
    suggestedPrompt: 'I uploaded a screenshot of the 7CodeArena homepage. Can you explain what this platform offers, how 1v1 PvP battles work, and how I should get started on the 7-Universe roadmap?'
  },
  {
    id: 'dashboard',
    title: '📊 Student Dashboard Stats',
    subtitle: 'Alex Chen · Battle Level 18 · 68.4% Win Rate',
    dataUrl: svgToBase64(SAMPLE_DASHBOARD_SVG),
    badge: 'Dashboard & Progress',
    category: 'dashboard',
    suggestedPrompt: 'Here is my 7CodeArena student dashboard. What are my current stats (Battle Level, win rate, streak), and what should be my next training strategy to qualify for Tier 3 7Jobs?'
  },
  {
    id: 'error',
    title: '⚠️ Arena Compiler Error',
    subtitle: 'Python IndexError in Two Sum Sorted',
    dataUrl: svgToBase64(SAMPLE_ERROR_SVG),
    badge: 'Code Debugger',
    category: 'compiler',
    suggestedPrompt: 'My code failed the test cases in the arena! Can you analyze this compiler error screenshot, explain why IndexError happened, and give me a hint to fix it without spoiling the battle?'
  }
];
