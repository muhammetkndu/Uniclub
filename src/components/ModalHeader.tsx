/**
 * ModalHeader — Tüm modal'larda ortak kullanılan header şeridi.
 * Gradient arka plan, başlık, alt başlık ve kapat butonu içerir.
 */
type ModalHeaderProps = {
  id?: string         // aria-labelledby için başlık id'si
  title: string
  subtitle?: string
  onClose: () => void
}

export const ModalHeader = ({ id, title, subtitle, onClose }: ModalHeaderProps) => (
  <div
    className="px-6 py-4 flex items-center justify-between"
    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}
  >
    <div>
      <h2 id={id} className="text-sm font-extrabold text-white">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-white/60">{subtitle}</p>}
    </div>
    <button
      type="button"
      onClick={onClose}
      aria-label="Kapat"
      className="rounded-lg p-1.5 text-white/60 hover:bg-white/15 hover:text-white transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>
    </button>
  </div>
)
