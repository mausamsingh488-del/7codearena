import React from 'react';
import { Swords, Map, LayoutDashboard, Code2, Lock, Sparkles } from 'lucide-react';

export default function DemoNavbar({ activeTab, onTabChange, onOpenIntegration }) {
  return (
    <nav className="demo-nav">
      <div className="nav-container">
        {/* Brand */}
        <div className="nav-brand" onClick={() => onTabChange('homepage')}>
          <div className="brand-logo-icon">7</div>
          <div className="brand-text">
            <span className="brand-cyan">7CODE</span>
            <span className="brand-white">ARENA</span>
          </div>
          <span className="brand-tag">PVP ARENA</span>
        </div>

        {/* Navigation links & View switcher */}
        <div className="nav-links">
          <button
            type="button"
            className={`nav-link-btn ${activeTab === 'homepage' ? 'active' : ''}`}
            onClick={() => onTabChange('homepage')}
          >
            <Swords size={15} />
            <span>Homepage & Arena</span>
          </button>

          <button
            type="button"
            className={`nav-link-btn nav-link-login ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => onTabChange('login')}
          >
            <Lock size={15} className="icon-cyan" />
            <span>Login & Auth Page</span>
            <span className="nav-pill-badge">Issue Sandbox</span>
          </button>

          <button
            type="button"
            className={`nav-link-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            <LayoutDashboard size={15} />
            <span>Student Dashboard</span>
          </button>

          <button
            type="button"
            className={`nav-link-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => onTabChange('roadmap')}
          >
            <Map size={15} />
            <span>7-Universe Roadmap</span>
          </button>
        </div>

        {/* Right CTA & Integration Guide */}
        <div className="nav-actions">
          <button
            type="button"
            className="btn-integration-guide"
            onClick={onOpenIntegration}
          >
            <Code2 size={15} className="icon-cyan" />
            <span>Integrate AI Agent</span>
          </button>

          <div
            className="user-profile-pill"
            onClick={() => onTabChange('login')}
            title="Click to view Login Page"
            style={{ cursor: 'pointer' }}
          >
            <div className="user-dot"></div>
            <span className="user-name">Alex Chen (Lvl 18)</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
