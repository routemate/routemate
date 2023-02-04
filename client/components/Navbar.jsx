import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Navbar = ({name}) => {

  const username = name;

  const handleClick = () => {
    <Route path='/redirect-page' element={ <Redirect to ="/login"/> }/> 
  }
 
/*
import { useHistory } from 'react-router-dom';

function Example() {
  const history = useHistory();

  function handleClick() {
    history.push('/about');
  }
*/

  return (
    <>
      <div className="nav-item hello">Hello, {username}</div>
      <div className="nav-item title">
        <strong>ShipIt Snippet</strong>
      </div>
      <div className="nav-item logout" onClick={handleClick}>
        Logout
      </div>
    </>
  );
};

export default Navbar;
