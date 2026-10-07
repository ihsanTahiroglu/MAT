import { QuestionItem, WorksheetConfig, TeacherUser } from './types';

export const DEFAULT_TEACHER: TeacherUser = {
  id: "t-1",
  fullName: "İhsan Tahiroğlu",
  title: "Matematik Zümre Başkanı",
  school: "Cumhuriyet Ortaokulu",
  email: "ihsantahiroglu6@gmail.com",
  avatarSeed: "İT",
};

export const INITIAL_WORKSHEET_CONFIG: WorksheetConfig = {
  title: "8. Sınıf Matematik 1. Dönem Kazanım Değerlendirme Sınavı",
  schoolName: "Cumhuriyet Ortaokulu",
  teacherName: "İhsan Tahiroğlu (Matematik Zümre Başkanı)",
  grade: "8",
  subject: "Matematik",
  unitTitle: "Çarpanlar ve Katlar & Üslü İfadeler",
  kazanimCode: "M.8.1.1.2",
  date: "2026-10-07",
  durationMinutes: 40,
  layout: "double",
  showSolutions: false,
  showAnswerKeyTable: true,
};

export const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: "q-sample-1",
    number: 1,
    type: "Çoktan Seçmeli (4 Şık)",
    text: "Mete, kenar uzunlukları $120\\text{ cm}$ ve $150\\text{ cm}$ olan dikdörtgen biçimindeki bir panoyu, hiç boşluk kalmayacak ve taşmayacak şekilde eş büyüklükte kare biçimindeki renkli kağıtlarla kaplayacaktır.\n\nBuna göre Mete'nin kullanacağı **en az** kare kağıt sayısı kaçtır?",
    options: [
      { key: "A", text: "$15$" },
      { key: "B", text: "$20$" },
      { key: "C", text: "$25$" },
      { key: "D", text: "$30$" },
    ],
    correctAnswer: "B",
    solution: "1. En az sayıda kare kağıt kullanmak için karenin kenar uzunluğu panonun kenarlarının en büyük ortak böleni (EBOB) olmalıdır.\n$$\\text{EBOB}(120, 150) = 30\\text{ cm}$$\n2. Bir kenarı $30\\text{ cm}$ olan karenin alanı: $30 \\times 30 = 900\\text{ cm}^2$.\n3. Panonun alanı: $120 \\times 150 = 18000\\text{ cm}^2$.\n4. Gerekli kare sayısı: $\\frac{18000}{900} = 20$ adettir. (Doğru Yanıt: B)",
    kazanimCode: "M.8.1.1.2",
    difficulty: "Orta",
    hints: {
      conceptual: "Bir bütünü eşit büyüklükte en büyük parçalara ayırma durumlarında EBOB (En Büyük Ortak Bölen) kullanılır.",
      strategy: "Önce panonun boyutları olan 120 ve 150'nin EBOB'unu bularak bir karenin kenarını hesapla, ardından toplam alanı bir karenin alanına böl.",
      firstStep: "120 ve 150 sayılarının asal çarpanlar algoritmasıyla EBOB'unu hesapla: $120 = 2^3 \\cdot 3 \\cdot 5$, $150 = 2 \\cdot 3 \\cdot 5^2$ olduğundan $\\text{EBOB} = 2 \\cdot 3 \\cdot 5 = 30$."
    },
    stemScenario: "TÜBİTAK Bilim Fuarı için güneş enerjisi prototipi tasarlayan Mete, $120\\text{ cm} \\times 150\\text{ cm}$ boyutlarındaki panel gövdesini eş kare fotovoltaik hücrelerle minimum kayıpla kaplayacaktır.",
  },
  {
    id: "q-sample-2",
    number: 2,
    type: "Çoktan Seçmeli (4 Şık)",
    text: "Elif, laboratuvarda çoğalma hızını incelediği bir bakteri türünün her $20$ dakikada bir $2$ katına çıktığını gözlemlemiştir.\n\nBaşlangıçta deney tüpünde $4^3$ adet bakteri bulunduğuna göre, $2$ saatin sonunda tüpteki toplam bakteri sayısı aşağıdakilerden hangisidir?",
    options: [
      { key: "A", text: "$2^9$" },
      { key: "B", text: "$2^{11}$" },
      { key: "C", text: "$2^{12}$" },
      { key: "D", text: "$2^{14}$" },
    ],
    correctAnswer: "C",
    solution: "1. Başlangıçtaki bakteri sayısı: $4^3 = (2^2)^3 = 2^6$ adettir.\n2. Süre: $2\\text{ saat} = 120\\text{ dakika}$.\n3. Her $20$ dakikada bir ikiye katlandığından bölünme sayısı: $\\frac{120}{20} = 6$ kez.\n4. $6$ kez $2$ ile çarpılacaktır: $2^6 \\times 2^6 = 2^{6+6} = 2^{12}$ bakteri bulunur. (Doğru Yanıt: C)",
    kazanimCode: "M.8.1.2.2",
    difficulty: "Orta",
    hints: {
      conceptual: "Üssün üssü kuralı: $(a^m)^n = a^{m \\cdot n}$ ve tabanları aynı üslü sayılarda çarpma kuralı: $a^m \\cdot a^n = a^{m+n}$.",
      strategy: "Önce başlangıçtaki bakteri sayısını $2$'nin kuvveti olarak yaz, ardından toplam sürede kaç kez ikiye katlandığını tespit et.",
      firstStep: "Başlangıç miktarı $4^3 = 2^6$'dır. $2$ saatte kaç tane $20$ dakika olduğunu bul: $120 / 20 = 6$ defa ikiye katlanacak."
    }
  },
  {
    id: "q-sample-3",
    number: 3,
    type: "Çoktan Seçmeli (4 Şık)",
    text: "Kerem, alanı $108\\text{ cm}^2$ olan kare biçimindeki bir kartonun kenarlarından birinin uzunluğunu cetvelle ölçecektir.\n\nBuna göre kartonun bir kenar uzunluğu hangi ardışık iki tam sayı arasındadır?",
    options: [
      { key: "A", text: "$9\\text{ ile }10$" },
      { key: "B", text: "$10\\text{ ile }11$" },
      { key: "C", text: "$11\\text{ ile }12$" },
      { key: "D", text: "$12\\text{ ile }13$" },
    ],
    correctAnswer: "B",
    solution: "1. Alanı $108\\text{ cm}^2$ olan karenin bir kenar uzunluğu $\\sqrt{108}\\text{ cm}$'dir.\n2. $108$ sayısına en yakın tam kare sayılar $100$ ($10^2$) ve $121$ ($11^2$)'dir.\n3. $100 < 108 < 121$ olduğundan:\n$$\\sqrt{100} < \\sqrt{108} < \\sqrt{121}$$\n$$10 < \\sqrt{108} < 11$$\nKartonun kenar uzunluğu $10$ ile $11$ tam sayıları arasındadır. (Doğru Yanıt: B)",
    kazanimCode: "M.8.1.3.2",
    difficulty: "Temel",
    hints: {
      conceptual: "Karesi bilinen bir karenin bir kenarı karekök alma işlemi ile bulunur.",
      strategy: "108 sayısından hemen küçük ve hemen büyük tam kare sayıları belirle.",
      firstStep: "$10^2 = 100$ ve $11^2 = 121$ olduğunu yazıp 108'i bu iki sayının arasına yerleştir."
    }
  }
];
