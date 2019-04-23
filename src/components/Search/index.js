import React from 'react'

import '../../css/search.css'

export default class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            query: "",
            results: [],
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    submitQuery = e => {
        e.preventDefault()
        fetch('http://hn.algolia.com/api/v1/search?query=' + this.state.query)
            .then(response => response.json())
            .then(data => {
                const tempResults = []
                for(var i = 0; i < data.hits.length; i++){
                    tempResults.push(data.hits[i])
                }
                this.setState({
                    results: tempResults
                })
            })
            .catch(error => {
                console.log(error.message)
            })

    }

    render(){

        console.log(this.state.results)
        const { query } = this.state

        return(
            <div>
                <form onSubmit={e => this.submitQuery(e)}>
                    <input 
                        className="search-bar"
                        type="text"
                        name={"query"}
                        value={query} 
                        onChange={this.onChange}
                    />
                    <input
                        type="submit"
                        value="Search"
                    />
                </form>
                <div className="result-list-container">
                    {this.state.results.map((result) => (
                        <div className="result-container">
                            <a className="title" href={result.url}>{result.title}</a>
                            <t>{result.url}</t>
                            <t>{result.created_at}</t>
                        </div>
                    ))}
                </div>
            </div>

        )
    }
}
