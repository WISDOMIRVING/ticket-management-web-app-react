import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { login, seedTestUser } from '../../utils/auth'
import { getSession } from '../../utils/storage'

export default function Login({ addToast }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(()=>{ seedTestUser() },[])

  function handleSubmit(e){
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Please fill in both email and password.')
      return
    }
    const res = login({email, password})
    if (!res.success) {
      addToast({ message: res.message, type: 'error' })
      setError(res.message)
      return
    }
    addToast({ message: 'Logged in successfully.' })
    navigate('/dashboard')
  }

  const stateMessage = location.state?.message

  return (
    <div style={{maxWidth:620, marginTop:'1rem'}}>
      <h2>Login</h2>
      {stateMessage && <div className="card" style={{marginBottom:'.6rem'}}>{stateMessage}</div>}
      <form onSubmit={handleSubmit} aria-label="Login form">
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {error && <div className="field-error" role="alert">{error}</div>}
        <div style={{display:'flex', gap:'.5rem', marginTop:'0.6rem'}}>
          <button type="submit" className="btn">Login</button>
          <Link to="/auth/signup" className="btn ghost">Sign up</Link>
        </div>
      </form>
    </div>
  )
}
