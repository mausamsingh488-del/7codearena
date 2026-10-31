import React from 'react';
import {
  Swords,
  Map,
  Bot,
  Trophy,
  Zap,
  ArrowRight,
  Flame,
  CheckCircle,
  Code2,
  Cpu
} from 'lucide-react';

export default function DemoHomepage({ onOpenCopilot, onNavigateDashboard }) {
  return (
    <div className="demo-homepage">
      {/* Live Match Ticker */}
      <div className="live-ticker-strip">
        <div className="ticker-badge">
          <Flame size={13} className="icon-gold" /> LIVE BATTLE
        </div>
        <div className="ticker-text">
          <span>⚔️ Match #1204: <strong>@alex_coder</strong> (Python) vs <strong>@kavya_99</strong> (C++) — Problem: "Subarray Sum Equals K"</span>
          <span className="ticker-sep">•</span>
          <span>⚡ 428 active coders dueling right now</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-tag">
          <Zap size={14} className="icon-cyan" />
          <span>REAL-TIME 1V1 PVP CODING ARENA & DEVELOPER ROADMAP</span>
        </div>

        <h1 className="hero-headline">
          Master Coding Through <br />
          <span className="gradient-text">Real-Time PvP Battles</span> & <br />
          <span className="purple-text">The 7-Universe Roadmap</span>
        </h1>

        <p className="hero-subtext">
          Compete in live timed algorithmic duels, climb through 7 gladiatorial ranks,
          and unlock verified portfolio badges directly evaluated by tech recruiters.
        </p>

        <div className="hero-cta-group">
          <button
            type="button"
            className="btn-hero-primary"
            onClick={onNavigateDashboard}
          >
            <Swords size={18} />
            <span>Enter PvP Arena</span>
          </button>

          <button
            type="button"
            className="btn-hero-ai"
            onClick={onOpenCopilot}
          >
            <Bot size={18} className="icon-cyan" />
            <span>Launch AI Vision Copilot</span>
          </button>
        </div>

        {/* Floating AI Callout Card */}
        <div className="hero-ai-banner" onClick={onOpenCopilot}>
          <div className="ai-banner-left">
            <div className="ai-banner-icon">
              <Bot size={22} className="icon-cyan" />
            </div>
            <div>
              <div className="banner-title">
                🤖 Student AI Agent with Multimodal Vision is Ready!
              </div>
              <div className="banner-desc">
                Have a screenshot of your dashboard or error in the arena? Drop it into the Copilot (bottom-right) or click here to test!
              </div>
            </div>
          </div>
          <button type="button" className="btn-banner-action">
            Test Vision Assistant <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="features-grid-section">
        <div className="feature-card cyan-border">
          <div className="feature-card-header">
            <div className="feature-icon cyan-bg">
              <Swords size={22} className="icon-cyan" />
            </div>
            <span className="feature-tag">1v1 Esports</span>
          </div>
          <h3 className="feature-title">Live PvP Algorithm Duels</h3>
          <p className="feature-desc">
            Matched by Elo rating against global developers. Race against the clock, submit solutions with instant automated judge test cases.
          </p>
          <ul className="feature-list">
            <li><CheckCircle size={14} className="icon-cyan" /> Real-time opponent progress bar</li>
            <li><CheckCircle size={14} className="icon-cyan" /> Anti-cheat code execution sandbox</li>
            <li><CheckCircle size={14} className="icon-cyan" /> Python, C++, Java, JavaScript & Go</li>
          </ul>
        </div>

        <div className="feature-card purple-border">
          <div className="feature-card-header">
            <div className="feature-icon purple-bg">
              <Map size={22} className="icon-purple" />
            </div>
            <span className="feature-tag purple">7-Universe</span>
          </div>
          <h3 className="feature-title">The 7-Universe Roadmap</h3>
          <p className="feature-desc">
            A comprehensive, gamified developer journey taking you from basic syntax to full-stack, distributed systems, and cutting-edge AI engineering.
          </p>
          <ul className="feature-list">
            <li><CheckCircle size={14} className="icon-purple" /> Universe 1: Syntax & Core Logic</li>
            <li><CheckCircle size={14} className="icon-purple" /> Universe 3: Dynamic Programming</li>
            <li><CheckCircle size={14} className="icon-purple" /> Universe 7: Cloud & AI Architecture</li>
          </ul>
        </div>

        <div className="feature-card gold-border">
          <div className="feature-card-header">
            <div className="feature-icon gold-bg">
              <Bot size={22} className="icon-gold" />
            </div>
            <span className="feature-tag gold">Multimodal AI</span>
          </div>
          <h3 className="feature-title">Multimodal AI Student Agent</h3>
          <p className="feature-desc">
            Powered by Google Gemini Vision. Drop any screenshot of the homepage, student dashboard, or compiler bug to get instant guidance and hints.
          </p>
          <ul className="feature-list">
            <li><CheckCircle size={14} className="icon-gold" /> Drag-and-drop or Ctrl+V screenshot paste</li>
            <li><CheckCircle size={14} className="icon-gold" /> Socratic hints without battle spoilers</li>
            <li><CheckCircle size={14} className="icon-gold" /> Embeddable into any React dashboard</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
