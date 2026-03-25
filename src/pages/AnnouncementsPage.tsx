import { Helmet } from "react-helmet-async"

const ANNOUNCEMENTS = [
  { id: 1, month: 'MAR', day: '14', title: 'Platform Bakım Penceresi', description: 'Bildirimler ve etkinlik sistemi yükseltmesi için Cuma 22:00–23:00 arası kısa bir kesinti yaşanacak.', tag: 'Bakım', tagGradient: 'from-amber-500 to-orange-500', icon: '🔧', timeAgo: '2 sa önce' },
  { id: 2, month: 'MAR', day: '18', title: 'Yeni Analitik Paneli Geliyor', description: 'Kulüp yöneticileri üye büyümesini, etkinlik katılım oranını ve post etkileşimini tek ekranda görebilecek.', tag: 'Yeni Özellik', tagGradient: 'from-violet-500 to-purple-600', icon: '📊', timeAgo: '1 gün önce' },
  { id: 3, month: 'MAR', day: '10', title: 'Bahar Dönemi Kayıt Süreci Başlıyor', description: 'Kulüp yöneticileri 10 Mart itibariyle yeni dönem üye kayıt formlarını sisteme yükleyebilir.', tag: 'Duyuru', tagGradient: 'from-sky-500 to-cyan-500', icon: '🌸', timeAgo: '3 gün önce' },
  { id: 4, month: 'NİS', day: '01', title: 'Mobil Uygulama Beta Testi', description: 'iOS ve Android için UniClub uygulaması beta aşamasına geçti. Erken erişim için kayıt formunu doldur.', tag: 'Yakında', tagGradient: 'from-indigo-500 to-blue-600', icon: '📱', timeAgo: '5 gün önce' },
  { id: 5, month: 'ŞUB', day: '25', title: 'API v2 Geçişi Tamamlandı', description: 'Arka uç performans iyileştirmeleri tamamlandı. Sayfa yükleme hızı %40 artırıldı.', tag: 'Teknik', tagGradient: 'from-slate-400 to-zinc-500', icon: '⚡', timeAgo: '2 hafta önce' },
]

const CATEGORIES = [
  { label: 'Tümü', count: 5 }, { label: 'Yeni Özellik', count: 1 }, { label: 'Duyuru', count: 1 }, { label: 'Bakım', count: 1 }, { label: 'Yakında', count: 1 },
]

export const AnnouncementsPage = () => (

    <>

    <Helmet>
  <title> Üniversite Kulübü</title>
  <meta
    name="description"
    content= "kulübünü keşfet. Etkinlikler, üyeler ve detaylar UniClub'da."
  />
</Helmet>

  <div style={{ minHeight: '100vh', background: 'var(--bg)', transition: 'background 0.3s' }}>
    {/* Header */}
    <div className="border-b py-14" style={{ borderColor: 'var(--bc)', background: 'linear-gradient(to bottom, rgba(124,92,252,0.04), transparent)' }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
        <span className="badge-pro mb-4 inline-flex">📣 {ANNOUNCEMENTS.length} duyuru</span>
        <h1 className="text-3xl font-black text-slate-100">Duyurular</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text2)' }}>UniClub ekibinden güncel haberler ve önemli tarihler.</p>
      </div>
    </div>

    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[23px] top-0 bottom-0 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, rgba(124,92,252,0.5), rgba(124,92,252,0.05) 80%, transparent)' }} />
          <div className="space-y-2">
            {ANNOUNCEMENTS.map(item => (
              <div key={item.id} className="group flex gap-4 items-start sm:gap-6">
                <div className="hidden sm:flex relative z-10 shrink-0">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.tagGradient} text-xl shadow-lg`}>{item.icon}</div>
                </div>
                <div className="card-dark flex-1 p-5 mb-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="sm:hidden flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base"
                        style={{ background: `linear-gradient(135deg, rgba(124,92,252,0.3), rgba(91,78,217,0.3))` }}>{item.icon}</div>
                      <div>
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white bg-gradient-to-r ${item.tagGradient}`}>{item.tag}</span>
                        <h2 className="mt-1.5 text-sm font-bold text-slate-100 group-hover:text-white transition-colors">{item.title}</h2>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--text3)' }}>{item.month} {item.day}</span>
                      <br /><span className="text-[10px]" style={{ color: 'var(--text4)' }}>{item.timeAgo}</span>
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{item.description}</p>
                  <button aria-label="devamını oku" type="button" className="mt-3 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">Devamını oku →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card-dark p-5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text3)' }}>Kategoriler</h3>
            <ul className="space-y-1">
              {CATEGORIES.map(cat => (
                <li key={cat.label}>
                  <button type="button" className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all hover:bg-white/5"
                    style={{ color: 'var(--text2)' }}>
                    <span>{cat.label}</span>
                    <span className="text-xs font-semibold" style={{ color: 'var(--text3)' }}>{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-dark p-5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text3)' }}>Bildirim Al</h3>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text2)' }}>Yeni duyurulardan anında haberdar ol.</p>
            <input type="email" placeholder="E-posta adresin" className="input-pro mb-2" />
            <button aria-label="abone ol" type="button" className="btn-primary w-full py-2 text-xs justify-center">Abone Ol</button>
          </div>
          <div className="card-dark p-5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text3)' }}>Durum</h3>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 8px rgba(52,211,153,0.8)' }} />
              <span className="text-xs" style={{ color: 'var(--text2)' }}>Tüm sistemler çalışıyor</span>
            </div>
            <div className="mt-3 space-y-2">
              {['API', 'Bildirimler', 'Etkinlikler'].map(s => (
                <div key={s} className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--text3)' }}>{s}</span>
                  <span className="text-emerald-400 font-semibold">Aktif</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
)
