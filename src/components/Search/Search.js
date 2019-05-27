// main component

import React from 'react'
import store from '../../store'
import {addResult} from '../../actions'
import {connect} from 'react-redux'

import '../../css/search.css'

class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            query: "",
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
                const results = []
                for(var i = 0; i < data.hits.length; i++){
                    results.push(data.hits[i])
                }
                store.dispatch(addResult(results))
            })
            .catch(error => {
                console.log(error.message)
            })

    }

    render(){
        return(
            <div>
                <form onSubmit={e => this.submitQuery(e)}>
                    <input 
                        className="search-bar"
                        type="text"
                        name="query"
                        value={this.state.query} 
                        onChange={this.onChange}
                    />
                    <input
                        type="submit"
                        value="Search"
                    />
                </form>
                <div className="result-list-container">
                    {this.props.results.map((result) => (
                        <List key={result.created_at_i} title={result.title} url={result.url} created_at={result.created_at}/>
                    ))}
                </div>
            </div>

        )
    }
}

// functional component to display individually formatted reaults
const List = props => (
    <div className="result-container">
        <a className="result-title" href={props.url}>{props.title}</a>
        <small className="result-subtitle">{props.url}</small>
        <small className="result-subtitile">{props.created_at}</small>
    </div>
)

// maps the redux state changes to props for Search
const mapStateToProps = (state) => {
    return{
        results: state.results
    }
}

export default connect(mapStateToProps)(Search)