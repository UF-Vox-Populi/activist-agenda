import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from "react-infinite-scroll-component";
import ProtestCard from "./ProtestCard";

import Cookies from 'universal-cookie';
var calls = require('../serverCalls');

// Just an array of ProtestCard components with length of 7
const cards = [
    <ProtestCard/>,
    <ProtestCard/>,
    <ProtestCard/>,
    <ProtestCard/>,
    <ProtestCard/>,
    <ProtestCard/>,
    <ProtestCard/>
]

const InfScroll = () => {
    const [displayed, setDisplayed] = useState([]);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const cookie = new Cookies();

    useEffect(() => {
        calls.getAllPosts().then(out => {
            let newPosts = [];

            if (cookie.get('authedUser')) {
                setLoggedIn(true);
            }

            for (var x = 0; x < out.length; x++) {
                newPosts.push(<ProtestCard 
                     displayLoggedInBtns={loggedIn}  
                    id={out[x].posterID} 
                    protestTitle={out[x].title} 
                    host={out[x].poster} 
                    protestLocation={out[x].address} 
                    date={out[x].time.substring(0,10)} 
                    description={out[x].description} 
                    donLink={out[x].donationLink} 
                    orgLink={out[x].organizationLink} 
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
            <InfiniteScroll
                dataLength={posts.length}
                next={loadMorePosts}
                hasMore={hasMore}
                scrollThreshold={0.8}
                loader={<p style={{ textAlign: "center" }}><CircularProgress/></p>}
                endMessage={<p style={{ textAlign: "center" }}>Loaded all posts!</p>}
            >
                {displayed}
            </InfiniteScroll>
        </div>
    );
}

export default InfScroll;