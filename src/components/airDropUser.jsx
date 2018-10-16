import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import LeftSidebar from './leftSidebar'
import { airDropGetRates, userSubmitAirdrop } from './../actions/airdrop'
import HeaderConfirm from './headerConfirm'
import Unlogin from './unlogin'


class AdminPanel extends Component {
	constructor(args) {
		super();
		this.state = {
			text:'',
			textSecond:'',
			ethwallet: '',
			
			
		}
	}

	componentDidMount() {
		this.props.airDropGetRates();
	}

	handleSubmitAirdropUser = (e) => {
		e.preventDefault();
		let data = new FormData(e.currentTarget);
		this.props.userSubmitAirdrop(data);
		e.currentTarget.firstElementChild.value = ''
	} 

	handleBottle = (e) => {
		e.preventDefault();
	}


	render() {
		const { userData } = this.props;
		let airdropTwitter = this.props.rates.map(item => {
			
			if (item.statusEnabledAD === 'enabled') {
				if (item.typeAirDrop !== 'register' && item.typeAirDrop !== 'safeTokens') {
					if (item.typeAirDrop === 'twitter') {
						
							return (
								<div className="airdropUser__types">
									<div className="airdropUser__types__item">
										<a className={userData.airDropTwitter === '' ? 'airdropUser__types__item__link airdropUser__types__item__link-twitter' : 'airdropUser__types__item__link-disabled' } href={userData.airDropTwitter === '' ? 'https://twitter.com/system_bit/' : null}> Subscribe</a>
										<form className="airdropUser__types__item__form" onSubmit={userData.airDropTwitter === '' ? this.handleSubmitAirdropUser : this.handleBottle}>
											<input className="airdropUser__types__item__input" type="text" placeholder='Your account link' required name="nameAcc" />
											<input type="date" required id="start" name="dateJoin"
				               					
				               					min="2018-10-14" max="2018-11-01" />
				               				<input type="hidden" value={item.typeAirDrop} name="type" />
				               				<input type="hidden" name="email" value={this.props.userData.email} />
				               				<button type="submit" disabled={userData.airDropTwitter !== '' ? 'disabled' : null}>Send</button>
										</form>

									</div>
									<h3 className="airdropUser__types__item__text">Tokens will be added : {item.countTokensForAD}</h3>
								</div>
							);
						
					} else if (item.typeAirDrop === 'facebook') {
							
								return (
									<div className="airdropUser__types">
										<div className="airdropUser__types__item">
											<a className={userData.airDropFacebook === '' ? 'airdropUser__types__item__link airdropUser__types__item__link-facebook' : 'airdropUser__types__item__link-disabled' } href={userData.airDropFacebook === '' ? 'https://www.facebook.com/SystemBitConsulting/' : null}>  Join to group</a>
											<form className="airdropUser__types__item__form" onSubmit={userData.airDropFacebook === '' ? this.handleSubmitAirdropUser : this.handleBottle}>
												<input className="airdropUser__types__item__input" type="text" placeholder='Your account link' required name="nameAcc" />
												<input type="date" required id="start" name="dateJoin"
					               					
					               					min="2018-10-14" max="2018-11-01" />
					               				<input type="hidden" value={item.typeAirDrop} name="type" />
					               				<input type="hidden" name="email" value={this.props.userData.email} />
					               				<button type="submit" disabled={userData.airDropFacebook !== '' ? 'disabled' : null}>Send</button>
											</form>

										</div>
										<h3 className="airdropUser__types__item__text">Tokens will be added : {item.countTokensForAD}</h3>
									</div>
								);
							
						} else {
							
								return (
									<div className="airdropUser__types">
										<div className="airdropUser__types__item">
											<a className={userData.airDropTelegram === '' ? 'airdropUser__types__item__link airdropUser__types__item__link-telegram' : 'airdropUser__types__item__link-disabled'} href={userData.airDropTelegram === '' ? 'https://t.me/sbcplatform_official' : null}> Join to group</a>
											<form className="airdropUser__types__item__form" onSubmit={userData.airDropTelegram === '' ? this.handleSubmitAirdropUser : this.handleBottle}>
												<input className="airdropUser__types__item__input" type="text" placeholder='Your account link' required name="nameAcc" />
												<input type="date" required id="start" name="dateJoin"
					               					
					               					min="2018-10-14" max="2018-11-01" />
					               				<input type="hidden" value={item.typeAirDrop} name="type" />
					               				<input type="hidden" name="email" value={this.props.userData.email} />
					               				<button type="submit" disabled={userData.airDropTelegram !== '' ? 'disabled' : null}>Send</button>
											</form>

										</div>
										<h3 className="airdropUser__types__item__text">Tokens will be added : {item.countTokensForAD}</h3>
									</div>
								);
							}
							
						
					
				} else {
					return (
						<div>
							<div>
								<p>Description about Airdrop type</p>

							</div>
							<h3>Tokens will be added to your wallet: {item.countTokensForAD}</h3>
						</div>
					);
				}
			}
			
		})
									    
									 
		
		if (Number(userData.confirmEmail) === 1 && userData.ethWalletUser !== '' && userData.ethWalletUser !== null && userData.ethWalletUser !== undefined) {

			return ( 
				<Fragment>
				<Unlogin />
				<HeaderConfirm ethWalletUser={userData.ethWalletUser} confirmEmail={userData.confirmEmail} />
				<Fragment >
					<LeftSidebar />
					
						<Fragment>
							<div className="bountyWrapper">
								<div className="dashboard__itemBig" style={{paddingTop : '60px'}}>
									<div className="dashboard__itemBig__head dashboard__itemBig__head-blue">
										Airdrop
									</div>
									
									{airdropTwitter}
									
								</div>
							</div>
							
						</Fragment>
					
					
					
				</Fragment>
				</Fragment>
			)	
		} else {
			return (
				<Fragment>
				<Unlogin />
				<HeaderConfirm ethWalletUser={userData.ethWalletUser} confirmEmail={userData.confirmEmail} />
				<LeftSidebar />
							<div className="bountyWrapper">
								<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head dashboard__itemBig__head-blue">
										Airdrop
									</div>
									<p className="dashboard__itemBig__wallet__text" style={{marginTop: '60px'}}>For for participate airdrop programm need verify email and ETH wallet</p>
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
		userData: state.dashboard.userData,
		bountyList: state.bounty.bountyList,
		rates: state.airdrop.rates,
	}
}

const mapDispatchToProps = dispatch => {
 	return {
        userSubmitAirdrop: (payload) => {
            dispatch(userSubmitAirdrop(payload));
        },
        airDropGetRates: () => {
        	dispatch(airDropGetRates())
        }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);








