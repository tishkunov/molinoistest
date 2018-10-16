import React, { Component, Fragment } from 'react';
import $ from 'jquery'
import { Link, Redirect } from 'react-router-dom'


class Signup extends Component {
	constructor(args) {
		super();
		this.state = {
			response:null,
			pass: '',
			secondPass: '',
			stateDisabled: true,
			email: '',
			name:'',
			samePass: false,
			redir:false
		}
	}

	submitForm = (e) => {
		e.preventDefault();
		
		$.ajax({
            type: "POST",
            url: "http://lk.on-life.io/signup.php",
            data: $(e.target).serialize()
        }).done(function(data) {
         
            if (data !== 'User already register') {
            	$('.inputForm').val('');
	            this.setState({response: data, pass:'', secondPass:'', stateDisabled:true, email: '', name:''},() => {
	            	setTimeout(() => {
	            		this.setState({redir:true})
	            	}, 5000)
	            })
            }
            
        }.bind(this));
	}

	handleChange = (e) => {
		this.setState({[e.target.name] : e.target.value}, () => {
			if (this.state.pass !== '' && this.state.secondPass !== ''  && this.state.email !== '') {
				  if (this.state.samePass === true) {
					this.setState({stateDisabled: false, response: null})
				}
			}
		});
		
	}

	blurFirstPass = (e) => {
		if (e.target.name === 'pass') {
			if (this.state.pass.length < 6) {
				this.setState({response: 'Password should be minimum 6 characters'});
			} else {
				this.setState({response: ''});
			}
		} else {
			if (this.state.pass !== this.state.secondPass) {
				this.setState({ response: 'Password should be the same' });
			}
		}
		if (this.state.pass === this.state.secondPass && this.state.pass.length > 5) {
			this.setState({samePass: true})
			if (this.state.pass !== '' && this.state.secondPass !== ''  && this.state.email !== '') {
				  if (this.state.samePass === true) {
					this.setState({stateDisabled: false, response: null})
				}
			}
		}
	}


	

	render() {
		const ref = localStorage.getItem('ref') !== undefined || localStorage.getItem('ref') !== null || localStorage.getItem('ref') !== '' ? (<input name="ref" type="hidden" value={localStorage.getItem('ref')} />) : null; 
		
		if (this.state.redir === false) {
			return (
				<Fragment>
					<div className="loginForm">

						<form className="loginForm__form" onSubmit={this.submitForm}>
						<img src="/img/logo-login.png" alt="Logo" />
							<input type="email" onChange={this.handleChange} className="inputForm" placeholder="Email" name="email" required />
							<input type="password" onChange={this.handleChange} min="6" onBlur={this.blurFirstPass} className="inputForm" placeholder="Password" name="pass" required />
							<input type="password" onChange={this.handleChange} min="6" onBlur={this.blurFirstPass} className="inputForm" placeholder="Confirm password" required name="secondPass" />
							{ref}
							<button type="submit" className="loginForm__form__buttonSubmit">Sign Up</button>
							
							
							<Link to='/login'>Already have account?</Link>
							<p className="btn">{this.state.response}</p>
						</form>
						
					</div>
					
					
				</Fragment>
				

			)
		} else {
			return (
				<Redirect to='/login' />

			)
		}

		
	}
}


export default Signup;


