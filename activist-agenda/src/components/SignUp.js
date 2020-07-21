import React, { useState } from 'react';
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
import { useTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles'; 
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { white } from 'material-ui/styles/colors';
import {useHistory} from 'react-router-dom'; // ** Needed to switch between pages. May not be necessary if connected a different way.


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Vox-Popuili
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(3, 2, 0),
  },
}));

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export default function SignUp(props) {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory(); // ** May be used to switch between pages, if needed.

  //Dialog box control
  const [valid, setValid] = React.useState(false);

  //Form data
  const [formData, updateForm] = React.useState({
    userName: "",
    firstName: "", 
    lastName: "", 
    email: "", 
    password1: "", 
    password2: ""
  });

  //Form errors
  const [formErrs, updateErrs] = React.useState({
    userName: "",
    firstName: "", 
    lastName: "", 
    email: "", 
    password1: "", 
    password2: ""
  });


  //Not too sure why i needed prev state...oh well
  const handleChange = (evt) => {
    evt.preventDefault();
    const {name, value} = evt.target;
    
    //Now we know what field we're checking
    //Now confirm that there is both a valid data entry AND there is no error
    switch(name) {
      case "userName":
        formErrs.userName = value.length < 2 ? "minimum 2 characters required" : "";
        break;
      case "firstName":
        break;
      case "lastName":
        break;
      case "email":
        formErrs.email = emailRegex.test(value)
        ? "" : "'invalid email address";
        break;
      case "password1":
        formErrs.password1 = value.length < 6 ? "minimum 6 characters required" : "";
        break;
      case "password2":
        formErrs.password2 = (formData.password1 === value) ? "" : "passwords must match"; 
        break;
      default:
        break;
    }
  }

  //Handled based on server response
  const handleSubmission = (evt) => {
    evt.preventDefault();
    //Should be done when error free aka button has already been enabled
    console.log("Testing handleSubmission");
    console.log("Form data\n", formData);
    console.log("Form errors\n", formErrs);

    if (props.modal)
      props.handleOpen(false);
    else
      history.push('/');
  }

  return (
      <FormControl>
        <Container component="main" maxWidth="xs">      
            <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up to Speak Out!          
                </Typography>
                <Grid container spacing={2} style = {{marginTop: theme.spacing(1)}}>
                  <Grid item xs={12}>
                      <TextField
                        name="userName"
                        error={formErrs.userName !== ""}
                        helperText={formErrs.userName}
                        variant="outlined"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        autoFocus
                        onChange = {handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="firstName"
                        variant="outlined"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange = {handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        onChange = {handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        error={formErrs.email !== ""}
                        helperText={formErrs.email}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange = {handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        error={formErrs.password1 !== ""}
                        helperText={formErrs.password1}
                        required
                        fullWidth
                        name="password1"
                        label="Password"
                        type="password"
                        id="password1"
                        onChange = {handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        error={formErrs.password2 !== ""}
                        helperText={formErrs.password2}
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        onChange = {handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration and updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    color="primary"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    disabled={!valid}
                    onClick={handleSubmission}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2" color="primary">
                        Already have an account? Login
                      </Link>
                    </Grid>
                  </Grid>
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
        </FormControl>
  );
}