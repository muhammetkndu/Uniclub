import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'

type CreateAnnouncementModalProps = { isOpen: boolean; onClose: () => void }

export const CreateAnnouncementModal = ({ isOpen, onClose }: CreateAnnouncementModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} labelId="modal-announcement-title">
    <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: 'var(--surface)', border: '1px solid var(--bc2)' }}>
      <ModalHeader id="modal-announcement-title"
        title="Duyuru Yayınla 📢"
        subtitle="Tüm üyelerle önemli güncellemeleri paylaş."
        onClose={onClose}
      />
      <form className="px-6 py-5 space-y-4" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Başlık</label>
          <input type="text" required placeholder="Haftalık toplantı Perşembe'ye alındı" className="input-pro w-full" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>Hedef kitle</label>
            <select className="input-pro w-full" style={{ WebkitAppearance: 'none' }}>
              <option>Tüm üyeler</option>
              <option>Yalnızca yöneticiler</option>
              <option>İlgili öğrenciler</option>
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
          <button aria-label="İptal" type="button" onClick={onClose}
            className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all"
            style={{ border: '1px solid var(--bc2)', color: 'var(--text2)' }}>
            İptal
          </button>
          <button aria-label="Yayınla" type="submit" className="flex-1 btn-primary py-2.5 text-sm justify-center">
            Yayınla 🚀
          </button>
        </div>
      </form>
    </div>
  </Modal>
)
