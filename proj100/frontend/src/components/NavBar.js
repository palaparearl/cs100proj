import React, { Component } from 'react';
import { Menu, Search, Button, Container } from 'semantic-ui-react';
import 'semantic-ui/dist/semantic.min.css';


class Logout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_data: {}
		}
	}

	handleLogout() {

	}

	render () {
		return (
			<div>
			</div>
		);
	}

}

class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeItem: 'home'
		}

		this.handleItemClick = this.handleItemClick.bind(this);

	}

	handleItemClick(e) {
		this.setState({activeItem: e.target.value})
	}

	render() {
		return (
			<div>
				<Menu>
					<Container>
						<Menu.Item name='home'
							active={this.props.activeItem === 'home'}
							onClick={this.handleItemClick}
						>
							Home
						</Menu.Item>
						<Menu.Item name='profile'
							active={this.props.activeItem === 'profile'}
							onClick={this.handleItemClick}
						>
							Profile
						</Menu.Item>
						<Menu.Item name='friends'
							active={this.props.activeItem === 'friends'}
							onClick={this.handleItemClick}
						>
							Friends
						</Menu.Item>
					</Container>
				</Menu>
			</div>

		);
	}
}



export default NavBar;