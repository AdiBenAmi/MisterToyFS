import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/img/toy-logo.png'
import { useState } from 'react'


export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
    }

    const isOpen = (isMenuOpen) ? 'menu-open' : ''
    return(
        <header className="app-header full">
            <div className="nav-items-container">
                <img className='toy-logo' src={logo} />
                <nav className={isOpen}>
                    <NavLink to="/">Home</NavLink> 
                    <NavLink to="/toy">Toys</NavLink> 
                    <NavLink to="/about">About</NavLink> 
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <button className="hamburger-btn" onClick={()=> toggleMenu()}>☰</button>
                </nav>
            </div>
        </header>
    )
}