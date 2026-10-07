export type GradeLevel = "5" | "6" | "7" | "8";
export type DifficultyLevel = "Temel" | "Orta" | "İleri / Beceri Temelli (LGS)";
export type QuestionType = "Çoktan Seçmeli (4 Şık)" | "Açık Uçlu / Klasik" | "Doğru - Yanlış" | "Eşleştirmeli";

export interface QuestionOption {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export interface StudentHintCards {
  conceptual: string; // 1. Kavramsal İpucu
  strategy: string;   // 2. Strateji İpucu
  firstStep: string;  // 3. İlk İşlem Adımı
}

export interface VisualGuide {
  geminiPrompt: string; // Detaylı görsel istemi (Prompt)
  geometryInstructions: string; // GeoGebra, Polypad veya Canva çizim ölçü/koordinat yönergeleri
  svgPreview?: string; // Optional SVG code if visual is auto-illustrated
}

export interface QuestionItem {
  id: string;
  number: number;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  correctAnswer: string;
  solution: string;
  kazanimCode?: string;
  difficulty?: DifficultyLevel;
  hints?: StudentHintCards;
  stemScenario?: string;
  visualGuide?: VisualGuide;
}

export interface TeacherUser {
  id: string;
  fullName: string;
  title: string;
  school: string;
  email: string;
  avatarSeed?: string;
}

export interface WorksheetConfig {
  title: string;
  schoolName: string;
  teacherName: string;
  grade: GradeLevel;
  subject: string;
  unitTitle: string;
  kazanimCode?: string;
  date: string;
  durationMinutes: number;
  layout: "single" | "double"; // Tek veya Çift Sütun
  showSolutions: boolean;      // A4'te veya baskıda çözümleri göster/gizle
  showAnswerKeyTable: boolean; // Sayfa altı optik cevap anahtarı kutucuğu
}
