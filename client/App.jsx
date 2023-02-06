import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// require axios here
const axios = require('axios');

import Login from './components/Login.jsx';
import Main from './components/Main';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
     axios.get('/login/authenticate').then((response) => {
      setIsAuthenticated(response.data.authenticated);
    });
  }, [isAuthenticated]);

  return (
    <Switch> 
<Route path='/login'>
  <Login />
  </Route> 
    <Route exact path='/'>
      {/* {isAuthenticated ? <Main /> : <Redirect to='/login' />}*/}
       <Main />
      </Route> 
    </Switch>
  );
};

export default App;
