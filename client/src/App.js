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
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthComponent} />
              <Route path="/events" component={EventsComponent} />
              <Route path="/bookings" component={BookingsComponent} />
            </Switch>
          </main>
          </AuthContext.Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
