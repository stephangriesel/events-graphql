import React, { Component } from 'react';
import './css/Auth.css';

class AuthComponent extends Component {
    constructor(props) {
        super(props);
        this.emailElement = React.createRef();
        this.passwordElement = React.createRef();
    }
    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailElement.current.value;
        const password = this.passwordElement.current.value;
        if (email.trim().length === 0 || password.trim().length === 0){
            return;
        }
        console.log(email,password);
        // send request to backend
    }
    render() {
        return (
            <form className="form-wrapper" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <input type="email" id="email" placeholder="please enter your email" ref={this.emailElement}/>
                </div>
                <div className="form-control">
                    <input type="password" id="submit" placeholder="***************" ref={this.passwordElement} />
                </div>
                <div className="form-actions">
                    <button type="submit"><i className="far fa-hand-spock"></i> Take Me With</button>

                    <button type="button">Sign Me Up <i className="far fa-check-circle"></i></button>
                </div>
            </form>
        );
    }
}

export default AuthComponent;