import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  UploadCloud,
  CheckCircle2,
  TrendingUp,
  Target,
  Award,
  Zap
} from 'lucide-react';
import MessageList from './MessageList';
import ImageUploadZone from './ImageUploadZone';
import { analyzeWithGemini } from './geminiService';
import { sounds } from './SoundFX';

export default function CodeArenaDashboardCompanion({
  studentData = {
    name: 'Alex Chen',
    username: 'alex_coder',
    rank: 'Gold Gladiator III',
    level: 18,
    xp: 4850,
    maxXp: 6000,
    winRate: '68.4%',
    streak: 14,
    currentUniverse: 'Universe 3: Dynamic Programming'
  }
}) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `### 🎯 Welcome to your Dashboard Study Coach, ${studentData.name}!

I am monitoring your 7CodeArena performance in real time:
- **Current Standing**: **${studentData.rank}** (Level ${studentData.level})
- **Active Streak**: 🔥 **${studentData.streak} Days**
- **Roadmap Focus**: **${studentData.currentUniverse}**

**Need instant guidance?**
Upload any screenshot of your progress, battle history, or code compiler errors below, and I will tailor a custom training session for you!`,
      timestamp: 'Today',
      tags: ['Dashboard Coach', 'Universe 3', 'Gold Tier']
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    const userMsg = {
      role: 'user',
      content: inputText.trim() || (selectedImage ? 'Please analyze this screenshot for my dashboard.' : ''),
      image: selectedImage?.dataUrl || null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentPrompt = inputText;
    const currentImg = selectedImage;

    setInputText('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await analyzeWithGemini({
        imageDataUrl: currentImg?.dataUrl,
        textPrompt: currentPrompt,
        contextMode: 'dashboard'
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.text,
          source: response.source,
          tags: response.tags || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      sounds.playMessageReceived();
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ Error during analysis: ${err.message}`,
          timestamp: 'Error'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="arena-dashboard-companion-panel">
      {/* Top Banner */}
      <div className="companion-banner">
        <div className="companion-header-left">
          <div className="companion-avatar-ring">
            <Bot size={24} className="icon-cyan" />
          </div>
          <div>
            <div className="companion-title">
              7CodeArena AI Study Coach & Vision Inspector
            </div>
            <div className="companion-subtitle">
              Personalized algorithm recommendations, battle review & screenshot diagnostics
            </div>
          </div>
        </div>

        <div className="companion-stat-badges">
          <div className="comp-badge">
            <TrendingUp size={14} className="icon-green" />
            <span>{studentData.winRate} Win Rate</span>
          </div>
          <div className="comp-badge">
            <Zap size={14} className="icon-gold" />
            <span>{studentData.streak} Day Streak</span>
          </div>
        </div>
      </div>

      <div className="companion-grid">
        {/* Left Column: AI Chat & Vision Terminal */}
        <div className="companion-chat-col">
          <div className="companion-chat-box">
            <MessageList
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />
          </div>

          <div className="companion-upload-wrapper">
            <ImageUploadZone
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              onImageRemove={() => setSelectedImage(null)}
              onPresetSelect={(preset) => {
                setSelectedImage({
                  dataUrl: preset.dataUrl,
                  name: preset.title,
                  size: preset.badge,
                  type: 'preset',
                  presetId: preset.id
                });
                setInputText(preset.suggestedPrompt);
              }}
            />
          </div>

          <form onSubmit={handleSendMessage} className="companion-input-bar">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for hints, upload a screenshot, or request study tips..."
              className="companion-input"
            />
            <button
              type="submit"
              disabled={isLoading || (!inputText.trim() && !selectedImage)}
              className="btn-arena-send"
            >
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Right Column: AI Action Items & Diagnostics Card */}
        <div className="companion-side-col">
          <div className="companion-action-card">
            <div className="card-heading">
              <Target size={16} className="icon-cyan" />
              <span>AI Recommended Drills for Platinum</span>
            </div>

            <div className="action-item">
              <CheckCircle2 size={16} className="icon-green" />
              <div>
                <div className="item-title">Universe 3: 0/1 Knapsack</div>
                <div className="item-sub">Dynamic Programming · 3 practice matches</div>
              </div>
            </div>

            <div className="action-item">
              <CheckCircle2 size={16} className="icon-gold" />
              <div>
                <div className="item-title">Two-Pointer Array Traversal</div>
                <div className="item-sub">Maintain 90%+ pass rate on boundaries</div>
              </div>
            </div>

            <div className="action-item">
              <CheckCircle2 size={16} className="icon-purple" />
              <div>
                <div className="item-title">Rank Calibration Duel</div>
                <div className="item-sub">Win 2 consecutive PvP matches for +45 Elo</div>
              </div>
            </div>
          </div>

          <div className="companion-hint-card">
            <div className="card-heading">
              <Sparkles size={16} className="icon-gold" />
              <span>Multimodal Vision Tip</span>
            </div>
            <p className="hint-text">
              Did your code fail a test case in the Arena? Take a quick screenshot using <code>Win + Shift + S</code>, press <code>Ctrl + V</code> right here, and your AI mentor will diagnose the bug without spoiling competitive code solutions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
