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
    const { action, question, gradeLevel = "8", kazanim = "" } = body;

    if (!question || !action) {
      return NextResponse.json(
        { success: false, error: "Eksik parametreler." },
        { status: 400 }
      );
    }

    let prompt = "";
    let systemInstruction = `
Sen Türkiye Yüzyılı Maarif Modeli (TYMM) K-12 ortaokul matematik uzmanısın.
Öğretmene ("Hocam" / "Değerli Öğretmenim") hitap eden, hatasız matematiksel LaTeX formatı kullanan bir uzmansın.
Tüm formülleri satır içi '$...$' veya blok '$$...$$' LaTeX ile yaz.
Sadece JSON çıktısı ver.
`;

    if (action === "hint_cards") {
      prompt = `
Aşağıdaki soru için 3 aşamalı öğrenci ipucu kartları oluştur:
Soru: ${question.text}
Çözüm: ${question.solution || ""}

Kurallar:
1. Kavramsal İpucu: Sorunun hangi temel matematiksel kavramla/tanımla ilgili olduğunu hatırlat.
2. Strateji İpucu: Soruyu çözmek için hangi yöntemin veya hangi yaklaşımın seçilmesi gerektiğini belirt.
3. İlk İşlem Adımı: Öğrencinin kalemi kağıda ilk vurduğunda yapacağı ilk işlemi veya eşitliği göster (ancak cevabın tamamını verme).

JSON Çıktı Formatı:
{
  "conceptual": "1. Kavramsal İpucu metni...",
  "strategy": "2. Strateji İpucu metni...",
  "firstStep": "3. İlk İşlem Adımı metni..."
}
`;
    } else if (action === "stem_scenario") {
      prompt = `
Aşağıdaki standart matematik sorusunu, Türkiye Yüzyılı Maarif Modeli vizyonuna uygun, mühendislik, algoritma, uzay, yenilenebilir enerji veya modern günlük yaşam içeren "STEM / Gerçek Hayat Yeni Nesil Senaryosuna" dönüştür.
Orijinal Soru: ${question.text}
Kazanım: ${kazanim}
Sınıf Seviyesi: ${gradeLevel}. Sınıf
Çözüm: ${question.solution}

Dönüştürme Kuralları:
- Matematiksel yapıyı, sayıları veya orantıları koru ancak gerçekçi ve ilgi çekici bir hikaye/senaryo ekle (Örn: Mars keşif aracı güneş panelleri, akıllı sera sulama döngüsü, elektrikli tren ray planlaması vb.).
- Türkçe isimler veya bilimsel bağlamlar kullan.
- Tüm matematik ifadeleri için LaTeX ('$x^2$') kullan.
- Şıklar (eğer çoktan seçmeli ise) güncellenmiş senaryoya uyumlu olsun.

JSON Çıktı Formatı:
{
  "scenarioTitle": "STEM Senaryosu Başlığı",
  "text": "Yeni nesil zenginleştirilmiş soru metni (LaTeX ile)...",
  "options": [
    {"key": "A", "text": "$...$"},
    {"key": "B", "text": "$...$"},
    {"key": "C", "text": "$...$"},
    {"key": "D", "text": "$...$"}
  ],
  "correctAnswer": "${question.correctAnswer || "A"}",
  "solution": "Yeni soruya göre adım adım güncellenmiş çözüm..."
}
`;
    } else if (action === "visual_guide") {
      prompt = `
Aşağıdaki soru için görsel/grafik yönergeleri hazırla:
Soru: ${question.text}

Gereksinimler:
1. Gemini Görsel Üretim İstemi (Prompt): Soru için temiz, yalın, ders kitabı tarzında illüstrasyon üretmek üzere detaylı Türkçe/İngilizce görsel promptu.
2. GeoGebra / Polypad / Canva Çizim Yönergesi: Öğretmenin aracı açıp doğrudan çizebilmesi için eksiksiz ölçü, koordinat, açı derecesi, nokta isimlendirmeleri (A, B, C...) ve çizim adımları.
3. SVG Şablonu: Soru kağıdında önizleme olarak hemen gösterilebilecek temiz, responsive bir SVG kodu (width="320" height="200" viewBox="0 0 320 200" koordinatlarında, düzgün çizilmiş üçgen, daire, dikdörtgen, sayı doğrusu, koordinat sistemi veya şematik model).

JSON Çıktı Formatı:
{
  "geminiPrompt": "Minimalist educational textbook vector illustration of...",
  "geometryInstructions": "Öğretmen İçin Çizim Rehberi:\\n1. GeoGebra'da A(0,0), B(6,0), C(0,8) noktalarını oluşturun...\\n2. ...",
  "svgPreview": "<svg width='320' height='200' viewBox='0 0 320 200' xmlns='http://www.w3.org/2000/svg'>...</svg>"
}
`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const text = response.text || "{}";
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
      parsedData = JSON.parse(cleaned);
    }

    return NextResponse.json({
      success: true,
      action,
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Error enhancing question:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Zenginleştirme işlemi sırasında hata oluştu.",
      },
      { status: 500 }
    );
  }
}
