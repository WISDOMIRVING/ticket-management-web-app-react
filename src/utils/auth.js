import { v4 as uuidv4 } from 'uuid'
import { saveSession, getSession } from './storage'

// Simulated auth: basic signup & login stored in localStorage (not secure; for demo only)
const USERS_KEY = 'ticketapp_users_v1'

function _getUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  return raw ? JSON.parse(raw) : []
}
function _saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function seedTestUser() {
  const exists = _getUsers().some(u => u.email === 'test@ticket.app')
  if (!exists) {
    const users = _getUsers()
    users.push({ id: uuidv4(), name: 'Test User', email: 'test@ticket.app', password: 'Password123!' })
    _saveUsers(users)
  }
}

export function signup({name, email, password}) {
  const users = _getUsers()
  if (users.some(u => u.email === email)) {
    return { success:false, message: 'Email already registered.'}
  }
  const newUser = { id: uuidv4(), name, email, password }
  users.push(newUser)
  _saveUsers(users)
  const token = uuidv4()
  const sessionObj = { token, user: { id: newUser.id, name:newUser.name, email:newUser.email }, expiresAt: Date.now() + (1000*60*60*24) }
  saveSession(sessionObj)
  return { success:true, session: sessionObj }
}

export function login({email, password}) {
  const users = _getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) return { success:false, message: 'Invalid credentials.'}
  const token = uuidv4()
  const sessionObj = { token, user: { id: user.id, name: user.name, email: user.email }, expiresAt: Date.now() + (1000*60*60*24) }
  saveSession(sessionObj)
  return { success:true, session: sessionObj }
}

export function isAuthenticated() {
  const s = getSession()
  if (!s) return false
  if (s.expiresAt && Date.now() > s.expiresAt) {
    localStorage.removeItem('ticketapp_session')
    return false
  }
  return true
}
