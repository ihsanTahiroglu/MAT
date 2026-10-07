'use client';

import React, { useState, useMemo } from 'react';
import {
  GradeLevel,
  DifficultyLevel,
  QuestionType,
  QuestionItem,
  WorksheetConfig,
  StudentHintCards,
  VisualGuide,
} from '@/lib/types';
import { CURRICULUM_DATA } from '@/lib/curriculum';
import { MathRenderer } from './MathRenderer';
import {
  Sparkles,
  Sliders,
  BookOpen,
  Layers,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Edit3,
  Lightbulb,
  Compass,
  Cpu,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Hash
} from 'lucide-react';

interface WorkshopPanelProps {
  questions: QuestionItem[];
  config: WorksheetConfig;
  onUpdateQuestions: (questions: QuestionItem[]) => void;
  onUpdateConfig: (config: WorksheetConfig) => void;
  onOpenEditModal: (question: QuestionItem) => void;
  onOpenHintModal: (question: QuestionItem, hints: StudentHintCards) => void;
  onOpenVisualModal: (question: QuestionItem, guide: VisualGuide) => void;
}

export const WorkshopPanel: React.FC<WorkshopPanelProps> = ({
  questions,
  config,
  onUpdateQuestions,
  onUpdateConfig,
  onOpenEditModal,
  onOpenHintModal,
  onOpenVisualModal,
}) => {
  // Generator form state
  const [grade, setGrade] = useState<GradeLevel>(config.grade);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('8-1');
  const [selectedKazanimCode, setSelectedKazanimCode] = useState<string>('M.8.1.1.2');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Orta');
  const [questionType, setQuestionType] = useState<QuestionType>('Çoktan Seçmeli (4 Şık)');
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [searchKazanim, setSearchKazanim] = useState<string>('');

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [enhancingId, setEnhancingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<'generate' | 'header'>('generate');

  // Units and learning outcomes for chosen grade
  const currentGradeData = useMemo(() => {
    return CURRICULUM_DATA[grade] || CURRICULUM_DATA['8'];
  }, [grade]);

  // Handle grade change
  const handleGradeChange = (newGrade: GradeLevel) => {
    setGrade(newGrade);
    onUpdateConfig({ ...config, grade: newGrade });
    const gradeUnits = CURRICULUM_DATA[newGrade]?.units || [];
    if (gradeUnits.length > 0) {
      setSelectedUnitId(gradeUnits[0].id);
      if (gradeUnits[0].kazanimlar.length > 0) {
        setSelectedKazanimCode(gradeUnits[0].kazanimlar[0].code);
      }
    }
  };

  // Find currently selected kazanim object
  let currentKazanim = { unit: currentGradeData.units[0], kazanim: currentGradeData.units[0]?.kazanimlar[0] };
  for (const unit of currentGradeData.units) {
    const found = unit.kazanimlar.find((k) => k.code === selectedKazanimCode);
    if (found) {
      currentKazanim = { unit, kazanim: found };
      break;
    }
  }

  // Generate Questions via Server API
  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/gemini/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradeLevel: grade,
          kazanimCode: currentKazanim.kazanim.code,
          kazanimTitle: currentKazanim.kazanim.title,
          kazanimDesc: currentKazanim.kazanim.description,
          difficulty,
          questionType,
          questionCount: Number(questionCount) || 3,
          customPrompt,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Soru üretimi başarısız oldu.');
      }

      const generated = json.data?.questions || [];
      const formattedQuestions: QuestionItem[] = generated.map((q: any, idx: number) => ({
        id: `q-${Date.now()}-${idx}`,
        number: idx + 1,
        type: q.type || questionType,
        text: q.text,
        options: q.options || [],
        correctAnswer: q.correctAnswer || 'A',
        solution: q.solution || '',
        kazanimCode: currentKazanim.kazanim.code,
        difficulty,
        hints: q.hints,
      }));

      onUpdateQuestions(formattedQuestions);
      onUpdateConfig({
        ...config,
        grade,
        title: `${grade}. Sınıf ${currentKazanim.kazanim.title}`,
        unitTitle: currentKazanim.unit.title,
        kazanimCode: currentKazanim.kazanim.code,
      });

      setSuccessMessage(`${formattedQuestions.length} adet TYMM uyumlu soru başarıyla üretildi ve A4 sayfasına yerleştirildi!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Bir hata meydana geldi.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Enhancement Action: STEM Scenario
  const handleEnhanceStem = async (question: QuestionItem) => {
    setEnhancingId(question.id);
    try {
      const res = await fetch('/api/gemini/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'stem_scenario',
          question,
          gradeLevel: grade,
          kazanim: `${currentKazanim.kazanim.code} - ${currentKazanim.kazanim.title}`,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'STEM senaryosu dönüştürülemedi.');
      }

      const updated = questions.map((q) => {
        if (q.id === question.id) {
          return {
            ...q,
            text: json.data.text || q.text,
            stemScenario: json.data.scenarioTitle || 'STEM Gerçek Hayat Senaryosu',
            options: json.data.options || q.options,
            solution: json.data.solution || q.solution,
            correctAnswer: json.data.correctAnswer || q.correctAnswer,
          };
        }
        return q;
      });

      onUpdateQuestions(updated);
      setSuccessMessage(`Soru #${question.number} başarıyla STEM / Gerçek Hayat Senaryosuna dönüştürüldü!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err?.message || 'STEM dönüştürme hatası.');
    } finally {
      setEnhancingId(null);
    }
  };

  // Enhancement Action: Hint Cards
  const handleEnhanceHints = async (question: QuestionItem) => {
    if (question.hints) {
      onOpenHintModal(question, question.hints);
      return;
    }

    setEnhancingId(question.id);
    try {
      const res = await fetch('/api/gemini/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'hint_cards',
          question,
          gradeLevel: grade,
          kazanim: `${currentKazanim.kazanim.code} - ${currentKazanim.kazanim.title}`,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'İpucu kartları üretilemedi.');
      }

      const hintsData: StudentHintCards = json.data;
      const updated = questions.map((q) => (q.id === question.id ? { ...q, hints: hintsData } : q));
      onUpdateQuestions(updated);
      onOpenHintModal(question, hintsData);
    } catch (err: any) {
      setErrorMessage(err?.message || 'İpucu kartı oluşturulamadı.');
    } finally {
      setEnhancingId(null);
    }
  };

  // Enhancement Action: Visual Guide
  const handleEnhanceVisual = async (question: QuestionItem) => {
    if (question.visualGuide) {
      onOpenVisualModal(question, question.visualGuide);
      return;
    }

    setEnhancingId(question.id);
    try {
      const res = await fetch('/api/gemini/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'visual_guide',
          question,
          gradeLevel: grade,
          kazanim: `${currentKazanim.kazanim.code} - ${currentKazanim.kazanim.title}`,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Görsel yönergesi üretilemedi.');
      }

      const guideData: VisualGuide = json.data;
      const updated = questions.map((q) => (q.id === question.id ? { ...q, visualGuide: guideData } : q));
      onUpdateQuestions(updated);
      onOpenVisualModal(question, guideData);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Görsel yönergesi çıkarılamadı.');
    } finally {
      setEnhancingId(null);
    }
  };

  // Question Management: Delete
  const handleDeleteQuestion = (id: string) => {
    const remaining = questions
      .filter((q) => q.id !== id)
      .map((q, idx) => ({ ...q, number: idx + 1 }));
    onUpdateQuestions(remaining);
  };

  // Question Management: Move up/down
  const handleMoveQuestion = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= questions.length) return;

    const copy = [...questions];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;

    const reordered = copy.map((q, i) => ({ ...q, number: i + 1 }));
    onUpdateQuestions(reordered);
  };

  // Question Management: Add manual blank question
  const handleAddManualQuestion = () => {
    const newQ: QuestionItem = {
      id: `q-manual-${Date.now()}`,
      number: questions.length + 1,
      type: questionType,
      text: "Yeni soru metni giriniz. Örnek LaTeX formülü: $2x + 3 = 11$",
      options: [
        { key: "A", text: "$2$" },
        { key: "B", text: "$4$" },
        { key: "C", text: "$6$" },
        { key: "D", text: "$8$" },
      ],
      correctAnswer: "B",
      solution: "Çözüm: $2x = 8 \\implies x = 4$.",
      difficulty: "Orta",
    };
    onUpdateQuestions([...questions, newQ]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Workshop Header */}
      <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-indigo-50/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Soru Üretim Atölyesi
              <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                TYMM 2026
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Parametreleri belirleyin, yapay zeka ile pedagojik sorular üretin.
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpandedSection(expandedSection === 'generate' ? 'header' : 'generate')}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 rounded bg-indigo-50/80 hover:bg-indigo-100 transition-colors"
        >
          {expandedSection === 'generate' ? 'Kağıt Başlığını Düzenle' : 'Parametrelere Dön'}
        </button>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mx-4 mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mx-4 mt-3 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Scrollable Form & Question List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {expandedSection === 'header' ? (
          /* Header editing view */
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              A4 Sınav / Çalışma Yaprağı Başlık Bilgileri
            </h3>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Okul Adı
              </label>
              <input
                type="text"
                value={config.schoolName}
                onChange={(e) => onUpdateConfig({ ...config, schoolName: e.target.value })}
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Sınav / Çalışma Başlığı
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => onUpdateConfig({ ...config, title: e.target.value })}
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Öğretmen Adı
                </label>
                <input
                  type="text"
                  value={config.teacherName}
                  onChange={(e) => onUpdateConfig({ ...config, teacherName: e.target.value })}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Tarih
                </label>
                <input
                  type="date"
                  value={config.date}
                  onChange={(e) => onUpdateConfig({ ...config, date: e.target.value })}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Parameters Form */
          <div className="space-y-4">
            {/* 1. Sınıf Seviyesi */}
            <div>
              <label className="text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                <span>1. Sınıf Seviyesi</span>
                <span className="text-[11px] font-normal text-slate-500">Ortaokul K-12</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['5', '6', '7', '8'] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGradeChange(g)}
                    className={`py-2 px-1 text-xs font-bold rounded-lg border transition-all ${
                      grade === g
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g}. Sınıf
                    {g === '8' && <span className="block text-[9px] font-medium opacity-80">& LGS</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Ünite & Kazanım Seçimi */}
            <div>
              <label className="text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                <span>2. Konu & TYMM Kazanım</span>
                <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                  {currentKazanim.kazanim.code}
                </span>
              </label>

              {/* Unit Dropdown */}
              <select
                value={selectedUnitId}
                onChange={(e) => {
                  setSelectedUnitId(e.target.value);
                  const u = currentGradeData.units.find((x) => x.id === e.target.value);
                  if (u && u.kazanimlar.length > 0) {
                    setSelectedKazanimCode(u.kazanimlar[0].code);
                  }
                }}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {currentGradeData.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    Ünite: {u.title}
                  </option>
                ))}
              </select>

              {/* Kazanim Dropdown */}
              <select
                value={selectedKazanimCode}
                onChange={(e) => setSelectedKazanimCode(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {currentGradeData.units
                  .find((u) => u.id === selectedUnitId)
                  ?.kazanimlar.map((k) => (
                    <option key={k.code} value={k.code}>
                      [{k.code}] {k.title}
                    </option>
                  ))}
              </select>

              {/* Kazanim Description Card */}
              <div className="mt-2 p-2 bg-indigo-50/50 border border-indigo-100 rounded-lg text-[11px] text-indigo-900 leading-snug">
                <span className="font-semibold text-indigo-950">Kazanım Hedefi: </span>
                {currentKazanim.kazanim.description}
              </div>
            </div>

            {/* 3. Zorluk Derecesi, Soru Türü & Soru Sayısı */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Zorluk */}
              <div>
                <label className="text-xs font-bold text-slate-800 mb-1 block">
                  3. Zorluk Derecesi
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="Temel">Temel Düzey</option>
                  <option value="Orta">Orta Düzey</option>
                  <option value="İleri / Beceri Temelli (LGS)">Beceri Temelli (LGS)</option>
                </select>
              </div>

              {/* Soru Türü */}
              <div>
                <label className="text-xs font-bold text-slate-800 mb-1 block">
                  4. Soru Türü
                </label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="Çoktan Seçmeli (4 Şık)">Çoktan Seçmeli (4 Şık)</option>
                  <option value="Açık Uçlu / Klasik">Açık Uçlu / Klasik</option>
                  <option value="Doğru - Yanlış">Doğru - Yanlış</option>
                  <option value="Eşleştirmeli">Eşleştirmeli</option>
                </select>
              </div>

              {/* Soru Sayısı (Manuel Serbest Giriş) */}
              <div>
                <label className="text-xs font-bold text-slate-800 mb-1 block flex items-center justify-between">
                  <span>5. Soru Sayısı</span>
                  <span className="text-[10px] text-slate-400">Tam uyum</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    className="w-full text-xs font-bold text-center p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Özel İstekler / Pedagojik Notlar */}
            <div>
              <label className="text-xs font-bold text-slate-800 mb-1 block flex items-center gap-1.5">
                <span>Öğretmen Özel Notu / Bağlam İsteği (Opsiyonel)</span>
                <span title="Örn: 'Şekilli olsun', 'Mete ve Defne'nin çevre projesini içersin' gibi özel direktifler verebilirsiniz.">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                </span>
              </label>
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Örn: Akıllı sera veya robotik kodlama bağlamında, şekilli soru..."
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Üretim Butonu */}
            <button
              onClick={handleGenerateQuestions}
              disabled={isGenerating}
              className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                isGenerating
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 hover:shadow-lg active:scale-[0.99]'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-100" />
                  <span>{questionCount} Adet TYMM Sorusu Üretiliyor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>TYMM Uyumlu {questionCount} Soruyu Üret</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Existing Questions List & Action Buttons */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>Mevcut Soru Kartları</span>
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                {questions.length}
              </span>
            </h3>

            <button
              onClick={handleAddManualQuestion}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-md transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Yeni Soru Ekle
            </button>
          </div>

          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div
                key={q.id || idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-300 transition-all shadow-2xs group"
              >
                {/* Question Card Top Info */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-indigo-700 text-white font-bold text-xs flex items-center justify-center">
                      {q.number}
                    </span>
                    <span className="text-[11px] font-medium text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded">
                      {q.type}
                    </span>
                    {q.stemScenario && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> STEM
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Move Up */}
                    <button
                      onClick={() => handleMoveQuestion(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      title="Yukarı taşı"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    {/* Move Down */}
                    <button
                      onClick={() => handleMoveQuestion(idx, 'down')}
                      disabled={idx === questions.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded"
                      title="Aşağı taşı"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {/* Edit */}
                    <button
                      onClick={() => onOpenEditModal(q)}
                      className="p-1 text-slate-500 hover:text-indigo-600 rounded"
                      title="Soruyu düzenle"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Soruyu sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Question preview text with LaTeX */}
                <div className="text-xs text-slate-800 line-clamp-3 mb-2 font-serif leading-relaxed">
                  <MathRenderer content={q.text} />
                </div>

                {/* Correct answer indicator */}
                <div className="text-[11px] text-slate-500 flex items-center justify-between mb-2.5 pt-1 border-t border-slate-200/50">
                  <span>Doğru Yanıt: <strong className="text-emerald-700">{q.correctAnswer}</strong></span>
                  <span className="text-[10px] text-slate-400">Çözüm hazır ✓</span>
                </div>

                {/* Zenginleştirme Eylem Düğmeleri (Enhancement Action Buttons) */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {/* Action 1: 3-stage Hint Cards */}
                  <button
                    onClick={() => handleEnhanceHints(q)}
                    disabled={enhancingId === q.id}
                    className="p-1.5 rounded-lg border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-amber-900 text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    title="Öğrenci İpucu Kartları Üret (3 Aşama)"
                  >
                    <Lightbulb className="w-3 h-3 text-amber-600 shrink-0" />
                    <span className="truncate">İpucu Kartları</span>
                  </button>

                  {/* Action 2: STEM Transformation */}
                  <button
                    onClick={() => handleEnhanceStem(q)}
                    disabled={enhancingId === q.id}
                    className="p-1.5 rounded-lg border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    title="Gerçek Hayat / STEM Senaryosu Ekle"
                  >
                    <Cpu className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">STEM Senaryo</span>
                  </button>

                  {/* Action 3: Visual & GeoGebra Guide */}
                  <button
                    onClick={() => handleEnhanceVisual(q)}
                    disabled={enhancingId === q.id}
                    className="p-1.5 rounded-lg border border-teal-200 bg-teal-50/70 hover:bg-teal-100 text-teal-900 text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    title="Görsel / Çizim Yönergesi Çıkar (GeoGebra / Canva)"
                  >
                    <Compass className="w-3 h-3 text-teal-600 shrink-0" />
                    <span className="truncate">Görsel Yönerge</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
