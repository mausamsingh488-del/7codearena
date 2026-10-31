import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, X, Sparkles, AlertCircle } from 'lucide-react';
import { SAMPLE_PRESETS } from './sampleImages';
import { sounds } from './SoundFX';

export default function ImageUploadZone({
  selectedImage,
  onImageSelect,
  onImageRemove,
  onPresetSelect
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Listen to global clipboard paste (Ctrl+V) when active
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            handleFile(blob);
            sounds.playUpload();
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect({
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="arena-upload-container">
      {selectedImage ? (
        <div className="arena-image-preview-card">
          <div className="preview-img-wrapper">
            <img src={selectedImage.dataUrl} alt="Screenshot preview" className="preview-thumb" />
            <div className="preview-overlay">
              <span className="preview-badge">
                {selectedImage.type === 'preset' ? '🎯 Sample Screenshot' : '📸 Custom Screenshot'}
              </span>
            </div>
          </div>
          <div className="preview-meta">
            <div className="preview-title">{selectedImage.name || 'Uploaded Screenshot'}</div>
            <div className="preview-sub">{selectedImage.size || 'Image Ready for Vision Analysis'}</div>
          </div>
          <button
            type="button"
            className="arena-btn-remove"
            onClick={onImageRemove}
            title="Remove Screenshot"
            aria-label="Remove Screenshot"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`arena-dropzone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="dropzone-content">
            <div className="dropzone-icon-ring">
              <UploadCloud size={20} className="icon-cyan" />
            </div>
            <div className="dropzone-text">
              <span className="dropzone-main">Drop 7CodeArena screenshot or click to browse</span>
              <span className="dropzone-hint">Supports PNG, JPG, WebP or Ctrl+V paste</span>
            </div>
          </div>
        </div>
      )}

      {/* 1-Click Preset Samples for Instant Testing */}
      <div className="arena-presets-strip">
        <span className="presets-label">
          <Sparkles size={12} className="icon-gold" /> Try 1-Click Sample:
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
