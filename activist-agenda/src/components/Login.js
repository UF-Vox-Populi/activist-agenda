/* 
  Login Page Component
  Created by Laurence Mullen
  Based upon Material-UI Template from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
 */

import React, { Component } from 'react';
//improt material ui components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//import Redirect
import {Redirect} from 'react-router-dom';
//import cookies
import Cookies from 'universal-cookie';

var calls = require('./serverCalls.js');

// Made using Material-UI SignIn Template

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ActivistAgenda
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//Styling
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const loginSuccess = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.success
  }
}));

const loginFailure = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.warning
  }
}));


//Function to return props/data on form submit

export default function SignIn() {
  const classes = useStyles();
  let btn_class = classes.submit;
  
  //stores entered user information
  var user = {
    username: '',
    password: ''
  }

  var buttonText = 'Sign In';

  const userCookie = new Cookies();
  userCookie.set('userState', false, { path: '/'});

  //Handlers
  const handleUsername = (event) => {
    user.username = event.target.value;
  }
  const handlePassword = (event) => {
    user.password = event.target.value;
  }
  const handleRemember = (event) => {
    //Use cookie to store IP and compare when next connected from IP
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    calls.checkUser(user.username, user.password).then(out => {
      if (out)
      {
        //set logged in, need cookie?
        btn_class = loginSuccess();
        userCookie.set('userState', true, { path: '/'});
        buttonText = 'Success! Signing in...';

        //redirect to profile page
        return <Redirect to="/profile/" />
      }
      else {
        //incorrect login info
        btn_class = loginFailure();
        buttonText = 'Incorrect Email or Password. Try Again.';
      }
    })
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color="textPrimary" component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            onChange={handleRemember}
          />
          <Button
            type="submit"
            label={buttonText}
            fullWidth
            variant="contained"
            color="primary"
            className={btn_class}
            onClick={handleSubmit}
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}