'use client';

import React, { useState } from 'react';
import { TeacherUser } from '@/lib/types';
import { Lock, GraduationCap, ShieldCheck, UserCheck, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface TeacherLoginProps {
  onLogin: (user: TeacherUser) => void;
}

const PRESET_TEACHERS: TeacherUser[] = [
  {
    id: "t-1",
    fullName: "İhsan Tahiroğlu",
    title: "Matematik Zümre Başkanı",
    school: "Atatürk Ortaokulu",
    email: "ihsantahiroglu6@gmail.com",
    avatarSeed: "IT",
  },
  {
    id: "t-2",
    fullName: "Ayşe Yılmaz",
    title: "Ortaokul Matematik Öğretmeni",
    school: "Cumhuriyet Ortaokulu",
    email: "ayse.yilmaz@meb.k12.tr",
    avatarSeed: "AY",
  },
  {
    id: "t-3",
    fullName: "Mehmet Kaya",
    title: "LGS Hazırlık Koordinatörü",
    school: "Gazi İmam Hatip Ortaokulu",
    email: "mehmet.kaya@meb.k12.tr",
    avatarSeed: "MK",
  },
];

export const TeacherLogin: React.FC<TeacherLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [school, setSchool] = useState('Cumhuriyet Ortaokulu');
  const [error, setError] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Lütfen e-posta / MEBBİS kullanıcı adı ve şifrenizi giriniz.');
      return;
    }
    const name = fullName.trim() || email.split('@')[0] || 'Değerli Öğretmenimiz';
    const user: TeacherUser = {
      id: `t-${Date.now()}`,
      fullName: name,
      title: 'Matematik Öğretmeni',
      school: school || 'Millî Eğitim Bakanlığı Ortaokulu',
      email: email,
      avatarSeed: name.slice(0, 2).toUpperCase(),
    };
    onLogin(user);
  };

  const handleSelectPreset = (teacher: TeacherUser) => {
    onLogin(teacher);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden bg-math-grid">
      {/* Decorative background aura */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="w-full max-w-xl bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden relative z-10">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shadow-inner">
                <GraduationCap className="w-7 h-7 text-indigo-100" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-indigo-200 block">
                  Türkiye Yüzyılı Maarif Modeli
                </span>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Matematik Soru Mimarı
                </h1>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-100 border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              Yetkili Öğretmen Portalı
            </span>
          </div>
          <p className="text-indigo-100/90 text-sm leading-relaxed">
            K-12 ortaokul matematik zümre öğretmenleri için özel olarak tasarlanmış yapay zeka destekli çalışma yaprağı ve soru üretim atölyesi.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          <div className="mb-6 p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-start gap-3">
            <Lock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-900 leading-relaxed">
              <strong className="font-semibold block text-indigo-950 mb-0.5">Güvenli Giriş Sistemi:</strong>
              Bu platform Millî Eğitim Bakanlığı TYMM müfredatı kapsamındaki ortaokul matematik öğretmenlerimizin kullanımına tahsis edilmiştir. Hızlıca başlamak için aşağıdaki kayıtlı öğretmen profillerinden birini seçebilir veya MEBBİS bilgilerinizle giriş yapabilirsiniz.
            </div>
          </div>

          {!isCustomMode ? (
            <div className="space-y-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Hızlı Giriş: Yetkili Öğretmen Seçiniz
              </label>

              <div className="grid gap-3">
                {PRESET_TEACHERS.map((teacher) => (
                  <button
                    key={teacher.id}
                    onClick={() => handleSelectPreset(teacher)}
                    className="group w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-bold flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform">
                        {teacher.avatarSeed}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-indigo-700 flex items-center gap-2">
                          {teacher.fullName}
                          <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            {teacher.title}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{teacher.school}</span>
                          <span>•</span>
                          <span className="text-slate-400">{teacher.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(true)}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors"
                >
                  <UserCheck className="w-4 h-4" />
                  Kendi MEBBİS / E-Posta Bilgilerimle Giriş Yap
                </button>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> TYMM 2026 Müfredatı
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Öğretmen Adı & Soyadı
                </label>
                <input
                  type="text"
                  placeholder="Örn: İhsan Tahiroğlu"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Okul Adı
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Atatürk Ortaokulu"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    MEBBİS E-Posta / Sicil No
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ihsan@meb.k12.tr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Güvenli Şifre
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
                >
                  ← Kayıtlı Öğretmen Listesine Dön
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  Atölyeye Giriş Yap
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            TYMM K-12 Matematik Müfredatı Aktif
          </div>
          <div>M.E.B. 2026 Uyumlu</div>
        </div>
      </div>
    </div>
  );
};
