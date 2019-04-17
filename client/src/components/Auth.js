import React, { Component } from 'react';
import './css/Auth.css';
import AuthContext from '../context/auth-context'

class AuthComponent extends Component {
    state = {
        isLoggedIn: true
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailElement = React.createRef(); // 1. can also use bindings, this method is for ref's. connect ref's to dom elements in return. 
        this.passwordElement = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLoggedIn: !prevState.isLoggedIn };
        })

    }

    submitHandler = (event) => { // method to send values to backend
        event.preventDefault(); // default behaviour to send request to same address this is running, which is not correct, preventDefault prevents this
        const email = this.emailElement.current.value; // 3. get values from what is defined in render (the form)
        const password = this.passwordElement.current.value;
        if (email.trim().length === 0 || password.trim().length === 0) { // validation, trim whitespace
            return;
        }

        let requestBody = {
            query: `
            query {
                login(email: "${email}", password:"${password}") {
                    userId
                    token
                    tokenExpiration
                }
            }
            `
        };

        if (!this.state.isLoggedIn) {
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email:"${email}", password:"${password}"}) {
                            _id
                            email
                        }
                    }
                `
            };
        }


        // console.log(email,password); // test if working
        // send request to backend
        fetch('http://localhost:8000/graphql', { // not using axios. fetch built into modern browsers
            method: 'POST',
            body: JSON.stringify(requestBody), // sending body in json format
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
            .then(resData => { // Token for logging in
                if (resData.data.login.token) { // Alt: this.state.isLoggedIn
                    this.context.login(
                        resData.data.login.token,
                        resData.data.login.userId,
                        resData.data.login.tokenExpiration,
                    )

                }
            })
            .catch(err => {
                console.log(err); // show error messages, not status codes, more like network issues
            })
    };
    render() {
        return (
            <form className="form-wrapper" onSubmit={this.submitHandler}> {/* listen to form submit, this will always refer to class because arrow function used above */}
                <div className="form-control">
                    <input type="email" id="email" placeholder="please enter your email" ref={this.emailElement} /> {/* 2. connect ref's as explained above*/}
                </div>
                <div className="form-control">
                    <input type="password" id="submit" placeholder="***************" ref={this.passwordElement} />{/* connect ref's as explained above*/}
                </div>
                <div className="form-actions">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.switchModeHandler}>
                        Take Me To {this.state.isLoggedIn ? 'Signup Page' : 'Your Leader'} <i className="far fa-hand-spock"></i>
                    </button>
                </div>
            </form>
        );
    }
}

export default AuthComponent;