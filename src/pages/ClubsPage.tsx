import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const CLUBS = [
  { name: 'Developer Student Community', category: 'Teknoloji', members: 186, about: 'Gerçek dünya projeleri, atölyeler ve kampüs geliştiricileriyle iş birliği.', gradient: 'from-violet-500 to-purple-600', active: true },
  { name: 'ESports Society', category: 'Oyun', members: 142, about: 'Rekabetçi turnuvalar, izleme partileri ve büyük final etkinlikleri.', gradient: 'from-indigo-500 to-blue-600', active: true },
  { name: 'Müzik & Sahne Sanatları', category: 'Sanat', members: 97, about: 'Canlı gösteriler, tiyatro prodüksiyonları ve müzik atölyeleri.', gradient: 'from-pink-500 to-rose-600', active: false },
  { name: 'Girişimcilik Kulübü', category: 'İş Dünyası', members: 121, about: 'Kurucularla buluşmalar, pitch yarışmaları ve mentörlük programları.', gradient: 'from-amber-500 to-orange-500', active: true },
  { name: 'Fotoğrafçılık Topluluğu', category: 'Sanat', members: 74, about: 'Kampüs yürüyüşleri, stüdyo seansları ve yıllık fotoğraf sergisi.', gradient: 'from-teal-500 to-emerald-500', active: false },
  { name: 'Bilim & Araştırma Kulübü', category: 'Bilim', members: 58, about: 'Araştırma projeleri, TÜBİTAK başvuruları ve konferans hazırlığı.', gradient: 'from-sky-500 to-cyan-500', active: true },
  { name: 'Felsefe Topluluğu', category: 'Akademik', members: 43, about: 'Haftalık tartışma oturumları, okuma grupları ve sempozyumlar.', gradient: 'from-slate-400 to-zinc-500', active: false },
  { name: 'Dans & Performans', category: 'Sanat', members: 88, about: 'Modern dans, halk oyunları ve sahne koreografisi atölyeleri.', gradient: 'from-fuchsia-500 to-purple-600', active: true },
  { name: 'Çevre & Sürdürülebilirlik', category: 'Sosyal', members: 65, about: 'Kampüs sürdürülebilirlik projeleri ve çevre farkındalık etkinlikleri.', gradient: 'from-green-500 to-teal-600', active: false },
]

const CATEGORIES = ['Tümü', 'Teknoloji', 'Oyun', 'Sanat', 'İş Dünyası', 'Bilim', 'Akademik', 'Sosyal']
const CAT_COLORS: Record<string, string> = {
  Tümü: 'from-violet-500 to-purple-600', Teknoloji: 'from-violet-500 to-purple-600',
  Oyun: 'from-indigo-500 to-blue-600', Sanat: 'from-pink-500 to-rose-600',
  'İş Dünyası': 'from-amber-500 to-orange-500', Bilim: 'from-sky-500 to-cyan-500',
  Akademik: 'from-slate-400 to-zinc-500', Sosyal: 'from-green-500 to-teal-600',
}

type ClubsPageProps = { onCreateClubClick: () => void }

export const ClubsPage = ({ onCreateClubClick }: ClubsPageProps) => {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [localSearch, setLocalSearch] = useState('')
  const [joinedClubs, setJoinedClubs] = useState<string[]>([])
  const q = localSearch || searchParams.get('q') || ''

  const filtered = CLUBS.filter(c => {
    const matchCat = selectedCategory === 'Tümü' || c.category === selectedCategory
    return matchCat && (q ? c.name.toLowerCase().includes(q.toLowerCase()) : true)
  })

  const toggleJoin = (name: string) =>
    setJoinedClubs(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', transition: 'background 0.3s' }}>
      {/* Page header */}
      <div className="relative overflow-hidden pt-16 pb-12"
        style={{ background: 'linear-gradient(to bottom, rgba(124,92,252,0.06), transparent)' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-5%] top-[-20%] h-80 w-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.5) 0%, transparent 70%)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <span className="badge-pro mb-4 inline-flex">🏛 {CLUBS.length} aktif kulüp</span>
            <h1 className="text-3xl font-black text-slate-100 md:text-4xl">Kulüpleri Keşfet</h1>
            <p className="mt-3 text-sm" style={{ color: 'var(--text2)' }}>Kampüsün en aktif topluluklarına katıl. İlgi alanına göre filtrele.</p>
          </div>
          <div className="flex gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text3)' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd"/>
              </svg>
              <input type="text" value={localSearch} onChange={e => setLocalSearch(e.target.value)} placeholder="Kulüp ara..." className="input-pro w-full pl-9" />
            </div>
            <button type="button" onClick={onCreateClubClick} className="btn-primary shrink-0 text-sm px-5">+ Kulüp Oluştur</button>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} type="button" onClick={() => setSelectedCategory(cat)}
                className={['rounded-full px-4 py-1.5 text-xs font-semibold transition-all', selectedCategory === cat ? `bg-gradient-to-r ${CAT_COLORS[cat]} text-white shadow-md` : 'text-slate-500 hover:text-slate-200'].join(' ')}
                style={selectedCategory === cat ? undefined : { background: 'var(--input-bg)', border: '1px solid var(--bc)' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        {q && <p className="mb-4 text-sm" style={{ color: 'var(--text2)' }}>"<span className="text-violet-400 font-semibold">{q}</span>" — {filtered.length} sonuç</p>}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl" style={{ background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.15)' }}>🔍</div>
            <p className="mt-4 text-sm font-semibold" style={{ color: 'var(--text2)' }}>Kulüp bulunamadı</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(club => (
              <article key={club.name} className="card-dark group flex flex-col overflow-hidden cursor-pointer">
                <div className={`h-1 bg-gradient-to-r ${club.gradient}`} />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${club.gradient} text-sm font-bold text-white shrink-0 shadow-lg`}>
                      {club.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                    </div>
                    <div className="flex items-center gap-2">
                      {club.active && <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)' }} />}
                      <span className="text-[10px] font-semibold" style={{ color: 'var(--text3)' }}>{club.category}</span>
                    </div>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-100 group-hover:text-white transition-colors">{club.name}</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{club.about}</p>
                  <div className="mt-4 flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--bc)' }}>
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-1">
                        {[0,1,2].map(i => (
                          <div key={i} className={`h-5 w-5 rounded-full bg-gradient-to-br ${club.gradient} ring-1 text-[8px] font-bold text-white flex items-center justify-center`}
                            style={{ opacity: 1 - i * 0.25, ['--tw-ring-color' as string]: 'var(--surface)' }}>
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px]" style={{ color: 'var(--text3)' }}>{club.members} üye</span>
                    </div>
                    <button type="button" onClick={() => toggleJoin(club.name)}
                      className={['rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all', joinedClubs.includes(club.name) ? 'text-violet-400' : 'text-white'].join(' ')}
                      style={joinedClubs.includes(club.name)
                        ? { background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.25)' }
                        : { background: 'linear-gradient(135deg, #7C5CFC, #5B4ED9)' }
                      }>
                      {joinedClubs.includes(club.name)
                        ? <span className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd"/></svg> Katıldın</span>
                        : 'Katıl'
                      }
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
