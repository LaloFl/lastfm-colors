import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="">
                <Link href="/" className="brand-logo link">Logo</Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="/about" className="brand-logo link">About</Link>
            </div>
        </nav>
    )
}

export default Navbar