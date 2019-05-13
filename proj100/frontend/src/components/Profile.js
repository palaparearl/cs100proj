import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import FriendRequest from "./FriendRequest";
import Friend from "./Friend";

class Profile extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLoggedIn: localStorage.getItem('isLoggedIn'),
			username: localStorage.getItem('username'),

			profileUsername: this.props.match.params.profile_username,
			isFriendsOrSentRequest: "false",

			name: "",
			birthday: "",
			about: "",
			friendRequests: [],
			friends: []
		}

		fetch('http://localhost:3001/get-profile-details/' + this.state.profileUsername)
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			if(body.details.length !== 0){
				// var pad = function(str){str = str.toString(); return "00".substring(0, 2-str.length) + str;}
				// var date = new Date(body.details[0].birthday);
				// var utcdatestring = date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate());

				this.setState({
					name: body.details[0].name,
					birthday: body.details[0].birthday,
					about: body.details[0].about
				})
			}
		})

		fetch('http://localhost:3001/get-friends/' + this.state.profileUsername)
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			this.setState({
				friends: body.userArray
			})
		})

		if(this.state.username !== this.state.profileUsername){
			fetch('http://localhost:3001/check-relation/' + this.state.username + '/' + this.state.profileUsername)
			.then(response=>{
				return response.json()
			})
			.then(body=>{
				this.setState({
					isFriendsOrSentRequest: body.connected
				})
			})
		}
		else{
			fetch('http://localhost:3001/get-friend-requests/' + this.state.username)
			.then(response=>{
				return response.json()
			})
			.then(body=>{
				this.setState({
					friendRequests: body.userArray
				})
			})
		}

		this.sendRequest = this.sendRequest.bind(this)
	}

	sendRequest(e){
		fetch('http://localhost:3001/send-request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"username": this.state.username,
				"profileUsername": this.state.profileUsername
			})
		})
		.then(response=>{
			return response.json()
		})
		.then(body=>{
			if(body.success){
				alert("Friend Request Sent")
			}
			else{
				alert("Failed to Send Friend Request")
			}
		})
		this.setState({
			isFriendsOrSentRequest: "true"
		})
	}

	render(){
		if(this.state.isLoggedIn === 'true'){
			return(
				<div>
					<h3>{this.state.name}</h3>
					{
						(this.state.username !== this.state.profileUsername && this.state.isFriendsOrSentRequest === "false") && <button onClick={this.sendRequest}>Send Friend Request</button>
					}
					<h3>{this.state.birthday}</h3>
					<h3>{this.state.about}</h3>
					<textarea rows="7" cols="70" placeholder="What's on your mind?"></textarea>
					<br/>
					<h3>Friends</h3>
					{
						this.state.friends.map(item=>{
							var friend_username = this.state.profileUsername === item.first_friend ? item.second_friend : item.first_friend
							return <Friend key={item.friendship_id} username={friend_username} parentProfileUsername={this.state.profileUsername}/>
						})
					}
					{
						(this.state.username === this.state.profileUsername) && <h3>Friend Requests</h3>
					}
					{
						(this.state.username === this.state.profileUsername) &&
						this.state.friendRequests.map(item=>{
							return <FriendRequest key={item.request_id} username={item.sender} />
						})
					}
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

export default Profile;