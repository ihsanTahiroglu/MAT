'use client';

import React, { useState } from 'react';
import { VisualGuide, QuestionItem } from '@/lib/types';
import { Compass, Sparkles, Copy, Check, X, Layers, Image as ImageIcon, ExternalLink } from 'lucide-react';

interface VisualGuideModalProps {
  question: QuestionItem;
  guide: VisualGuide;
  onClose: () => void;
}

export const VisualGuideModal: React.FC<VisualGuideModalProps> = ({
  question,
  guide,
  onClose,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedGeometry, setCopiedGeometry] = useState(false);

  const copyText = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-teal-50 to-emerald-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
                Çizim & Geometri Asistanı
              </span>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Görsel / Çizim Yönergesi
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                  Soru #{question.number}
                </span>
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* SVG Preview if available */}
          {guide.svgPreview && (
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center">
              <span className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1.5 self-start">
                <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
                Otomatik Geometrik Şablon Önizlemesi:
              </span>
              <div
                className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: guide.svgPreview }}
              />
            </div>
          )}

          {/* Section 1: Gemini Image Generation Prompt */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-indigo-900 font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>1. Gemini Görsel Üretim İstemi (AI Prompt)</span>
              </div>
              <button
                onClick={() => copyText(guide.geminiPrompt, setCopiedPrompt)}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center gap-1 shadow-xs"
              >
                {copiedPrompt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedPrompt ? 'Kopyalandı' : 'Kopyala'}
              </button>
            </div>
            <p className="text-xs text-indigo-950 font-mono bg-white/80 p-3 rounded-lg border border-indigo-100 whitespace-pre-wrap leading-relaxed">
              {guide.geminiPrompt}
            </p>
            <span className="text-[11px] text-slate-500 mt-1.5 block">
              💡 Bu istemi kullanarak görsel oluşturma araçlarında temiz, net eğitim kitabı illüstrasyonu elde edebilirsiniz.
            </span>
          </div>

          {/* Section 2: GeoGebra / Polypad / Canva Instructions */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/40 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-teal-900 font-semibold text-sm">
                <Layers className="w-4 h-4 text-teal-600" />
                <span>2. GeoGebra / Polypad / Canva Çizim & Koordinat Rehberi</span>
              </div>
              <button
                onClick={() => copyText(guide.geometryInstructions, setCopiedGeometry)}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-white border border-teal-200 text-teal-700 hover:bg-teal-50 transition-colors flex items-center gap-1 shadow-xs"
              >
                {copiedGeometry ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedGeometry ? 'Kopyalandı' : 'Kopyala'}
              </button>
            </div>
            <div className="text-xs text-teal-950 bg-white/90 p-3 rounded-lg border border-teal-100 whitespace-pre-wrap leading-relaxed font-sans">
              {guide.geometryInstructions}
            </div>
            <div className="flex items-center gap-4 mt-2 text-[11px] text-teal-800">
              <a
                href="https://www.geogebra.org/geometry"
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-1 font-medium"
              >
                GeoGebra Geometri <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://mathigon.org/polypad"
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-1 font-medium"
              >
                Mathigon Polypad <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Öğretmenin soruya özel hatasız ölçekli şekiller çizebilmesi için hazırlanmıştır.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-900 text-white transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
