import React, {useState} from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

var mail = require('./../mailgun');
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

async function genToken(email_) {
    var ID = await calls.getUserIDbyEmail(email_);
    var token = crypto.randomBytes(32).toString('hex');
  
    bcrypt.hash(token, 10, (err,hash) => {
      calls.updatePasswordToken(ID, hash).then((result) => {
        if (result) {

            //send email with token
            const domain = 'https://activist-agenda.herokuapp.com'; // Replace with http://localhost:5000 for local testing
            mail.sendMailHtml(
            'Activist Agenda reset@mg.activistagenda.vision',
            email_,
            'Password Reset Requested on Activist Agenda',
            '<div style="width:50%;margin: 0 auto;font-family:Segoe UI"><h4><b>Password Reset</b></h4>' +
            '<p>If you have not requested a password reset then you can safely ignore this email.</p><p>Otherwise, you can reset your password by clicking on the link below.</p>'+
            '<a href="'+domain+'/resetPass/'+ID+'/'+token+
            '">'+domain+'/resetPass/'+ID+'/'+token+'</a></div>'
            );
        }
      });
    });

	
}

export default function ForgotPass(props) {
    
    const classes = useStyles();

    const [email, changeEmail] = useState('');
    const [emailErr, changeErr] = useState('');

    var disable = false;

    const handleButton = () => {
        calls.checkEmail(email).then((exists) => {
            if (exists) {
                genToken(email);
                changeErr('');
                disable = true;
            } else {
                changeErr('No matching email found');
            }
        });

    }
    const handleEmail = (event) => {
        if (emailErr) emailErr='';
        changeEmail(event.target.value);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <HelpOutlinedIcon />
                </Avatar>
                <Typography color="textPrimary" component="h1" variant="h5">
                Forgot Password?
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Enter Email"
                    name="email"
                    autoComplete="email"
                    error={emailErr}
                    helperText={emailErr}
                    autoFocus
                    onChange={handleEmail}
                />
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleButton}
                    disabled={disable}>
                Submit
                </Button>
            </div>
        </Container>
    )
}