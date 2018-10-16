import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { changeSettings, getBountySettings } from './../actions/admin'
import Leftsidebar from './leftSidebar'
import HeaderConfirm from './headerConfirm'
import { Link } from 'react-router-dom'
import Unlogin from './unlogin'

class BountySettings extends Component {
	constructor() {
		super();
	}

	handleSubmitSetting = (e) => {
		
		e.preventDefault();
		let data = new FormData();
		let et = e.currentTarget;

		data.append('count', et.firstElementChild.value);
		data.append('name', et.lastElementChild.name);
		this.props.changeSettings(data);
		e.currentTarget.firstElementChild.value = '';
	} 

	componentDidMount() {
		this.props.getBountySettings();
	}

	render() {
		const { userData } = this.props;
		return (
			<Fragment>
				<Unlogin />
				<HeaderConfirm ethWalletUser={userData.ethWalletUser} confirmEmail={userData.confirmEmail} />
				<Leftsidebar />
				
				<div className='bountySettings'>
					<div className="adminPanelWrapper__navigationLinks" style={{position: 'absolute'}}>
								
						<Link to='/adminpanel'>Check Bounty</Link>
						{Number(userData.isRootAdmin) === 1 ? (<Link to='/checkadmins'>Check Admins</Link>)  : null}
						<Link to='/bounty-statistic'>Bounty Statistic</Link>
						<Link to='/ico-statistic'>ICO Statistic</Link>
						{Number(userData.isRootAdmin) === 1 ? (<Link to='/airdrop-settings'>Airdrop  Settings</Link>)  : null}
						<Link to='/checkairdrop'>Check Airdrop</Link>
					</div>
				
					<div className='bountySettings__item'>
						<div className="bountySettings__item__icon"><img src="/img/icon-earth.png" alt='icon-bounty' /></div>
						<p>Translation</p>
						<form onSubmit={this.handleSubmitSetting}>
							<input required type="text" name="count" placeholder={'Current price: ' + this.props.bountySettings['translation']} />
							
							<button type="submit">Save</button>
							<input type="hidden" name="translation" />
						</form>
					</div>
					<div className='bountySettings__item'>
						<div className="bountySettings__item__icon"><img src="/img/icon-twitter.png" alt='icon-bounty' /></div>
						<p>Twitter Retweets</p>
						<form onSubmit={this.handleSubmitSetting}>
							<input required type="text" name="count" placeholder={'Current price : ' + this.props.bountySettings['twitterRT']} />
							<button type="submit">Save</button>
							<input type="hidden" name="twitterRT" />
							
						</form>
					</div>
					<div className='bountySettings__item'>
						<div className="bountySettings__item__icon"><img src="/img/icon-twitter.png" alt='icon-bounty' /></div>
						<p>Twitter Tweets</p>
						<form onSubmit={this.handleSubmitSetting}>
							<input required type="text" name="count" placeholder={'Current price : ' + this.props.bountySettings['twitterTW']} />
							<button type="submit">Save</button>
							<input type="hidden" name="twitterTW" />
							
						</form>
					</div>
					<div className='bountySettings__item'>
						<div className="bountySettings__item__icon"><img src="/img/icon-facebook.png" alt='icon-bounty' /></div>
						<p>Facebook Posts</p>
						<form onSubmit={this.handleSubmitSetting}>
							<input required type="text" name="count" placeholder={'Current price : ' + this.props.bountySettings['facebookFP']} />
							<button type="submit">Save</button>
							<input type="hidden" name="facebookFP" />
							
						</form>
					</div>
					<div className='bountySettings__item'>
						<div className="bountySettings__item__icon"><img src="/img/icon-facebook.png" alt='icon-bounty' /></div>
						<p>Facebook Shares</p>
						<form onSubmit={this.handleSubmitSetting}>
							<input required type="text" name="count" placeholder={'Current price : ' + this.props.bountySettings['facebookFS']} />
							<button type="submit">Save</button>
							<input type="hidden" name="facebookFS" />
							
						</form>
					</div>
					<div className='bountySettings__item'>
						<div className="bountySettings__item__icon"><img src="/img/icon-amb.png" alt='icon-bounty' /></div>
						<p>Ambasador</p>
						<form onSubmit={this.handleSubmitSetting}>
							<input required type="text" name="count" placeholder={'Current price : ' + this.props.bountySettings['ambassador']} />
							<button type="submit">Save</button>
							<input type="hidden" name="ambassador" />
							
						</form>
					</div>
					<div className='bountySettings__item'>
						<div className="bountySettings__item__icon"><img src="/img/icon-amb.png" alt='icon-bounty' /></div>
						<p>Signature</p>
						<form onSubmit={this.handleSubmitSetting}>
							<input required type="text"  name="count" placeholder={'Current price : ' + this.props.bountySettings['signature']} />
							<button type="submit">Save</button>
							<input type="hidden" name="signature" />
							
						</form>
					</div>
				</div>
			</Fragment>
		)
	} 
}


const mapStateToProps = state => {
	return {
		isRootAdmin: state.dashboard.userData.isRootAdmin,
		isAdminEnable: state.dashboard.userData.isAdminEnable,
		admins: state.admin.admins,
		responseText: state.admin.responseText,
		bountyListAdmin: state.admin.bountyListAdmin,
		userData: state.dashboard.userData,
		bountySettings: state.admin.bountySettings
	}
}

const mapDispatchToProps = dispatch => {
 	return {
        changeSettings: (payload) => {
            dispatch(changeSettings(payload))
        },
        getBountySettings: () => {
        	dispatch(getBountySettings())
        }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(BountySettings);