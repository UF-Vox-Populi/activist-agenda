/* 
  Login Page Component
  Created by Laurence Mullen
  Based upon Material-UI Template from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
 */

import React, { useState, Component } from 'react';
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
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//import Redirect
import {Redirect} from 'react-router-dom';
//import cookies
import Cookies from 'universal-cookie';

var calls = require('../serverCalls');

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


//Function to return props/data on form submit

export default function SignIn(props) {

  //use theme styling
  const classes = useStyles();

  //stores states for button color and text
  const [btn_color, setbtnColor] = useState('');
  const [user_error, setUserErr] = useState(false);
  const [pass_error, setPassErr] = useState(false);

  const [btn_text, setbtnText] = useState('Sign In');
  
  //allows theme to be accessed inline
  const theme = useTheme();

  //stores entered user information
  var user = {
    username: '',
    password: ''
  }
  
  //
  const userCookie = new Cookies();

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
    if (user.username === '') {
      setUserErr(true);
    }
    if (user.password === '') {
      setPassErr(true);
    }
    if (user.username !== '' && user.password !== '') {
      calls.checkUser(user.username, user.password).then(out => {
        if (out) {
          //set logged in, need cookie?
          setbtnColor(theme.palette.success.main);
          userCookie.set('userAuthed', true, { path: '/', sameSite: 'strict'});
          setbtnText('Success! Signing in...');
          console.log("User found, login success.");
          //redirect to profile page
          return <Redirect to="/profile/" />
        }
        else {
          //incorrect login info
          setbtnColor(theme.palette.error.main);
          setbtnText('Incorrect Email or Password. Try Again.');
          console.log("user not found.");
        }
      })
    }
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
            error={user_error}
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
            error={pass_error}
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
            fullWidth
            variant="contained"
            color="primary"
            style={{backgroundColor: btn_color}}
            className={classes.submit}
            onClick={handleSubmit}
          >
            {btn_text}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup/" variant="body2">
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