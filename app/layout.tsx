import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Matematik Soru Mimarı | TYMM Uyumlu K-12 Öğretmen Platformu',
  description: 'Türkiye Yüzyılı Maarif Modeli (TYMM) uyumlu, LaTeX destekli ve eşzamanlı A4 önizlemeli ortaokul matematik çalışma yaprağı hazırlama platformu.',
  openGraph: {
    title: 'Matematik Soru Mimarı | TYMM Uyumlu K-12 Öğretmen Platformu',
    description: 'Türkiye Yüzyılı Maarif Modeli (TYMM) uyumlu, LaTeX destekli ve eşzamanlı A4 önizlemeli ortaokul matematik çalışma yaprağı hazırlama platformu.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matematik Soru Mimarı | TYMM Uyumlu K-12 Öğretmen Platformu',
    description: 'Türkiye Yüzyılı Maarif Modeli (TYMM) uyumlu, LaTeX destekli ve eşzamanlı A4 önizlemeli ortaokul matematik çalışma yaprağı hazırlama platformu.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="tr">
      <body suppressHydrationWarning className="antialiased font-sans text-slate-800 bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
