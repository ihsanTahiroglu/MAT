'use client';

import React, { useState } from 'react';
import { StudentHintCards, QuestionItem } from '@/lib/types';
import { MathRenderer } from './MathRenderer';
import { Lightbulb, Compass, Play, Copy, Check, X, Sparkles } from 'lucide-react';

interface HintCardsModalProps {
  question: QuestionItem;
  hints: StudentHintCards;
  onClose: () => void;
}

export const HintCardsModal: React.FC<HintCardsModalProps> = ({
  question,
  hints,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = () => {
    const text = `Soru ${question.number} - 3 Aşamalı Öğrenci İpucu Kartları\n\n` +
      `1. KAVRAMSAL İPUCU:\n${hints.conceptual}\n\n` +
      `2. STRATEJİ İPUCU:\n${hints.strategy}\n\n` +
      `3. İLK İŞLEM ADIMI:\n${hints.firstStep}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                Pedagojik Destek
              </span>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                3 Aşamalı Öğrenci İpucu Kartları
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
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

        {/* Question context bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200/70 text-xs text-slate-600 line-clamp-2">
          <span className="font-semibold text-slate-700">İlgili Soru: </span>
          <MathRenderer content={question.text} className="inline text-xs" />
        </div>

        {/* Content - 3 Cards */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Card 1: Conceptual */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 relative overflow-hidden">
            <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                1
              </span>
              <span>1. Aşama: Kavramsal İpucu</span>
              <span className="text-[11px] font-normal text-blue-600 ml-auto bg-blue-100/80 px-2 py-0.5 rounded-full">
                Temel Tanım & Kural
              </span>
            </div>
            <p className="text-xs text-blue-950 leading-relaxed pl-8">
              <MathRenderer content={hints.conceptual} />
            </p>
          </div>

          {/* Card 2: Strategy */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 relative overflow-hidden">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                2
              </span>
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>2. Aşama: Strateji İpucu</span>
              <span className="text-[11px] font-normal text-emerald-600 ml-auto bg-emerald-100/80 px-2 py-0.5 rounded-full">
                Yöntem Belirleme
              </span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed pl-8">
              <MathRenderer content={hints.strategy} />
            </p>
          </div>

          {/* Card 3: First Step */}
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 relative overflow-hidden">
            <div className="flex items-center gap-2 text-purple-800 font-semibold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                3
              </span>
              <Play className="w-4 h-4 text-purple-600" />
              <span>3. Aşama: İlk İşlem Adımı</span>
              <span className="text-[11px] font-normal text-purple-600 ml-auto bg-purple-100/80 px-2 py-0.5 rounded-full">
                Başlangıç Eşitliği
              </span>
            </div>
            <p className="text-xs text-purple-950 leading-relaxed pl-8 font-medium">
              <MathRenderer content={hints.firstStep} />
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Öğrencinin takıldığı sorularda aşamalı rehberlik sunmak için tasarlanmıştır.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Kopyalandı!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Tüm İpuçlarını Kopyala
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-900 text-white transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
