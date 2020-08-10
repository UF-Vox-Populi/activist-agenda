import React, { useState, useEffect } from 'react';
import ProtestDrawer from './ProtestDrawer';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Cookies from 'universal-cookie';

var calls = require('../serverCalls');

const useStyles = makeStyles({
    cardStyle: {
        backgroundColor: '#ffffff',
        display: 'block',
        transitionDuration: '0.3s',
    },
});

//Cards for news articles. Currently only holds the title, author, description, icon image, and source link.

const OrgCard = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { avatarSrc, author, desc, location } = props;
    const cookie = new Cookies();

    return (
        <Grid item>
            <Card className={classes.cardStyle}>
                {/*<CardActionArea>*/}
                    <CardHeader
                        avatar={
                            <IconButton size="small">
                                <Avatar src={avatarSrc}/>
                            </IconButton>
                        }
                        title={author}
                        subheader={location}
                    />
                    <Divider />
                    <CardContent>
                        <Typography variant="body1" component="p">
                            {desc}<br/>
                        </Typography>
                    </CardContent>
                    <Divider/>
                {/*</CardActionArea>*/}
            </Card>
        </Grid>
    );
};

export default OrgCard;
