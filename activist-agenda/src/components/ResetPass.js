import React, {useState, useEffect} from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';

import {useHistory, useParams} from 'react-router-dom'; // ** Needed to switch between pages. May not be necessary if connected a different way.
var calls = require('../serverCalls');

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.info.main,
    }
}));



export default function ResetPass(){
  const [tokenVerified, changeVerToken] = useState(false);
  const history = useHistory(); // ** May be used to switch between pages, if needed.

  const {id, token} = useParams();
  console.log(id,' | ', token);

  useEffect(() => {
    if (id && token)
    {
      calls.verifyPassToken(id, token).then((exists) => {
        if (exists) changeVerToken(true);
        else console.log('Could not change password');
      })
    }
    else
    {
      console.log('User and Password Token not Verified');
      history.push('/ForgotPass');
    }
  }, [id, token, history]);

  const classes = useStyles();
  const theme = useTheme();

  const [password, changePass] = useState('');
  const [passErr, changeErr] = useState('');

  const [password2, changePass2] = useState('');
  const [passErr2, changeErr2] = useState('');



  const handleButton = () => {
    if (tokenVerified && password === password2)
    {
      calls.changePassword(id,password);
      history.push("/login");
    }
  }

  const handlePassword = (event) => {
    changePass(event.target.value);
    if (event.target.value.length < 6) {
      //Password does not meet required length
      changeErr('Password must be at least 6 characters');
    } 
  }

  const handlePassword2 = (event) => {
    changePass2(event.target.value);
    if (event.target.value !== password) {
      //Password does not meet required length
      changeErr2('Passwords must match');
    } 
  }
  
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <HelpOutlinedIcon />
            </Avatar>
            <Typography color="textPrimary" component="h1" variant="h5">
            Reset Your Password
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Enter a new password"
                name="password"
                type="password"
                error={passErr}
                autoFocus
                helperText={passErr}
                onChange={handlePassword}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password2"
                label="Confirm new password"
                name="password2"
                type="password"
                error={passErr2}
                autoFocus
                helperText={passErr2}
                onChange={handlePassword2}
            />
            <Button
                type="button"
                variant="contained"
                color="primary"
                disabled={passErr && passErr2}
                onClick={handleButton}>
            Submit
            </Button>
        </div>
    </Container>
  )
}