import { useEffect, useRef, type ReactNode } from 'react'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  labelId?: string
}

export const Modal = ({ isOpen, onClose, children, labelId }: ModalProps) => {
  const backdropRef = useRef<HTMLDivElement>(null)

  /* ESC tuşu ile kapat + ilk odaklanabilir elemana focus */
  useEffect(() => {
    if (!isOpen) return

    // ESC ile kapat
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    // İlk odaklanabilir elemana geç (focus trap başlangıcı)
    const focusable = backdropRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable?.[0]
    const prev = document.activeElement as HTMLElement | null
    if (first) {
      // Küçük gecikme ile focus — CSS transition tamamlanmadan önce focus gitmesini önler
      const timer = setTimeout(() => first.focus(), 50)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('keydown', handleKeyDown)
        prev?.focus()   // modal kapanınca önceki odağa dön
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      prev?.focus()
    }
  }, [isOpen, onClose])

  /* Tab trap: son elemandan ilke, ilkten sona döner */
  const handleTabTrap = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const focusable = backdropRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable || focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      onKeyDown={handleTabTrap}
    >
      {children}
    </div>
  )
}
