import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

class EditInfo extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLoggedIn: localStorage.getItem('isLoggedIn'),
			username: localStorage.getItem('username'),

			name: "",
			oldPassword: "",
			newPassword: "",
			email: "",
			birthday: "",
			about: ""
		}

		this.handleNameChange = this.handleNameChange.bind(this)
		this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this)
		this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this)
		this.handleAboutChange = this.handleAboutChange.bind(this)

		this.editName = this.editName.bind(this)
		this.editPassword = this.editPassword.bind(this)
		this.editEmail = this.editEmail.bind(this)
		this.editBirthday = this.editBirthday.bind(this)
		this.editAbout = this.editAbout.bind(this)
	}

	handleNameChange(e){
		this.setState({
			name: e.target.value
		})
	}

	handleOldPasswordChange(e){
		this.setState({
			oldPassword: e.target.value
		})
	}

	handleNewPasswordChange(e){
		this.setState({
			newPassword: e.target.value
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

	handleAboutChange(e){
		this.setState({
			about: e.target.value
		})
	}

	editName(e){
		e.preventDefault()
		fetch('http://localhost:3001/edit-name', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"username": this.state.username,
				"name": this.state.name
			})
		})
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			if(body.success){
				alert("Name Edited!")
			}
			else{
				alert("Error!")
			}
		})
		document.getElementById("editInfoForm").reset()
	}

	editPassword(e){
		e.preventDefault()
		fetch('http://localhost:3001/edit-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"username": this.state.username,
				"oldPassword": this.state.oldPassword,
				"newPassword": this.state.newPassword
			})
		})
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			if(body.success){
				alert("Password Edited!")
			}
			else{
				alert("Error!")
			}
		})
		document.getElementById("editInfoForm").reset()
	}

	editEmail(e){
		e.preventDefault()
		fetch('http://localhost:3001/edit-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"username": this.state.username,
				"email": this.state.email
			})
		})
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			if(body.success){
				alert("Email Edited!")
			}
			else{
				alert("Error!")
			}
		})
		document.getElementById("editInfoForm").reset()
	}

	editBirthday(e){
		e.preventDefault()
		fetch('http://localhost:3001/edit-birthday', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"username": this.state.username,
				"birthday": this.state.birthday
			})
		})
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			if(body.success){
				alert("Birthday Edited!")
			}
			else{
				alert("Error!")
			}
		})
		document.getElementById("editInfoForm").reset()
	}

	editAbout(e){
		e.preventDefault()
		fetch('http://localhost:3001/edit-about', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"username": this.state.username,
				"about": this.state.about
			})
		})
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			if(body.success){
				alert("About Edited!")
			}
			else{
				alert("Error!")
			}
		})
		document.getElementById("editInfoForm").reset()
	}

	render(){
		if(this.state.isLoggedIn === 'true'){
			return(
				<div>
					<h3>Edit Info</h3>
					<form id="editInfoForm">
						<input placeholder="Name" onChange={this.handleNameChange}></input>
						&nbsp;
						<button onClick={this.editName}>Change Name</button>
						<br/>

						<input type="password" placeholder="Old Password" onChange={this.handleOldPasswordChange}></input>
						&nbsp;
						<input type="password" placeholder="New Password" onChange={this.handleNewPasswordChange}></input>
						&nbsp;
						<button onClick={this.editPassword}>Change Password</button>
						<br/>

						<input type="email" placeholder="Email" onChange={this.handleEmailChange}></input>
						&nbsp;
						<button onClick={this.editEmail}>Change Email</button>
						<br/>

						<input type="date" placeholder="Birthday" onChange={this.handleBirthdayChange}></input>
						&nbsp;
						<button onClick={this.editBirthday}>Change Birthday</button>
						<br/>

						<textarea rows="5" cols="50" placeholder="About Yourself..." onChange={this.handleAboutChange}></textarea>
						<br/>
						<button onClick={this.editAbout}>Edit About</button>
						<br/>
					</form>
				</div>
			)
		}
		else{
			return(
				<Redirect to='/login' />
			)
		}
	}
}

export default EditInfo;