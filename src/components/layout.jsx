import React from 'react'
import Header from "./header.jsx";
import Footer from "./footer.jsx";


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
