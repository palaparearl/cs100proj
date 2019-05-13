import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

class Landing extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLoggedIn: localStorage.getItem('isLoggedIn'),
			username: localStorage.getItem('username')
		}
	}

	render(){
		if(this.state.isLoggedIn === 'true'){
			return(
				<Redirect to='/home' />
			)
		}
		else{
			return(
				<Redirect to='/login' />
			)
		}
	}
}

export default Landing;