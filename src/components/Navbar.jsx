import React from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'

const Navbar = (props) => {

    const {session, fetchLogout } = React.useContext(AuthContext)

    const logoutHandler = () => {
        fetchLogout().then(
            props.history.push("/login")
        )
    }

    return (
        <nav className="navbar navbar-fixed-top navbar-dark bg-dark" >
            <Link className="ml-2 navbar-brand" to="/home" ><h2>{process.env.REACT_APP_TITLE}</h2></Link>
                { 
                    session.user ? 
                    (   
                        <div className="justify-content-end" >
                            <span style={{cursor:"pointer"}} className="navbar-brand" onClick={() => logoutHandler()} >Logout</span>
                        </div>
                    ) : ( 
                        <div className="justify-content-end" >
                            <NavLink className="navbar-brand" to="/login" >Login</NavLink>
                            <NavLink className="navbar-brand" to="/register" >Register</NavLink>
                        </div>
                    )
                }
        </nav>
    )
}

export default withRouter(Navbar)