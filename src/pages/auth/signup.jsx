import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../utils/auth'

export default function Signup({ addToast }) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!name.trim()) e.name = 'Please enter your name.'
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please enter a valid email.'
    if (!password || password.length < 8) e.password = 'Password must be at least 8 characters.'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length) return
    const res = signup({name, email, password})
    if (!res.success) {
      addToast({ message: res.message, type:'error' })
      return
    }
    addToast({ message:'Account created. Redirecting to dashboard.' })
    navigate('/dashboard')
  }

  return (
    <div style={{maxWidth:620, marginTop:'1rem'}}>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Your name</label>
          <input id="name" className="input" value={name} onChange={e=>setName(e.target.value)} />
          {errors.name && <div className="field-error">{errors.name}</div>}
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </div>
        <div style={{display:'flex', gap:'.5rem', marginTop:'0.6rem'}}>
          <button type="submit" className="btn">Create account</button>
        </div>
      </form>
    </div>
  )
}
