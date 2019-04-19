import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthComponent from './components/Auth';
import BookingsComponent from './components/Bookings';
import EventsComponent from './components/Events';
import MainNav from './components/MainNav';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="main-content-wrapper">
          <AuthContext.Provider
            value={{ // set current value of context and distrubuted down to children
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNav />
            <main className="main-content">
              <Switch>
                {// this route will only show if not logged in (!not)
                  !this.state.token && 
                  <Redirect from="/" to="/events" exact />
                }
                {// this route will only show if not logged in (!not)
                  !this.state.token && 
                  <Redirect from="/bookings" to="/auth" exact />
                }
                {// redirect to events if we have a token
                  this.state.token &&
                  <Redirect from="/" to="/events" exact />
                }
                {// this route will work if logged in
                  this.state.token &&
                  <Redirect from="/auth" to="/events" exact />
                }
                {// auth page is should only be accessible when token not set (!not)
                  !this.state.token && 
                  <Route path="/auth" component={AuthComponent} />
                }
                <Route path="/events" component={EventsComponent} />
                {// should be reachable when token is set
                  this.state.token && 
                  <Route path="/bookings" component={BookingsComponent} />
                }
                {/*
                {// redirect to auth if not (!not) logged in // adding this for reference, using <Redirect from="/bookings" to="/auth" exact /> above for now
                  !this.state.token && 
                  <Redirect to="/auth" exact />
                }
              */}
              </Switch>
            </main>
          </AuthContext.Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
