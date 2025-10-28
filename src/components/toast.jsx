import React, { useEffect } from 'react'

export default function Toast({ id, message, type='success', onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(id), 4000)
    return () => clearTimeout(t)
  }, [id, onClose])

  return (
    <div className={`toast ${type === 'error' ? 'error' : 'success'}`} role="status" aria-live="polite">
      {message}
    </div>
  )
}
