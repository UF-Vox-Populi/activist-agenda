import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    // Nothing here for now
});

const Post = (props) => {
    const classes = useStyles();
    const { avatarSrc, host, date, protestTitle, protestLocation, description, protestorCount } = props;

    const cardStyle = {
        backgroundColor: '#ffffff',
        display: 'block',
        // width: '400vm',
        // height: '300vm',
        transitionDuration: '0.3s'
    };

    return (
        <Card style={cardStyle}>
            <CardHeader
                avatar={
                    <IconButton size="small">
                        <Avatar src={avatarSrc}/>
                    </IconButton>
                }
                action={
                    <IconButton aria-label="settings">
                        <EmojiFlagsIcon />
                    </IconButton>
                }
                title="Host"
                subheader="Date"
            />
            <CardContent>
                <Typography variant="h6" component="h2">
                    Protest Title
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Location | Date & Time
                </Typography>
                <Typography variant="body2" component="p">
                    Protest Description<br/>
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="like" size="small">
                    <FavoriteIcon />
                </IconButton>
                <Button size="small">Details</Button>
            </CardActions>
        </Card>
    );
};

export default Post;
