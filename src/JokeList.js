import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import octospin from './octospin.gif';

/** JokeList class to define the list of cheeZjokes */
class JokeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jokes: [],
            loading: true,
            error: null
        }
        this.handleDownVote = this.handleDownVote.bind(this);
        this.handleUpVote = this.handleUpVote.bind(this);
    }

    async componentDidMount() {
        try {

            /** FIXME: get the random version of this url */
            const response = await axios.get(
                "https://icanhazdadjoke.com/search",
                {
                    headers: {
                        Accept: "application/json"
                    },
                    params: {
                        limit: 10
                    }
                });

            this.setState({
                jokes: response.data.results.map(joke =>
                    ({ ...joke, score: 0 })
                ),
                loading: false
            })
        } catch (err) {
            this.setState({
                error: true
            })
        }
    }
    /** FIXME: Internal method used for hanldeUpVote and handleDownVote */
    _vote(id, delta=1){

    }

    /** increments score by 1*/
    handleUpVote(id) {
        this.setState(st => {
            return {
                jokes: st.jokes.map(j => {
                    if (j.id === id) {
                        j.score++
                    }
                    return j
                })
            }
        })
    }

    /** decrements score by 1 */
    handleDownVote(id) {
        this.setState(st => {
            return {
                jokes: st.jokes.map(j => {
                    if (j.id === id) {
                        j.score--
                    }
                    return j
                })
            }
        })

    }

    /**
     * displays loading screen if loading otherwise display JokeList
     */
    render() {
        /**FIXME: belongs in CSS because there's no dynamically created stufff */
        const style = {
            // backgroundImage: `url(${octospin})`
            height: "100vh",
            position: "absolute",
        }
        return (
            <div>
                {this.state.loading ? <img style={style} src={octospin} alt="loading" /> :
                    <>
                        <h1>🧀 Jokes</h1>
                        {
                            this.state.jokes.map(j =>
                                <Joke 
                                      key={j.id} 
                                      text={j.joke} 
                                      score={j.score} 
                                      handleDownVote={() => this.handleDownVote(j.id)} handleUpVote={() => this.handleUpVote(j.id)} 
                                />
                            )
                        }
                    </>
                }
            </div>
        );
    }
}

export default JokeList