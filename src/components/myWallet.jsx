import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import LeftSidebar from './leftSidebar'
import { addWallet } from './../actions/wallet'
import HeaderConfirm from './headerConfirm'
import Unlogin from './unlogin'


class AdminPanel extends Component {
	constructor(args) {
		super();
		this.state = {
			text:'',
			ethwallet: ''
		}
	}

	componentDidMount() {
		
		
	}

	handleChangeInput = (e) => {
		this.setState({ [e.target.name] : e.target.value});
	}	

	handleSubmitWallet = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('ethwallet', this.state.ethwallet);
		formData.append('email', this.props.userData.email);
		this.props.addWallet(formData);
	}


	render() {
		
		const { ethWalletUser, userData } = this.props;
		const ethWallet = ethWalletUser === null || ethWalletUser === undefined || ethWalletUser === '' ? 
							(<Fragment>
								<form className="myWallet__formSubmit" onSubmit={this.handleSubmitWallet}>
									<input type="text" className="myWallet__itemBig__input myWallet__itemBig__input-eth" onChange={this.handleChangeInput} name="ethwallet" placeholder="ETH wallet" />
									<button type="submit" className="myWallet__buttonSubmit">Save</button>
								</form>
							</Fragment>) : 	(<Fragment>
								<form className="myWallet__formSubmit" >
									<input type="text" className="myWallet__itemBig__input myWallet__itemBig__input-eth" readonly="readonly" disabled="disabled" value={ethWalletUser} name="ethwallet" placeholder="ETH wallet" />
									<img className="myWallet__itemCheck" src="/img/icon-check-true.png" alt="check-true" />
								</form>
							</Fragment>);
			if (Number(userData.confirmEmail) === 1) {
				return (
					<Fragment>
						<Unlogin />
						<LeftSidebar />	
						<div className="myWallet">
							<div className="dashboard__itemBig">
								<div className="dashboard__itemBig__head dashboard__itemBig__head-green">
									My wallets
								</div>
								{ethWallet}
								
							</div>
							<div className="dashboard__itemBig">
								<div className="dashboard__itemBig__head dashboard__itemBig__head-red">
									Warning
								</div>
								<div className="dashboard__itemBig__wrapText">
									<p className="myWallet__itemBig__text">
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor. <br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>

								</p>

								<p className="myWallet__itemBig__text">
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									You should to be security with your wallet. Lorem Ipsum Dolor.<br/>
									
								</p>
								</div>
								
							</div>

							
							
						</div>
					</Fragment>
				) 
			} else {
				return (
					<Fragment>
						<HeaderConfirm ethWalletUser={userData.ethWalletUser} confirmEmail={userData.confirmEmail} />
						<LeftSidebar />
						<Unlogin />	
						<div className="myWallet">
							<div className="dashboard__itemBig">
								<div className="dashboard__itemBig__head dashboard__itemBig__head-orange">
									My wallets
								</div>
								<p className="dashboard__itemBig__wallet__text">Your email not confirmed</p>
								<p className="dashboard__itemBig__wallet__text-plain">For adding wallet need confirm email</p>
								<button className="dashboard__itemBig__wallet__button">Send letter on email</button>
							</div>
							<div className="dashboard__itemBig">
								<div className="dashboard__itemBig__head dashboard__itemBig__head-red">
									Warning
								</div>
								<div className="dashboard__itemBig__wrapText">
									<p className="myWallet__itemBig__text">
									BLA BLA BLA YOU SHOULD USE 
								</p>

								<p className="myWallet__itemBig__text">
									BLA BLA BLA YOU SHOULD USE 
								</p>
								</div>
								
							</div>

							
							
						</div>
					</Fragment>
				) 
			}			
					
	}
}

const mapStateToProps = state => {
	return {
		ethWalletUser: state.dashboard.userData.ethWalletUser,
		userData: state.dashboard.userData
	}
}

const mapDispatchToProps = dispatch => {
 	return {
        addWallet: (payload) => {
            dispatch(addWallet(payload));
        }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);








