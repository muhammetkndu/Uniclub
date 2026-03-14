import { Modal } from './Modal'

type CreateAnnouncementModalProps = { isOpen: boolean; onClose: () => void }

export const CreateAnnouncementModal = ({ isOpen, onClose }: CreateAnnouncementModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: 'var(--surface)', border: '1px solid var(--bc2)' }}>
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-extrabold text-white">Duyuru Yayınla 📢</h2>
          <p className="mt-0.5 text-xs text-white/60">Tüm üyelerle önemli güncellemeleri paylaş.</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-white/60 hover:bg-white/15 hover:text-white transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/></svg>
        </button>
      </div>
      <form className="px-6 py-5 space-y-4" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Başlık</label>
          <input type="text" required placeholder="Haftalık toplantı Perşembe'ye alındı" className="input-pro w-full" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Hedef kitle</label>
            <select className="input-pro w-full" style={{ WebkitAppearance: 'none' }}>
              <option>Tüm üyeler</option><option>Yalnızca yöneticiler</option><option>İlgili öğrenciler</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Tarih</label>
            <input type="date" className="input-pro w-full" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Mesaj</label>
          <textarea rows={4} className="input-pro w-full resize-none" placeholder="Neyin değiştiğini ve üyelerin ne yapması gerektiğini açıklayın." />
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all"
            style={{ border: '1px solid var(--bc2)', color: 'var(--text2)' }}>İptal</button>
          <button type="submit" className="flex-1 btn-primary py-2.5 text-sm justify-center">Yayınla 🚀</button>
        </div>
      </form>
    </div>
  </Modal>
)
