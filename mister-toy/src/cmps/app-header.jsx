import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/img/toy-logo.png'

export function AppHeader() {
    // const user = useSelector((storeState) => storeState.userModule.loggedinUser)


    return(
        <header className="app-header full">
            <div className="nav-items-container">
                <img className='toy-logo' src={logo} />
                <nav className="main-nav">
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/toy">Toys</NavLink> |
                    <NavLink to="/about">About</NavLink> |
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </nav>
            </div>
        </header>
    )
}