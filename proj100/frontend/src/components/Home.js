import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
	
class Home extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLoggedIn: localStorage.getItem('isLoggedIn'),
			username: localStorage.getItem('username'),

			searchInput: ""
		}

		this.viewProfile = this.viewProfile.bind(this)
		this.logout = this.logout.bind(this)
		this.editInfo = this.editInfo.bind(this)
		this.handleSearchChange = this.handleSearchChange.bind(this)
		this.search = this.search.bind(this)
	}

	handleSearchChange(e){
		this.setState({
			searchInput: e.target.value
		})
	}

	search(e){
		this.props.history.push("/search/" + this.state.searchInput)
	}

	viewProfile(e){
		this.props.history.push("/profile/" + this.state.username)
	}

	logout(e){
		e.preventDefault()

		const cookies = new Cookies()
		cookies.remove('authToken')

		localStorage.removeItem('username')
		localStorage.setItem('isLoggedIn', false)

		this.setState({
			isLoggedIn: false
		})
		this.props.history.push("/login");
	}

	editInfo(e){
		this.props.history.push("/edit-info")
	}

	render(){
		if(this.state.isLoggedIn === 'true'){
			return(
				<div>
					<input placeholder="Search User" onChange={this.handleSearchChange}></input>
					&nbsp;
					<button onClick={this.search}>Search</button>
					<br/>
					<button onClick={this.logout}>Log Out</button>
					<button onClick={this.viewProfile}>View Profile</button>
					<button onClick={this.editInfo}>Edit Info</button>
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

export default Home;