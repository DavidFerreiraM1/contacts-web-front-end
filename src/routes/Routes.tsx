import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from '../App';
import history from './history';

export default function AppRoutes() {
  return (
    <>
      <Router history={history}>
        <Route exact path="/" component={App} />
      </Router>
    </>
  );
}
