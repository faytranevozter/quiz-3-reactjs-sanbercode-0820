import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Homepage from './components/Homepage';
import Login from './components/Login';
import MovieList from './components/MovieList';
import NotFound from './components/NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/movie-list" component={MovieList} />
      <Route exact path="/logout">
        <Redirect to="/login" />
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;