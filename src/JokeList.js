import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import octospin from './octospin.gif';
const URL = "https://icanhazdadjoke.com"

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
            
            const jokes = [];
            const seen = new Set();

            while (jokes.length < 20) {
                const response = await axios.get(
                    URL,
                    {
                        headers: {
                            Accept: "application/json"
                        },
                        
                    });
                
                const { id, joke } = response.data;

                if (seen.has(id)) {
                    continue;
                } else {
                    seen.add(id);
                    jokes.push({ id, joke, score: 0 });
                }
    
            }

            this.setState({
                jokes,
                loading: false
            });

        } catch (err) {
            this.setState({
                error: true
            })
        }
    }
    /** Internal method used for hanldeUpVote and handleDownVote */
    _vote(st, id, delta) {

        const jokes = st.jokes.map(j => {
            if (j.id === id) {
                j.score = j.score + delta
            }
            return j
        })

        return jokes.sort((a, b) => b.score - a.score)

    }

    /** increments score by 1*/
    handleUpVote(id) {
        this.setState(st => {
            return {
                jokes: this._vote(st, id, 1)
            }
        })
    }

    /** decrements score by 1 */
    handleDownVote(id) {
        
        this.setState(st => {
            return {
                jokes: this._vote(st, id, -1)
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