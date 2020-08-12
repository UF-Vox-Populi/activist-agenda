import React, {useState, useEffect} from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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
    }
}));


export default function ResetPass(){

    const {id, token} = useParams();

    const classes = useStyles();
    const history = useHistory(); // ** May be used to switch between pages, if needed.

    const [verText, changeVerText] = useState('Verifying Email...');
    const [avColor, changeAvColor] = useState('theme.palette.info.main')


    useEffect(() => {
        console.log('Verify Loaded\nRequest ID: ',id);
        if (id && token) {
            calls.verifyEmail(id, token).then((result) => {
                if (result) {
                    changeVerText('Email Verified!');
                    changeAvColor('theme.palette.success.main');
                    setTimeout(() => {
                        history.push('/');
                    }, 1000);
                } else {
                    console.log('User and Email Token not Verified');
                    changeVerText('Verification Link Invalid.');
                    changeAvColor('theme.palette.error.main');
                    setTimeout(() => {
                        history.push('/');
                    }, 1000);
                }
            });
        }
        else
        {
            console.log('Link missing params');
            changeVerText('Verification Link Invalid.');
            changeAvColor('theme.palette.error.main');
            setTimeout(() => {
                history.push('/');
            }, 1000);
        }
    },[id, token, history]);
    
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