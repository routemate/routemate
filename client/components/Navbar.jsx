import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';

const Navbar = ({name}) => {

  const useStyles = makeStyles(theme => ({

    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));
  
  
    const classes = useStyles();

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
    // <>
    //   <div className="nav-item hello">Hello, {username}</div>
    //   <div className="nav-item title">
    //     <strong>ShipIt Snippet</strong>
    //   </div>
    //   <div className="nav-item logout" onClick={handleClick}>
    //     Logout
    //   </div>
    // </>

  <AppBar position="static" className='appbar'>
  <Toolbar>
  <Typography edge="start" color="inherit"  className={classes.menuButton}> Hi, {username}</Typography>
  <Typography variant="h6" className={classes.title}>routemate</Typography>
  <Button color="inherit" onClick = {handleClick}>Logout</Button>
  </Toolbar>
</AppBar>
  );
};

export default Navbar;
