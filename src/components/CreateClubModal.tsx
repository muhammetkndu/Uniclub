import { Modal } from './Modal'

type CreateClubModalProps = { isOpen: boolean; onClose: () => void }

export const CreateClubModal = ({ isOpen, onClose }: CreateClubModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: 'var(--surface)', border: '1px solid var(--bc2)' }}>
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-extrabold text-white">Yeni Kulüp Oluştur 🏛</h2>
          <p className="mt-0.5 text-xs text-white/60">Kulübünü tanımla ve topluluğunu kur.</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-white/60 hover:bg-white/15 hover:text-white transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/></svg>
        </button>
      </div>
      <form className="px-6 py-5 space-y-4" onSubmit={e => { e.preventDefault(); onClose() }}>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Kulüp adı *</label>
          <input type="text" required placeholder="Developer Student Community" className="input-pro w-full" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Kategori</label>
            <select className="input-pro w-full" style={{ WebkitAppearance: 'none' }}>
              {['Teknoloji', 'Sanat', 'Spor', 'Sosyal', 'İş Dünyası', 'Bilim', 'Oyun'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Kampüs</label>
            <input type="text" placeholder="Ana Kampüs" className="input-pro w-full" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Kısa açıklama</label>
          <textarea rows={3} className="input-pro w-full resize-none" placeholder="Kulübünüzün ne yaptığını anlatın." />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Toplantı sıklığı</label>
            <select className="input-pro w-full" style={{ WebkitAppearance: 'none' }}>
              {['Haftada bir', 'İki haftada bir', 'Ayda bir'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Tahmini üye sayısı</label>
            <input type="number" min={1} placeholder="50" className="input-pro w-full" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>
            Sosyal medya <span style={{ color: 'var(--text4)' }}>(opsiyonel)</span>
          </label>
          <textarea rows={2} className="input-pro w-full resize-none" placeholder="Instagram, Twitter veya web sitesi" />
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all"
            style={{ border: '1px solid var(--bc2)', color: 'var(--text2)' }}>İptal</button>
          <button type="submit" className="flex-1 btn-primary py-2.5 text-sm justify-center">Kulüp Oluştur 🚀</button>
        </div>
      </form>
    </div>
  </Modal>
)
