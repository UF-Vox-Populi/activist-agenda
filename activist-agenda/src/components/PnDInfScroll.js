import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from "react-infinite-scroll-component";
import PnDCard from "./PnDCard";
import Grid from '@material-ui/core/Grid';

var calls = require('../serverCalls');

const InfScroll = () => {
    const [displayed, setDisplayed] = useState([]);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        calls.getOtherPosts().then(out => {
            let newPosts = [];

            for (var x = 0; x < out.length; x++) {
                newPosts.push(<PnDCard 
                    postID={out[x]._id}
                    id={out[x].posterID} 
                    protestTitle={out[x].title} 
                    host={out[x].poster} 
                    description={out[x].description} 
                    donLink={out[x].donationLink} 
                    supporters={out[x].supporters}
                    flagged={out[x].flagged}
                    />)
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

    return (
        <div>
            <Grid container direction="column" xs={12} sm={12} md={6}>
                <InfiniteScroll
                    dataLength={displayed.length}
                    next={loadMorePosts}
                    hasMore={hasMore}
                    scrollThreshold={0.8}
                    loader={<p style={{ textAlign: "center" }}><CircularProgress/></p>}
                    endMessage={<p style={{ textAlign: "center" }}>Loaded all posts!</p>}
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