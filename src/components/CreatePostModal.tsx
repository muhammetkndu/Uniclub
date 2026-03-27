import { useState, useRef } from 'react'
import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'
import { CLUB_LIST, TAG_LIST } from '../data/constants'

type CreatePostModalProps = {
  isOpen: boolean
  onClose: () => void
  onPost?: (post: { title: string; description: string; tag: string; club: string; imageUrl?: string }) => void
}

export const CreatePostModal = ({ isOpen, onClose, onPost }: CreatePostModalProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedClub, setSelectedClub] = useState<string>(CLUB_LIST[0])
  const [selectedTag, setSelectedTag] = useState('Etkinlik')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader(); reader.onload = ev => setImagePreview(ev.target?.result as string); reader.readAsDataURL(file)
  }
  const reset = () => {
    setTitle(''); setDescription(''); setSelectedClub(CLUB_LIST[0]); setSelectedTag('Etkinlik'); setImagePreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (!title.trim()) return
    onPost?.({ title: title.trim(), description: description.trim(), tag: selectedTag, club: selectedClub, imageUrl: imagePreview ?? undefined })
    reset(); onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelId="modal-createpost-title">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--bc2)' }}>
        <ModalHeader id="modal-createpost-title" title="Yeni Gönderi ✍️" onClose={() => { reset(); onClose() }} />

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Kulüp */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Kulüp</label>
            <select className="input-pro w-full" value={selectedClub}
              onChange={e => setSelectedClub(e.target.value as typeof CLUB_LIST[number])}
              style={{ WebkitAppearance: 'none' }}>
              {CLUB_LIST.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Başlık */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Başlık *</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)}
              placeholder="Gönderi başlığını yaz..." className="input-pro w-full" />
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Açıklama</label>
            <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Kısa açıklama..." className="input-pro w-full resize-none" />
          </div>

          {/* Etiket */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text3)' }}>Etiket</p>
            <div className="flex flex-wrap gap-2">
              {TAG_LIST.map(tag => (
                <button key={tag} type="button" onClick={() => setSelectedTag(tag)}
                  className={['rounded-full px-3 py-1 text-xs font-semibold transition-all',
                    selectedTag === tag ? 'text-white' : ''].join(' ')}
                  style={selectedTag === tag
                    ? { background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }
                    : { background: 'var(--input-bg)', border: '1px solid var(--bc2)', color: 'var(--text2)' }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Görsel */}
          <div>
            {imagePreview ? (
              <div className="relative">
                <div className="aspect-[16/9] overflow-hidden rounded-xl">
                  <img src={imagePreview} alt="" className="h-full w-full object-cover" />
                </div>
                <button type="button" aria-label="Görseli kaldır"
                  onClick={() => { setImagePreview(null); if (fileRef.current) fileRef.current.value = '' }}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
                  </svg>
                </button>
              </div>
            ) : (
              <button aria-label="Görsel Ekle" type="button" onClick={() => fileRef.current?.click()}
                className="flex w-full flex-col items-center gap-2 rounded-xl py-8 transition-all hover:border-violet-500/50"
                style={{ border: '1.5px dashed var(--bc2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                  className="h-7 w-7" style={{ color: 'var(--text4)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>Görsel ekle</span>
                <span className="text-[10px]" style={{ color: 'var(--text4)' }}>JPG, PNG, WEBP</span>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

          {/* Aksiyonlar */}
          <div className="flex gap-3 pt-1">
            <button aria-label="İptal" type="button" onClick={() => { reset(); onClose() }}
              className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all"
              style={{ border: '1px solid var(--bc2)', color: 'var(--text2)' }}>
              İptal
            </button>
            <button aria-label="Paylaş" type="submit" disabled={!title.trim()}
              className="flex-1 btn-primary py-2.5 text-sm justify-center disabled:opacity-40 disabled:cursor-not-allowed">
              Paylaş 🎉
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
