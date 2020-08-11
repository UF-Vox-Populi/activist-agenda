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
import FlagIcon from '@material-ui/icons/Flag';
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

const makeProfLink = (id) => {
    return "/userprofile/" + id;
}

const ProtestCard = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { postID, avatarSrc, id, host, date, protestTitle, protestLocation, description, donLink, orgLink, supporters, flagged } = props;
    const profLink = makeProfLink(id);
    const cookie = new Cookies();

    const [num, setNum] = useState(0);
    const [chcked, setChcked] = useState(false);
    const [flged, setFlged] = useState(flagged);

    const handleChange = (event) => {
        setChcked(!chcked);

        if (event.target.checked) {
            calls.addSupport(postID, cookie.get('authedUser'));
            setNum(num + 1);
        } else {
            calls.removeSupport(postID, cookie.get('authedUser'));
            setNum(num - 1);
        }
    }

    const handleFlag = (event) => {
        setFlged(!flged);

        if (event.target.checked) {
            calls.addFlag(postID);
        } else {
            calls.removeFlag(postID);
        }
    }

    useEffect(() => {
        if (supporters.includes(cookie.get('authedUser'))) {
            setChcked(true);
        }
    }, [])

    return (
        <Grid item xs={12} sm={12} md={12}>
            <Card className={classes.cardStyle}>
                {/*<CardActionArea>*/}
                    {
                        cookie.get('authedUser') 
                        ? <CardHeader
                            avatar={
                                <IconButton size="small">
                                    <Avatar src={avatarSrc}/>
                                </IconButton>
                            }
                            action={
                                <FormControlLabel
                                control={<Checkbox style={{ color: theme.palette.error.main }} icon={<EmojiFlagsIcon />} 
                                checkedIcon={<FlagIcon />} 
                                name="flaggedH" />}
                                onChange={(event) => handleFlag(event)}
                                checked={flged}
                                onClick={() => setFlged(!flged)}
                                />
                            }
                            title={protestTitle}
                            subheader={
                                <Link href={profLink}>
                                {host}
                                </Link>
                            }
                        />
                        : <CardHeader
                            avatar={
                                <IconButton size="small">
                                    <Avatar src={avatarSrc}/>
                                </IconButton>
                            }
                            title={protestTitle}
                            subheader={
                                <Link href={profLink}>
                                {host}
                                </Link>
                            }
                        />
                    }
                    <Divider />
                    <CardContent>
                        <Typography className={classes.pos} color="textSecondary">
                            {protestLocation} | {date}
                        </Typography>
                        <Typography variant="body1" component="p">
                            {description}<br/>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <br/>Link(s): <Link href={'http://' + donLink}>Donation</Link> | <Link href={'http://' + orgLink}>Petition</Link>
                        </Typography>
                        <Typography variant="body2">
                            <b>Supporters: {supporters.length + num}</b>
                        </Typography>
                        <Typography>
                            {cookie.get('authedUser') 
                            ? <FormControlLabel
                                    control={<Checkbox style={{ color: theme.palette.error.main }} icon={<FavoriteBorder />} 
                                    checkedIcon={<Favorite />} 
                                    name="checkedH" />}
                                    label="I SUPPORT THIS" 
                                    onChange={(event) => handleChange(event)}
                                    checked={chcked}
                                    onClick={() => setChcked(!chcked)}
                            />
                            : null
                            }
                        </Typography>
                    </CardContent>
                    <Divider/>
                {/*</CardActionArea>*/}
                <CardActions>
                    <ProtestDrawer POI={protestLocation}/>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProtestCard;
