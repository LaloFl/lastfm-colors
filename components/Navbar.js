import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link href="/" className="brand-logo link">Logo</Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="/about" className="brand-logo link">About</Link>
                &nbsp;&nbsp;&nbsp;
                
            </div>
            <div className="nav-right">
                <Link href="/wrapped" className="brand-logo link">Wrapped</Link>
            </div>
        </nav>
    )
}

export default Navbar