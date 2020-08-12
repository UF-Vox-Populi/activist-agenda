import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


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

    return (
        <Grid item xs={12} sm={12} md={12}>
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
