import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ProtestCard from "./ProtestCard";

export default class InfScroll extends React.Component {
    state = {
        items: Array.from({ length: 5 }),
        hasMore: true
    };

    fetchMoreData = () => {
        if (this.state.items.length >= 20) {
            this.setState({ hasMore: false });
            return;
        }

        // Fake async api call like which sends 20 more records in .5 secs
        setTimeout(() => {
        this.setState({
            items: this.state.items.concat(Array.from({ length: 5 }))
        });
        }, 500);
    };

    render() {
        return (
        <div>
            <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                scrollThreshold={0.9}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>No more posts!</b>
                    </p>
                }
            >
            {this.state.items.map((i, index) => (
                <ProtestCard/>
            ))}
            </InfiniteScroll>
        </div>
        );
    }
}
