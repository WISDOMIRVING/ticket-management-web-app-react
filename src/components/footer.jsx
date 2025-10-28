export default function Footer() {
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0', fontSize: '0.9rem', color: '#666' }}>
      &copy; {new Date().getFullYear()} Ticket Management App. All rights reserved.
    </div>
  )
}