import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';



class PasswordReset extends Component {
	constructor(args) {
		super();
		this.state = {
			email:'',
			responseText:'',
			data: [],
			formDisable:false
		}
	}

	submitForm = (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append('email', this.state.email);

		fetch(`http://on-life.io/password/reset.php`, {
			method: 'POST',
			body: formData  
		})
		.then(res => res.json())
		.then(res => this.setState({data:res, responseText:res.responseText, }, () => {
			if (this.state.data.checkUser === true) {
				this.setState({formDisable: true});
			}
		}))
		.catch(error => console.error(error));
	}

	handleResetEmail = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
			return (
				<Fragment>
					<div>Reset Password</div>
					<p>{this.state.responseText}</p>
					<form onSubmit={this.submitForm} disabled={this.state.formDisable}>
						<input type="text" onChange={this.handleResetEmail} className="inputForm" placeholder="Email" required name="email"/>
						<button type="submit">Send Link to reset</button>
					</form>
					<Link to='/login'>Have account?</Link>
				</Fragment>
			)	
	}
}




export default PasswordReset;


