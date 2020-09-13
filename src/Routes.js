import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Homepage from './components/Homepage';
import Login from './components/Login';
import MovieList from './components/MovieList';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/movie-list" component={MovieList} />
    </Switch>
  );
};

export default Routes;