export interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  date: string
}

export const blogs: BlogPost[] = [
  {
    id: 'avantajlar',
    title: 'Üniversite Kulüplerine Katılmanın 7 Avantajı',
    description: 'Üniversite hayatınızı zenginleştirmek için kulüplerin önemi, sosyal çevre, networking ve daha fazlası.',
    content: `Üniversite kulüplerine katılmak, sosyal çevrenizi genişletmek ve yeni beceriler kazanmak için harika bir fırsattır. 
- Sosyal çevre oluşturma
- Networking
- Yeni beceriler
- Eğlenceli etkinlikler
- Kariyer fırsatları
- Liderlik deneyimi
- Akademik destek`,
    date: '2026-03-25',
  },
  {
    id: 'populer-kulupler',
    title: '2026’da Katılabileceğin En Popüler Üniversite Kulüpleri',
    description: 'Popüler kulüpler, örnek DS Developer, ES E-Spor ve MÜ Müzik & Sahne Kulübü hakkında bilgiler.',
    content: `2026 yılında katılabileceğiniz en popüler kulüpler:
1. DS Developer Öğrenci Topluluğu
2. ES E-Spor Topluluğu
3. MÜ Müzik & Sahne Sanatları
Bu kulüpler hem sosyal hem de akademik açıdan zengin etkinlikler sunuyor.`,
    date: '2026-03-25',
  },
  {
    id: 'etkinlikler',
    title: 'Kampüs Etkinlikleri ile Üniversite Hayatını Renklendir',
    description: 'Kampüs etkinlikleri ile networking, eğlence ve deneyim kazanmanın yolları.',
    content: `Kampüs etkinlikleri sayesinde:
- Yeni arkadaşlar edinirsiniz
- Networking yapabilirsiniz
- Yeni deneyimler kazanırsınız
- Eğlenceli vakit geçirirsiniz`,
    date: '2026-03-25',
  },
]