import React, { Component } from 'react';

/** component for joke, displays text, score, upvote button, and downvote button */
class Joke extends Component {

    // shouldComponentUpdate(nextProps) {
    //     return this.props.score !== nextProps.score
    // }

    render() {
    return (
        <div>
            🧀
            {this.props.text}
            <button onClick={this.props.handleUpVote}>Up</button>
            <button onClick={this.props.handleDownVote}>Down</button>
            {this.props.score}
        </div>
    );
    }
}

export default Joke;
