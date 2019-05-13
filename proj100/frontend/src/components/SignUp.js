import React, { Component } from 'react';

class SignUp extends Component{
	constructor(props){
		super(props)
		this.state = {
			name: "",
			username: "",
			password: "",
			email: "",
			birthday: "",

			noName: false,
			noUserName: false,
			noPassword: false,
			noEmail: false,
			noBirthday: false
		}

		this.handleNameChange = this.handleNameChange.bind(this)
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleNameChange(e){
		this.setState({
			name: e.target.value
		})
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

	handleEmailChange(e){
		this.setState({
			email: e.target.value
		})
	}

	handleBirthdayChange(e){
		this.setState({
			birthday: e.target.value
		})
	}

	handleSubmit(e){
		if(this.state.name === ""){
			this.setState({
				noName: true
			})
		}
		else{
			this.setState({
				noName: false
			})
		}

		if(this.state.username === ""){
			this.setState({
				noUserName: true
			})
		}
		else{
			this.setState({
				noUserName: false
			})
		}

		if(this.state.password === ""){
			this.setState({
				noPassword: true
			})
		}
		else{
			this.setState({
				noPassword: false
			})
		}

		if(this.state.email === ""){
			this.setState({
				noEmail: true
			})
		}
		else{
			this.setState({
				noEmail: false
			})
		}

		if(this.state.birthday === ""){
			this.setState({
				noBirthday: true
			})
		}
		else{
			this.setState({
				noBirthday: false
			})
		}

		if(this.state.name !== "" &&
			this.state.username !== "" &&
			this.state.password !== "" &&
			this.state.email !== "" &&
			this.state.birthday !== ""
		){
			fetch('http://localhost:3001/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"name": this.state.name,
					"username": this.state.username,
					"password": this.state.password,
					"email": this.state.email,
					"birthday": this.state.birthday
				})
			})
			.then(response=>{
				return response.json()
			})
			.then(body=>{
				if(body.success){
					alert("Successfully Saved User")
				}
				else{
					alert("Failed to Save User")
				}
			})

			document.getElementById("signUpForm").reset()
		}
	}

	render(){
		return(
			<div>
				<h3>Create a New Account</h3>
				<form id="signUpForm">
					<input placeholder="Name" onChange={this.handleNameChange}></input>
					&nbsp;
					{
						this.state.noName && <font color="red">Name is required</font>
					}
					<br/>
					<input placeholder="Username" onChange={this.handleUsernameChange}></input>
					&nbsp;
					{
						this.state.noUserName && <font color="red">Username is required</font>
					}
					<br/>
					<input type="password" placeholder="Password" onChange={this.handlePasswordChange}></input>
					&nbsp;
					{
						this.state.noPassword && <font color="red">Password is required</font>
					}
					<br/>
					<input type="email" placeholder="E-mail" onChange={this.handleEmailChange}></input>
					&nbsp;
					{
						this.state.noEmail && <font color="red">E-mail is required</font>
					}
					<br/>
					<input type="date" placeholder="Birthday" onChange={this.handleBirthdayChange}></input>
					&nbsp;
					{
						this.state.noBirthday && <font color="red">Birthday is required</font>
					}
					<br/>
				</form>
				<button onClick={this.handleSubmit}>Sign Up</button>
			</div>
		)
	}
}

export default SignUp;