/**
 * Toast — hafif bildiri sistemi (external kütüphane yok).
 * Kullanım:
 *   const { showToast } = useToast()
 *   showToast('Başarıyla kaydedildi ✅')
 *   showToast('Bir hata oluştu', 'error')
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastCtx {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastCtx>({ showToast: () => {} })
export const useToast = () => useContext(ToastContext)

const ICONS: Record<ToastType, string> = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
}

const BG: Record<ToastType, string> = {
  success: 'rgba(52,211,153,0.15)',
  error: 'rgba(239,68,68,0.15)',
  info: 'var(--accent-muted)',
}

const BORDER: Record<ToastType, string> = {
  success: 'rgba(52,211,153,0.35)',
  error: 'rgba(239,68,68,0.35)',
  info: 'var(--accent-border)',
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container — ekranın sağ altında */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none"
        style={{ maxWidth: 340 }}
      >
        {toasts.map(t => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-xl"
            style={{
              background: BG[t.type],
              border: `1px solid ${BORDER[t.type]}`,
              backdropFilter: 'blur(12px)',
              color: 'var(--text1)',
              animation: 'slideInToast 0.3s ease-out',
            }}
          >
            <span className="text-base shrink-0">{ICONS[t.type]}</span>
            <span className="flex-1">{t.message}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </ToastContext.Provider>
  )
}
