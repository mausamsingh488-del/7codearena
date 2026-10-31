import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function DemoLoginPage({ onOpenCopilot, onSuccessfulLogin }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('alex.chen@7codearena.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [activeError, setActiveError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(null);

  const simulateError = (type) => {
    setSuccessToast(null);
    if (type === 'otp') {
      setActiveError({
        code: 'CA-AUTH-401',
        title: 'Authentication & OTP Verification Expired',
        message: 'Your Google OAuth session handshake timed out and the 6-digit email OTP was not verified within 60 seconds.',
        suggestedPrompt: 'I am getting Error CA-AUTH-401 on the 7CodeArena login page (OTP verification expired & OAuth timed out). How do I solve this immediately?'
      });
    } else if (type === 'oauth') {
      setActiveError({
        code: 'CA-POPUP-BLOCKED',
        title: 'Google OAuth Popup Blocked by Browser',
        message: 'Your browser privacy shield / adblocker prevented the Google Sign-In popup from opening.',
        suggestedPrompt: 'My Google sign-in popup was blocked on the 7CodeArena login page. How do I enable popups and sign in?'
      });
    } else if (type === 'locked') {
      setActiveError({
        code: 'CA-SEC-429',
        title: 'Account Temporarily Locked (5 Failed Attempts)',
        message: 'Too many incorrect password attempts detected. Security cooldown active for 15 minutes.',
        suggestedPrompt: 'My 7CodeArena account is locked with Error CA-SEC-429 due to multiple failed password attempts. How can I unlock it or use a magic link?'
      });
    } else if (type === 'forgot') {
      setActiveError({
        code: 'CA-RESET-DELAY',
        title: 'Password Reset Email Not Received',
        message: 'Password reset link was dispatched but delayed by SMTP gateway or marked as Spam/Promotions.',
        suggestedPrompt: 'I requested a password reset on 7CodeArena but did not receive the email. Can the AI agent generate an instant login magic link or resend OTP?'
      });
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (activeError) {
        // If an error is simulated, show error feedback
        return;
      }
      setSuccessToast('Authentication verified! Welcome to 7CodeArena.');
      setTimeout(() => {
        if (onSuccessfulLogin) onSuccessfulLogin();
      }, 1200);
    }, 900);
  };

  const handleClearError = () => {
    setActiveError(null);
  };

  const handleFixWithAI = (customPrompt = null) => {
    const promptToSend = customPrompt || (activeError ? activeError.suggestedPrompt : 'I need help logging in to 7CodeArena.');
    if (onOpenCopilot) {
      onOpenCopilot(promptToSend, 'login');
    }
  };

  return (
    <div className="demo-login-page-wrapper">
      {/* Interactive Testing Controller Bar */}
      <div className="login-simulator-bar">
        <div className="simulator-bar-left">
          <div className="sim-badge">
            <Zap size={14} className="icon-cyan" />
            <span>Interactive Login Issue Sandbox</span>
          </div>
          <span className="sim-desc">
            Test how the 7CodeArena AI Agent instantly rescues customers facing login issues:
          </span>
        </div>
        <div className="simulator-bar-actions">
          <button
            type="button"
            className="btn-sim-issue btn-sim-danger"
            onClick={() => simulateError('otp')}
          >
            Simulate OTP Expired (401)
          </button>
          <button
            type="button"
            className="btn-sim-issue btn-sim-warning"
            onClick={() => simulateError('oauth')}
          >
            Simulate OAuth Blocked
          </button>
          <button
            type="button"
            className="btn-sim-issue btn-sim-purple"
            onClick={() => simulateError('locked')}
          >
            Simulate Account Locked (429)
          </button>
          <button
            type="button"
            className="btn-sim-issue btn-sim-info"
            onClick={() => simulateError('forgot')}
          >
            Simulate Reset Link Delay
          </button>
          {activeError && (
            <button
              type="button"
              className="btn-sim-issue btn-sim-clear"
              onClick={handleClearError}
            >
              Reset Errors
            </button>
          )}
        </div>
      </div>

      {/* Main Login Card Section */}
      <div className="login-card-container">
        <div className={`login-auth-card ${activeError ? 'has-error-glow' : ''}`}>
          {/* Card Header & Brand */}
          <div className="login-brand-header">
            <div className="login-brand-badge">
              <span className="badge-seven">7</span>
            </div>
            <h1 className="login-heading">
              <span className="brand-cyan">7CODE</span>
              <span className="brand-white">ARENA</span>
            </h1>
            <p className="login-tagline">Battle Today, Hired Tomorrow · Enter the Arena</p>
          </div>

          {/* Auth Mode Switcher */}
          <div className="auth-tab-pills">
            <button
              type="button"
              className={`auth-tab-pill ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => setAuthMode('login')}
            >
              Sign In to Arena
            </button>
            <button
              type="button"
              className={`auth-tab-pill ${authMode === 'signup' ? 'active' : ''}`}
              onClick={() => setAuthMode('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Error Banner when issue triggered */}
          {activeError && (
            <div className="login-error-banner">
              <div className="error-banner-top">
                <AlertTriangle size={18} className="icon-red" />
                <div className="error-title-wrap">
                  <span className="error-code">[{activeError.code}]</span>
                  <span className="error-title">{activeError.title}</span>
                </div>
              </div>
              <p className="error-message">{activeError.message}</p>
              <div className="error-actions">
                <button
                  type="button"
                  className="btn-error-fix-ai"
                  onClick={() => handleFixWithAI()}
                >
                  <Sparkles size={14} className="icon-gold" />
                  <span>Fix with 7CodeArena AI Agent (1-Click)</span>
                </button>
              </div>
            </div>
          )}

          {/* Success Toast */}
          {successToast && (
            <div className="login-success-banner">
              <CheckCircle2 size={18} className="icon-green" />
              <span>{successToast}</span>
            </div>
          )}

          {/* OAuth Buttons */}
          <div className="oauth-buttons-group">
            <button
              type="button"
              className="btn-oauth btn-oauth-google"
              onClick={() => {
                if (activeError?.code === 'CA-POPUP-BLOCKED') {
                  handleFixWithAI();
                } else {
                  simulateError('oauth');
                }
              }}
            >
              <svg className="oauth-icon" viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              className="btn-oauth btn-oauth-github"
              onClick={() => simulateError('otp')}
            >
              <svg className="oauth-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="login-divider">
            <span>OR WITH EMAIL</span>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="login-field-group">
              <label htmlFor="login-email">7CodeArena Email / Handle</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  id="login-email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com or @handle"
                  required
                />
              </div>
            </div>

            <div className="login-field-group">
              <div className="label-with-link">
                <label htmlFor="login-password">Password</label>
                <button
                  type="button"
                  className="btn-forgot-password"
                  onClick={() => simulateError('forgot')}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-login-submit ${activeError ? 'btn-has-error' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Connecting to 7CodeArena...</span>
                </>
              ) : activeError ? (
                <span>Retry Sign In or Ask AI Agent</span>
              ) : (
                <>
                  <span>Enter the Arena</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* 7CodeArena AI Assistant Help Bar */}
          <div className="login-ai-assist-box">
            <div className="ai-assist-icon-ring">
              <Sparkles size={16} className="icon-cyan" />
            </div>
            <div className="ai-assist-text">
              <span className="assist-title">Trouble signing in to 7CodeArena?</span>
              <span className="assist-subtitle">
                Our 24/7 AI Agent can diagnose screenshots, video screen recordings, OTP issues, or generate a 1-click magic link!
              </span>
            </div>
            <button
              type="button"
              className="btn-open-agent-pill"
              onClick={() => handleFixWithAI('I need help logging in to 7CodeArena from the login page.')}
            >
              Ask AI Agent
            </button>
          </div>

          {/* Security guarantee */}
          <div className="login-footer-security">
            <ShieldCheck size={14} className="icon-green" />
            <span>Encrypted with SHA-256 & 7CodeArena Anti-Cheat Sandbox</span>
          </div>
        </div>
      </div>
    </div>
  );
}
