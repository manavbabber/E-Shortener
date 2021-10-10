import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import classes from './App.css';
import Layout from './Layout/Layout';
import Contact from './Layout/Contact/Contact';
class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Route exact path={'/contact'} render={()=>(<Contact/>)}/>
        <Route exact path="/" component={Layout}/>
      </div>
    );
  }
}

export default App;
