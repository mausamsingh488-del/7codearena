import React, { useState } from 'react';
import DemoNavbar from './components/demo/DemoNavbar';
import DemoHomepage from './components/demo/DemoHomepage';
import DemoLoginPage from './components/demo/DemoLoginPage';
import DemoDashboard from './components/demo/DemoDashboard';
import DemoIntegrationModal from './components/demo/DemoIntegrationModal';
import CodeArenaAgent from './components/agent/CodeArenaAgent';
import { Map, CheckCircle2, Lock, Sparkles, Swords, Zap } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('login'); // Default directly to Login page to showcase the requested login AI resolution!
  const [isIntegrationOpen, setIsIntegrationOpen] = useState(false);

  const universes = [
    { num: 1, name: 'Syntax & Algorithmic Logic', status: 'completed', desc: 'Variables, Loops, Time Complexity Basics, Math' },
    { num: 2, name: 'Linear Data Structures', status: 'completed', desc: 'Arrays, Two Pointers, Linked Lists, Stacks, Queues' },
    { num: 3, name: 'Dynamic Programming & Trees', status: 'active', desc: 'Memoization, Knapsack, Binary Search Trees, Tries' },
    { num: 4, name: 'Graphs & Greedy Algorithms', status: 'locked', desc: 'BFS/DFS, Dijkstra, Topological Sort, Minimum Spanning Trees' },
    { num: 5, name: 'Full-Stack Architecture', status: 'locked', desc: 'REST APIs, WebSockets, Database Indexing, Caching' },
    { num: 6, name: 'DevOps & Distributed Systems', status: 'locked', desc: 'Docker, Microservices, Message Queues, CI/CD' },
    { num: 7, name: 'AI Engineering & Multimodal LLMs', status: 'locked', desc: 'Embeddings, Vector DBs, Agents, LLM Fine-Tuning' }
  ];

  const handleOpenAgentWithPrompt = (prompt, context = 'login') => {
    window.dispatchEvent(
      new CustomEvent('7codearena:open-agent', {
        detail: { prompt, context }
      })
    );
  };

  return (
    <div className="app-layout">
      {/* 7CodeArena Demo Navigation */}
      <DemoNavbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenIntegration={() => setIsIntegrationOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'login' && (
          <DemoLoginPage
            onOpenCopilot={handleOpenAgentWithPrompt}
            onSuccessfulLogin={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'homepage' && (
          <DemoHomepage
            onOpenCopilot={() => handleOpenAgentWithPrompt('Can you guide me on getting started with 7CodeArena 1v1 PvP battles?', 'homepage')}
            onNavigateDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'dashboard' && <DemoDashboard />}

        {activeTab === 'roadmap' && (
          <div className="demo-roadmap-view">
            <div className="roadmap-header">
              <div className="roadmap-badge">
                <Map size={14} className="icon-purple" /> CAREER PATHWAY
              </div>
              <h1 className="roadmap-title">The 7-Universe Developer Roadmap</h1>
              <p className="roadmap-subtitle">
                Level up from core fundamentals to competitive battle mastery and high-paying tech jobs.
              </p>
            </div>

            <div className="universes-timeline">
              {universes.map((u) => (
                <div key={u.num} className={`universe-node-card status-${u.status}`}>
                  <div className="u-node-number">
                    {u.status === 'completed' && <CheckCircle2 size={18} className="icon-green" />}
                    {u.status === 'active' && <Zap size={18} className="icon-cyan" />}
                    {u.status === 'locked' && <Lock size={16} className="icon-muted" />}
                    <span>Universe {u.num}</span>
                  </div>
                  <div className="u-node-info">
                    <h3 className="u-node-title">{u.name}</h3>
                    <p className="u-node-desc">{u.desc}</p>
                  </div>
                  <div className="u-node-tag">
                    {u.status === 'completed' && <span className="tag-green">Mastered</span>}
                    {u.status === 'active' && <span className="tag-cyan">In Progress (8/12)</span>}
                    {u.status === 'locked' && <span className="tag-locked">Locked</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="demo-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="brand-cyan">7CODE</span>
            <span className="brand-white">ARENA</span>
            <span className="footer-copy">© 2026 7CodeArena. All rights reserved. Master coding through PvP.</span>
          </div>
          <div className="footer-links">
            <button type="button" onClick={() => setIsIntegrationOpen(true)} className="footer-link-btn">
              Integration Guide & Script
            </button>
            <a href="https://7codearena.com/" target="_blank" rel="noreferrer" className="footer-link-btn">
              Visit Live 7CodeArena.com ↗
            </a>
          </div>
        </div>
      </footer>

      {/* 🚀 Floating 7CodeArena AI Agent (Available on all pages including Login) */}
      <CodeArenaAgent
        mode="floating"
        initialContext={activeTab}
        position="bottom-right"
      />

      {/* How to Integrate Modal */}
      <DemoIntegrationModal
        isOpen={isIntegrationOpen}
        onClose={() => setIsIntegrationOpen(false)}
      />
    </div>
  );
}
