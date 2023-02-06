import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router';
const axios = require('axios');

import Login from './components/Login.jsx';
import Main from './components/Main';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get('/login/authenticate').then((response) => {
      setIsAuthenticated(response.data.authenticated);
    });
  }, []);

  return (
    <Switch>
      {console.log('isAuthenticated', isAuthenticated)}
      <Route exact path='/'>
        {isAuthenticated ? <Main /> : <Login />}
      </Route>
    </Switch>
  );
};

export default App;
