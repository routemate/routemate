import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// require axios here
const axios = require('axios');

import Login from './components/Login';
import Main from './components/Main';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const auth = axios.get('/authenticated').then((response) => {
  //     // {response: {
  //     //   data: {
  //     //     authenticated: true/ false;
  //     //   }
  //     // }}
  //     setIsAuthenticated(response.data.authenticated);
  //   });
  // });

  return (
    <Switch>
      <Route exact path="/">
        {/* {isAuthenticated ? (<Main />) : (<Redirect to='/login'>)} */}
        <Main />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
    </Switch>
  );
};

export default App;
