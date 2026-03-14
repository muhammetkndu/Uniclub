import { useState, useRef } from 'react'

type FeedFilter = 'all' | 'events' | 'announcements'

type Post = {
  id: number; type: FeedFilter
  club: string; clubInitials: string; clubGradient: string
  timeAgo: string; title: string; description: string
  imageUrl?: string; tag: string; tagGradient: string
  likes: number; comments: number
}

const INITIAL_POSTS: Post[] = [
  { id: 1, type: 'events', club: 'Developer Student Community', clubInitials: 'DS', clubGradient: 'from-violet-500 to-purple-600', timeAgo: '12 dk', title: 'React Hooks Atölyesine Giriş', description: 'Hooks ve modern araçlarla ilk React uygulamanı oluşturacağın uygulamalı bir oturum.', imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=700', tag: 'Atölye', tagGradient: 'from-violet-500 to-purple-600', likes: 24, comments: 6 },
  { id: 2, type: 'announcements', club: 'ESports Society', clubInitials: 'ES', clubGradient: 'from-indigo-500 to-blue-600', timeAgo: '1 sa', title: 'Valorant Kampüs Ligi Elemeleri', description: "Cuma 23:59'da kayıtlar kapanıyor. 5v5, ödül havuzu 2000₺.", imageUrl: 'https://images.pexels.com/photos/907230/pexels-photo-907230.jpeg?auto=compress&cs=tinysrgb&w=700', tag: 'Turnuva', tagGradient: 'from-indigo-500 to-blue-600', likes: 41, comments: 12 },
  { id: 3, type: 'events', club: 'Müzik & Sahne Sanatları', clubInitials: 'MÜ', clubGradient: 'from-pink-500 to-rose-600', timeAgo: '3 sa', title: 'Açık Mikrofon Gecesi Kayıtları', description: 'Bahar şovumuz için şarkıcı, şair ve stand-up sanatçısı arıyoruz.', imageUrl: 'https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=700', tag: 'Etkinlik', tagGradient: 'from-pink-500 to-rose-600', likes: 18, comments: 3 },
  { id: 4, type: 'announcements', club: 'Girişimcilik Kulübü', clubInitials: 'GK', clubGradient: 'from-amber-500 to-orange-500', timeAgo: 'Dün', title: 'Pitch Yarışması Mentörleri Açıklandı', description: 'Mentör listesini incele ve 1:1 geri bildirim slotunu rezerve et.', tag: 'Duyuru', tagGradient: 'from-amber-500 to-orange-500', likes: 33, comments: 8 },
  { id: 5, type: 'events', club: 'Fotoğrafçılık Topluluğu', clubInitials: 'FT', clubGradient: 'from-teal-500 to-emerald-500', timeAgo: '2 gün', title: 'Altın Saat Yürüyüşü', description: 'Her Pazar kampüsün en güzel köşelerini fotoğraflıyoruz.', imageUrl: 'https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=700', tag: 'Etkinlik', tagGradient: 'from-teal-500 to-emerald-500', likes: 27, comments: 5 },
  { id: 6, type: 'announcements', club: 'Bilim & Araştırma Kulübü', clubInitials: 'BA', clubGradient: 'from-sky-500 to-cyan-500', timeAgo: '3 gün', title: 'TÜBİTAK Proje Başvuruları', description: 'Bu yıl 5 projemizi TÜBİTAK destekli yarışmaya sunuyoruz.', tag: 'Duyuru', tagGradient: 'from-sky-500 to-cyan-500', likes: 15, comments: 9 },
]

const CLUBS_LIST = ['Developer Student Community', 'ESports Society', 'Müzik & Sahne Sanatları', 'Girişimcilik Kulübü', 'Fotoğrafçılık Topluluğu', 'Bilim & Araştırma Kulübü']
const TAGS_LIST = ['Atölye', 'Etkinlik', 'Turnuva', 'Duyuru', 'Haber', 'Fotoğraf']
const TAG_TO_TYPE: Record<string, FeedFilter> = { 'Atölye': 'events', 'Etkinlik': 'events', 'Turnuva': 'events', 'Duyuru': 'announcements', 'Haber': 'announcements', 'Fotoğraf': 'all' }

const HeartFilled = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" /></svg>
const HeartEmpty = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" /></svg>
const BookmarkFilled = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" /></svg>
const BookmarkEmpty = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>

function PostCard({ post, liked, saved, onLike, onSave }: { post: Post; liked: boolean; saved: boolean; onLike: () => void; onSave: () => void }) {
  return (
    <article className="card-dark group flex flex-col overflow-hidden cursor-pointer">
      {/* ── Image (tall) ── */}
      <div className="relative shrink-0 overflow-hidden" style={{ height: 290 }}>
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${post.clubGradient} relative overflow-hidden`}>
            <div className="absolute -top-8 -right-8 h-36 w-36 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-black/20" />
            <span className="absolute inset-0 flex items-center justify-center text-8xl font-black text-white/10 select-none">{post.clubInitials}</span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />

        {/* Save button */}
        <button type="button" onClick={onSave}
          className={['absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full transition-all', saved ? 'text-violet-300' : 'text-white/50 hover:text-white'].join(' ')}
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}>
          {saved ? <BookmarkFilled /> : <BookmarkEmpty />}
        </button>

        {/* Club row + title — on top of overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <div className={`flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br ${post.clubGradient} text-[8px] font-extrabold text-white shrink-0`}>
              {post.clubInitials[0]}
            </div>
            <span className="text-[10px] font-semibold text-white/70 truncate">{post.club}</span>
            <span className="ml-auto text-[9px] text-white/40 shrink-0">{post.timeAgo}</span>
          </div>
          <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{post.title}</h3>
        </div>
      </div>

      {/* ── Content below ── */}
      <div className="flex flex-1 flex-col px-3 pt-3 pb-3">
        <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--text2)' }}>{post.description}</p>

        <div className="mt-3 flex items-center justify-between pt-2.5" style={{ borderTop: '1px solid var(--bc)' }}>
          <div className="flex items-center gap-3">
            <button type="button" onClick={onLike}
              className={['flex items-center gap-1.5 text-xs font-semibold transition-all', liked ? 'text-rose-400' : 'hover:text-rose-400'].join(' ')}
              style={!liked ? { color: 'var(--text3)' } : undefined}>
              {liked ? <HeartFilled /> : <HeartEmpty />}
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>
            <button type="button" className="flex items-center gap-1.5 text-xs font-medium hover:text-violet-400 transition-colors" style={{ color: 'var(--text3)' }}>
              <ChatIcon /><span>{post.comments}</span>
            </button>
          </div>
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r ${post.tagGradient} text-white`}>{post.tag}</span>
        </div>
      </div>
    </article>
  )
}

function PostDialog({ open, onClose, onPost }: { open: boolean; onClose: () => void; onPost: (d: { title: string; description: string; tag: string; imageUrl?: string }) => void }) {
  const [title, setTitle] = useState(''); const [desc, setDesc] = useState(''); const [tag, setTag] = useState('Etkinlik'); const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = ev => setPreview(ev.target?.result as string); r.readAsDataURL(f) }
  const reset = () => { setTitle(''); setDesc(''); setTag('Etkinlik'); setPreview(null); if (fileRef.current) fileRef.current.value = '' }
  const close = () => { reset(); onClose() }
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (!title.trim()) return; onPost({ title: title.trim(), description: desc.trim(), tag, imageUrl: preview ?? undefined }); reset() }
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) close() }}>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--bc2)' }}>
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-white">Yeni Gönderi ✍️</h2>
          <button type="button" onClick={close} className="rounded-lg p-1.5 text-white/70 hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
          </button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          <div><label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Kulüp</label>
            <select className="input-pro" style={{ WebkitAppearance: 'none' }}>{CLUBS_LIST.map(c => <option key={c}>{c}</option>)}</select></div>
          <div><label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Başlık *</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="Başlık yaz..." className="input-pro" /></div>
          <div><label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Açıklama</label>
            <textarea rows={2} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Kısa açıklama..." className="input-pro resize-none" /></div>
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text3)' }}>Etiket</p>
            <div className="flex flex-wrap gap-1.5">
              {TAGS_LIST.map(t => <button key={t} type="button" onClick={() => setTag(t)}
                className={['rounded-full px-3 py-1 text-xs font-semibold transition-all', tag === t ? 'bg-violet-600 text-white' : 'hover:text-violet-400'].join(' ')}
                style={tag !== t ? { background: 'var(--input-bg)', border: '1px solid var(--bc)', color: 'var(--text2)' } : undefined}>{t}</button>)}
            </div>
          </div>
          <div>
            {preview
              ? <div className="relative"><div className="aspect-[16/9] overflow-hidden rounded-xl"><img src={preview} alt="" className="h-full w-full object-cover" /></div>
                <button type="button" onClick={() => { setPreview(null); if (fileRef.current) fileRef.current.value = '' }} className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
                </button></div>
              : <button type="button" onClick={() => fileRef.current?.click()} className="flex w-full flex-col items-center gap-2 rounded-xl py-6 transition-all hover:border-violet-500/50"
                style={{ border: '1.5px dashed var(--bc2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6" style={{ color: 'var(--text4)' }}><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                <span className="text-xs font-semibold text-violet-500">Görsel ekle</span>
              </button>}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={close} className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all"
              style={{ border: '1px solid var(--bc2)', color: 'var(--text2)' }}>İptal</button>
            <button type="submit" disabled={!title.trim()} className="flex-1 btn-primary justify-center py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed">Paylaş 🎉</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const FeedSection = ({ onCreatePostClick }: { onCreatePostClick?: () => void }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [filter, setFilter] = useState<FeedFilter>('all')
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [saved, setSaved] = useState<Set<number>>(new Set())
  const [dialogOpen, setDialogOpen] = useState(false)
  const filtered = posts.filter(p => filter === 'all' || p.type === filter)
  const toggleLike = (id: number) => setLiked(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  const toggleSave = (id: number) => setSaved(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  const handleNewPost = (data: { title: string; description: string; tag: string; imageUrl?: string }) => {
    setPosts(prev => [{ id: Date.now(), type: TAG_TO_TYPE[data.tag] ?? 'all', club: 'Developer Student Community', clubInitials: 'DS', clubGradient: 'from-violet-500 to-purple-600', timeAgo: 'Az önce', title: data.title, description: data.description, imageUrl: data.imageUrl, tag: data.tag, tagGradient: 'from-violet-500 to-purple-600', likes: 0, comments: 0 }, ...prev])
    setDialogOpen(false)
  }
  const openCreate = () => { if (onCreatePostClick) onCreatePostClick(); else setDialogOpen(true) }

  return (
    <section id="feed" className="py-6 pb-16" style={{ background: 'var(--bg)', transition: 'background 0.3s' }}>
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Divider with section heading */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'var(--bc)' }} />
          <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text3)' }}>Kulüp Akışı</h2>
          <div className="flex-1 h-px" style={{ background: 'var(--bc)' }} />
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-0.5 self-start rounded-xl p-1" style={{ background: 'var(--input-bg)', border: '1px solid var(--bc)' }}>
            {([['all', 'Tümü'], ['events', 'Etkinlik'], ['announcements', 'Duyuru']] as const).map(([val, label]) => (
              <button key={val} type="button" onClick={() => setFilter(val)}
                className={['rounded-lg px-3 py-1.5 text-xs font-semibold transition-all', filter === val ? 'bg-violet-600 text-white shadow-md' : 'hover:text-violet-400'].join(' ')}
                style={filter !== val ? { color: 'var(--text2)' } : undefined}>
                {label}
              </button>
            ))}
          </div>
          <button type="button" onClick={openCreate} className="btn-primary self-start sm:self-auto text-xs px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Gönderi Oluştur
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl py-20 text-center" style={{ border: '1.5px dashed var(--bc2)' }}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl" style={{ background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.15)' }}>📭</div>
            <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--text2)' }}>Bu kategoride içerik yok</p>
            <button type="button" onClick={openCreate} className="btn-primary mt-4 text-xs px-5 py-2.5">İlk gönderiyi oluştur</button>
          </div>
        ) : (
          <div className="hide-scrollbar overflow-y-auto" style={{ maxHeight: '880px' }}>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {filtered.map(post => (
                <PostCard key={post.id} post={post} liked={liked.has(post.id)} saved={saved.has(post.id)} onLike={() => toggleLike(post.id)} onSave={() => toggleSave(post.id)} />
              ))}
            </div>
          </div>
        )}
      </div>
      <PostDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onPost={handleNewPost} />
    </section>
  )
}
