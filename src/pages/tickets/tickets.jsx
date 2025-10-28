import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { getTickets, saveTickets } from '../../utils/storage'
import TicketForm from './ticketsform'
import { v4 as uuidv4 } from 'uuid'

export default function Tickets({ addToast }) {
  const [tickets, setTickets] = useState([])
  const [editing, setEditing] = useState(null)
  const [showNew, setShowNew] = useState(false)

  useEffect(()=> { setTickets(getTickets()) }, [])

  function handleCreate(data) {
    const newTicket = {...data, id: uuidv4(), createdAt: Date.now(), updatedAt: Date.now()}
    const updated = [newTicket, ...tickets]
    setTickets(updated)
    saveTickets(updated)
    addToast({ message: 'Ticket created.' })
    setShowNew(false)
  }
  function handleUpdate(id, data) {
    const updated = tickets.map(t => t.id === id ? {...t, ...data, updatedAt: Date.now()} : t)
    setTickets(updated)
    saveTickets(updated)
    setEditing(null)
    addToast({ message: 'Ticket updated.' })
  }
  function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this ticket?')) return
    const updated = tickets.filter(t=>t.id !== id)
    setTickets(updated)
    saveTickets(updated)
    addToast({ message: 'Ticket deleted.' })
  }

  return (
    <Layout>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem'}}>
        <h2>Tickets</h2>
        <div>
          <button onClick={()=>setShowNew(s=>!s)} className="btn">{showNew ? 'Close' : 'New Ticket'}</button>
        </div>
      </div>

      {showNew && <div style={{marginTop:'.8rem'}}><TicketForm onSubmit={handleCreate} /></div>}

      <div className="grid three" style={{marginTop:'1rem'}}>
        {tickets.length === 0 && <div className="card">No tickets yet. Create one!</div>}
        {tickets.map(t => (
          <div className="card ticket-card" key={t.id}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <h3>{t.title}</h3>
                <small>{t.description?.slice(0,120)}</small>
              </div>
              <div style={{textAlign:'right'}}>
                <div className={`badge ${t.status}`}>{t.status.replace('_',' ')}</div>
                <div style={{marginTop:'.5rem', display:'flex', gap:'.4rem', justifyContent:'flex-end'}}>
                  <button onClick={()=>setEditing(t)} className="btn ghost">Edit</button>
                  <button onClick={()=>handleDelete(t.id)} className="btn">Delete</button>
                </div>
              </div>
            </div>
            <div style={{display: editing && editing.id === t.id ? 'block' : 'none', marginTop:'.5rem'}}>
              {editing && editing.id === t.id && (
                <TicketForm initial={editing} onSubmit={(data)=>handleUpdate(editing.id, data)} onCancel={()=>setEditing(null)} />
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
