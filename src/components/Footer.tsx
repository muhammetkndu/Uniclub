import { Link } from 'react-router-dom'

const LINKS = {
  Platform: [
    { label: 'Ana Sayfa', to: '/' },
    { label: 'Kulüpleri Keşfet', to: '/clubs' },
    { label: 'Duyurular', to: '/announcements' },
  ],
  Topluluk: [
    { label: 'Kulüp Oluştur', to: '#' },
    { label: 'Etkinlikler', to: '#' },
    { label: 'Lider Tablosu', to: '#' },
  ],
  Şirket: [
    { label: 'Hakkımızda', to: '#' },
    { label: 'İletişim', to: '#' },
    { label: 'Gizlilik', to: '#' },
    { label: 'Kullanım Koşulları', to: '#' },
  ],
}

const SOCIAL = [
  { label: 'X', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'Instagram', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { label: 'GitHub', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
  { label: 'LinkedIn', href: '#', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
]

export const Footer = () => (
  <footer className="relative overflow-hidden" style={{ background: 'var(--surface-deep)', borderTop: '1px solid var(--bc)', transition: 'background 0.3s' }}>
    {/* Glow top line */}
    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2"
      style={{ background: 'var(--gradient-divider)' }} />

    <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
      <div className="grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div className="space-y-5">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-black text-white"
              style={{ background: 'var(--gradient-accent)', boxShadow: '0 0 16px var(--accent-glow)' }}>U</div>
            <span className="text-sm font-bold transition-colors group-hover:text-[var(--accent-text)]"
              style={{ color: 'var(--text2)', filter: 'brightness(1.5)' }}>UniClub</span>
          </Link>
          <p className="max-w-xs text-xs leading-relaxed" style={{ color: 'var(--text3)' }}>
            Üniversite kulüplerini ve öğrencileri bir araya getiren platform.
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:text-[var(--accent-text)]"
                style={{ background: 'var(--input-bg)', border: '1px solid var(--bc)', color: 'var(--text3)' }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {Object.entries(LINKS).map(([heading, items]) => (
          <div key={heading} className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--accent-text)' }}>{heading}</h3>
            <ul className="space-y-2.5">
              {items.map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-xs transition-colors hover:text-[var(--accent-text)]"
                    style={{ color: 'var(--text3)' }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: 'var(--accent-text)' }}>Bülten</h3>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text3)' }}>Yeni kulüpler ve etkinliklerden haberdar ol.</p>
          <form className="space-y-2" onSubmit={e => e.preventDefault()}>
            <input type="email" required placeholder="E-posta adresin" className="input-pro w-full text-xs py-2" />
            <button aria-label="Abone Ol" type="submit" className="btn-primary w-full text-xs py-2 justify-center">Abone Ol</button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center justify-between gap-3 border-t py-5 sm:flex-row" style={{ borderColor: 'var(--bc)' }}>
        <p className="text-[11px]" style={{ color: 'var(--text4)' }}>© {new Date().getFullYear()} UniClub. Tüm hakları saklıdır.</p>
        <div className="flex items-center gap-1.5">
          <span className="status-dot-online animate-pulse" />
          <span className="text-[11px]" style={{ color: 'var(--text4)' }}>Tüm sistemler çalışıyor</span>
        </div>
        <p className="text-[11px]" style={{ color: 'var(--text4)' }}>Türkiye'de ❤️ ile yapıldı</p>
      </div>
    </div>
  </footer>
)
