import { createContext, useContext, useState, useEffect } from 'react'

interface ThemeCtx { isDark: boolean; toggle: () => void }
const ThemeContext = createContext<ThemeCtx>({ isDark: true, toggle: () => {} })
export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('uc-theme') !== 'light' } catch { return true }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    try { localStorage.setItem('uc-theme', isDark ? 'dark' : 'light') } catch {}
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}
