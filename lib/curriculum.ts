export interface Kazanim {
  code: string;
  title: string;
  description: string;
}

export interface Unit {
  id: string;
  title: string;
  grade: number | string;
  kazanimlar: Kazanim[];
}

export const CURRICULUM_DATA: Record<string, { gradeName: string; units: Unit[] }> = {
  "5": {
    gradeName: "5. Sınıf",
    units: [
      {
        id: "5-1",
        title: "Doğal Sayılar ve Doğal Sayılarla İşlemler",
        grade: 5,
        kazanimlar: [
          {
            code: "M.5.1.1.1",
            title: "Milyonlu Doğal Sayıları Okuma ve Yazma",
            description: "En çok dokuz basamaklı doğal sayıları okur, yazar ve basamak değerlerini belirler.",
          },
          {
            code: "M.5.1.1.2",
            title: "Sayı Örüntüleri",
            description: "Kuralı verilen sayı ve şekil örüntülerinin istenen adımlarını bulur.",
          },
          {
            code: "M.5.1.2.1",
            title: "Dört İşlem Problemleri",
            description: "Doğal sayılarla toplama, çıkarma, çarpma ve bölme işlemlerini içeren problemleri çözer ve kurar.",
          },
          {
            code: "M.5.1.2.2",
            title: "Zihinden İşlem ve Tahmin",
            description: "Doğal sayılarla yapılan işlemlerin sonucunu tahmin eder ve zihinden işlemler yapar.",
          },
        ],
      },
      {
        id: "5-2",
        title: "Kesirler ve Kesirlerle İşlemler",
        grade: 5,
        kazanimlar: [
          {
            code: "M.5.1.3.1",
            title: "Birim Kesirler ve Sayı Doğrusu",
            description: "Birim kesirleri sıralar ve sayı doğrusunda gösterir.",
          },
          {
            code: "M.5.1.3.2",
            title: "Tam Sayılı ve Bileşik Kesir Dönüşümü",
            description: "Tam sayılı kesrin bir doğal sayı ile bir basit kesrin toplamı olduğunu kavrar ve bileşik kesre dönüştürür.",
          },
          {
            code: "M.5.1.3.3",
            title: "Kesirlerle Toplama ve Çıkarma",
            description: "Paydaları eşit veya birinin paydası diğerinin paydasının katı olan kesirlerle toplama ve çıkarma yapar.",
          },
        ],
      },
      {
        id: "5-3",
        title: "Ondalık Gösterim ve Yüzdeler",
        grade: 5,
        kazanimlar: [
          {
            code: "M.5.1.4.1",
            title: "Ondalık Gösterim Kavramı",
            description: "Paydası 10, 100 veya 1000 olan kesirleri ondalık gösterimle ifade eder.",
          },
          {
            code: "M.5.1.5.1",
            title: "Yüzde Sembolü ve Karşılaştırma",
            description: "Paydası 100 olan kesirleri yüzde sembolü (%) ile gösterir, kesir ve ondalık gösterimle ilişkilendirir.",
          },
        ],
      },
      {
        id: "5-4",
        title: "Temel Geometri ve Uzunluk Ölçme",
        grade: 5,
        kazanimlar: [
          {
            code: "M.5.2.1.1",
            title: "Nokta, Doğru, Doğru Parçası ve Işın",
            description: "Doğru, doğru parçası ve ışını açıklar ve sembolle gösterir.",
          },
          {
            code: "M.5.2.2.1",
            title: "Üçgen ve Dörtgen Çeşitleri",
            description: "Üçgenleri açılarına ve kenarlarına göre sınıflandırır; dikdörtgen, paralelkenar ve eşkenar dörtgeni tanır.",
          },
          {
            code: "M.5.2.2.2",
            title: "İç Açılar Toplamı",
            description: "Üçgenin iç açılarının ölçüleri toplamının 180°, dörtgenin iç açılarının ölçüleri toplamının 360° olduğunu belirler.",
          },
        ],
      },
    ],
  },
  "6": {
    gradeName: "6. Sınıf",
    units: [
      {
        id: "6-1",
        title: "Doğal Sayılarla İşlemler, Çarpanlar ve Katlar",
        grade: 6,
        kazanimlar: [
          {
            code: "M.6.1.1.1",
            title: "Üslü İfadeler",
            description: "Bir doğal sayının kendisiyle tekrarlı çarpımını üslü ifade olarak yazar ve değerini hesaplar.",
          },
          {
            code: "M.6.1.1.2",
            title: "İşlem Önceliği",
            description: "İşlem önceliğini dikkate alarak doğal sayılarla dört işlem yapar.",
          },
          {
            code: "M.6.1.2.1",
            title: "Çarpanlar ve Katlar",
            description: "Doğal sayıların çarpanlarını ve katlarını belirler.",
          },
          {
            code: "M.6.1.2.2",
            title: "Bölünebilme Kuralları",
            description: "2, 3, 4, 5, 6, 9 ve 10'a kalansız bölünebilme kurallarını açıklar ve kullanır.",
          },
          {
            code: "M.6.1.2.3",
            title: "Asal Sayılar ve Asal Çarpanlar",
            description: "Asal sayıları özellikleriyle belirler, doğal sayıları asal çarpanlarına ayırır.",
          },
        ],
      },
      {
        id: "6-2",
        title: "Tam Sayılar ve Kesirlerle İşlemler",
        grade: 6,
        kazanimlar: [
          {
            code: "M.6.1.4.1",
            title: "Tam Sayılar ve Sayı Doğrusu",
            description: "Tam sayıları tanır ve sayı doğrusunda gösterir.",
          },
          {
            code: "M.6.1.4.2",
            title: "Mutlak Değer",
            description: "Tam sayıların mutlak değerini kavrar ve karşılaştırma yapar.",
          },
          {
            code: "M.6.1.5.1",
            title: "Kesirlerle Çarpma ve Bölme",
            description: "Kesirlerle çarpma ve bölme işlemlerini yapar, anlamlandırır.",
          },
        ],
      },
      {
        id: "6-3",
        title: "Cebirsel İfadeler ve Oran",
        grade: 6,
        kazanimlar: [
          {
            code: "M.6.2.1.1",
            title: "Cebirsel İfade Yazma",
            description: "Sözel olarak verilen bir duruma uygun cebirsel ifade ve cebirsel ifadeye uygun sözel durum yazar.",
          },
          {
            code: "M.6.1.7.1",
            title: "Oran Kavramı ve Birimli/Birimli Oran",
            description: "İki çokluğun birbirine oranını belirler, birimli ve birimsiz oranları ayırt eder.",
          },
        ],
      },
      {
        id: "6-4",
        title: "Açılar ve Alan Ölçme",
        grade: 6,
        kazanimlar: [
          {
            code: "M.6.3.1.1",
            title: "Komşu, Tümler, Bütünler ve Ters Açılar",
            description: "Komşu, tümler, bütünler ve ters açıların özelliklerini belirler; ilgili problemleri çözer.",
          },
          {
            code: "M.6.3.2.1",
            title: "Üçgende Alan",
            description: "Üçgenin alan bağıntısını oluşturur, ilgili problemleri çözer.",
          },
          {
            code: "M.6.3.2.2",
            title: "Paralelkenarda Alan",
            description: "Paralelkenarın alan bağıntısını oluşturur, ilgili problemleri çözer.",
          },
        ],
      },
    ],
  },
  "7": {
    gradeName: "7. Sınıf",
    units: [
      {
        id: "7-1",
        title: "Tam Sayılarla İşlemler",
        grade: 7,
        kazanimlar: [
          {
            code: "M.7.1.1.1",
            title: "Tam Sayılarla Toplama ve Çıkarma",
            description: "Tam sayılarla toplama ve çıkarma işlemlerini yapar, ilgili problemleri çözer.",
          },
          {
            code: "M.7.1.1.2",
            title: "Tam Sayılarla Çarpma ve Bölme",
            description: "Tam sayılarla çarpma ve bölme işlemlerini yapar.",
          },
          {
            code: "M.7.1.1.3",
            title: "Tam Sayıların Kendisiyle Çarpımları (Kuvvetleri)",
            description: "Tam sayıların tam sayı kuvvetlerini hesaplar.",
          },
        ],
      },
      {
        id: "7-2",
        title: "Rasyonel Sayılar ve İşlemler",
        grade: 7,
        kazanimlar: [
          {
            code: "M.7.1.2.1",
            title: "Rasyonel Sayılar ve Sayı Doğrusu",
            description: "Rasyonel sayıları tanır ve sayı doğrusunda gösterir, ondalık açılımlarını belirler.",
          },
          {
            code: "M.7.1.3.1",
            title: "Rasyonel Sayılarla Dört İşlem",
            description: "Rasyonel sayılarla toplama, çıkarma, çarpma ve bölme işlemlerini yapar ve çok adımlı işlemleri çözer.",
          },
        ],
      },
      {
        id: "7-3",
        title: "Cebirsel İfadeler ve Eşitlik / Denklemler",
        grade: 7,
        kazanimlar: [
          {
            code: "M.7.2.1.1",
            title: "Cebirsel İfadelerle İşlemler",
            description: "Cebirsel ifadelerle toplama ve çıkarma işlemleri yapar, bir doğal sayı ile cebirsel ifadeyi çarpar.",
          },
          {
            code: "M.7.2.2.1",
            title: "Birinci Dereceden Bir Bilinmeyenli Denklemler",
            description: "Birinci dereceden bir bilinmeyenli denklemleri kurar ve çözer.",
          },
          {
            code: "M.7.2.2.2",
            title: "Denklem Kurma Problemleri",
            description: "Birinci dereceden bir bilinmeyenli denklem kurmayı gerektiren gerçek hayat problemlerini çözer.",
          },
        ],
      },
      {
        id: "7-4",
        title: "Oran-Orantı ve Yüzdeler",
        grade: 7,
        kazanimlar: [
          {
            code: "M.7.1.4.1",
            title: "Doğru ve Ters Orantı",
            description: "Orantıda verilmeyen terimi bulur; doğru ve ters orantılı çoklukları belirler.",
          },
          {
            code: "M.7.1.5.1",
            title: "Yüzde Problemleri (Kâr, Zarar, İndirim)",
            description: "Bir çokluğun belirtilen bir yüzdesini ve yüzdesi verilen çokluğu bulur; kâr, zarar ve indirim problemlerini çözer.",
          },
        ],
      },
      {
        id: "7-5",
        title: "Doğrular, Açılar ve Çokgenler",
        grade: 7,
        kazanimlar: [
          {
            code: "M.7.3.1.1",
            title: "Paralel İki Doğrunun Bir Kesenle Yaptığı Açılar",
            description: "Yöndeş, iç ters, dış ters ve karşı durumlu açıları belirler, problem çözer.",
          },
          {
            code: "M.7.3.2.1",
            title: "Düzgün Çokgenler ve Açı Bağıntıları",
            description: "Düzgün çokgenlerin iç ve dış açılarının ölçülerini hesaplar.",
          },
          {
            code: "M.7.3.3.1",
            title: "Çemberde Yay ve Daire Diliminin Alanı",
            description: "Merkez açıyı ve gördüğü yayı kavrar; dairenin ve daire diliminin alanını hesaplar.",
          },
        ],
      },
    ],
  },
  "8": {
    gradeName: "8. Sınıf & LGS",
    units: [
      {
        id: "8-1",
        title: "Çarpanlar ve Katlar (EBOB - EKOK)",
        grade: 8,
        kazanimlar: [
          {
            code: "M.8.1.1.1",
            title: "Pozitif Tam Sayıların Çarpanları ve Asal Çarpanlar",
            description: "Verilen pozitif tam sayıların pozitif tam sayı çarpanlarını bulur, asal çarpanlarını üslü biçimde yazar.",
          },
          {
            code: "M.8.1.1.2",
            title: "EBOB ve EKOK Problemleri (LGS Yeni Nesil)",
            description: "İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili gerçek yaşam problemlerini çözer.",
          },
          {
            code: "M.8.1.1.3",
            title: "Aralarında Asal Sayılar",
            description: "Verilen iki doğal sayının aralarında asal olup olmadığını belirler.",
          },
        ],
      },
      {
        id: "8-2",
        title: "Üslü İfadeler",
        grade: 8,
        kazanimlar: [
          {
            code: "M.8.1.2.1",
            title: "Tam Sayıların Tam Sayı Kuvvetleri",
            description: "Tam sayıların negatif ve pozitif kuvvetlerini hesaplar.",
          },
          {
            code: "M.8.1.2.2",
            title: "Üslü İfadelerle Temel İşlemler",
            description: "Üslü ifadelerle çarpma ve bölme işlemlerini yapar, üssün üssünü alır.",
          },
          {
            code: "M.8.1.2.3",
            title: "Bilimsel Gösterim ve Çok Büyük/Küçük Sayılar",
            description: "Sayıların ondalık gösterimlerini 10'un tam sayı kuvvetleriyle çözümler; bilimsel gösterimi kavrar ve kullanır.",
          },
        ],
      },
      {
        id: "8-3",
        title: "Kareköklü İfadeler",
        grade: 8,
        kazanimlar: [
          {
            code: "M.8.1.3.1",
            title: "Tam Kare Sayılar ve Karekök Kavramı",
            description: "Tam kare pozitif tam sayıları tanır ve kareköklerini hesaplar.",
          },
          {
            code: "M.8.1.3.2",
            title: "Kareköklü Bir Sayının Değerini Tahmin Etme",
            description: "Tam kare olmayan kareköklü bir sayının hangi iki doğal sayı arasında olduğunu belirler.",
          },
          {
            code: "M.8.1.3.3",
            title: "a√b Biçiminde Yazma ve Katsayıyı Kök İçine Alma",
            description: "Kareköklü bir ifadeyi a√b biçiminde yazar ve katsayıyı kök içine alır.",
          },
          {
            code: "M.8.1.3.4",
            title: "Kareköklü İfadelerde Dört İşlem",
            description: "Kareköklü ifadelerde toplama, çıkarma, çarpma ve bölme işlemlerini yapar.",
          },
          {
            code: "M.8.1.3.5",
            title: "Gerçek Sayılar (İrrasyonel Sayılar)",
            description: "Rasyonel ve irrasyonel sayıları ayırt eder, gerçek sayılar kümesini oluşturur.",
          },
        ],
      },
      {
        id: "8-4",
        title: "Veri Analizi ve Olasılık",
        grade: 8,
        kazanimlar: [
          {
            code: "M.8.4.1.1",
            title: "Grafik Dönüşümleri (Daire, Sütun, Çizgi)",
            description: "En fazla üç veri grubuna ait verileri daire, sütun ve çizgi grafikleri ile gösterir ve grafikler arası dönüşümleri yorumlar.",
          },
          {
            code: "M.8.5.1.1",
            title: "Basit Olayların Olma Olasılığı",
            description: "Bir olayın olma olasılığını hesaplar, eşit/fazla/az olasılıklı durumları değerlendirir.",
          },
        ],
      },
      {
        id: "8-5",
        title: "Cebirsel İfadeler, Özdeşlikler ve Doğrusal Denklemler",
        grade: 8,
        kazanimlar: [
          {
            code: "M.8.2.1.1",
            title: "Özdeşlikler (Tam Kare ve İki Kare Farkı)",
            description: "Özdeşlikleri modellerle açıklar; iki terimin toplamının ve farkının karesi ile iki kare farkı özdeşliğini kullanır.",
          },
          {
            code: "M.8.2.1.2",
            title: "Çarpanlara Ayırma",
            description: "Cebirsel ifadeleri ortak çarpan parantezine alma ve özdeşliklerden yararlanarak çarpanlarına ayırır.",
          },
          {
            code: "M.8.2.2.1",
            title: "Koordinat Sistemi ve Doğrusal İlişkiler",
            description: "Koordinat sistemini özellikleriyle tanır ve sıralı ikilileri gösterir.",
          },
          {
            code: "M.8.2.2.2",
            title: "Eğim Kavramı ve Doğru Grafikleri",
            description: "Doğrunun eğimini modellerle açıklar, denklem ve grafikle ilişkilendirir.",
          },
          {
            code: "M.8.2.3.1",
            title: "Birinci Dereceden Bir Bilinmeyenli Eşitsizlikler",
            description: "Birinci dereceden bir bilinmeyenli eşitsizlikleri çözer ve sayı doğrusunda gösterir.",
          },
        ],
      },
      {
        id: "8-6",
        title: "Üçgenler, Eşlik-Benzerlik ve Geometrik Cisimler",
        grade: 8,
        kazanimlar: [
          {
            code: "M.8.3.1.1",
            title: "Üçgende Kenarortay, Açıortay ve Yükseklik",
            description: "Üçgenin kenarortay, açıortay ve yüksekliklerini inşa eder.",
          },
          {
            code: "M.8.3.1.2",
            title: "Üçgen Eşitsizliği ve Açı-Kenar İlişkisi",
            description: "Üçgenin iki kenar uzunluğunun toplamı veya farkı ile üçüncü kenarının ilişkisini açıklar.",
          },
          {
            code: "M.8.3.1.3",
            title: "Pisagor Bağıntısı",
            description: "Pisagor bağıntısını oluşturur ve ilgili problemleri çözer.",
          },
          {
            code: "M.8.3.2.1",
            title: "Eşlik ve Benzerlik",
            description: "Benzer çokgenlerin benzerlik oranını belirler, problem çözer.",
          },
        ],
      },
    ],
  },
};
