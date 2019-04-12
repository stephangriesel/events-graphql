import React, { Component } from 'react';
import './css/Auth.css';

class AuthComponent extends Component {
    constructor(props) { 
        super(props);
        this.emailElement = React.createRef(); // 1. can also use bindings, this method is for ref's. connect ref's to dom elements in return. 
        this.passwordElement = React.createRef();
    }
    submitHandler = (event) => { // method to send values to backend
        event.preventDefault(); // default behaviour to send request to same address this is running, which is not correct, preventDefault prevents this
        const email = this.emailElement.current.value; // 3. get values from what is defined in render (the form)
        const password = this.passwordElement.current.value;
        if (email.trim().length === 0 || password.trim().length === 0){ // validation, trim whitespace
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    createUser(userInput: {email:"${email}", password:"${password}"}) {
                        _id
                        email
                    }
                }
            `
        };
        // console.log(email,password); // test if working
        // send request to backend
        fetch('http://localhost:8000/graphql', { // not using axios. fetch built into modern browsers
            method: 'POST',
            body: JSON.stringify(requestBody), // sending body in json format
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    render() {
        return (
            <form className="form-wrapper" onSubmit={this.submitHandler}> {/* listen to form submit, this will always refer to class because arrow function used above */}
                <div className="form-control">
                    <input type="email" id="email" placeholder="please enter your email" ref={this.emailElement}/> {/* 2. connect ref's as explained above*/}
                </div>
                <div className="form-control">
                    <input type="password" id="submit" placeholder="***************" ref={this.passwordElement} />{/* connect ref's as explained above*/}
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