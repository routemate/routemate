import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// require axios here

import Login from './components/Login';
import Main from './components/Main';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = axios.get('/authenticated').then((response) => {
      // {response: {
      //   data: {
      //     authenticated: true/ false;
      //   }
      // }}
      setIsAuthenticated = response.data.authenticated;
    });
  });

  return (
    <Switch>
      {/* set up conditional to check if 'isAuthenticated' is true. if its not, redirect it to '/login'*/}
      <Route exact path='/'>
        <Main />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
    </Switch>
  );
};

export default App;

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const auth = axios.get('/').then((response) => response.data.authenticated);
//     console.log('inside of auth');
//     if (auth) setIsAuthenticated(true);
//   });

//   return (
//     <Switch>
//       <Route exact path='/'>
//         {isAuthenticated ? (
//           <main className='app'>
//             <h1 className='solar'>solar.</h1>
//             <Mapbox />
//           </main>
//         ) : (
//           <Redirect to='/homepage' />
//         )}
//       </Route>
//       <Route path='/homepage'>
//         <Homepage />
//       </Route>
//     </Switch>
//   );
// };

// export default App;
