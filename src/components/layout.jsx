import React from 'react'
import Header from './Header'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div>
      <header className="header container header-inner" aria-hidden={false}>
        <Header />
      </header>

      <main className="container" style={{paddingTop: '1rem', paddingBottom:'2rem'}}>
        {children}
      </main>

      <footer className="footer container">
        <Footer />
      </footer>
    </div>
  )
}
