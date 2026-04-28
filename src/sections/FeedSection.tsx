import { useState } from 'react'
import { CreatePostModal } from '../components/CreatePostModal'
import { TAG_TO_TYPE, type FeedFilter } from '../data/constants'

type Post = {
  id: number; type: FeedFilter
  club: string; clubInitials: string; clubGradient: string
  timeAgo: string; title: string; description: string
  imageUrl?: string; tag: string; tagGradient: string
  likes: number; comments: number
}

/* Kulüp adından gradient bul — yeni post'larda tutarlı renk */
const CLUB_GRADIENTS: Record<string, string> = {
  'Developer Student Community': 'from-violet-500 to-purple-600',
  'ESports Society': 'from-indigo-500 to-blue-600',
  'Müzik & Sahne Sanatları': 'from-pink-500 to-rose-600',
  'Girişimcilik Kulübü': 'from-amber-500 to-orange-500',
  'Fotoğrafçılık Topluluğu': 'from-teal-500 to-emerald-500',
  'Bilim & Araştırma Kulübü': 'from-sky-500 to-cyan-500',
}

const INITIAL_POSTS: Post[] = [
  { id: 1, type: 'events', club: 'Developer Student Community', clubInitials: 'DS', clubGradient: 'from-violet-500 to-purple-600', timeAgo: '12 dk', title: 'React Hooks Atölyesine Giriş', description: 'Hooks ve modern araçlarla ilk React uygulamanı oluşturacağın uygulamalı bir oturum.', imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&fm=webp', tag: 'Atölye', tagGradient: 'from-violet-500 to-purple-600', likes: 24, comments: 6 },
  { id: 2, type: 'announcements', club: 'ESports Society', clubInitials: 'ES', clubGradient: 'from-indigo-500 to-blue-600', timeAgo: '1 sa', title: 'Valorant Kampüs Ligi Elemeleri', description: "Cuma 23:59'da kayıtlar kapanıyor. 5v5, ödül havuzu 2000₺.", imageUrl: 'https://images.pexels.com/photos/907230/pexels-photo-907230.jpeg?auto=compress&cs=tinysrgb&w=600&fm=webp', tag: 'Turnuva', tagGradient: 'from-indigo-500 to-blue-600', likes: 41, comments: 12 },
  { id: 3, type: 'events', club: 'Müzik & Sahne Sanatları', clubInitials: 'MÜ', clubGradient: 'from-pink-500 to-rose-600', timeAgo: '3 sa', title: 'Açık Mikrofon Gecesi Kayıtları', description: 'Bahar şovumuz için şarkıcı, şair ve stand-up sanatçısı arıyoruz.', imageUrl: 'https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=600&fm=webp', tag: 'Etkinlik', tagGradient: 'from-pink-500 to-rose-600', likes: 18, comments: 3 },
  { id: 4, type: 'announcements', club: 'Girişimcilik Kulübü', clubInitials: 'GK', clubGradient: 'from-amber-500 to-orange-500', timeAgo: 'Dün', title: 'Pitch Yarışması Mentörleri Açıklandı', description: 'Mentör listesini incele ve 1:1 geri bildirim slotunu rezerve et.', tag: 'Duyuru', tagGradient: 'from-amber-500 to-orange-500', likes: 33, comments: 8 },
  { id: 5, type: 'events', club: 'Fotoğrafçılık Topluluğu', clubInitials: 'FT', clubGradient: 'from-teal-500 to-emerald-500', timeAgo: '2 gün', title: 'Altın Saat Yürüyüşü', description: 'Her Pazar kampüsün en güzel köşelerini fotoğraflıyoruz.', imageUrl: 'https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=600&fm=webp', tag: 'Etkinlik', tagGradient: 'from-teal-500 to-emerald-500', likes: 27, comments: 5 },
  { id: 6, type: 'announcements', club: 'Bilim & Araştırma Kulübü', clubInitials: 'BA', clubGradient: 'from-sky-500 to-cyan-500', timeAgo: '3 gün', title: 'TÜBİTAK Proje Başvuruları', description: 'Bu yıl 5 projemizi TÜBİTAK destekli yarışmaya sunuyoruz.', tag: 'Duyuru', tagGradient: 'from-sky-500 to-cyan-500', likes: 15, comments: 9 },
]


const HeartFilled = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" /></svg>
const HeartEmpty = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" /></svg>
const BookmarkFilled = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" /></svg>
const BookmarkEmpty = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>

function PostCard({ post, liked, saved, onLike, onSave }: { post: Post; liked: boolean; saved: boolean; onLike: () => void; onSave: () => void }) {
  return (
    <article className="card-dark group flex flex-col overflow-hidden cursor-pointer">
      {/* ── Image (tall) ── */}
      <div className="relative shrink-0 overflow-hidden feed-card-img">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} width={600} height={400} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${post.clubGradient} relative overflow-hidden`}>
            <div className="absolute -top-8 -right-8 h-36 w-36 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-black/20" />
            <span className="absolute inset-0 flex items-center justify-center text-8xl font-black text-white/10 select-none">{post.clubInitials}</span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'var(--gradient-card-img)' }} />

        {/* Save button */}
        <button type="button" onClick={onSave}
          className={['absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full transition-all', saved ? 'text-violet-300' : 'text-white/50 hover:text-white'].join(' ')}
          style={{ background: 'var(--scrim-card)', backdropFilter: 'blur(6px)' }}
          aria-label={saved ? 'Kayıttan kaldır' : 'Kaydet'}>
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
              style={!liked ? { color: 'var(--text3)' } : undefined}
              aria-label={liked ? 'Beğeniyi kaldır' : 'Beğen'}>
              {liked ? <HeartFilled /> : <HeartEmpty />}
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>
            <button type="button" className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[var(--accent-text)]" style={{ color: 'var(--text3)' }} aria-label="Yorumlar">
              <ChatIcon /><span>{post.comments}</span>
            </button>
          </div>
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r ${post.tagGradient} text-white`}>{post.tag}</span>
        </div>
      </div>
    </article>
  )
}

export const FeedSection = ({ onCreatePostClick }: { onCreatePostClick?: () => void }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [filter, setFilter] = useState<FeedFilter>('all')
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [saved, setSaved] = useState<Set<number>>(new Set())
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = posts.filter(p => filter === 'all' || p.type === filter)
  const toggleLike = (id: number) => setLiked(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  const toggleSave = (id: number) => setSaved(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const handleNewPost = (data: { title: string; description: string; tag: string; club: string; imageUrl?: string }) => {
    const gradient = CLUB_GRADIENTS[data.club] ?? 'from-violet-500 to-purple-600'
    const initials = data.club.split(' ').slice(0, 2).map(w => w[0]).join('')
    setPosts(prev => [{
      id: Date.now(), type: TAG_TO_TYPE[data.tag] ?? 'all',
      club: data.club, clubInitials: initials,
      clubGradient: gradient, timeAgo: 'Az önce',
      title: data.title, description: data.description,
      imageUrl: data.imageUrl, tag: data.tag,
      tagGradient: gradient, likes: 0, comments: 0,
    }, ...prev])
    setModalOpen(false)
  }

  const openCreate = () => {
    if (onCreatePostClick) {
      onCreatePostClick()
    } else {
      setModalOpen(true)
    }
  }

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
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                style={filter === val
                  ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 1px 6px var(--accent-glow)' }
                  : { color: 'var(--text2)' }}>
                {label}
              </button>
            ))}
          </div>
          <button type="button" onClick={openCreate} className="btn-primary self-start sm:self-auto text-xs px-4 py-2" aria-label="Gönderi Oluştur">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Gönderi Oluştur
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl py-20 text-center" style={{ border: '1.5px dashed var(--bc2)' }}>
            <div className="empty-state-icon text-2xl h-14 w-14">📭</div>
            <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--text2)' }}>Bu kategoride içerik yok</p>
            <button type="button" onClick={openCreate} className="btn-primary mt-4 text-xs px-5 py-2.5" aria-label="İlk gönderiyi oluştur">İlk gönderiyi oluştur</button>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {filtered.map(post => (
              <PostCard key={post.id} post={post} liked={liked.has(post.id)} saved={saved.has(post.id)} onLike={() => toggleLike(post.id)} onSave={() => toggleSave(post.id)} />
            ))}
          </div>
        )}
      </div>

      {/* Modal — sadece onCreatePostClick prop'u verilmediğinde kullanılır */}
      <CreatePostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onPost={handleNewPost}
      />
    </section>
  )
}
