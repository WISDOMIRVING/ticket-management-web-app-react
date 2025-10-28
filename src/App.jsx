import React, { useCallback, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Dashboard from './pages/dashboard'
import Tickets from './pages/tickets/tickets'
import ProtectedRoute from './components/protectedroute'
import Toast from './components/toast'
import Layout from './components/layout'
import { seedTestUser } from './utils/auth'

export default function App() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ message, type='success' }) => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, message, type }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  // seed sample user upon app load
  seedTestUser()

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Layout><Login addToast={addToast} /></Layout>} />
        <Route path="/auth/signup" element={<Layout><Signup addToast={addToast} /></Layout>} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/tickets" element={
          <ProtectedRoute>
            <Tickets addToast={addToast} />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Layout><div className="card">Not found</div></Layout>} />
      </Routes>

      <div className="toast-wrapper" aria-live="polite" aria-atomic="true">
        {toasts.map(t => <Toast key={t.id} id={t.id} message={t.message} type={t.type} onClose={removeToast} />)}
      </div>
    </>
  )
}
