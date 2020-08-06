import React, {useState} from 'react';
import sendMail from '../mailgun';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';



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

export default function ForgotPass(props) {
    
    const classes = useStyles();
    const theme = useTheme();

    const [email, changeEmail] = useState('');
    const [emailErr, changeErr] = useState(false);

    const handleButton = () => {
        if (calls.checkEmail(email)) {
            console.log('Account found, sending email..')
            changeErr(false);

            sendMail(
                'Activist-Agenda <support@activistagenda.vision>',
                email,
                'Password Reset Requested',
                'Someone has requested a password reset for the account associated with this email.\n\nIf This was you please click the link below. Otherwise, you can safely ignore this email.'
            );
        }
        else {
            console.log('Account not found')
            changeErr(true);
        }

    }
    const handleEmail = (event) => {
        changeEmail(event.value);
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
                    autoFocus
                    onChange={handleEmail}
                />
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleButton}>
                Submit
                </Button>
            </div>
        </Container>
    )
}