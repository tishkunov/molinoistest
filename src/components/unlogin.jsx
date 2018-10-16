import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';



class Unlogin extends Component {
	constructor(args) {
		super();
		this.state = {
			text:'',
			redir:false
		}
	}

	handleUnlogin = (e) => {
		localStorage.removeItem('uniqueHash');
		this.setState({redir:true})
	}

	render() {
		if (this.state.redir === false) {
			return (
				<div>
					<button className="unlogin__button" onClick={this.handleUnlogin}></button>
				</div>
			)
		} else {
			return (
				<div>
					<Redirect to='/login' />
				</div>
				
			)
		}
		
		
	}
}


export default Unlogin;
