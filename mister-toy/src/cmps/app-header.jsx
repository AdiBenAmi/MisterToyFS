import { Link, NavLink } from 'react-router-dom'


export function AppHeader() {
    // const user = useSelector((storeState) => storeState.userModule.loggedinUser)


    return(
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
            </nav>
        </header>
    )
}