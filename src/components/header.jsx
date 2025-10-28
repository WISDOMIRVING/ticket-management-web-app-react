import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { isAuthenticated, clearSession } from '../utils/storage'

export default function Header() {
  const navigate = useNavigate()
  function handleLogout(){
    localStorage.removeItem('ticketapp_session')
    navigate('/')
  }
  const auth = !!localStorage.getItem('ticketapp_session')

  return (
    <div className="header-inner" style={{paddingTop:'.5rem', paddingBottom:'.5rem'}}>
      <div style={{display:'flex', alignItems:'center', gap:'.6rem'}}>
        <Link to="/" className="brand" aria-label="TicketPlay home">TicketPlay</Link>
        <nav className="nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          {auth && <Link to="/dashboard">Dashboard</Link>}
          {auth && <Link to="/tickets">Tickets</Link>}
        </nav>
      </div>

      <div style={{display:'flex', gap:'.6rem', alignItems:'center'}}>
        {!auth ? (
          <>
            <Link to="/auth/login" className="btn ghost">Login</Link>
            <Link to="/auth/signup" className="btn">Get Started</Link>
          </>
        ) : (
          <>
            <button onClick={()=>navigate('/tickets')} className="btn ghost">Manage Tickets</button>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        )}
      </div>
    </div>
  )
}
