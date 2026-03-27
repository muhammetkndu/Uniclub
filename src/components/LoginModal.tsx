import { useState } from 'react'
import { Modal } from './Modal'
import { useToast } from '../context/ToastContext'

type LoginModalProps = { isOpen: boolean; onClose: () => void }

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simüle edilmiş giriş — gerçek backend bağlandığında burası güncellenir
    setTimeout(() => {
      setLoading(false)
      showToast('Başarıyla giriş yapıldı! 👋', 'success')
      onClose()
    }, 900)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelId="modal-login-title">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--bc2)' }}>
        {/* Header */}
        <div className="px-7 pt-7 pb-6"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black text-white"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.25)' }}>U</div>
              <span className="text-sm font-bold text-white">UniClub</span>
            </div>
            <button aria-label="Kapat" type="button" onClick={onClose}
              className="rounded-lg p-1.5 text-white/60 hover:bg-white/15 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>
          <h2 id="modal-login-title" className="text-xl font-black text-white">Tekrar Hoş Geldin 👋</h2>
          <p className="mt-1 text-xs text-white/60">Hesabına giriş yap ve kulüplerini yönet.</p>
        </div>

        <div className="px-7 py-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text3)' }}>E-posta</label>
              <input type="email" required placeholder="sen@universitesi.edu.tr" className="input-pro w-full" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold" style={{ color: 'var(--text3)' }}>Şifre</label>
                <button type="button" className="text-[11px] font-semibold transition-colors hover:text-[var(--accent-light)]"
                  style={{ color: 'var(--accent-text)' }}>
                  Şifremi unuttum
                </button>
              </div>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required placeholder="••••••••" className="input-pro w-full pr-10" />
                <button type="button" aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute inset-y-0 right-3 flex items-center transition-colors hover:text-[var(--accent-text)]"
                  style={{ color: 'var(--text3)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full py-2.5 text-sm justify-center disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Giriş yapılıyor...
                </span>
              ) : 'Giriş Yap'}
            </button>
          </form>
          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: 'var(--bc)' }} />
            <span className="text-[10px]" style={{ color: 'var(--text4)' }}>veya</span>
            <div className="h-px flex-1" style={{ background: 'var(--bc)' }} />
          </div>
          <p className="mt-4 text-center text-xs" style={{ color: 'var(--text3)' }}>
            Hesabın yok mu?{' '}
            <button type="button" onClick={onClose} className="font-bold transition-colors hover:text-[var(--accent-light)]"
              style={{ color: 'var(--accent-text)' }}>
              Kayıt ol →
            </button>
          </p>
        </div>
      </div>
    </Modal>
  )
}
