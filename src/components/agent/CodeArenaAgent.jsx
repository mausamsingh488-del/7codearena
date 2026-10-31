import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, ShieldCheck } from 'lucide-react';
import CodeArenaAgentModal from './CodeArenaAgentModal';
import CodeArenaDashboardCompanion from './CodeArenaDashboardCompanion';
import { sounds } from './SoundFX';
import './CodeArenaAgent.css';

/**
 * 7CodeArena AI Agent
 * - Floating AI Support & Multimodal Resolution Agent (Login issues, Screenshots, Video recordings, Voice input)
 * - Embeddable Dashboard Companion
 */
export default function CodeArenaAgent({
  mode = 'floating',
  apiKey = '',
  initialContext = 'general',
  studentData = null,
  position = 'bottom-right'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activePrompt, setActivePrompt] = useState('');
  const [activeContext, setActiveContext] = useState(initialContext);

  // Listen to global open events from anywhere on the website (like the Login page error buttons!)
  useEffect(() => {
    const handleGlobalOpen = (e) => {
      const { prompt, context } = e.detail || {};
      if (prompt) setActivePrompt(prompt);
      if (context) setActiveContext(context);
      setIsOpen(true);
      setHasInteracted(true);
      sounds.playOpen();
    };

    window.addEventListener('7codearena:open-agent', handleGlobalOpen);
    return () => window.removeEventListener('7codearena:open-agent', handleGlobalOpen);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setHasInteracted(true);
    sounds.playOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    setActivePrompt('');
  };

  return (
    <div className={`7codearena-agent-root arena-pos-${position}`}>
      {/* Mode A: Embedded Dashboard Companion */}
      {(mode === 'dashboard' || mode === 'both') && (
        <CodeArenaDashboardCompanion studentData={studentData} />
      )}

      {/* Mode B: Floating Copilot Launcher & Modal */}
      {(mode === 'floating' || mode === 'both') && (
        <>
          {!isOpen && (
            <button
              type="button"
              className="arena-floating-trigger"
              onClick={handleOpen}
              aria-label="Open 7CodeArena AI Agent"
            >
              <div className="trigger-pulse-ring"></div>
              <div className="trigger-icon-box">
                <Bot size={26} className="trigger-bot-icon" />
                <span className="trigger-sparkle-dot"></span>
              </div>
              <div className="trigger-label">
                <span className="label-bold">7CA Agent</span>
                <span className="label-sub">24/7 AI Support</span>
              </div>
              {!hasInteracted && (
                <div className="trigger-unread-badge">1</div>
              )}
            </button>
          )}

          <CodeArenaAgentModal
            isOpen={isOpen}
            onClose={handleClose}
            initialContext={activeContext}
            initialPrompt={activePrompt}
            studentContext={studentData}
          />
        </>
      )}
    </div>
  );
}

// Sub-export for direct dashboard embedding
CodeArenaAgent.Dashboard = CodeArenaDashboardCompanion;
CodeArenaAgent.Modal = CodeArenaAgentModal;
