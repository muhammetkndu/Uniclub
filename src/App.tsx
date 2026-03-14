import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { ClubsPage } from './pages/ClubsPage'
import { AnnouncementsPage } from './pages/AnnouncementsPage'
import { LoginModal } from './components/LoginModal'
import { SignupModal } from './components/SignupModal'
import { CreateClubModal } from './components/CreateClubModal'
import { CreateAnnouncementModal } from './components/CreateAnnouncementModal'
import { CreatePostModal } from './components/CreatePostModal'
import { Footer } from './components/Footer'

type ModalType = 'login' | 'signup' | 'createClub' | 'createAnnouncement' | 'createPost' | null

const AppInner = () => {
  const [modal, setModal] = useState<ModalType>(null)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', transition: 'background 0.3s' }} className="text-[#EEEEFF] antialiased flex flex-col">
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <LoginModal isOpen={modal === 'login'} onClose={() => setModal(null)} />
      <SignupModal isOpen={modal === 'signup'} onClose={() => setModal(null)} />
      <CreateClubModal isOpen={modal === 'createClub'} onClose={() => setModal(null)} />
      <CreateAnnouncementModal isOpen={modal === 'createAnnouncement'} onClose={() => setModal(null)} />
      <CreatePostModal isOpen={modal === 'createPost'} onClose={() => setModal(null)} />
    </div>
  )
}

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  </ThemeProvider>
)

export default App
