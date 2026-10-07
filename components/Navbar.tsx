'use client';

import React, { useState } from 'react';
import { TeacherUser, WorksheetConfig } from '@/lib/types';
import {
  GraduationCap,
  Printer,
  HelpCircle,
  Sparkles,
  BookOpen,
  Award,
  ChevronDown,
  UserCheck,
  Edit2
} from 'lucide-react';

interface NavbarProps {
  teacher: TeacherUser;
  config: WorksheetConfig;
  onUpdateTeacher?: (updated: TeacherUser) => void;
  onApplyPresetTemplate: (grade: string, unitCode: string, title: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  teacher,
  config,
  onUpdateTeacher,
  onApplyPresetTemplate,
}) => {
  const [showPresets, setShowPresets] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showTeacherEditModal, setShowTeacherEditModal] = useState(false);
  const [editName, setEditName] = useState(teacher.fullName);
  const [editSchool, setEditSchool] = useState(teacher.school);
  const [editTitle, setEditTitle] = useState(teacher.title);

  return (
    <>
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white flex items-center justify-center shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  Matematik Soru Mimarı
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  TYMM 2026 Uyumlu
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                K-12 Ortaokul Matematik Zümresi İçin Yapay Zeka Atölyesi
              </p>
            </div>
          </div>

          {/* Center: Quick Preset Templates Dropdown */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowPresets(!showPresets)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Hazır Zümre Şablonları</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showPresets && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-40 text-xs">
                  <button
                    onClick={() => {
                      onApplyPresetTemplate('8', 'M.8.1.1.2', '8. Sınıf LGS EBOB-EKOK Beceri Temelli');
                      setShowPresets(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-indigo-50/60 hover:text-indigo-800 transition-colors block"
                  >
                    <div className="font-semibold">8. Sınıf LGS EBOB-EKOK</div>
                    <div className="text-[10px] text-slate-400">Yeni Nesil Beceri Temelli Sorular</div>
                  </button>
                  <button
                    onClick={() => {
                      onApplyPresetTemplate('8', 'M.8.1.3.2', '8. Sınıf Kareköklü İfadeler Değerlendirme');
                      setShowPresets(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-indigo-50/60 hover:text-indigo-800 transition-colors block border-t border-slate-100"
                  >
                    <div className="font-semibold">8. Sınıf Kareköklü İfadeler</div>
                    <div className="text-[10px] text-slate-400">Tahmin & Aralık Belirleme</div>
                  </button>
                  <button
                    onClick={() => {
                      onApplyPresetTemplate('7', 'M.7.1.3.1', '7. Sınıf Rasyonel Sayılarla Dört İşlem');
                      setShowPresets(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-indigo-50/60 hover:text-indigo-800 transition-colors block border-t border-slate-100"
                  >
                    <div className="font-semibold">7. Sınıf Rasyonel Sayılar</div>
                    <div className="text-[10px] text-slate-400">Çok Adımlı İşlemler</div>
                  </button>
                  <button
                    onClick={() => {
                      onApplyPresetTemplate('6', 'M.6.1.1.2', '6. Sınıf Doğal Sayılar & İşlem Önceliği');
                      setShowPresets(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-indigo-50/60 hover:text-indigo-800 transition-colors block border-t border-slate-100"
                  >
                    <div className="font-semibold">6. Sınıf İşlem Önceliği</div>
                    <div className="text-[10px] text-slate-400">Çarpanlar & Katlar</div>
                  </button>
                  <button
                    onClick={() => {
                      onApplyPresetTemplate('5', 'M.5.1.3.3', '5. Sınıf Kesirlerle Toplama ve Çıkarma');
                      setShowPresets(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-indigo-50/60 hover:text-indigo-800 transition-colors block border-t border-slate-100"
                  >
                    <div className="font-semibold">5. Sınıf Kesirler ve Sayı Doğrusu</div>
                    <div className="text-[10px] text-slate-400">Görsel Modellemeli Sorular</div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowInfoModal(true)}
              className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>TYMM Kılavuzu</span>
            </button>
          </div>

          {/* Right Teacher Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTeacherEditModal(true)}
              className="flex items-center gap-2.5 pl-3 border-l border-slate-200 hover:bg-slate-50 py-1 px-2 rounded-lg transition-colors group"
              title="Öğretmen Bilgilerini Güncelle"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-bold flex items-center justify-center text-xs shadow-xs group-hover:scale-105 transition-transform">
                {teacher.avatarSeed || 'ÖĞ'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight group-hover:text-indigo-700 flex items-center gap-1">
                  {teacher.fullName}
                  <Edit2 className="w-2.5 h-2.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  {teacher.school}
                </div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Teacher Profile Edit Modal */}
      {showTeacherEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-sm w-full p-5 text-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                Öğretmen Bilgilerini Güncelle
              </div>
              <button
                onClick={() => setShowTeacherEditModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Öğretmen Adı</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Unvan / Görev</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Okul Adı</label>
                <input
                  type="text"
                  value={editSchool}
                  onChange={(e) => setEditSchool(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowTeacherEditModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Vazgeç
              </button>
              <button
                onClick={() => {
                  if (onUpdateTeacher) {
                    onUpdateTeacher({
                      ...teacher,
                      fullName: editName,
                      title: editTitle,
                      school: editSchool,
                      avatarSeed: editName.slice(0, 2).toUpperCase(),
                    });
                  }
                  setShowTeacherEditModal(false);
                }}
                className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TYMM Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 text-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-indigo-900 text-sm">
                <Award className="w-5 h-5 text-indigo-600" />
                Türkiye Yüzyılı Maarif Modeli (TYMM) İlkeleri
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-xs space-y-2.5 text-slate-600 leading-relaxed">
              <p>
                <strong>1. Beceri ve Anlam Temelli Öğrenme:</strong> Matematik formülleri ezber yerine kavramsal derinlik ve günlük yaşam bağlamları ile kazandırılır.
              </p>
              <p>
                <strong>2. Süreç Odaklı Ölçme:</strong> Sorularda öğrencinin hata analizini yapabileceği çeldiriciler ve 3 aşamalı ipucu mekanizmaları kullanılır.
              </p>
              <p>
                <strong>3. STEM ve Bütüncül Yaklaşım:</strong> Matematik soruları mühendislik, bilişim, doğa ve çevre senaryolarıyla zenginleştirilir.
              </p>
              <p>
                <strong>4. Matematiksel Dil & LaTeX:</strong> Tüm denklemler ve matematiksel semboller evrensel standartlara uygun tipografik biçimde sunulur.
              </p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
