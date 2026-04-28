import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FeedSection } from '../sections/FeedSection'
import { Helmet } from 'react-helmet-async'

type HomePageProps = {
  onCreateClubClick: () => void
  onCreatePostClick: () => void
}

const STATS = [
  { value: '120+', label: 'Aktif Kulüp', icon: '🏛' },
  { value: '3.4K+', label: 'Öğrenci', icon: '👩‍🎓' },
  { value: '580+', label: 'Yıllık Etkinlik', icon: '📅' },
  { value: '98%', label: 'Memnuniyet', icon: '⭐' },
]

const TRENDING_CLUBS = [
  { name: 'Developer Student Community', category: 'Teknoloji', members: 186, gradient: 'from-violet-500 to-purple-600', initials: 'DS', hot: true },
  { name: 'ESports Society', category: 'Oyun', members: 142, gradient: 'from-indigo-500 to-blue-600', initials: 'ES', hot: true },
  { name: 'Müzik & Sahne Sanatları', category: 'Sanat', members: 97, gradient: 'from-pink-500 to-rose-600', initials: 'MÜ', hot: false },
  { name: 'Girişimcilik Kulübü', category: 'İş Dünyası', members: 121, gradient: 'from-amber-500 to-orange-500', initials: 'GK', hot: true },
  { name: 'Fotoğrafçılık Topluluğu', category: 'Sanat', members: 74, gradient: 'from-teal-500 to-emerald-500', initials: 'FT', hot: false },
  { name: 'Bilim & Araştırma Kulübü', category: 'Bilim', members: 58, gradient: 'from-sky-500 to-cyan-500', initials: 'BA', hot: false },
]

// Background images for hero slideshow — responsive + WebP
const HERO_PHOTO_IDS = ['1205651', '3184311', '1181304', '164745']

/** Pexels URL'i oluştur (WebP destekli) */
const pexelUrl = (id: string, w: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&fm=webp`

/** Responsive srcSet: mobil 600w, tablet 1024w, masaüstü 1340w */
const heroSrcSet = (id: string) =>
  `${pexelUrl(id, 600)} 600w, ${pexelUrl(id, 1024)} 1024w, ${pexelUrl(id, 1340)} 1340w`

/** Fallback src (masaüstü viewport'a optimize) */
const HERO_IMAGES = HERO_PHOTO_IDS.map(id => pexelUrl(id, 1340))

// ── Hero ─────────────────────────────────────────────────────────────
function Hero({ onCreateClubClick }: { onCreateClubClick: () => void }) {
  const [bgIdx, setBgIdx] = useState(0)

  // Auto-advance background images
  useEffect(() => {
    const t = setInterval(() => setBgIdx(i => (i + 1) % HERO_IMAGES.length), 5500)
    return () => clearInterval(t)
  }, [])

  return (

      <>

<Helmet>
  <title>Üniversite Kulüpleri ve Kampüs Etkinlikleri | UniClub</title>
  <meta name="description" content="Üniversite kulüplerini keşfet, kampüs etkinliklerine katıl ve öğrenci topluluklarıyla bağlantı kur. UniClub ile tüm etkinlikler tek platformda." />
  <meta name="keywords" content="üniversite kulüpleri, kampüs etkinlikleri, öğrenci toplulukları, kulüp oluştur, öğrenci etkinlikleri, uniclub, türkiye üniversite, react atölyesi, esports, girişimcilik kulübü" />
  <link rel="canonical" href="https://uniclub.app/" />
  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="tr_TR" />
  <meta property="og:site_name" content="UniClub" />
  <meta property="og:url" content="https://uniclub.app/" />
  <meta property="og:title" content="Üniversite Kulüpleri ve Kampüs Etkinlikleri | UniClub" />
  <meta property="og:description" content="Üniversite kulüplerini keşfet, kampüs etkinliklerine katıl. 120+ kulüp, tek platform." />
  <meta property="og:image" content="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1200" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="UniClub — Üniversite kampüs hayatı" />
  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="UniClub — Üniversite Kulüpleri ve Kampüs Etkinlikleri" />
  <meta name="twitter:description" content="120+ üniversite kulübünü keşfet, kampüs etkinliklerine katıl." />
  <meta name="twitter:image" content="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1200" />
</Helmet>
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4">

      {/* ── Background images (auto-advancing, responsive + WebP) ── */}
      {HERO_IMAGES.map((img, i) => (
        <div key={img}
          className="absolute inset-0 z-0 transition-opacity duration-1000 hero-img-container"
          style={{ opacity: i === bgIdx ? 1 : 0 }}>
          <img
            src={img}
            srcSet={heroSrcSet(HERO_PHOTO_IDS[i])}
            sizes="100vw"
            alt=""
            className="h-full w-full object-cover transition-transform duration-700"
            draggable={false}
            width="1340"
            height="754"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
            decoding={i === 0 ? 'sync' : 'async'}
          />
        </div>
      ))}

      {/* Consistent dark overlay → text always readable */}
      <div className="absolute inset-0 z-10" style={{ background: 'var(--scrim)' }} />

      {/* ── Tinted gradient orbs (on top of overlay for depth) ── */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute left-[-10%] top-[-5%] h-[600px] w-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }} />
        <div className="absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)' }} />
        <div className="absolute left-[40%] top-[60%] h-[300px] w-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)' }} />
      </div>

      {/* Grid dot pattern */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* ── Main content ── */}
      <div className="relative z-30 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <span className="badge-accent mb-8">
          <span className="status-dot-online animate-pulse" />
          Türkiye'nin Kampüs Platformu
        </span>

        {/* Headline — always on dark bg, so text-white is safe */}
        <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
          Kampüste{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-text) 0%, #818cf8 50%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>topluluğunu</span>{' '}
          bul,{' '}
          <br className="hidden md:block" />
          sesin duyulsun.
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
          Yüzlerce kulüp, binlerce öğrenci — hepsi tek platformda.
          Etkinliklere katıl, duyuruları takip et, topluluk oluştur.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/clubs" className="btn-primary px-7 py-3 text-sm">
            Kulüpleri Keşfet →
          </Link>
          <button
          aria-label='Kulüp Oluştur'
           type="button" onClick={onCreateClubClick}
            className="px-7 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:bg-white/15"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
            Kulüp Oluştur
          </button>
        </div>

        {/* Trust signal */}
        <p className="mt-8 text-xs text-slate-500">
          Ücretsiz · Kayıt gerektirmez · 120+ üniversite kulübü
        </p>

        {/* Floating event chips */}
        <div className="mt-16 hidden md:flex items-center justify-center gap-3">
          {['🎓 React Atölyesi · 2h', '🎮 Valorant Ligi · Yarın', '🎵 Açık Mikrofon · 18:00'].map((text, i) => (
            <div key={i} className="flex items-center gap-2 rounded-full px-4 py-2 text-xs select-none"
              style={{ background: 'var(--input-bg)', border: '1px solid var(--bc2)', backdropFilter: 'blur(8px)', color: 'var(--text3)' }}>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Image dots indicator */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-1.5" role="tablist" aria-label="Hero görselleri">
        {HERO_IMAGES.map((_, i) => (
          <button key={i} type="button" onClick={() => setBgIdx(i)}
            role="tab"
            aria-selected={i === bgIdx}
            aria-label={`Görsel ${i + 1}'e git`}
            className="transition-all duration-300 rounded-full bg-white"
            style={{ width: i === bgIdx ? 20 : 6, height: 6, opacity: i === bgIdx ? 1 : 0.35 }} />
        ))}
      </div>

      {/* Bottom fade into page bg */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />
    </section>
    </>
  )
}

// ── Stats Bar ─────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <div className="border-y py-5" style={{ borderColor: 'var(--bc)', background: 'rgba(255,255,255,0.01)', transition: 'background 0.3s' }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
                style={{ background: 'var(--accent-muted)', border: '1px solid var(--accent-border)' }}>
                {s.icon}
              </span>
              <p className="text-base font-extrabold" style={{ color: 'var(--accent-text)' }}>{s.value}
                <span className="block text-xs font-normal" style={{ color: 'var(--text3)' }}>{s.label}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Trending Clubs ────────────────────────────────────────────────────
function TrendingClubs() {
  return (
    <section className="py-14" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100">Öne Çıkan Kulüpler
            <span className="block mt-0.5 text-xs font-normal" style={{ color: 'var(--text3)' }}>Bu hafta en aktif topluluklar</span>
          </h2>
          <Link to="/clubs" className="text-xs font-medium transition-colors hover:text-[var(--accent-light)]" style={{ color: 'var(--accent-text)' }}>Tümünü gör →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TRENDING_CLUBS.map((club, i) => (
            <div key={club.name} className="card-dark group flex items-center gap-4 p-4 cursor-pointer">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${club.gradient} text-sm font-bold text-white shadow-lg`}>
                {club.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-100 truncate group-hover:text-white transition-colors">{club.name}</p>
                  {club.hot && <span className="badge-hot">🔥</span>}
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-[10px]" style={{ color: 'var(--text3)' }}>{club.category}</span>
                  <span style={{ color: 'var(--text4)' }}>·</span>
                  <span className="text-[10px]" style={{ color: 'var(--text3)' }}>{club.members} üye</span>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-bold transition-colors group-hover:text-[var(--accent-text)]" style={{ color: 'var(--text4)' }}>#{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── HomePage ──────────────────────────────────────────────────────────
export const HomePage = ({ onCreateClubClick, onCreatePostClick }: HomePageProps) => (
  <div style={{ background: 'var(--bg)', transition: 'background 0.3s' }}>
    <Hero onCreateClubClick={onCreateClubClick} />
    <StatsBar />
    <TrendingClubs />
    <FeedSection onCreatePostClick={onCreatePostClick} />
  </div>
)
