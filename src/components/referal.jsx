import React, { Component, Fragment } from 'react';
import Leftsidebar from './leftSidebar'
import HeaderConfirm from './headerConfirm'
import { connect } from 'react-redux'
import Unlogin from './unlogin'

class Login extends Component {
	constructor(args) {
		super();
		this.state = {
			text:'',
			redir:false
		}
	}

	handleCopyClick = (e) => {
		
		let text = document.getElementById('text');
		text.select();
		document.execCommand("copy")
	}

	

	render() {
		const { userData } = this.props;
		return (
			<Fragment>
				<HeaderConfirm ethWalletUser={userData.ethWalletUser} confirmEmail={userData.confirmEmail} />
				<Leftsidebar />
				<Unlogin />
				<div className="referal">
					<div className="dashboard__itemMd">
						<div className="dashboard__itemBig__head dashboard__itemBig__head-blue">
							Referal Programm
						</div>

						<div className="referal__input__copy" style={{width:'100%'}}><a style={{width: '100%'}}>
							<input style={{width: '100%', textAlign: 'center'}} type="text" id="text" value={`http:/lk.on-life.io/?ref=${userData.refLink}`} />
							</a>
						</div>
						<button className="referal__button__copy" onClick={this.handleCopyClick}>Copy Referal Link</button>
						<p className="referal__text">Get bonus from referal link</p>
						<p className="referal__text-blue">Bonus from referal link 2%</p>
						
					</div>
					<div className="referal__itemXsWrapper">
						<div className="dashboard__itemXs">
							<div className="dashboard__itemBig__head dashboard__itemBig__head-blue referal__itemXs referal__itemXs-network">
								Count Users
							</div>
							<p className="referal__itemXsWrapper__count__text">{userData.refUsersCount}</p>					
						</div>
						<div className="dashboard__itemXs">
							<div className="dashboard__itemBig__head dashboard__itemBig__head-blue referal__itemXs referal__itemXs-bonus">
								My bonuses
							</div>
							<p className="referal__itemXsWrapper__count__text">{userData.referalTokens}</p>					
						</div>
					</div>
					
				</div>
			</Fragment>
		);
		
	}
}

const mapStateToProps = state => {
	return {
		userData : state.dashboard.userData
	}
}

export default connect(mapStateToProps, null)(Login);











