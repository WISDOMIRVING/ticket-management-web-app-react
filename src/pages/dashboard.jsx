import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { getTickets } from '../utils/storage'
import { Link } from 'react-router-dom'
export default function Dashboard() {
  const [tickets, setTickets] = useState([])

  useEffect(()=> {
    try {
      const t = getTickets()
      setTickets(t)
    } catch {
      // handled in app via toasts if needed
    }
  },[])

  const total = tickets.length
  const open = tickets.filter(t=>t.status==='open').length
  const inprogress = tickets.filter(t=>t.status==='in_progress').length
  const closed = tickets.filter(t=>t.status==='closed').length

  return (
    <Layout>
      <h2>Dashboard</h2>
      <div className="grid two" style={{marginTop:'1rem'}}>
        <div className="card">
          <h4>Total tickets</h4>
          <div style={{fontSize:'2rem', fontWeight:800}}>{total}</div>
        </div>
        <div className="card">
          <h4>Open</h4>
          <div style={{fontSize:'1.5rem', fontWeight:700, color:'#065f46'}}>{open}</div>
        </div>
      </div>

      <div style={{marginTop:'1rem'}} className="grid two">
        <div className="card">
          <h4>In progress</h4>
          <div style={{fontSize:'1.5rem', fontWeight:700, color:'#92400e'}}>{inprogress}</div>
        </div>
        <div className="card">
          <h4>Closed</h4>
          <div style={{fontSize:'1.5rem', fontWeight:700, color:'#475569'}}>{closed}</div>
        </div>
      </div>

      <div style={{marginTop:'1rem'}}>
        <Link to="/tickets" className="btn">Go to Tickets</Link>
      </div>
    </Layout>
  )
}
