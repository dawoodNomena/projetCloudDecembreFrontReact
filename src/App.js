// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Signalement from './Signalement';
import Details from './Details';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route path='/' exact={true} component={Login}/>
        <Route path='/home' exact={true} component={Home}/>
        <Route path='/signalement/:id' exact={true} component={Signalement}/>
        <Route path='/detailsSignalements/:id' exact={true} component={Details}/>
        </Switch>
      </Router>
    )
  }
}

export default App;