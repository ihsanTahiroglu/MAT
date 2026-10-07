import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      gradeLevel = "8",
      kazanimCode = "M.8.1.1.2",
      kazanimTitle = "EBOB ve EKOK Problemleri",
      kazanimDesc = "İki doğal sayının en büyük ortak bölenini ve en küçük ortak katını hesaplar, gerçek yaşam problemlerini çözer.",
      difficulty = "Orta",
      questionType = "Çoktan Seçmeli (4 Şık)",
      questionCount = 3,
      customPrompt = "",
      teacherNotes = "",
    } = body;

    const systemInstruction = `
Sen, K-12 düzeyindeki ortaokul matematik öğretmenleri için geliştirilmiş "Matematik Soru Mimarı" uzman yapay zeka asistanısın.
Görevin, Türkiye Yüzyılı Maarif Modeli (TYMM) müfredatına %100 uygun, hatasız ve pedagojik açıdan yüksek kaliteli matematik çalışma yaprakları ve soruları üretmektir.

KRİTİK KURALLAR:
1. Soru Sayısına Kesin Uyum:
Kullanıcı senden TAM OLARAK ${questionCount} adet soru istemiştir. Tamı tamına ${questionCount} adet soru üret. Eksik veya fazla üretme!

2. Müfredat Sınırları (TYMM K-12):
Hedef sınıf: ${gradeLevel}. Sınıf.
Kazanım: [${kazanimCode}] ${kazanimTitle} (${kazanimDesc}).
Kesinlikle ortaokul müfredat sınırlarında kal. Hedef sınıfın henüz görmediği üst düzey kavramları (lise trigonometrisi, karmaşık sayılar, logaritma, türev vb.) asla kullanma!
Senaryolu sorularda Türkçe isimler (Elif, Mete, Kerem, Zeynep, Defne, Can vb.) ve güncel hayat durumları (STEM, çevre, yenilenebilir enerji, bilim, tarım, teknoloji) kullan.

3. Matematiksel Doğruluk ve LaTeX Formatı:
- Bütün matematiksel sayılar, birimler, değişkenler, kesirler, üslü/köklü ifadeler ve denklemler için istisnasız LaTeX formatı kullan (Satır içi için '$x^2$', blok için '$$...$$').
  Örnek: '$12\\text{ cm}$', '$\\frac{3}{4}$', '$\\sqrt{72}$', '$2^5$', '$3x + 5 = 20$'.
- Asla işlem hatası yapma. Her sorunun çözümünü adım adım doğrula.
- Çoktan seçmeli sorularda 4 şık (A, B, C, D) ver. Çeldiricileri öğrencilerin sık yaptığı kavram veya işlem önceliği hatalarına göre kurgula. Şıkları küçükten büyüğe sırala.

4. Çıktı Formatı:
Sadece saf JSON formatında yanıt ver. JSON dışında hiçbir selamlama, kapanış veya markdown bloğu koyma.
`;

    const userPrompt = `
Parametreler:
- Sınıf Seviyesi: ${gradeLevel}. Sınıf
- Kazanım: ${kazanimCode} - ${kazanimTitle}
- Kazanım Açıklaması: ${kazanimDesc}
- Zorluk Derecesi: ${difficulty}
- Soru Türü: ${questionType}
- Soru Sayısı: ${questionCount}
${customPrompt ? `- Öğretmenin Özel İsteği: ${customPrompt}` : ""}
${teacherNotes ? `- Ek Not: ${teacherNotes}` : ""}

Lütfen TAM OLARAK ${questionCount} adet soru içeren JSON objesi döndür.
JSON Yapısı:
{
  "worksheetTitle": "${gradeLevel}. Sınıf Matematik Çalışma Yaprağı",
  "kazanim": "${kazanimCode} - ${kazanimTitle}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "number": 1,
      "text": "Soru metni (LaTeX formatında formüllerle)",
      "type": "${questionType}",
      "options": [
        {"key": "A", "text": "$...$"},
        {"key": "B", "text": "$...$"},
        {"key": "C", "text": "$...$"},
        {"key": "D", "text": "$...$"}
      ],
      "correctAnswer": "A",
      "solution": "Adım adım net çözüm adımları (LaTeX ile)",
      "hints": {
        "conceptual": "1. Kavramsal İpucu...",
        "strategy": "2. Strateji İpucu...",
        "firstStep": "3. İlk İşlem Adımı..."
      }
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.2, // low temperature for mathematical precision and stability
      },
    });

    const text = response.text || "{}";
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      // Clean up markdown blocks if present
      const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
      parsedData = JSON.parse(cleaned);
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Sorular üretilirken bir hata oluştu.",
      },
      { status: 500 }
    );
  }
}
