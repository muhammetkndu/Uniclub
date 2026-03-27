import { useState } from 'react'
import { Modal } from './Modal'
import { useToast } from '../context/ToastContext'

type SignupModalProps = { isOpen: boolean; onClose: () => void }
const STEPS = ['Hesap', 'Profil', 'Tercihler']
const INTERESTS = ['Teknoloji', 'Oyun', 'Sanat', 'Müzik', 'Spor', 'Girişimcilik', 'Bilim', 'Sosyal']

export const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()
  const next = (e: React.FormEvent) => { e.preventDefault(); setStep(s => Math.min(s + 1, 2)) }
  const back = () => setStep(s => Math.max(s - 1, 0))
  const handleClose = () => { setStep(0); onClose() }

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simüle edilmiş kayıt — gerçek backend bağlandığında güncellenir
    setTimeout(() => {
      setLoading(false)
      showToast('Hesabın oluşturuldu! Hoş geldin 🎉', 'success')
      handleClose()
    }, 1000)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} labelId="modal-signup-title">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl"
        style={{ background: 'var(--surface)', border: '1px solid var(--bc2)' }}>
        {/* Header */}
        <div className="px-7 pt-6 pb-5"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black text-white"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.25)' }}>U</div>
              <span className="text-sm font-bold text-white">UniClub</span>
            </div>
            <button aria-label="Kapat" type="button" onClick={handleClose}
              className="rounded-lg p-1.5 text-white/60 hover:bg-white/15 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
              </svg>
            </button>
          </div>
          <h2 id="modal-signup-title" className="text-xl font-black text-white">Hesap Oluştur ✨</h2>
          {/* Progress stepper */}
          <div className="mt-4 flex items-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col items-center gap-1">
                <div className={['flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all',
                  i < step ? 'bg-white text-[var(--accent-dark)]' : i === step ? 'bg-white/30 text-white border border-white/50' : 'bg-white/10 text-white/30'].join(' ')}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={['text-[9px] font-semibold', i <= step ? 'text-white' : 'text-white/30'].join(' ')}>{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 w-full rounded-full bg-white/15">
            <div className="h-1 rounded-full bg-white transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        </div>

        <div className="px-7 py-5">
          {/* Adım 0: Hesap */}
          {step === 0 && (
            <form className="space-y-3.5" onSubmit={next}>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text3)' }}>E-posta</label><input type="email" required placeholder="sen@universitesi.edu.tr" className="input-pro w-full" /></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text3)' }}>Şifre</label><input type="password" required placeholder="En az 8 karakter" minLength={8} className="input-pro w-full" /></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text3)' }}>Şifre tekrar</label><input type="password" required placeholder="••••••••" className="input-pro w-full" /></div>
              <button type="submit" className="btn-primary w-full py-2.5 text-sm justify-center">Devam →</button>
            </form>
          )}

          {/* Adım 1: Profil */}
          {step === 1 && (
            <form className="space-y-3.5" onSubmit={next}>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text3)' }}>Ad Soyad</label><input type="text" required placeholder="Adın Soyadın" className="input-pro w-full" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text3)' }}>Üniversite</label><input type="text" required placeholder="Üniversite" className="input-pro w-full" /></div>
                <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text3)' }}>Bölüm</label><input type="text" placeholder="Bilg. Müh." className="input-pro w-full" /></div>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={back} className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all" style={{ border: '1px solid var(--bc2)', color: 'var(--text2)' }}>← Geri</button>
                <button type="submit" className="flex-1 btn-primary py-2.5 text-sm justify-center">Devam →</button>
              </div>
            </form>
          )}

          {/* Adım 2: Tercihler + final submit */}
          {step === 2 && (
            <form className="space-y-3.5" onSubmit={handleFinalSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text3)' }}>Sınıf</label>
                  <select className="input-pro w-full" style={{ WebkitAppearance: 'none' }}>
                    {['1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf', 'Lisansüstü'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text3)' }}>Rol</label>
                  <select className="input-pro w-full" style={{ WebkitAppearance: 'none' }}>
                    {['Üye', 'Kulüp Yöneticisi', 'Akademisyen'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text3)' }}>İlgi alanların</p>
                <div className="flex flex-wrap gap-1.5">
                  {INTERESTS.map(tag => (
                    <label key={tag} className="cursor-pointer">
                      <input type="checkbox" className="peer sr-only" />
                      <span className="inline-block rounded-full px-3 py-1 text-xs font-medium transition-all peer-checked:text-white"
                        style={{ background: 'var(--input-bg)', border: '1px solid var(--bc2)', color: 'var(--text2)' }}
                        onMouseOver={e => { if (!(e.currentTarget.previousElementSibling as HTMLInputElement)?.checked) e.currentTarget.style.borderColor = 'var(--accent-border)' }}
                        onMouseOut={e => { if (!(e.currentTarget.previousElementSibling as HTMLInputElement)?.checked) e.currentTarget.style.borderColor = 'var(--bc2)' }}>
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={back} className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all" style={{ border: '1px solid var(--bc2)', color: 'var(--text2)' }}>← Geri</button>
                <button type="submit" disabled={loading} className="flex-1 btn-primary py-2.5 text-sm justify-center disabled:opacity-60">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Kaydediliyor...
                    </span>
                  ) : 'Kayıt Ol 🎉'}
                </button>
              </div>
            </form>
          )}
          <p className="mt-5 text-center text-xs" style={{ color: 'var(--text4)' }}>
            Zaten hesabın var mı? <button type="button" onClick={handleClose}
              className="font-bold transition-colors hover:text-[var(--accent-light)]" style={{ color: 'var(--accent-text)' }}>Giriş yap →</button>
          </p>
        </div>
      </div>
    </Modal>
  )
}
