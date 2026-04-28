import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

// Eager: ana sayfa (LCP)
import { HomePage } from './pages/HomePage'

// Lazy: diğer sayfalar — ayrı chunk'lara bölünür
const ClubsPage = lazy(() => import('./pages/ClubsPage').then(m => ({ default: m.ClubsPage })))
const AnnouncementsPage = lazy(() => import('./pages/AnnouncementsPage').then(m => ({ default: m.AnnouncementsPage })))
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })))
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })))

// Lazy: modal'lar — kullanıcı etkileşimine kadar yüklenmez
const LoginModal = lazy(() => import('./components/LoginModal').then(m => ({ default: m.LoginModal })))
const SignupModal = lazy(() => import('./components/SignupModal').then(m => ({ default: m.SignupModal })))
const CreateClubModal = lazy(() => import('./components/CreateClubModal').then(m => ({ default: m.CreateClubModal })))
const CreatePostModal = lazy(() => import('./components/CreatePostModal').then(m => ({ default: m.CreatePostModal })))

type ModalType = 'login' | 'signup' | 'createClub' | 'createPost' | null

const AppInner = () => {
  const [modal, setModal] = useState<ModalType>(null)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text1)', transition: 'background 0.3s, color 0.3s' }} className="antialiased flex flex-col">
      <Navbar
        onLoginClick={() => setModal('login')}
        onSignupClick={() => setModal('signup')}
        onCreateClubClick={() => setModal('createClub')}
      />
      <main className="flex-1">
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <Routes>
            <Route path="/" element={<HomePage onCreateClubClick={() => setModal('createClub')} onCreatePostClick={() => setModal('createPost')} />} />
            <Route path="/clubs" element={<ClubsPage onCreateClubClick={() => setModal('createClub')} />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        {modal === 'login' && <LoginModal isOpen onClose={() => setModal(null)} />}
        {modal === 'signup' && <SignupModal isOpen onClose={() => setModal(null)} />}
        {modal === 'createClub' && <CreateClubModal isOpen onClose={() => setModal(null)} />}
        {modal === 'createPost' && <CreatePostModal isOpen onClose={() => setModal(null)} />}
      </Suspense>
    </div>
  )
}

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  </HelmetProvider>
)

export default App