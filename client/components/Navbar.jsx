import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';

const Navbar = ({ name }) => {
  const useStyles = makeStyles((theme) => ({
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
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    location.reload();
  };

  return (
    <AppBar position='static' className='appbar'>
      <Toolbar>
        <Typography edge='start' color='inherit' className={classes.menuButton}>
          {' '}
          Hi, Issam
        </Typography>
        <Typography variant='h6' className={classes.title}>
          routemate
        </Typography>
        <Button color='inherit' onClick={handleClick}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
