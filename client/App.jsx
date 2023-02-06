import React, { Component, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router';
const axios = require('axios');

import Login from './components/Login.jsx';
import Main from './components/Main';

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   axios.get('/login/authenticate').then((response) => {
  //     setIsAuthenticated(response.data.authenticated);

  //     console.log('RESPONSE STATE', response.data.authenticated);
  //     console.log('STATE', isAuthenticated);
  //   });
  //   console.log('STATE OUTSIDE', isAuthenticated);
  // }, []);

  // console.log('STATE SUPER OUTSIDE', isAuthenticated);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get('/login/authenticate');
  //     setIsAuthenticated(result.data.authenticated);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const token = document.cookie.includes('token');
  //   console.log(token);
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // console.log(isAuthenticated);
  const token = document.cookie.includes('token');
  console.log('Return');
  return (

    <Switch>
      <Route exact path='/'>
        {token ? <Main /> : <Redirect to='/login' />}
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
    </Switch>
  );
};

export default App;
