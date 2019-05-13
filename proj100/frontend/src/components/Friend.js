import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

class Friend extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLoggedIn: localStorage.getItem('isLoggedIn'),
			myUsername: localStorage.getItem('username'),

			name: "",
			username: this.props.username,
			parentProfileUsername: this.props.parentProfileUsername
		}

		fetch('http://localhost:3001/get-user/' + this.state.username)
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			this.setState({
				name: body.results[0].name
			})
		})

		this.removeFriend = this.removeFriend.bind(this)
	}

	removeFriend(e){
		fetch('http://localhost:3001/remove-friend', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"myUsername": this.state.myUsername,
				"friendUsername": this.state.username
			})
		})
		.then(response=>{
			return response.json()
		})
		.then(body=>{
		})

		window.location.reload()
	}

	render(){
		return(
			<div>
				<li>
					<a href={"http://localhost:3000/profile/" + this.state.username}>{this.state.name}</a>
					&nbsp;
					{
						this.state.myUsername === this.state.parentProfileUsername && <button onClick={this.removeFriend}>Remove Friend</button>
					}
				</li>
				<br/>
			</div>
		)
	}
}

export default Friend;