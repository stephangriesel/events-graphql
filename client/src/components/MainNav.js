import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/MainNav.css'
import AuthContext from '../context/auth-context';

const mainNav = props => (
    <AuthContext.Consumer>
        {(context) => { // function to receive context value
            return (
                <header>
                    <div className="mainnav__logo">
                        <h1>TakeMeWith</h1>
                    </div>
                    <nav className="mainnav__item">
                        <ul>
                            {!context.token && (
                                <li>
                                    <NavLink to="/auth">Login</NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink to="/events">Events</NavLink>
                            </li>
                            {context.token && (
                                <React.Fragment>
                                    <li>
                                        <NavLink to="/bookings">Bookings</NavLink>
                                    </li>
                                    <li>
                                        <button onClick={context.logout}>LogOut</button>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </nav>
                </header>
            )
        }}

    </AuthContext.Consumer>
)

export default mainNav;