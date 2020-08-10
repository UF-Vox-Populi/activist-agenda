import React, {useState, useEffect} from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import {useHistory} from 'react-router-dom'; // ** Needed to switch between pages. May not be necessary if connected a different way.
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
    }
}));


export default function ResetPass(props){

    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory(); // ** May be used to switch between pages, if needed.

    const [verText, changeVerText] = useState('Verifying Email...');
    const [avColor, changeAvColor] = useState('theme.palette.info.main')


    useEffect(() => {
        if (calls.verifyEmail(props.match.params.id, props.match.params.token)) {
            changeVerText('Email Verified!');
            changeAvColor('theme.palette.success.main');
            setTimeout(() => {
                history.push('/');
            }, 750);
        }
        else
        {
            console.log('User and Email Token not Verified');
            changeVerText('Verification Link Invalid.');
            changeAvColor('theme.palette.error.main');
            setTimeout(() => {
                history.push('/');
            }, 750);
        }
    });
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} style={{backgroundColor:avColor}}>
                    <CheckCircleOutlineIcon />
                </Avatar>
                <Typography color="textPrimary" component="h1" variant="h5">
                    {verText}
                </Typography>
            </div>
        </Container>
    )
}