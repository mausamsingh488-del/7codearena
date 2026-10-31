import React, { useState } from 'react';
import { X, Copy, Check, Code2, Layers, Sparkles, CheckCircle2, Lock } from 'lucide-react';

export default function DemoIntegrationModal({ isOpen, onClose }) {
  const [copiedSnippet, setCopiedSnippet] = useState(null);
  const [selectedTab, setSelectedTab] = useState('react'); // 'react' | 'html' | 'login'

  if (!isOpen) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(key);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const codeSnippetHtml = `<!-- 1. Paste before </body> on 7codearena.com (including /login): -->
<script 
  src="https://cdn.7codearena.com/agent-v2.js" 
  data-platform="7codearena" 
  data-position="bottom-right"
  data-theme="dark"
  async>
</script>

<!-- 2. (Optional) Trigger AI Help when user fails login: -->
<script>
  window.addEventListener('login:failed', (e) => {
    window.open7CodeArenaAgent({
      prompt: 'User failed login with error: ' + e.detail.errorCode,
      context: 'login'
    });
  });
</script>`;

  const codeSnippetReact = `// In your 7CodeArena App.jsx or Root Layout:
import CodeArenaAgent from './components/agent/CodeArenaAgent';

function App() {
  return (
    <div className="app-container">
      {/* Your 7CodeArena routes and pages */}
      <Your7CodeArenaRoutes />

      {/* 🚀 24/7 AI Agent with Login Resolution, Video Analysis & Vision */}
      <CodeArenaAgent 
        position="bottom-right" 
        initialContext="login" 
      />
    </div>
  );
}

export default App;`;

  const codeSnippetLogin = `// On 7CodeArena Login Page (e.g. LoginPage.jsx):
// Automatically summon the AI Agent if credentials fail or OTP times out:

function onLoginError(errCode, errMsg) {
  // Dispatches global event to open the AI Agent with prefilled diagnostic context
  window.dispatchEvent(new CustomEvent('7codearena:open-agent', {
    detail: {
      prompt: \`Login failed with error [\${errCode}]: \${errMsg}. Please provide 1-click fix or magic link.\`,
      context: 'login'
    }
  }));
}`;

  return (
    <div className="demo-integration-backdrop" onClick={onClose}>
      <div className="demo-integration-card" onClick={(e) => e.stopPropagation()}>
        <div className="integ-header">
          <div className="integ-title">
            <Code2 size={20} className="icon-cyan" />
            <span>How to Integrate 7CodeArena AI Agent into Your Website</span>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Integration type tabs */}
        <div className="integ-type-tabs">
          <button
            type="button"
            className={`integ-tab-btn ${selectedTab === 'react' ? 'active' : ''}`}
            onClick={() => setSelectedTab('react')}
          >
            ⚛️ React / Next.js
          </button>
          <button
            type="button"
            className={`integ-tab-btn ${selectedTab === 'html' ? 'active' : ''}`}
            onClick={() => setSelectedTab('html')}
          >
            🌐 1-Line HTML & Script
          </button>
          <button
            type="button"
            className={`integ-tab-btn ${selectedTab === 'login' ? 'active' : ''}`}
            onClick={() => setSelectedTab('login')}
          >
            🔐 Login Page Auto-Trigger
          </button>
        </div>

        <div className="integ-body">
          {selectedTab === 'react' && (
            <div className="integ-steps">
              <div className="integ-step-item">
                <div className="step-num">1</div>
                <div className="step-content">
                  <h4>Copy Agent Files to Your Project</h4>
                  <p>
                    Copy <code>src/components/agent/</code> into your repository. All styling, audio FX, multimodal uploaders, and intelligence services are bundled.
                  </p>
                </div>
              </div>

              <div className="integ-step-item">
                <div className="step-num">2</div>
                <div className="step-content">
                  <h4>Add to Root Layout / App.jsx</h4>
                  <p>Enables the floating 7CodeArena AI Agent across all pages including the login view:</p>
                  <div className="integ-code-block">
                    <pre><code>{codeSnippetReact}</code></pre>
                    <button
                      type="button"
                      className="btn-copy-mini"
                      onClick={() => copyToClipboard(codeSnippetReact, 'react')}
                    >
                      {copiedSnippet === 'react' ? <Check size={14} className="icon-green" /> : <Copy size={14} />}
                      <span>{copiedSnippet === 'react' ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'html' && (
            <div className="integ-steps">
              <div className="integ-step-item">
                <div className="step-num">1</div>
                <div className="step-content">
                  <h4>1-Line Script Tag Integration</h4>
                  <p>
                    Add this single script tag right before <code>&lt;/body&gt;</code> on your website pages to instantly load the widget:
                  </p>
                  <div className="integ-code-block">
                    <pre><code>{codeSnippetHtml}</code></pre>
                    <button
                      type="button"
                      className="btn-copy-mini"
                      onClick={() => copyToClipboard(codeSnippetHtml, 'html')}
                    >
                      {copiedSnippet === 'html' ? <Check size={14} className="icon-green" /> : <Copy size={14} />}
                      <span>{copiedSnippet === 'html' ? 'Copied' : 'Copy Script'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'login' && (
            <div className="integ-steps">
              <div className="integ-step-item">
                <div className="step-num">1</div>
                <div className="step-content">
                  <h4>Trigger AI Agent On Login Failures</h4>
                  <p>
                    When a user encounters wrong password, OTP timeout, or OAuth popup blocked, trigger this event to pop open the agent with a prefilled solution:
                  </p>
                  <div className="integ-code-block">
                    <pre><code>{codeSnippetLogin}</code></pre>
                    <button
                      type="button"
                      className="btn-copy-mini"
                      onClick={() => copyToClipboard(codeSnippetLogin, 'login')}
                    >
                      {copiedSnippet === 'login' ? <Check size={14} className="icon-green" /> : <Copy size={14} />}
                      <span>{copiedSnippet === 'login' ? 'Copied' : 'Copy Hook'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="integ-footer">
          <button type="button" className="btn-primary" onClick={onClose}>
            Done / Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
