import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/MainNav.css'

const mainNav = props => (
    <header>
        <div className="mainnav__logo">
            <h1>TakeMeWith</h1>
        </div>
        <nav className="mainnav__item">
            <ul>
                <li>
                    <NavLink to="/auth">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/events">Events</NavLink>
                </li>
                <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                </li>
            </ul>
        </nav>
    </header>
)

export default mainNav;