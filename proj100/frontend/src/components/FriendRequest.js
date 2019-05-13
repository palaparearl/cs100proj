import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

class FriendRequest extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLoggedIn: localStorage.getItem('isLoggedIn'),
			myUsername: localStorage.getItem('username'),

			name: "",
			username: this.props.username
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

		this.acceptRequest = this.acceptRequest.bind(this)
		this.ignoreRequest = this.ignoreRequest.bind(this)
	}

	acceptRequest(e){
		fetch('http://localhost:3001/accept-request', {
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

	ignoreRequest(e){
		fetch('http://localhost:3001/ignore-request', {
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
					<button onClick={this.acceptRequest}>Accept</button>
					&nbsp;
					<button onClick={this.ignoreRequest}>Ignore</button>
				</li>
				<br/>
			</div>
		)
	}
}

export default FriendRequest;