export const SESSION_KEY = 'ticketapp_session'
export const TICKETS_KEY = 'ticketapp_tickets_v1'

export function saveSession(sessionObj) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj))
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function getTickets() {
  const raw = localStorage.getItem(TICKETS_KEY)
  if (!raw) return []
  try { return JSON.parse(raw) } catch { return [] }
}

export function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
}
