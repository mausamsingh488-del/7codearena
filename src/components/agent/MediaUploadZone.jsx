import React, { useRef, useState, useEffect } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Video,
  Mic,
  MicOff,
  Disc,
  X,
  Sparkles,

  Play,
  Film,
  Camera,
  AlertCircle
} from 'lucide-react';
import { SAMPLE_PRESETS } from './sampleImages';
import { sounds } from './SoundFX';

export default function MediaUploadZone({
  selectedMedia,
  onMediaSelect,
  onMediaRemove,
  onPresetSelect,
  onVoiceTranscript
}) {
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRecordingScreen, setIsRecordingScreen] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  // Global clipboard paste for screenshots (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            handleImageFile(blob);
            sounds.playUpload();
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Voice Recognition setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = true;
      recog.lang = 'en-IN'; // Works for Indian English / Hinglish / English

      recog.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        if (onVoiceTranscript) {
          onVoiceTranscript(transcript);
        }
      };

      recog.onend = () => {
        setIsListeningVoice(false);
      };

      recog.onerror = () => {
        setIsListeningVoice(false);
      };

      recognitionRef.current = recog;
    }
  }, [onVoiceTranscript]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type or upload instead.');
      return;
    }

    if (isListeningVoice) {
      recognitionRef.current.stop();
      setIsListeningVoice(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListeningVoice(true);
        sounds.playMessageReceived();
      } catch (err) {
        console.warn('Speech start error:', err);
      }
    }
  };

  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onMediaSelect({
        mediaType: 'image',
        file,
        dataUrl: e.target.result,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: 'custom'
      });
      sounds.playUpload();
    };
    reader.readAsDataURL(file);
  };

  const handleVideoFile = (file) => {
    if (!file || !file.type.startsWith('video/')) return;
    const videoUrl = URL.createObjectURL(file);
    onMediaSelect({
      mediaType: 'video',
      file,
      videoUrl,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: 'custom_video',
      duration: '00:10'
    });
    sounds.playUpload();
  };

  // Screen recording handler
  const startScreenRecording = async () => {
    try {
      if (!navigator.mediaDevices?.getDisplayMedia) {
        alert('Screen capture is not supported on this device/browser.');
        return;
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: false
      });

      recordedChunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm')
  ? 'video/webm'
  : MediaRecorder.isTypeSupported('video/mp4')
    ? 'video/mp4'
    : '';

const mediaRecorder = mimeType
  ? new MediaRecorder(stream, { mimeType })
  : new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        onMediaSelect({
          mediaType: 'video',
          videoUrl,
          name: '7CodeArena_Screen_Recording.webm',
          size: (blob.size / 1024).toFixed(1) + ' KB',
          type: 'screen_recording',
          duration: `${recordingSeconds}s`
        });
        setIsRecordingScreen(false);
        setRecordingSeconds(0);
        stream.getTracks().forEach((track) => track.stop());
        sounds.playUpload();
      };

      mediaRecorder.start();
      setIsRecordingScreen(true);
      setRecordingSeconds(1);

      const interval = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 20) {
            // Cap at 20 seconds for demo
            stopScreenRecording();
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.warn('Screen recording cancelled or failed:', err);
      setIsRecordingScreen(false);
    }
  };

  const stopScreenRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type.startsWith('video/')) {
      handleVideoFile(file);
    } else if (file.type.startsWith('image/')) {
      handleImageFile(file);
    }
  };

  return (
    <div className="arena-upload-container">
      {/* If media is currently selected/uploaded */}
      {selectedMedia ? (
        <div className="arena-image-preview-card">
          <div className="preview-img-wrapper">
            {selectedMedia.mediaType === 'video' ? (
              <div className="preview-video-container">
                {selectedMedia.videoUrl ? (
                  <video src={selectedMedia.videoUrl} className="preview-thumb-video" controls />
                ) : (
                  <div className="preview-video-placeholder">
                    <Film size={28} className="icon-cyan" />
                    <span>Video Clip: {selectedMedia.duration || '00:08'}</span>
                  </div>
                )}
                <span className="preview-badge video-badge">
                  🎥 {selectedMedia.duration || 'Video'}
                </span>
              </div>
            ) : (
              <>
                <img src={selectedMedia.dataUrl} alt="Preview" className="preview-thumb" />
                <div className="preview-overlay">
                  <span className="preview-badge">
                    {selectedMedia.type === 'preset' ? '🎯 Sample Screenshot' : '📸 Screenshot'}
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="preview-meta">
            <div className="preview-title">{selectedMedia.name || 'Uploaded Media'}</div>
            <div className="preview-sub">
              {selectedMedia.size} · Ready for 7CodeArena Multimodal Diagnosis
            </div>
          </div>
          <button
            type="button"
            className="arena-btn-remove"
            onClick={onMediaRemove}
            title="Remove Media"
            aria-label="Remove Media"
          >
            <X size={16} />
          </button>
        </div>
      ) : isRecordingScreen ? (
        /* Screen Recording in progress banner */
        <div className="arena-recording-banner">
          <div className="recording-pulse-ring">
            <Disc size={20} className="icon-red animate-pulse" />
          </div>
          <div className="recording-info">
            <span className="rec-title">🔴 Recording 7CodeArena Screen Issue...</span>
            <span className="rec-timer">00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds} / 00:20</span>
          </div>
          <button
            type="button"
            className="btn-stop-recording"
            onClick={stopScreenRecording}
          >
            Stop & Diagnose
          </button>
        </div>
      ) : (
        /* Dropzone & Multi-modal Toolbar */
        <div
          className={`arena-dropzone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
          />
          <input
            type="file"
            ref={videoInputRef}
            style={{ display: 'none' }}
            accept="video/*"
            onChange={(e) => e.target.files?.[0] && handleVideoFile(e.target.files[0])}
          />

          <div className="dropzone-content">
            <div className="dropzone-icon-ring">
              <UploadCloud size={20} className="icon-cyan" />
            </div>
            <div className="dropzone-text">
              <span className="dropzone-main">
                Drop screenshot or screen recording video here
              </span>
              <span className="dropzone-hint">
                Supports PNG, JPG, WebP, MP4, WebM, or Ctrl+V paste
              </span>
            </div>
          </div>

          {/* Multimodal Quick Action Buttons */}
          <div className="multimodal-btn-group" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="btn-media-action"
              onClick={() => fileInputRef.current?.click()}
              title="Upload Screenshot"
            >
              <ImageIcon size={14} className="icon-cyan" />
              <span>Image</span>
            </button>

            <button
              type="button"
              className="btn-media-action"
              onClick={() => videoInputRef.current?.click()}
              title="Upload Screen Recording Video"
            >
              <Video size={14} className="icon-purple" />
              <span>Video</span>
            </button>

            <button
              type="button"
              className="btn-media-action"
              onClick={startScreenRecording}
              title="Record Your Screen Directly"
            >
              <Disc size={14} className="icon-red" />
              <span>Record Screen</span>
            </button>

            <button
              type="button"
              className={`btn-media-action ${isListeningVoice ? 'voice-listening-active' : ''}`}
              onClick={toggleVoiceInput}
              title={isListeningVoice ? 'Stop Voice Input' : 'Speak Your Issue (Voice Input)'}
            >
              {isListeningVoice ? (
                <>
                  <MicOff size={14} className="icon-red animate-pulse" />
                  <span>Listening...</span>
                </>
              ) : (
                <>
                  <Mic size={14} className="icon-gold" />
                  <span>Voice</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 1-Click Preset Samples for Instant Testing */}
      <div className="arena-presets-strip">
        <span className="presets-label">
          <Sparkles size={12} className="icon-gold" /> 1-Click Real Issues:
        </span>
        {SAMPLE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="preset-chip"
            onClick={() => {
              onPresetSelect(preset);
              sounds.playUpload();
            }}
          >
            <span className="preset-dot"></span>
            {preset.title}
          </button>
        ))}
      </div>
    </div>
  );
}
