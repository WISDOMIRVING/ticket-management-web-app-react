import React from 'react'
import { Navigate } from 'react-router-dom'
import { getSession } from '../utils/storage'

export default function ProtectedRoute({ children }) {
  const session = getSession()
  if (!session || (session.expiresAt && Date.now() > session.expiresAt)) {
    // session expired or missing
    localStorage.removeItem('ticketapp_session')
    return <Navigate to="/auth/login" replace state={{ message: 'Your session has expired — please log in again.' }} />
  }
  return children
}
