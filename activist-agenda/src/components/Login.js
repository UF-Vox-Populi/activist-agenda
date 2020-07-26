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


//import cookies
import Cookies from 'universal-cookie';

// Used to help switch between pages
import {useHistory} from 'react-router-dom';

var calls = require('../serverCalls');

// Made using Material-UI SignIn Template

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Vox-Populi
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
    backgroundColor: theme.palette.info.main,
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
  
  const btn_text_options = ['Log In', 'Success! Logging in...', 'Incorrect Email or Password. Try Again.'];
  
  //stores states for button color and text
  const [btn_color, setbtnColor] = useState('');
  const [btn_text, setbtnText] = useState(btn_text_options[0]);

  //states for detecting empty fields
  const [user_error, setUserErr] = useState(false);
  const [pass_error, setPassErr] = useState(false);
  
  const [remember, updateRemember] = useState(false);
  //allows theme to be accessed inline
  const theme = useTheme();

  //stores entered user information
  const [user, updateUser] = useState({
    username: '',
    password: ''
  });
  //Modal button
 
  //May be needed to switch between pages
  const history = useHistory();

  function resetBtn() {
    if (btn_text !== btn_text_options[0]) {
      setbtnColor(theme.palette.primary.main);
      setbtnText(btn_text_options[0]);
    }
  }
  
  //creates cookie object
  const userCookie = new Cookies();

  //Handlers
  const handleUsername = (event) => {
    updateUser({
      username: (event.target.value).toLowerCase(),
      password: user.password});
    //reset button
    resetBtn();
    if (user_error) setUserErr(false);
  }
  const handlePassword = (event) => {
    updateUser({
      username: user.username,
      password: event.target.value});
    resetBtn();
    if (pass_error) setPassErr(false);
  }
  const handleRemember = (event) => {
    //toggle remember state
    updateRemember(!remember);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    //check if fields are empty
    if (user.username === '' ? setUserErr(true) : setUserErr(false));
    if (user.password === '' ? setPassErr(true) : setPassErr(false));
    
    //if fields are not empty
    if (!user_error && !pass_error) {
      //check database for matching email/pass
      calls.checkUser(user.username, user.password).then(out => {
        //if exists and matches
        if (out) {
          //set logged in, get user id to store in cookie
          calls.getUserIDbyEmail(user.username).then(id => {
            //if remember is true, then the cookie will be kept for 7 days, otherwise only the session. Will be replaced if another user signs in
            if (remember)
              userCookie.set('authedUser', id, { path: '/', sameSite: 'strict', secure: true, maxAge: 604800});
            else 
              userCookie.set('authedUser', id, { path: '/', sameSite: 'strict', secure: true});
          })

          //set button styling
          setbtnColor(theme.palette.success.main);
          setbtnText(btn_text_options[1]);
          //redirect to home page
          setTimeout(() => {
          if (props.modal)
            props.handleOpen(false);
          else
            history.push('/');
          },750);
        }
        else {
          //incorrect login info, set button styling to error
          setbtnColor(theme.palette.error.main);
          setbtnText(btn_text_options[2]);
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
          Log in
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
              <Link onClick={() => (props.modal) ? props.handleOpen(false, true) : history.push("/signup")} variant="body2">
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