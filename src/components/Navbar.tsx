import { useState, useRef } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

interface NavbarProps {
  onLoginClick: () => void
  onSignupClick: () => void
  onCreateClubClick: () => void
}

const navLinks = [
  { to: '/', label: 'Ana Sayfa', end: true },
  { to: '/clubs', label: 'Kulüpler' },
  { to: '/announcements', label: 'Duyurular' },
  { to: '/blog', label: 'blog yazıları' },
]

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
)
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
)

export const Navbar = ({ onLoginClick, onSignupClick, onCreateClubClick }: NavbarProps) => {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef<HTMLInputElement>(null)
  const { isDark, toggle } = useTheme()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/clubs?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
      searchRef.current?.blur()
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="border-b" style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(16px)', borderColor: 'var(--bc)', transition: 'background 0.3s' }}>
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-3.5 lg:px-8">

          {/* Logo */}
          <Link rel="preconnect" to="/" className="flex shrink-0 items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-black text-white"
              style={{ background: 'linear-gradient(135deg, #7C5CFC, #5B4ED9)', boxShadow: '0 0 16px rgba(124,92,252,0.5)' }}>U</div>
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-violet-400 transition-colors"
              style={{ color: isDark ? '' : '#1a1a2e' }}>
              UniClub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map(({ to, label, end }) => (
              <NavLink rel="preconnect" key={to} to={to} end={end}
                className="px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150"
                style={({ isActive }) => ({
                  background: isActive ? 'rgba(124,92,252,0.12)' : undefined,
                  border: isActive ? '1px solid rgba(124,92,252,0.2)' : '1px solid transparent',
                  color: isActive ? '#a78bfa' : 'var(--text2)',
                })}>
                {label}
              </NavLink>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative flex flex-1 items-center rounded-xl transition-all duration-200"
            style={{ background: 'var(--input-bg)', border: '1px solid var(--input-bc)' }}>
            <svg className="ml-3 h-4 w-4 shrink-0" style={{ color: 'var(--text3)' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
            </svg>
            <input ref={searchRef} type="search" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Kulüp veya etkinlik ara..."
              className="w-full bg-transparent py-2 pl-2.5 pr-3 text-sm outline-none"
              style={{ color: isDark ? '#e0e0f0' : '#000000' }} />
            {search && (
              <button aria-label='Ara' type="submit" className="mr-2 rounded-lg px-2.5 py-1 text-xs font-semibold text-white transition-colors"
                style={{ background: 'rgba(124,92,252,0.6)' }}>Ara</button>
            )}
          </form>

          {/* Actions */}
          <div className="hidden items-center gap-2 md:flex shrink-0">
            {/* Create Club */}
            <button aria-label='Kulüp Oluştur' type="button" onClick={onCreateClubClick} className="btn-ghost text-xs px-3 py-2">
              + Kulüp Oluştur
            </button>

            {/* Dark/Light toggle */}
            <button
              type="button"
              aria-label='Mod Değiş'
              onClick={toggle}
              title={isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
              className="flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                width: 36, height: 36,
                background: isDark ? 'rgba(252, 232, 232, 0.06)' : 'rgba(0,0,0,0.06)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                color: isDark ? '#f9d96b' : '#7C5CFC',
              }}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Auth */}
            <button aria-label='Giriş Yap' type="button" onClick={onLoginClick}
              className="px-4 py-2 text-sm font-medium rounded-xl transition-all"
              style={{ border: '1px solid var(--bc2)', color: 'var(--text2)', background: 'var(--input-bg)' }}>
              Giriş Yap
            </button>
            <button aria-label='Kayıt Ol' type="button" onClick={onSignupClick} className="btn-primary text-sm px-4 py-2">
              Kayıt Ol
            </button>
          </div>

          {/* Mobile hamburger */}
          <button aria-label='menü' type="button" onClick={() => setMenuOpen(o => !o)}
            className="ml-auto flex items-center justify-center rounded-lg p-1.5 md:hidden transition-colors"
            style={{ border: '1px solid var(--bc2)', color: 'var(--text2)' }}>
            {menuOpen
              ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            }
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t md:hidden" style={{ background: 'var(--bg)', borderColor: 'var(--bc)' }}>
            <div className="flex flex-col gap-0.5 px-4 py-3">
              {navLinks.map(({ to, label, end }) => (
                <NavLink rel="preconnect" key={to} to={to} end={end} onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium"
                  style={({ isActive }) => ({
                    background: isActive ? 'rgba(124,92,252,0.1)' : undefined,
                    color: isActive ? '#a78bfa' : 'var(--text2)',
                  })}>
                  {label}
                </NavLink>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t pt-3" style={{ borderColor: 'var(--bc)' }}>
                <button aria-label='Mod Değiştir' type="button" onClick={toggle} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all"
                  style={{ border: '1px solid var(--bc2)', color: isDark ? '#f9d96b' : '#7C5CFC', background: 'var(--input-bg)' }}>
                  {isDark ? <><SunIcon /> Aydınlık</> : <><MoonIcon /> Karanlık</>}
                </button>
                <button aria-label='Giriş Yap' type="button" onClick={() => { setMenuOpen(false); onLoginClick() }} className="flex-1 rounded-xl py-2 text-sm font-medium" style={{ border: '1px solid var(--bc2)', color: 'var(--text2)' }}>Giriş Yap</button>
                <button aria-label='Kayıt Ol' type="button" onClick={() => { setMenuOpen(false); onSignupClick() }} className="flex-1 btn-primary text-sm py-2 justify-center">Kayıt Ol</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
