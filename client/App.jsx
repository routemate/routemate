import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
const axios = require('axios');

import Login from './components/Login.jsx';
import Main from './components/Main';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('here');
    axios.get('/login/authenticate').then((response) => {
      setIsAuthenticated(response.data.authenticated);
    });
  }, []);
  console.log('here');

  return (
    <Switch>
      <Route exact path='/'>
        {isAuthenticated ? <Main /> : <Login />}
      </Route>
    </Switch>
  );
};

export default App;
