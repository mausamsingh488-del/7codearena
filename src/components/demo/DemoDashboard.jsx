import React from 'react';
import {
  Trophy,
  Swords,
  Flame,
  TrendingUp,
  Map,
  Sparkles,
  Bot,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import CodeArenaDashboardCompanion from '../agent/CodeArenaDashboardCompanion';

export default function DemoDashboard() {
  const student = {
    name: 'Alex Chen',
    username: 'alex_coder',
    rank: 'Gold Gladiator III',
    level: 18,
    xp: 4850,
    maxXp: 6000,
    winRate: '68.4%',
    streak: 14,
    currentUniverse: 'Universe 3: Dynamic Programming'
  };

  return (
    <div className="demo-dashboard-view">
      {/* Dashboard Top Header & Summary */}
      <div className="dash-hero-card">
        <div className="dash-hero-left">
          <div className="dash-avatar">
            <span>👨‍💻</span>
            <div className="online-badge"></div>
          </div>
          <div className="dash-user-info">
            <div className="dash-user-name">
              <h2>{student.name}</h2>
              <span className="dash-handle">@{student.username}</span>
              <span className="dash-rank-pill">⭐ {student.rank}</span>
            </div>
            <p className="dash-bio">
              Software Engineering Student · Specializing in Algorithms, Distributed Systems & React
            </p>
          </div>
        </div>

        <div className="dash-quick-stats">
          <div className="stat-card">
            <div className="stat-label">
              <Swords size={13} className="icon-cyan" /> Total Battles
            </div>
            <div className="stat-val">142</div>
            <div className="stat-sub">97 Wins / 45 Losses</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">
              <TrendingUp size={13} className="icon-green" /> Win Rate
            </div>
            <div className="stat-val text-green">{student.winRate}</div>
            <div className="stat-sub">Top 15% Platform Elo</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">
              <Flame size={13} className="icon-gold" /> Daily Streak
            </div>
            <div className="stat-val text-gold">{student.streak} Days</div>
            <div className="stat-sub">15% XP Booster Active</div>
          </div>
        </div>
      </div>

      {/* Level XP Progress Bar */}
      <div className="dash-xp-card">
        <div className="xp-header">
          <div className="xp-title">
            <Sparkles size={16} className="icon-cyan" />
            <span>Level 18 Experience Progression</span>
          </div>
          <div className="xp-numbers">
            {student.xp.toLocaleString()} / {student.maxXp.toLocaleString()} XP (80.8%)
          </div>
        </div>
        <div className="xp-track">
          <div className="xp-fill" style={{ width: '80.8%' }}></div>
        </div>
        <div className="xp-footer">
          <span>Current Tier: Gold Gladiator III</span>
          <span className="text-cyan">1,150 XP to Platinum Cyber Knight</span>
        </div>
      </div>

      {/* Embedded 7CodeArena AI Agent Dashboard Companion */}
      <div className="dash-agent-section">
        <CodeArenaDashboardCompanion studentData={student} />
      </div>

      {/* Recent Matches & Active Roadmap Grid */}
      <div className="dash-grid-two">
        <div className="dash-subcard">
          <h3 className="subcard-title">
            <Swords size={16} className="icon-cyan" /> Recent Arena Duels
          </h3>
          <div className="duel-item won">
            <div className="duel-status">VICTORY</div>
            <div className="duel-info">
              <span className="duel-opponent">vs @kavya_code (Python)</span>
              <span className="duel-prob">#102 Binary Search Tree Validation</span>
            </div>
            <div className="duel-elo text-green">+24 Elo</div>
          </div>

          <div className="duel-item won">
            <div className="duel-status">VICTORY</div>
            <div className="duel-info">
              <span className="duel-opponent">vs @dev_rohit (JavaScript)</span>
              <span className="duel-prob">#88 Merge Sorted Intervals</span>
            </div>
            <div className="duel-elo text-green">+18 Elo</div>
          </div>

          <div className="duel-item lost">
            <div className="duel-status lost">DEFEAT</div>
            <div className="duel-info">
              <span className="duel-opponent">vs @master_vikram (C++)</span>
              <span className="duel-prob">#42 Longest Increasing Subsequence</span>
            </div>
            <div className="duel-elo text-red">-12 Elo</div>
          </div>
        </div>

        <div className="dash-subcard">
          <h3 className="subcard-title">
            <Map size={16} className="icon-purple" /> Active 7-Universe Target
          </h3>
          <div className="universe-tracker">
            <div className="universe-name">{student.currentUniverse}</div>
            <p className="universe-desc">
              Mastering state transitions, memoization tables, and space optimization.
            </p>
            <div className="universe-progress">
              <div className="u-bar"><div className="u-fill" style={{ width: '66%' }}></div></div>
              <span className="u-text">8 of 12 Challenges Mastered</span>
            </div>
            <div className="universe-badge-chip">
              <CheckCircle2 size={13} className="icon-purple" />
              <span>Next Unlock: Dynamic Programming Grandmaster Badge</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
