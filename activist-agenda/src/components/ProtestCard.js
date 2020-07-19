import React from 'react';
import ProtestDrawer from './ProtestDrawer';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    // Nothing here for now
});

const ProtestCard = (props) => {
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
            <CardActionArea>
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
                    title="Protest Title"
                    subheader="Host (Individual/Org)"
                />
                <Divider />
                <CardContent>
                    <Typography className={classes.pos} color="textSecondary">
                        Location | Date at Time
                    </Typography>
                    <Typography variant="body2" component="p">
                        Some short description with a character count<br/>
                    </Typography>
                    <Typography variant="body2" component="p">
                        <br/><i>(Supporters: <b>#</b>)</i>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <ProtestDrawer />
            </CardActions>
        </Card>
    );
};

export default ProtestCard;
