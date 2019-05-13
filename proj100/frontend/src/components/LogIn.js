import React, { Component } from 'react';
import Cookies from 'universal-cookie';

class LogIn extends Component{
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: ""
		}

		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.signUp = this.signUp.bind(this)
	}

	handleUsernameChange(e){
		this.setState({
			username: e.target.value
		})
	}

	handlePasswordChange(e){
		this.setState({
			password: e.target.value
		})
	}

	handleSubmit(e){
		fetch('http://localhost:3001/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		})
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			if(!body.success){
				alert("Failed to Log In")
			}
			else{
				const cookies = new Cookies()
				cookies.set(
					'authToken',
					body.token,
					{
						path: 'localhost:3001/',
						age: 60 * 60
					}
				)
				localStorage.setItem('username', body.username)
				localStorage.setItem('isLoggedIn', true)

				this.props.history.push("/home");
			}
		})
	}

	signUp(e){
		this.props.history.push("/signup")
	}

	render(){
		return(
			<div>
				<h3>Log In</h3>
				<form>
					<input placeholder="Username" onChange={this.handleUsernameChange}></input>
					<br/>
					<input type="password" placeholder="Password" onChange={this.handlePasswordChange}></input>
					<br/>
				</form>
				<button onClick={this.handleSubmit}>Log In</button>
				&nbsp;
				<button onClick={this.signUp}>Sign Up</button>
			</div>
		)
	}
}

export default LogIn;