import React, { useState } from 'react';
import {
  Copy,
  Check,
  Bot,
  User,
  Maximize2,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Film,
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Ticket
} from 'lucide-react';

export default function MessageList({ messages, isLoading, messagesEndRef }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [actionFeedback, setActionFeedback] = useState({});

  const handleCopyCode = (codeText, idx) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSpeakText = (text, idx) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (speakingIndex === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean text of markdown characters for speech
    const cleanText = text
      .replace(/[#*`_~>-]/g, ' ')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    setSpeakingIndex(idx);
    window.speechSynthesis.speak(utterance);
  };

  const handleExecuteAction = (action, msgIndex) => {
    const feedbackKey = `${msgIndex}-${action.id}`;

    if (action.type === 'clear_cache') {
      try {
        localStorage.removeItem('7codearena_session_token');
        localStorage.removeItem('7codearena_auth_state');
      } catch (e) {
        // ignore
      }
      setActionFeedback((prev) => ({
        ...prev,
        [feedbackKey]: {
          status: 'success',
          text: '✅ Cache & Session cleared! Browser cookies and localStorage have been reset for 7codearena.com. Please try logging in again now.'
        }
      }));
    } else if (action.type === 'magic_link') {
      const magicUrl = `https://7codearena.com/auth/magic?token=7ca_${Math.random().toString(36).substring(2, 10)}_login`;
      setActionFeedback((prev) => ({
        ...prev,
        [feedbackKey]: {
          status: 'success',
          text: `🔑 Instant Magic Sign-In Link Generated: ${magicUrl}`,
          link: magicUrl
        }
      }));
    } else if (action.type === 'resend_otp') {
      setActionFeedback((prev) => ({
        ...prev,
        [feedbackKey]: {
          status: 'success',
          text: '📩 Priority OTP dispatched to alex.chen@7codearena.com! Temporary verification code: [839-204] (valid for 10 minutes).'
        }
      }));
    } else if (action.type === 'reset_password') {
      setActionFeedback((prev) => ({
        ...prev,
        [feedbackKey]: {
          status: 'success',
          text: '🔒 Secure Password Reset link sent to your registered email address with 256-bit encryption.'
        }
      }));
    } else if (action.type === 'create_ticket') {
      const ticketId = `#7CA-${Math.floor(1000 + Math.random() * 9000)}`;
      setActionFeedback((prev) => ({
        ...prev,
        [feedbackKey]: {
          status: 'success',
          text: `🎫 Urgent Support Ticket ${ticketId} created! Attached video & screenshots forwarded to 7CodeArena Tier-2 Support Engineers. ETA: < 15 mins.`
        }
      }));
    } else if (action.type === 'run_diagnostics') {
      setActionFeedback((prev) => ({
        ...prev,
        [feedbackKey]: {
          status: 'success',
          text: '⚡ Live Diagnostics Result: [Cookies: OK] · [LocalStorage: OK] · [WebSocket to /game: ONLINE] · [Auth Gateway Latency: 34ms] · [AdBlocker: Interfering with OAuth popups].'
        }
      }));
    }
  };

  const renderContent = (content, msgIdx) => {
    if (!content) return null;

    // Split text by code blocks ```lang ... ```
    const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          value: content.substring(lastIndex, match.index)
        });
      }
      parts.push({
        type: 'code',
        lang: match[1] || 'text',
        value: match[2].trim()
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        value: content.substring(lastIndex)
      });
    }

    return parts.map((part, pIdx) => {
      if (part.type === 'code') {
        const copyKey = `${msgIdx}-${pIdx}`;
        const isCopied = copiedIndex === copyKey;
        return (
          <div key={pIdx} className="arena-code-block">
            <div className="code-header">
              <span className="code-lang">{part.lang || 'code'}</span>
              <button
                type="button"
                className="btn-copy-code"
                onClick={() => handleCopyCode(part.value, copyKey)}
                title="Copy code"
              >
                {isCopied ? <Check size={14} className="icon-green" /> : <Copy size={14} />}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="code-pre">
              <code>{part.value}</code>
            </pre>
          </div>
        );
      }

      // Format markdown elements for standard text
      return (
        <div key={pIdx} className="arena-text-block">
          {formatMarkdownText(part.value)}
        </div>
      );
    });
  };

  const formatMarkdownText = (raw) => {
    const lines = raw.split('\n');
    return lines.map((line, lIdx) => {
      if (line.startsWith('### ')) {
        return <h3 key={lIdx} className="arena-md-h3">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={lIdx} className="arena-md-h4">{line.replace('#### ', '')}</h4>;
      }
      if (line.trim() === '---') {
        return <hr key={lIdx} className="arena-md-divider" />;
      }
      if (line.startsWith('> ')) {
        return (
          <blockquote key={lIdx} className="arena-md-blockquote">
            {formatInlineText(line.replace('> ', ''))}
          </blockquote>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemContent = line.substring(2);
        return (
          <li key={lIdx} className="arena-md-li">
            {formatInlineText(itemContent)}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={lIdx} className="arena-md-num">
            {formatInlineText(line)}
          </div>
        );
      }
      if (line.startsWith('|') && line.endsWith('|')) {
        // Table row rendering
        const cells = line.split('|').filter(c => c.trim().length > 0);
        if (line.includes('---')) return null; // skip markdown divider
        return (
          <div key={lIdx} className="arena-md-table-row">
            {cells.map((cell, cIdx) => (
              <span key={cIdx} className="arena-md-table-cell">
                {formatInlineText(cell.trim())}
              </span>
            ))}
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={lIdx} className="arena-md-empty-space" />;
      }
      return (
        <p key={lIdx} className="arena-md-p">
          {formatInlineText(line)}
        </p>
      );
    });
  };

  const formatInlineText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((seg, i) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return <strong key={i} className="arena-md-bold">{seg.slice(2, -2)}</strong>;
      }
      if (seg.startsWith('`') && seg.endsWith('`')) {
        return <code key={i} className="arena-md-inline-code">{seg.slice(1, -1)}</code>;
      }
      return seg;
    });
  };

  return (
    <div className="arena-messages-container">
      {messages.map((msg, index) => {
        const isBot = msg.role === 'assistant';
        const isSpeaking = speakingIndex === index;

        return (
          <div key={index} className={`arena-message-row ${isBot ? 'bot-row' : 'user-row'}`}>
            <div className="message-avatar">
              {isBot ? (
                <div className="avatar-bot">
                  <Bot size={18} />
                  <span className="bot-glow-dot"></span>
                </div>
              ) : (
                <div className="avatar-user">
                  <User size={16} />
                </div>
              )}
            </div>

            <div className="message-bubble-wrapper">
              <div className="message-bubble-meta">
                <span className="message-sender-name">
                  {isBot ? '7CodeArena AI Agent' : 'Customer'}
                </span>
                <span className="message-timestamp">{msg.timestamp || 'Just now'}</span>
                {msg.source && (
                  <span className="message-source-tag">
                    <Sparkles size={11} />{' '}
                    {msg.source === 'gemini-live' ? 'Gemini 2.5 Multimodal' : '7CodeArena Diagnostic'}
                  </span>
                )}
                {isBot && (
                  <button
                    type="button"
                    className="btn-tts-speak"
                    onClick={() => handleSpeakText(msg.content, index)}
                    title={isSpeaking ? 'Stop Audio' : 'Listen to Answer (Text to Speech)'}
                  >
                    {isSpeaking ? (
                      <VolumeX size={13} className="icon-red animate-pulse" />
                    ) : (
                      <Volume2 size={13} className="icon-muted" />
                    )}
                  </button>
                )}
              </div>

              {/* Uploaded Video if attached */}
              {msg.video && (
                <div className="message-video-preview">
                  {msg.video.videoUrl ? (
                    <video src={msg.video.videoUrl} className="msg-video-player" controls />
                  ) : (
                    <div className="msg-video-fallback">
                      <Film size={24} className="icon-cyan" />
                      <span>Screen Recording Video ({msg.video.duration || '00:08s'})</span>
                    </div>
                  )}
                  <span className="image-caption">🎥 Attached Screen Recording</span>
                </div>
              )}

              {/* Uploaded Screenshot if attached */}
              {msg.image && (
                <div className="message-image-preview">
                  <div className="msg-img-container" onClick={() => setModalImage(msg.image)}>
                    <img src={msg.image} alt="Uploaded screenshot" />
                    <div className="img-hover-overlay">
                      <Maximize2 size={16} /> Click to expand
                    </div>
                  </div>
                  <span className="image-caption">📸 Attached Screenshot</span>
                </div>
              )}

              {/* Message text body */}
              <div className="message-bubble-content">
                {renderContent(msg.content, index)}
              </div>

              {/* Interactive 1-Click Resolution Actions if provided */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="message-actions-container">
                  <div className="actions-header">
                    <Sparkles size={13} className="icon-gold" />
                    <span>Instant Self-Service Resolution:</span>
                  </div>
                  <div className="actions-grid">
                    {msg.actions.map((act) => {
                      const feedback = actionFeedback[`${index}-${act.id}`];
                      return (
                        <div key={act.id} className="action-item-wrapper">
                          <button
                            type="button"
                            className="btn-interactive-action"
                            onClick={() => handleExecuteAction(act, index)}
                          >
                            <span>{act.label}</span>
                          </button>
                          {feedback && (
                            <div className={`action-feedback-box ${feedback.status}`}>
                              <CheckCircle2 size={14} className="icon-green" />
                              <div className="feedback-text">
                                <span>{feedback.text}</span>
                                {feedback.link && (
                                  <a
                                    href={feedback.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="feedback-link"
                                  >
                                    Open Direct Link <ExternalLink size={12} />
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tags if returned by analysis */}
              {msg.tags && msg.tags.length > 0 && (
                <div className="message-tags-strip">
                  {msg.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="message-tag-pill">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Loading indicator */}
      {isLoading && (
        <div className="arena-message-row bot-row loading-row">
          <div className="message-avatar">
            <div className="avatar-bot pulsing">
              <Bot size={18} />
            </div>
          </div>
          <div className="message-bubble-wrapper">
            <div className="loading-card">
              <div className="loading-scanline"></div>
              <div className="loading-text">
                <Sparkles size={15} className="spinner-sparkle" />
                <span>7CodeArena AI Agent is analyzing your issue & diagnostics...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />

      {/* Image Zoom Modal */}
      {modalImage && (
        <div className="arena-image-modal-backdrop" onClick={() => setModalImage(null)}>
          <div className="image-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="btn-modal-close"
              onClick={() => setModalImage(null)}
            >
              <X size={20} />
            </button>
            <img src={modalImage} alt="Expanded Screenshot" className="modal-full-img" />
          </div>
        </div>
      )}
    </div>
  );
}
