'use client';

import React, { useState } from 'react';
import { QuestionItem, QuestionOption } from '@/lib/types';
import { MathRenderer } from './MathRenderer';
import { Edit3, Check, X, Eye } from 'lucide-react';

interface EditQuestionModalProps {
  question: QuestionItem;
  onSave: (updated: QuestionItem) => void;
  onClose: () => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  question,
  onSave,
  onClose,
}) => {
  const [text, setText] = useState(question.text);
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer);
  const [solution, setSolution] = useState(question.solution);
  const [options, setOptions] = useState<QuestionOption[]>(
    question.options || [
      { key: 'A', text: '' },
      { key: 'B', text: '' },
      { key: 'C', text: '' },
      { key: 'D', text: '' },
    ]
  );
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const handleOptionChange = (index: number, newText: string) => {
    const updated = [...options];
    updated[index] = { ...updated[index], text: newText };
    setOptions(updated);
  };

  const handleSave = () => {
    onSave({
      ...question,
      text,
      options,
      correctAnswer,
      solution,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Soruyu Düzenle (Soru #{question.number})
              </h3>
              <p className="text-xs text-slate-500">
                LaTeX matematik ifadelerini ($...$) doğrudan değiştirebilirsiniz.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-slate-200/80 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Düzenle
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-md flex items-center gap-1 transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Canlı LaTeX
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'edit' ? (
            <>
              {/* Question Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Soru Metni (LaTeX Formülleri ile)
                </label>
                <textarea
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-3 text-sm font-mono bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  placeholder="Soru metni... ($x^2 + 5x = 24$ gibi)"
                />
              </div>

              {/* Options */}
              {options && options.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Şıklar ve Çeldiriciler
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {options.map((opt, i) => (
                      <div key={opt.key} className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border ${
                            correctAnswer === opt.key
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <input
                          type="text"
                          value={opt.text}
                          onChange={(e) => handleOptionChange(i, e.target.value)}
                          className="w-full px-3 py-1.5 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                          placeholder={`${opt.key} şıkkı...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Correct Answer Selector */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-semibold text-slate-700">
                  Doğru Seçenek:
                </span>
                <div className="flex gap-2">
                  {['A', 'B', 'C', 'D'].map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCorrectAnswer(key)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold border transition-colors ${
                        correctAnswer === key
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              {/* Solution */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Çözüm Adımları (Öğretmen ve Çözüm Anahtarı İçin)
                </label>
                <textarea
                  rows={3}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full p-3 text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  placeholder="Çözüm adımları..."
                />
              </div>
            </>
          ) : (
            /* Live Preview Tab */
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-500 mb-1">
                  Soru {question.number}:
                </div>
                <div className="text-sm text-slate-900 leading-relaxed">
                  <MathRenderer content={text} />
                </div>
              </div>

              {options && (
                <div className="grid grid-cols-2 gap-2">
                  {options.map((opt) => (
                    <div
                      key={opt.key}
                      className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                        correctAnswer === opt.key
                          ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-900'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="font-bold">{opt.key})</span>
                      <MathRenderer content={opt.text} />
                      {correctAnswer === opt.key && (
                        <span className="text-[10px] ml-auto bg-emerald-200/70 text-emerald-800 px-1.5 py-0.5 rounded">
                          Doğru Cevap
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {solution && (
                <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-200 text-xs">
                  <div className="font-bold text-indigo-900 mb-1">Çözüm Adımı:</div>
                  <MathRenderer content={solution} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Check className="w-4 h-4" /> Değişiklikleri Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};
