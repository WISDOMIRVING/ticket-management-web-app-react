import React, { useState, useEffect } from 'react'

const VALID_STATUSES = ['open','in_progress','closed']

export default function TicketForm({ initial = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [status, setStatus] = useState(initial?.status || 'open')
  const [description, setDescription] = useState(initial?.description || '')
  const [priority, setPriority] = useState(initial?.priority || '')
  const [errors, setErrors] = useState({})

  useEffect(()=> {
    setErrors(validate({title, status, description, priority}))
  }, [title, status, description, priority])

  function validate(values) {
    const e = {}
    if (!values.title || !values.title.trim()) e.title = 'Please enter a title.'
    if (!VALID_STATUSES.includes(values.status)) e.status = 'Status must be open, in_progress, or closed.'
    if (values.description && values.description.length > 1000) e.description = 'Description is too long.'
    if (values.priority && !['low','medium','high'].includes(values.priority)) e.priority = 'Priority invalid.'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const v = validate({title, status, description, priority})
    setErrors(v)
    if (Object.keys(v).length) return
    onSubmit({ title: title.trim(), status, description: description.trim(), priority })
    // reset for create
    if (!initial) {
      setTitle(''); setStatus('open'); setDescription(''); setPriority('')
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label={initial ? 'Edit ticket' : 'Create ticket'}>
      <div className="form-row">
        <label htmlFor="title">Title</label>
        <input id="title" className="input" value={title} onChange={e=>setTitle(e.target.value)} />
        {errors.title && <div className="field-error">{errors.title}</div>}
      </div>
      <div className="form-row">
        <label htmlFor="status">Status</label>
        <select id="status" value={status} className="input" onChange={e=>setStatus(e.target.value)}>
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>
        {errors.status && <div className="field-error">{errors.status}</div>}
      </div>
      <div className="form-row">
        <label htmlFor="desc">Description (optional)</label>
        <textarea id="desc" rows="4" className="input" value={description} onChange={e=>setDescription(e.target.value)} />
        {errors.description && <div className="field-error">{errors.description}</div>}
      </div>
      <div className="form-row">
        <label htmlFor="priority">Priority (optional)</label>
        <select id="priority" value={priority} className="input" onChange={e=>setPriority(e.target.value)}>
          <option value="">-- select --</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        {errors.priority && <div className="field-error">{errors.priority}</div>}
      </div>

      <div style={{display:'flex', gap:'.5rem'}}>
        <button type="submit" className="btn">{initial ? 'Save' : 'Create'}</button>
        {onCancel && <button onClick={(e)=>{e.preventDefault(); onCancel()}} className="btn ghost">Cancel</button>}
      </div>
    </form>
  )
}
