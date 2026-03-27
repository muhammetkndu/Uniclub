import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { ClubsPage } from './pages/ClubsPage'
import { AnnouncementsPage } from './pages/AnnouncementsPage'
import { LoginModal } from './components/LoginModal'
import { SignupModal } from './components/SignupModal'
import { CreateClubModal } from './components/CreateClubModal'
import { CreatePostModal } from './components/CreatePostModal'
import { Footer } from './components/Footer'
import { BlogPage } from './pages/BlogPage'
import { BlogDetailPage } from './pages/BlogDetailPage'

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
        <Routes>
          <Route path="/" element={<HomePage onCreateClubClick={() => setModal('createClub')} onCreatePostClick={() => setModal('createPost')} />} />
          <Route path="/clubs" element={<ClubsPage onCreateClubClick={() => setModal('createClub')} />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <LoginModal isOpen={modal === 'login'} onClose={() => setModal(null)} />
      <SignupModal isOpen={modal === 'signup'} onClose={() => setModal(null)} />
      <CreateClubModal isOpen={modal === 'createClub'} onClose={() => setModal(null)} />
      <CreatePostModal isOpen={modal === 'createPost'} onClose={() => setModal(null)} />
      {/* CreateAnnouncementModal: ModalType'a 'createAnnouncement' eklenince buraya bağlanır */}
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