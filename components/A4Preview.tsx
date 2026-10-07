'use client';

import React, { useState } from 'react';
import { QuestionItem, WorksheetConfig } from '@/lib/types';
import { MathRenderer } from './MathRenderer';
import {
  Printer,
  Download,
  ZoomIn,
  ZoomOut,
  Columns,
  Square,
  Eye,
  EyeOff,
  Copy,
  Check,
  FileText,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface A4PreviewProps {
  questions: QuestionItem[];
  config: WorksheetConfig;
  onUpdateConfig: (newConfig: WorksheetConfig) => void;
  onSelectQuestionToEnhance?: (q: QuestionItem) => void;
}

export const A4Preview: React.FC<A4PreviewProps> = ({
  questions,
  config,
  onUpdateConfig,
  onSelectQuestionToEnhance,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copiedText, setCopiedText] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyRaw = () => {
    let out = `${config.schoolName}\n${config.title}\nÖğretmen: ${config.teacherName}\nTarih: ${config.date}\n\n`;
    questions.forEach((q, idx) => {
      out += `SORU ${idx + 1}:\n${q.text}\n`;
      if (q.options) {
        q.options.forEach((opt) => {
          out += `${opt.key}) ${opt.text}  `;
        });
        out += '\n';
      }
      out += `Doğru Cevap: ${q.correctAnswer}\nÇözüm: ${q.solution}\n\n`;
    });
    navigator.clipboard.writeText(out);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/80 rounded-2xl border border-slate-300/80 overflow-hidden shadow-inner">
      {/* Top Controls Bar (Hidden during print) */}
      <div className="no-print bg-white/95 backdrop-blur-xs px-4 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left: View Mode Badges */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>A4 Önizleme</span>
            <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {questions.length} Soru
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          {/* Column selector */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => onUpdateConfig({ ...config, layout: 'double' })}
              title="Çift Sütun (LGS Kitapçık Düzeni)"
              className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all ${
                config.layout === 'double'
                  ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Çift Sütun</span>
            </button>
            <button
              onClick={() => onUpdateConfig({ ...config, layout: 'single' })}
              title="Tek Sütun (Geniş Çalışma Alanı)"
              className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all ${
                config.layout === 'single'
                  ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>Tek Sütun</span>
            </button>
          </div>

          {/* Toggle Solutions */}
          <button
            onClick={() => onUpdateConfig({ ...config, showSolutions: !config.showSolutions })}
            className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
              config.showSolutions
                ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {config.showSolutions ? <Eye className="w-3.5 h-3.5 text-amber-600" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{config.showSolutions ? 'Çözümlü (Öğretmen)' : 'Çözümleri Göster'}</span>
          </button>
        </div>

        {/* Right: Actions & Zoom */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(65, prev - 10))}
              className="p-1 text-slate-600 hover:text-slate-900 rounded"
              title="Uzaklaştır"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-700 w-9 text-center font-semibold">
              %{zoomLevel}
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
              className="p-1 text-slate-600 hover:text-slate-900 rounded"
              title="Yakınlaştır"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy Text */}
          <button
            onClick={handleCopyRaw}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1 shadow-xs"
            title="Metin olarak kopyala"
          >
            {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedText ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>

          {/* Print / PDF Button */}
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-sm hover:shadow transition-all"
            title="A4 formatında yazdır veya PDF olarak kaydet"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>A4 Yazdır / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Scrollable Canvas Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center bg-slate-300/60 bg-dot-grid">
        {/* A4 Sheet Container */}
        <div
          id="a4-paper-sheet"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            width: '210mm',
            minHeight: '297mm',
          }}
          className="a4-page-container bg-white text-slate-900 p-[12mm] shadow-2xl rounded-sm border border-slate-300 flex flex-col justify-between relative box-border"
        >
          <div>
            {/* A4 Sheet Header (Standard Turkish MEB School Exam Format) */}
            <div className="border-2 border-slate-900 rounded-lg p-3 mb-4 bg-white">
              <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-serif font-black flex items-center justify-center text-xs">
                    M
                  </div>
                  <div>
                    <h2 className="text-xs font-black tracking-wide uppercase text-slate-900">
                      {config.schoolName || 'ORTAOKULU'}
                    </h2>
                    <h3 className="text-sm font-extrabold text-indigo-950">
                      {config.title || 'Matematik Çalışma Yaprağı'}
                    </h3>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-700 font-medium">
                  <div>Öğretmen: <span className="font-bold text-slate-950">{config.teacherName}</span></div>
                  <div>Tarih: <span className="font-semibold">{config.date}</span></div>
                </div>
              </div>

              {/* Student identification line */}
              <div className="grid grid-cols-4 gap-2 text-[11px] font-medium pt-0.5 text-slate-800">
                <div className="border border-slate-300 rounded px-2 py-1 bg-slate-50/50">
                  <span className="text-slate-500 font-normal">Adı Soyadı:</span>
                </div>
                <div className="border border-slate-300 rounded px-2 py-1 bg-slate-50/50">
                  <span className="text-slate-500 font-normal">Sınıf / Şube:</span> {config.grade}. Sınıf /
                </div>
                <div className="border border-slate-300 rounded px-2 py-1 bg-slate-50/50">
                  <span className="text-slate-500 font-normal">Okul No:</span>
                </div>
                <div className="border-2 border-indigo-900 rounded px-2 py-1 bg-indigo-50/40 text-center font-bold text-indigo-950">
                  <span>Puan:</span>
                </div>
              </div>
            </div>

            {/* Questions Grid / Layout */}
            {questions.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-xl">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 font-medium text-sm">
                  Henüz soru eklenmedi.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Sol panelden kazanım ve soru sayısını seçerek &quot;TYMM Uyumlu Soruları Üret&quot; butonuna basınız.
                </p>
              </div>
            ) : (
              <div
                className={`gap-x-6 gap-y-5 ${
                  config.layout === 'double'
                    ? 'columns-1 sm:columns-2 [column-rule:1px_dashed_#cbd5e1]'
                    : 'flex flex-col space-y-5'
                }`}
              >
                {questions.map((q, index) => (
                  <div
                    key={q.id || index}
                    className="break-inside-avoid mb-5 pb-3 border-b border-slate-200 last:border-b-0"
                  >
                    {/* Question Header & STEM Badge */}
                    <div className="flex items-start gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        {q.stemScenario && (
                          <div className="mb-1 inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
                            <Sparkles className="w-2.5 h-2.5" /> STEM / YENİ NESİL
                          </div>
                        )}
                        <div className="text-xs font-normal text-slate-900 leading-relaxed font-serif">
                          <MathRenderer content={q.text} />
                        </div>
                      </div>
                    </div>

                    {/* SVG Illustration if available */}
                    {q.visualGuide?.svgPreview && (
                      <div className="my-2.5 flex justify-center bg-slate-50 p-2 rounded border border-slate-200">
                        <div
                          className="max-w-[240px] max-h-[140px]"
                          dangerouslySetInnerHTML={{ __html: q.visualGuide.svgPreview }}
                        />
                      </div>
                    )}

                    {/* Multiple Choice Options (4 Choices) */}
                    {q.options && q.options.length > 0 && (
                      <div className="mt-2.5 pl-8 grid grid-cols-2 gap-2 text-xs font-serif">
                        {q.options.map((opt) => (
                          <div
                            key={opt.key}
                            className={`flex items-start gap-1.5 py-0.5 ${
                              config.showSolutions && q.correctAnswer === opt.key
                                ? 'font-bold text-indigo-900 bg-indigo-50/80 px-1.5 rounded'
                                : 'text-slate-800'
                            }`}
                          >
                            <span className="font-bold font-sans">{opt.key})</span>
                            <MathRenderer content={opt.text} />
                            {config.showSolutions && q.correctAnswer === opt.key && (
                              <span className="text-[10px] text-emerald-700 ml-1 font-sans">✓</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Open-ended answer box or Student working space */}
                    {q.type === 'Açık Uçlu / Klasik' && !config.showSolutions && (
                      <div className="mt-2 ml-8 h-16 border border-dashed border-slate-300 rounded-md bg-slate-50/40 p-1.5 flex items-end justify-end">
                        <span className="text-[9px] text-slate-400 italic">Çözüm Alanı</span>
                      </div>
                    )}

                    {/* Solutions View (Teacher edition) */}
                    {config.showSolutions && q.solution && (
                      <div className="mt-2 ml-8 p-2 rounded bg-amber-50/80 border border-amber-200 text-[11px] text-amber-950 font-sans">
                        <div className="font-bold text-amber-900 mb-0.5 flex items-center justify-between">
                          <span>Çözüm Adımları & Cevap:</span>
                          <span className="bg-amber-200/80 px-1.5 py-0.2 rounded font-bold">
                            Cevap: {q.correctAnswer}
                          </span>
                        </div>
                        <MathRenderer content={q.solution} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Area: Optical Answer Key & Footer */}
          <div className="mt-6 pt-3 border-t-2 border-slate-900">
            {config.showAnswerKeyTable && questions.length > 0 && (
              <div className="mb-3 p-2 bg-slate-50 border border-slate-300 rounded flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                  Cevap Anahtarı:
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-slate-800">
                  {questions.map((q, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-2xs"
                    >
                      {idx + 1}-{q.correctAnswer || '?'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-sans">
              <span className="font-medium">
                TYMM (Türkiye Yüzyılı Maarif Modeli) K-12 Matematik
              </span>
              <span>Başarılar Dileriz! • Sayfa 1 / 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
