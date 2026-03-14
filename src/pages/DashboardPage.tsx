type DashboardPageProps = { onCreateClubClick: () => void }

const STATS = [
  { label: 'Toplam Üye', value: '186', change: '+12 bu ay', icon: '👥', color: 'from-violet-500 to-purple-600', ringColor: 'border-violet-800/50 bg-violet-900/30' },
  { label: 'Aktif Etkinlik', value: '4', change: '2 bu hafta', icon: '📅', color: 'from-indigo-500 to-blue-500', ringColor: 'border-indigo-800/50 bg-indigo-900/30' },
  { label: 'Toplam Gönderi', value: '38', change: '+5 bu hafta', icon: '📝', color: 'from-pink-500 to-rose-500', ringColor: 'border-pink-800/50 bg-pink-900/30' },
  { label: 'Etkileşim', value: '%82', change: '+3% geçen aya', icon: '📈', color: 'from-amber-500 to-orange-500', ringColor: 'border-amber-800/50 bg-amber-900/30' },
]

const RECENT_POSTS = [
  { title: 'React Hooks Atölyesi', status: 'Taslak', statusCls: 'text-amber-300 bg-amber-900/30 border border-amber-800/50' },
  { title: 'Haftalık Kodlama Yarışması #12', status: 'Yayınlandı', statusCls: 'text-violet-300 bg-violet-900/30 border border-violet-800/50' },
  { title: 'Yaz Hackathon Duyurusu', status: 'Yayınlandı', statusCls: 'text-violet-300 bg-violet-900/30 border border-violet-800/50' },
]

const QUICK_ACTIONS = [
  { label: 'Duyuru Oluştur', icon: '📢', desc: 'Üyelere bilgi ver' },
  { label: 'Etkinlik Planla', icon: '🗓', desc: 'Toplantı veya etkinlik' },
  { label: 'Kulüp Oluştur', icon: '🏛', desc: 'Yeni topluluk kur' },
]

export const DashboardPage = ({ onCreateClubClick }: DashboardPageProps) => (
  <div className="min-h-screen bg-slate-950">
    {/* Header */}
    <div className="relative overflow-hidden border-b border-slate-800 bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-slate-900 to-purple-900/10" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Kulüp Paneli</h1>
            <p className="mt-1 text-sm text-slate-400">Duyurular, etkinlikler ve üye büyümesini tek yerden yönet.</p>
          </div>
          <span className="rounded-full border border-violet-800/50 bg-violet-900/30 px-3 py-1 text-xs font-semibold text-violet-300">Demo Görünümü</span>
        </div>
      </div>
    </div>

    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map(s => (
          <div key={s.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 overflow-hidden relative">
            <div className={`absolute top-0 right-0 h-16 w-16 ${s.ringColor} border rounded-bl-3xl flex items-center justify-center text-2xl`}>
              {s.icon}
            </div>
            <p className="text-xs font-semibold text-slate-500">{s.label}</p>
            <p className={`mt-1 text-2xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
            <p className="mt-1 text-[10px] text-slate-600">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          {/* Quick actions */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20">
            <h2 className="text-sm font-bold text-white mb-4">Hızlı İşlemler</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {QUICK_ACTIONS.map(item => (
                <button key={item.label} type="button"
                  onClick={item.label === 'Kulüp Oluştur' ? onCreateClubClick : undefined}
                  className="group flex flex-col items-start rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-left transition-all hover:border-violet-700/50 hover:bg-violet-900/20">
                  <span className="text-xl mb-1.5">{item.icon}</span>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-violet-300">{item.label}</span>
                  <span className="text-[10px] text-slate-600 mt-0.5">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent posts */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">Son Gönderiler</h2>
              <button type="button" className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">Tümü →</button>
            </div>
            <ul className="divide-y divide-slate-800">
              {RECENT_POSTS.map(p => (
                <li key={p.title} className="flex items-center justify-between py-3">
                  <span className="text-xs text-slate-300 font-medium">{p.title}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${p.statusCls}`}>{p.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-5">
          {/* Bar chart */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20">
            <h2 className="text-sm font-bold text-white">Üye Büyümesi</h2>
            <p className="mt-0.5 text-xs text-slate-500">Aylık trend</p>
            <div className="mt-4 flex items-end gap-1 h-24">
              {[40,55,45,70,65,80,72,90,85,100,95,110].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-violet-700 to-violet-400 opacity-70 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[9px] text-slate-600">
              {['O','Ş','M','N','M','H','T','A','E','Ek','K','A'].map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20">
            <h2 className="text-sm font-bold text-white mb-3">Geliştirici Notları</h2>
            <ul className="space-y-2.5">
              {['Backend kimlik doğrulaması bağla.','Kulüp verileri API\'den çek.','Demo state\'ini gerçek veriyle değiştir.'].map((note, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-500">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-900/40 text-[9px] font-bold text-violet-400 border border-violet-800/50">{i+1}</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)
