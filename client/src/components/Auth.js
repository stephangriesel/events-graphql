import React, { Component } from 'react';

class AuthComponent extends Component {
    render() {
        return (
            <form>
                <div className="form-control">
                    <label for="email">E-Mail</label>
                    <input type="email" id="submit" />
                </div>
                <div className="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="submit" placeholder="***************"/>
                </div>
                <div className="form-actions">
                <button type="button">Switch To Signup</button>
                <button type="submit">Take Me With</button>
                </div>
            </form>
        );
    }
}

export default AuthComponent;