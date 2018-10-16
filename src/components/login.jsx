import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Redirect, Link } from 'react-router-dom';



class Login extends Component {
	constructor(args) {
		super();
		this.state = {
			text:'',
			redir:false
		}
	}

	submitForm = (e) => {
		e.preventDefault();

		$.ajax({
            type: "POST",
            url: "http://lk.on-life.io/login.php",
            data: $(e.target).serialize()
        }).done(function(res) {
        	if (res === 'Wrong Password') {
        		this.setState({text: res})
        	} else {
        		const data = JSON.parse(res);
	        	$('.inputForm').val('');
	            if (data.passCheck === true) {
	            	localStorage.setItem('uniqueHash', data.hash);
	            	this.setState({redir : true});
	            } 
        	}

        	

        }.bind(this));
	}

	render() {
		if (this.state.redir === true) {
			return (
					<Redirect to='/dashboard' />
				)
		} else {
				if (localStorage.getItem('uniqueHash') !== undefined && localStorage.getItem('uniqueHash') !== null && localStorage.getItem('uniqueHash') !== '') {
					return (
						<Redirect to='/dashboard' />
					)
				} else {
					if (window.location.search.indexOf('ref') !== -1) {
						localStorage.setItem('ref', window.location.search.slice(5, window.location.search.length))
						return (
							<Redirect to='/signup' />
						)
					} else {
						return (
							<Fragment>
								<div className="loginForm">

									<form className="loginForm__form" onSubmit={this.submitForm}>
									<img src="/img/logo-login.png" alt="logo" />
										<input type="text" className="inputForm inputForm-email" placeholder="Email"  required name="email"/>
										<input type="password" className="inputForm inputForm-password" placeholder="Password"  required name="pass"/>
										<button type="submit" className="loginForm__form__buttonSubmit">Login</button>
										<Link to='/password/reset'>Forget Password?</Link>
										<p>New User? <Link to='/signup'>SignUp</Link></p>
										<p className="btn" style={{color:'green'}}>{this.state.text}</p>
									</form>
									
								</div>
								
								
							</Fragment>
						)
					}
				}
			
		}
		
	}
}

export default Login;











