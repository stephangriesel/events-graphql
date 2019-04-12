import React, { Component } from 'react';
import './css/Auth.css';

class AuthComponent extends Component {
    render() {
        return (
            <form className="form-wrapper">
                <div className="form-control">
                    <label for="email"></label>
                    <input type="email" id="submit" placeholder="please enter your email" />
                </div>
                <div className="form-control">
                    <label for="password"></label>
                    <input type="password" id="submit" placeholder="***************" />
                </div>
                <div className="form-actions">
                    <button type="submit">Take Me With</button>

                    <button type="button">Switch To Signup</button>
                </div>
            </form>
        );
    }
}

export default AuthComponent;