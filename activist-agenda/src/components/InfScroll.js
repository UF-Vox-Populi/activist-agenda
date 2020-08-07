import React, { useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from "react-infinite-scroll-component";
import ProtestCard from "./ProtestCard";

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
    const [posts, setPosts] = useState(Array.from({ length: 5 }));
    const [hasMore, setHasMore] = useState(true);

    /*
    const [posts, setPosts] = useState(cards);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [lastPostIndex, setLastPostIndex] = useState(0);
    */

    const loadMorePosts = () => {
        if (posts.length >= 20) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setPosts(posts.concat(Array.from({ length: 5 })));
            setHasMore(true);
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
                {posts.map((index) => (<ProtestCard/>))}
            </InfiniteScroll>
        </div>
    );
}

export default InfScroll;
