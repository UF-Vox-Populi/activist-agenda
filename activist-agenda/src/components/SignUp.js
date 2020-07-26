import React from 'react';
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
import { useTheme, makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';

import {useHistory} from 'react-router-dom'; // ** Needed to switch between pages. May not be necessary if connected a different way.
var calls = require('./../serverCalls'); // ** To check username and email.


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Vox-Populi
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
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/
);

export default function SignUp(props) {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory(); // ** May be used to switch between pages, if needed.

  //Dialog box control
  const [valid, setValid] = React.useState(false);

  //Form data
  const [formData, updateForm] = React.useState({
    userName: null,
    firstName: null, 
    lastName: null, 
    email: null, 
    password1: null, 
    password2: null
  });

  //Form errors
  const [formErrs, updateErrs] = React.useState({
    userName: "",
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
        updateForm({...formData, userName: value});
        formErrs.userName = value.length < 2 ? "Minimum 2 characters required" : "";
        calls.checkUsername(value).then(data => { // ** Checks if the username is already in the database.
          if (data) {
            formErrs.userName = "Sorry, that username is taken.";
          }
        });
        break;
      case "firstName":
        updateForm({...formData, firstName: value});
        break;
      case "lastName":
        updateForm({...formData, lastName: value});
        break;
      case "email":
        updateForm({...formData, email: value.toLowerCase()});
        formErrs.email = emailRegex.test(value) ? "" : "'Invalid email address";
        calls.checkEmail(value.toLowerCase()).then(data => { // ** Checks if the email is already in the database.
          if (data) {
            formErrs.email = "Sorry, that email is already in use.";
          }
        });
        break;
      case "password1":
        updateForm({...formData, password1: value});
        formErrs.password1 = value.length < 6 ? "Minimum 6 characters required" : "";
        //needs to recheck that password2 matches if one changes
        formErrs.password2 = (formData.password2 === value) ? "" : "Passwords must match"; 
        break;
      case "password2":
        updateForm({...formData, password2: value});
        formErrs.password2 = (formData.password1 === value) ? "" : "Passwords must match"; 
        break;
      default:
        break;
    }

    // ** Updates whether the submit button should be clickable or not.
  }

  //runs when the form states change, ensuring that the values are set before validating
  React.useEffect(() => {      
      if (
        !formErrs.userName &&
        !formErrs.password1 &&
        !formErrs.password2 &&
        !formErrs.email &&
        formData.userName  &&
        formData.email &&
        formData.password1 &&
        formData.password2
      ) {
        setValid(true);
      } else {
        setValid(false);
      }
  }, [formData,formErrs]);

  //Handled based on server response
  const handleSubmission = (evt) => {
    handleChange(evt);
    evt.preventDefault();
    //Should be done when error free aka button has already been enabled
    console.log("Testing handleSubmission");
    console.log("Form data\n", formData);
    console.log("Form errors\n", formErrs);

    //since submit button will only be available when there are no errors, this may be redundant
    if (
      !formErrs.userName &&
      !formErrs.password1 &&
      !formErrs.password2 &&
      !formErrs.email
    ) {
      calls.addUser(formData.userName, formData.password1, formData.email, formData.firstName, formData.lastName).then(data => {
        if (props.modal)
          props.handleOpen(false, true);
        else
          history.push('/login');
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
                <Typography component="h1" variant="h5">
                  Sign Up to Speak Out!          
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
                      <Link onClick={() => (props.modal) ? props.handleOpen(false, true) : history.push("/login")} variant="body2" color="primary">
                        Already have an account? Login
                      </Link>
                    </Grid>
                  </Grid>
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
  );
}