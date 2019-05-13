import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

class SearchResults extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLoggedIn: localStorage.getItem('isLoggedIn'),
			username: localStorage.getItem('username'),

			searchString: this.props.match.params.search_string,
			results: []
		}

		fetch('http://localhost:3001/get-search-results/' + this.state.searchString)
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			if(body.searchResults.length !== 0){
				this.setState({
					results: body.searchResults
				})
			}
		})
	}

	render(){
		if(this.state.results.length !== 0){
			return(
				<div>
					<ul>
						{this.state.results.map(item=>{
							return <li key={item.user_id}><a href={"http://localhost:3000/profile/" + item.username}>{item.name}</a></li>
						})}
					</ul>
				</div>
			)
		}
		else{
			return(
				<div>
					<h3>No Results Found.</h3>
				</div>
			)
		}
	}
}

export default SearchResults;