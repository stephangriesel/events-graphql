import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthComponent from './components/Auth';
import BookingsComponent from './components/Bookings';
import EventsComponent from './components/Events';


import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={AuthComponent} />
          <Route path="/events" component={EventsComponent} />
          <Route path="/bookings" component={BookingsComponent} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
