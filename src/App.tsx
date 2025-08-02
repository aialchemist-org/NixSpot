import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './components/pages/Dashboard'
import Repositories from './components/pages/Repositories'
import Repository from './components/pages/Repository'
import PullRequests from './components/pages/PullRequests'
import CodeEditor from './components/pages/CodeEditor'
import AdminPanel from './components/pages/AdminPanel'
import Settings from './components/pages/Settings'
import AuthModal from './components/modals/AuthModal'
import VoiceGuide from './components/features/VoiceGuide'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { VoiceProvider } from './contexts/VoiceContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <ThemeProvider>
      <AuthProvider>
        <VoiceProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300">
              <Header 
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                onAuthClick={() => setShowAuthModal(true)}
              />
              
              <div className="flex">
                <Sidebar 
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
                
                <main className="flex-1 p-6 ml-0 lg:ml-64 transition-all duration-300">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/repositories" element={<Repositories />} />
                      <Route path="/repository/:id" element={<Repository />} />
                      <Route path="/repository/:id/editor" element={<CodeEditor />} />
                      <Route path="/pull-requests" element={<PullRequests />} />
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </AnimatePresence>
                </main>
              </div>

              <VoiceGuide />
              
              <AnimatePresence>
                {showAuthModal && (
                  <AuthModal onClose={() => setShowAuthModal(false)} />
                )}
              </AnimatePresence>
            </div>
          </Router>
        </VoiceProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App