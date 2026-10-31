import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Trash2,
  Key,
  Maximize2,
  Minimize2,
  ShieldAlert,
  HelpCircle,
  Zap
} from 'lucide-react';
import MessageList from './MessageList';
import MediaUploadZone from './MediaUploadZone';
import { analyzeWithGemini } from './geminiService';
import { SAMPLE_PRESETS } from './sampleImages';
import { sounds } from './SoundFX';

export default function CodeArenaAgentModal({
  isOpen,
  onClose,
  initialContext = 'general',
  initialPrompt = '',
  studentContext = null
}) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `### ⚔️ Welcome to 7CodeArena AI Agent!

I am your **24/7 AI Resolution Agent & Battle Mentor** for [7CodeArena](https://7codearena.com/).

**How I can help you right now:**
- 🔐 **Login Page & Auth Resolver**: Stuck on login? OTP not arriving? Google OAuth popup blocked? Account locked? I can diagnose and fix it in 1 click.
- 📸 **Multimodal Image Diagnosis**: Upload or paste (Ctrl+V) any screenshot of login errors, judge runtime bugs, or dashboard stats.
- 🎥 **Video Screen Recording**: Upload a screen recording video (.mp4, .webm) or click **"Record Screen"** to capture the issue live!
- 🎙️ **Voice Assistance**: Speak your question in Hindi, English, or Hinglish via microphone.
- ⚡ **1-Click Self-Healing**: Direct session reset, instant magic login link generation, or priority human ticket escalation.

*Ask any question below, upload your media, or try a 1-click real scenario!*`,
      timestamp: 'Ready',
      tags: ['7CodeArena Support', 'Login Specialist', 'Vision & Video Active']
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('7codearena_gemini_api_key') || '';
    if (savedKey) {
      setApiKeyInput(savedKey);
      setHasCustomKey(true);
    }
  }, []);

  // Handle external prefilled prompt when modal opens
  useEffect(() => {
    if (initialPrompt && isOpen) {
      setInputText(initialPrompt);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [initialPrompt, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleToggleSound = () => {
    const next = sounds.toggle();
    setSoundEnabled(next);
  };

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem('7codearena_gemini_api_key', apiKeyInput.trim());
      setHasCustomKey(true);
    } else {
      localStorage.removeItem('7codearena_gemini_api_key');
      setHasCustomKey(false);
    }
    setShowSettings(false);
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Chat cleared. Ready for your next screenshot, video recording, or question!`,
        timestamp: 'Just now'
      }
    ]);
    setSelectedMedia(null);
  };

  const handlePresetSelect = (preset) => {
    setSelectedMedia({
      mediaType: preset.isVideo ? 'video' : 'image',
      dataUrl: preset.dataUrl || null,
      videoUrl: preset.isVideo ? preset.dataUrl : null,
      name: preset.title,
      size: preset.badge,
      duration: preset.videoDuration || null,
      type: 'preset',
      presetId: preset.id
    });
    setInputText(preset.suggestedPrompt);
    inputRef.current?.focus();
  };

  const handleQuickChipClick = (prompt, presetId = null) => {
    if (presetId) {
      const found = SAMPLE_PRESETS.find((p) => p.id === presetId);
      if (found) {
        handlePresetSelect(found);
        return;
      }
    }
    setInputText(prompt);
    inputRef.current?.focus();
  };

  const handleVoiceTranscript = (transcript) => {
    setInputText(transcript);
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if ((!inputText.trim() && !selectedMedia) || isLoading) return;

    const currentMedia = selectedMedia;
    const currentPrompt = inputText.trim();

    const userMsg = {
      role: 'user',
      content: currentPrompt || (currentMedia ? `Please diagnose this uploaded ${currentMedia.mediaType}.` : ''),
      image: currentMedia?.mediaType === 'image' ? currentMedia.dataUrl : null,
      video: currentMedia?.mediaType === 'video' ? currentMedia : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);

    setInputText('');
    setSelectedMedia(null);
    setIsLoading(true);

    try {
      const response = await analyzeWithGemini({
        imageDataUrl: currentMedia?.dataUrl,
        textPrompt: currentPrompt,
        apiKey: apiKeyInput,
        contextMode: currentMedia?.presetId || initialContext,
        mediaType: currentMedia?.mediaType || 'text',
        videoData: currentMedia?.mediaType === 'video' ? currentMedia : null
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.text,
          source: response.source,
          tags: response.tags || [],
          actions: response.actions || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      sounds.playMessageReceived();
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ **Diagnostic Error**: ${err.message || 'Unable to process request. Please try again.'}`,
          timestamp: 'Error'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`arena-modal-root ${isMaximized ? 'is-maximized' : ''}`}>
      <div className="arena-chat-window">
        {/* Header */}
        <div className="arena-header">
          <div className="header-left">
            <div className="arena-logo-glow">
              <span className="logo-badge">7CA</span>
            </div>
            <div className="header-titles">
              <div className="header-brand">
                <span className="brand-cyan">7CODE</span>
                <span className="brand-white">ARENA</span>
                <span className="brand-badge">AI AGENT</span>
              </div>
              <div className="header-status">
                <span className="status-dot"></span>
                <span className="status-label">
                  {hasCustomKey ? 'Gemini 2.5 Live Multimodal' : 'Online · Multimodal & Login Specialist'}
                </span>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="arena-icon-btn"
              onClick={() => setShowSettings(true)}
              title="Configure Gemini API Key"
            >
              <Key size={16} className={hasCustomKey ? 'icon-cyan' : ''} />
            </button>
            <button
              type="button"
              className="arena-icon-btn"
              onClick={handleToggleSound}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="icon-muted" />}
            </button>
            <button
              type="button"
              className="arena-icon-btn"
              onClick={handleClearChat}
              title="Clear Chat History"
            >
              <Trash2 size={16} />
            </button>
            <button
              type="button"
              className="arena-icon-btn"
              onClick={() => setIsMaximized(!isMaximized)}
              title={isMaximized ? 'Restore Size' : 'Maximize Window'}
            >
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              type="button"
              className="arena-icon-btn btn-close"
              onClick={onClose}
              title="Close Agent"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="arena-quick-chips-bar">
          <button
            type="button"
            className="quick-chip chip-highlight-login"
            onClick={() => handleQuickChipClick('I am unable to login to 7CodeArena. OTP is not arriving or Google OAuth popup is blocked. Please fix this.', 'login-error')}
          >
            🔐 Login & OTP Fix
          </button>
          <button
            type="button"
            className="quick-chip chip-highlight-video"
            onClick={() => handleQuickChipClick('Analyze this screen recording video of 7CodeArena login spinner loop and diagnose the error.', 'login-video')}
          >
            🎥 Video Diagnostic
          </button>
          <button
            type="button"
            className="quick-chip"
            onClick={() => handleQuickChipClick('Can you analyze my Python IndexError in Two Sum Sorted in 7CodeArena arena runner?', 'error')}
          >
            ⚠️ Code Error Fix
          </button>
          <button
            type="button"
            className="quick-chip"
            onClick={() => handleQuickChipClick('Review my student dashboard stats (Level 18, 68% win rate) and recommend next steps.', 'dashboard')}
          >
            📊 Dashboard Stats
          </button>
          <button
            type="button"
            className="quick-chip"
            onClick={() => handleQuickChipClick('How do 1v1 PvP battles and the 7-Universe roadmap work in 7CodeArena?')}
          >
            ⚔️ PvP & Roadmap
          </button>
        </div>

        {/* Scrollable Messages */}
        <div className="arena-body">
          <MessageList
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
        </div>

        {/* Multimodal Upload Zone (Images, Video, Screen Recording, Voice) */}
        <div className="arena-footer-uploader">
          <MediaUploadZone
            selectedMedia={selectedMedia}
            onMediaSelect={setSelectedMedia}
            onMediaRemove={() => setSelectedMedia(null)}
            onPresetSelect={handlePresetSelect}
            onVoiceTranscript={handleVoiceTranscript}
          />
        </div>

        {/* Bottom Input Area */}
        <form onSubmit={handleSendMessage} className="arena-input-form">
          <div className="input-bar-wrapper">
            <textarea
              ref={inputRef}
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                selectedMedia
                  ? `Ask about this ${selectedMedia.mediaType} (or press Enter to diagnose)...`
                  : 'Ask in English / Hinglish, drop screenshot/video, or click mic...'
              }
              className="arena-textarea"
            />
            <button
              type="submit"
              disabled={isLoading || (!inputText.trim() && !selectedMedia)}
              className="btn-arena-send"
              title="Send Message to 7CodeArena AI Agent"
            >
              <Send size={16} />
            </button>
          </div>
        </form>

        {/* Settings / API Key Modal */}
        {showSettings && (
          <div className="arena-settings-modal-backdrop" onClick={() => setShowSettings(false)}>
            <div className="arena-settings-card" onClick={(e) => e.stopPropagation()}>
              <div className="settings-header">
                <div className="settings-title">
                  <Key size={18} className="icon-cyan" />
                  <span>Gemini Multimodal Configuration</span>
                </div>
                <button
                  type="button"
                  className="btn-modal-close"
                  onClick={() => setShowSettings(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="settings-body">
                <p className="settings-desc">
                  You can use 7CodeArena AI Agent with the <strong>Built-in Specialized Intelligence</strong> (works out of the box with zero setup) or connect your own <strong>Google Gemini API Key</strong> for live cloud multimodal inference:
                </p>

                <div className="settings-input-group">
                  <label htmlFor="gemini-key-input">Gemini API Key (Optional):</label>
                  <input
                    id="gemini-key-input"
                    type="password"
                    placeholder="AIzaSy..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="settings-text-input"
                  />
                  <span className="settings-hint">
                    Key is stored locally in your browser's <code>localStorage</code> and never sent to third-party servers.
                  </span>
                </div>

                <div className="settings-callout">
                  <Sparkles size={16} className="icon-gold" />
                  <div>
                    <strong>Zero-Config Mode:</strong> If left empty, the agent uses 7CodeArena's specialized multimodal neural simulation engine, which accurately evaluates login errors, video screen recordings, homepage screenshots, student dashboards, and arena code errors!
                  </div>
                </div>
              </div>

              <div className="settings-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowSettings(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSaveApiKey}
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
