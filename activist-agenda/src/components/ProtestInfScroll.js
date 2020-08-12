import React, { useState, useEffect } from "react";
// Loader
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from "react-infinite-scroll-component";
import ProtestCard from "./ProtestCard";
//SortBy ToggleButtonGroup
import DateRangeIcon from '@material-ui/icons/DateRange';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import WhatshotIcon from '@material-ui/icons/Whatshot';

var calls = require('../serverCalls');

const InfScroll = () => {
    const [displayed, setDisplayed] = useState([]);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        calls.getEventPosts().then(out => {
            let newPosts = [];

            // out.reverse();   This is breaking stuff weird

            for (var x = out.length-1; x >= 0; x--) {
                newPosts.push(<ProtestCard 
                        postID={out[x]._id}
                        id={out[x].posterID} 
                        protestTitle={out[x].title} 
                        host={out[x].poster} 
                        protestLocation={out[x].address} 
                        date={out[x].time.substring(0,10)} 
                        description={out[x].description} 
                        donLink={out[x].donationLink} 
                        orgLink={out[x].organizationLink} 
                        supporters={out[x].supporters}
                        flagged={out[x].flagged}
                    />
                )
            }

            if (out.length <= 5) {
                setHasMore(false);
            }

            setPosts(posts.concat(newPosts));
            setDisplayed(displayed.concat(newPosts.slice(0, 5)));
        })
    }, []);

    const loadMorePosts = () => {

        setTimeout(() => {
            if (displayed.length >= posts.length - 5) {
                setHasMore(false);
            }
        
            setDisplayed(displayed.concat(posts.slice(displayed.length, displayed.length + 5)));
        }, 2000);

    };

    const [sortBy, setSortBy] = React.useState('');

    const handleSortBy = (event, newSortBy) => {
        if (newSortBy === 'popular') {
            calls.getEventPosts().then(out => {
                let newPosts = [];

                out.sort(function (a, b) {
                    return b.supporters.length - a.supporters.length;
                });

                for (var x = 0; x < out.length; x++) {
                    newPosts.push(<ProtestCard 
                        postID={out[x]._id}
                        id={out[x].posterID} 
                        protestTitle={out[x].title} 
                        host={out[x].poster} 
                        protestLocation={out[x].address} 
                        date={out[x].time.substring(0,10)} 
                        description={out[x].description} 
                        donLink={out[x].donationLink} 
                        orgLink={out[x].organizationLink} 
                        supporters={out[x].supporters}
                        flagged={out[x].flagged}
                        />
                    )
                }

                if (out.length <= 5) {
                    setHasMore(false);
                }

                setPosts(posts.concat(newPosts));
                setDisplayed(displayed.filter(post => post.title !== post.title).concat(newPosts.slice(0, 5)));

            });
        } else {
            calls.getEventPosts().then(out => {
                let newPosts = [];

                out.reverse();

                for (var x = 0; x < out.length; x++) {
                    newPosts.push(<ProtestCard 
                        postID={out[x]._id}
                        id={out[x].posterID} 
                        protestTitle={out[x].title} 
                        host={out[x].poster} 
                        protestLocation={out[x].address} 
                        date={out[x].time.substring(0,10)} 
                        description={out[x].description} 
                        donLink={out[x].donationLink} 
                        orgLink={out[x].organizationLink} 
                        supporters={out[x].supporters}
                        flagged={out[x].flagged}
                        />
                    )
                }

                if (out.length <= 5) {
                    setHasMore(false);
                }

                setPosts(posts.concat(newPosts));
                setDisplayed(displayed.filter(post => post.title !== post.title).concat(newPosts.slice(0, 5)));
            });
        }
    };

    return (
        <div>
            <Grid container direction="column" xs={12} sm={12} md={6}>
                <Grid item xs={12} sm={12} md={12} align="center">
                    <ToggleButtonGroup
                        value={sortBy}
                        exclusive={true}
                        onChange={handleSortBy}
                        aria-label="sort by"
                        size="small"
                        align="center"
                    >
                        <ToggleButton value="latest" aria-label="sort by latest">
                            <DateRangeIcon fontSize="small" color="primary"/>Latest
                        </ToggleButton>
                        <ToggleButton value="popular" aria-label="sort by popular">
                            <WhatshotIcon fontSize="small" color="primary"/>Popular
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item><br/></Grid>
                <InfiniteScroll
                    dataLength={displayed.length}
                    next={loadMorePosts}
                    hasMore={hasMore}
                    scrollThreshold={0.8}
                    loader={<p style={{ textAlign: "center" }}><CircularProgress/></p>}
                    endMessage={<p style={{ textAlign: "center" }}>Loaded all posts!</p>}
                    refreshFunction={handleSortBy}
                >
                    <Grid container direction="column" spacing={3} xs={12}>
                        {displayed}
                    </Grid>
                </InfiniteScroll>
            </Grid>
        </div>
    );
}

export default InfScroll;