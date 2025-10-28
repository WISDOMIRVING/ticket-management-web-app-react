import React from 'react'
import { Link } from 'react-router-dom'
// import wave from '../../assets/wave.svg'

export default function Landing() {
  return (
    <section className="hero container" aria-labelledby="hero-title" role="region">
      <div className="hero-inner">
        <div style={{zIndex:2}}>
          <h1 id="hero-title">TicketPlay — Manage work like play</h1>
          <p>A simple, friendly ticket manager. Create, track, and close tickets without the fuss.</p>
          <div className="cta">
            <Link to="/auth/login" className="btn">Login</Link>
            <Link to="/auth/signup" className="btn ghost">Get Started</Link>
          </div>
        </div>

        <div className="grid two" style={{marginTop:'1rem', zIndex:2}}>
          <div className="card">
            <h3>Quick & simple</h3>
            <p style={{margin:0,color:'#6b7280'}}>Create tickets quickly and update statuses in seconds.</p>
          </div>
          <div className="card">
            <h3>Availability & Accessibility</h3>
            <p style={{margin:0,color:'#6b7280'}}>Works great on phones, tablets, and big screens.</p>
          </div>
        </div>
      </div>

      <div className="decor-circle" aria-hidden="true"></div>

      <img src="/assets/wave.svg" alt="" aria-hidden="true" style={{display:'block', width:'100%'}} />
    </section>
  )
}
