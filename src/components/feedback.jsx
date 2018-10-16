import React, { Component, Fragment } from 'react';
import Leftsidebar from './leftSidebar';
import { sendMessage } from './../actions/dashboard'
import { connect } from 'react-redux'
import HeaderConfirm from './headerConfirm';
import Unlogin from './unlogin'

class Feedback extends Component {
	constructor(args) {
		super();
		this.state = {
			text:'',
			redir:false,
			classButton: 'feedback__form__button-disabled',
			message:'',
			subject: ''
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value},() => {
			if (this.state.message.length > 4 && this.state.subject.length > 5) {
				this.setState({classButton: 'feedback__form__button-active'})
			}
		
		})
			
	}

	handleSubmitFeedback = (e) => {
		e.preventDefault();
		let message = new FormData();
		message.append('message', this.state.message)
		message.append('subject', this.state.subject)
		message.append('email', this.props.email)
		this.props.sendMessage(message);
		this.setState({message: '', subject: ''})
	}


	render() {
		const { userData } = this.props;
		return (
			<Fragment>
				<Unlogin />
				<HeaderConfirm ethWalletUser={userData.ethWalletUser} confirmEmail={userData.confirmEmail} />
				<Leftsidebar />
				<div className="feedback">
					<div className="dashboard__itemBig">
						<div className="dashboard__itemBig__head">
							Feedback
						</div>

						<form onSubmit={this.handleSubmitFeedback} className="feedback__form">
							<p className="feedback__form__text">Subject</p>
							<input onChange={this.handleChange} required name="subject" className="feedback__form__input" type='text' placeholder='Subject' />
							<p className="feedback__form__text">Message</p>
							<textarea onChange={this.handleChange} name="message" required className="feedback__form__input feedback__form__textarea" placeholder='Message'>

							</textarea>
							<button className={this.state.classButton}>Submit</button>
						</form>
					</div>					
				</div>
			</Fragment>
			
		);
		
	}
}

const mapStateToProps = state => {
	return {
		email: state.dashboard.userData.email,
		userData: state.dashboard.userData
	}
}

const mapDispatchToProps = dispatch => {
	return {
		sendMessage: (payload) => {
			dispatch(sendMessage(payload))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);