import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'
import { useToast } from '../context/ToastContext'

type CreateClubModalProps = { isOpen: boolean; onClose: () => void }

export const CreateClubModal = ({ isOpen, onClose }: CreateClubModalProps) => {
  const { showToast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = (fd.get('name') as string)?.trim()
    if (!name) return
    showToast(`"${name}" kulübü oluşturuldu 🏛`, 'success')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelId="modal-createclub-title">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--bc2)' }}>
        <ModalHeader id="modal-createclub-title"
          title="Yeni Kulüp Oluştur 🏛"
          subtitle="Kulübünü tanımla ve topluluğunu kur."
          onClose={onClose}
        />
        <form className="px-6 py-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Kulüp adı *</label>
            <input name="name" type="text" required placeholder="Developer Student Community" className="input-pro w-full" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Kategori</label>
              <select name="category" className="input-pro w-full" style={{ WebkitAppearance: 'none' }}>
                {['Teknoloji', 'Sanat', 'Spor', 'Sosyal', 'İş Dünyası', 'Bilim', 'Oyun'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Kampüs</label>
              <input name="campus" type="text" placeholder="Ana Kampüs" className="input-pro w-full" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Kısa açıklama</label>
            <textarea name="about" rows={3} className="input-pro w-full resize-none" placeholder="Kulübünüzün ne yaptığını anlatın." />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Toplantı sıklığı</label>
              <select name="frequency" className="input-pro w-full" style={{ WebkitAppearance: 'none' }}>
                {['Haftada bir', 'İki haftada bir', 'Ayda bir'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Tahmini üye sayısı</label>
              <input name="members" type="number" min={1} placeholder="50" className="input-pro w-full" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>
              Sosyal medya <span style={{ color: 'var(--text4)' }}>(opsiyonel)</span>
            </label>
            <textarea name="social" rows={2} className="input-pro w-full resize-none" placeholder="Instagram, Twitter veya web sitesi" />
          </div>
          <div className="flex gap-3 pt-1">
            <button aria-label="İptal" type="button" onClick={onClose}
              className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all"
              style={{ border: '1px solid var(--bc2)', color: 'var(--text2)' }}>
              İptal
            </button>
            <button aria-label="Kulüp Oluştur" type="submit" className="flex-1 btn-primary py-2.5 text-sm justify-center">
              Kulüp Oluştur 🚀
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
