import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from "react-infinite-scroll-component";
import OrgCard from "./OrgCard";

var calls = require('../serverCalls');

const InfScroll = () => {
    const [displayed, setDisplayed] = useState([]);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        calls.getAllOrgs().then(out => {
            let newPosts = [];

            console.log(out);

            for (var x = 0; x < out.length; x++) {
                newPosts.push(<OrgCard 
                    author={out[x].username} 
                    avatarSrc={""} 
                    desc={out[x].bio} 
                    location={out[x].location} 
                    />)
            }

            if (out.length <= 5) {
                setHasMore(false);
            }

            setPosts(posts.concat(newPosts));
            setDisplayed(displayed.concat(newPosts.slice(0, 5)));
        });
    }, []);

    const loadMorePosts = () => {

        console.log("check");

        setTimeout(() => {
            if (displayed.length >= posts.length - 5) {
                setHasMore(false);
            }
        
            setDisplayed(displayed.concat(posts.slice(displayed.length, displayed.length + 5)));

            console.log(hasMore);
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
                    endMessage={<p style={{ textAlign: "center" }}>Loaded all organizers!</p>}
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