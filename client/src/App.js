import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthComponent from './components/Auth';
import BookingsComponent from './components/Bookings';
import EventsComponent from './components/Events';
import MainNav from './components/MainNav';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main-content-wrapper">
          <MainNav />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthComponent} />
              <Route path="/events" component={EventsComponent} />
              <Route path="/bookings" component={BookingsComponent} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
