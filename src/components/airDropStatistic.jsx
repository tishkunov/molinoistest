import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getAirdropStatistic } from './../actions/airdrop'
import Leftsidebar from './leftSidebar'
import { Link } from 'react-router-dom'
import Unlogin from './unlogin'




class BountySettings extends Component {
	constructor() {
		super();
	}	

	componentDidMount() {
		this.props.getAirdropStatistic();
		
		
	}

	
	render() {

		console.log(this.props.airdropStatistic)
		let bountySettings = Number(this.props.isRootAdmin) === 1 ? (<Link to='/bounty-settings'>Bounty Settings</Link>)  : null;
		let checkAdminss = Number(this.props.isRootAdmin) === 1 ? (<Link to='/checkadmins'>Check Admins</Link>)  : null;
		
		const { userData , airdropStatistic } = this.props;
		
		return (
			<Fragment>
				<Unlogin />
				
				<Leftsidebar />
				
				<div className='statistic'>
					<div className="adminPanelWrapper__navigationLinks">
						{bountySettings}
						<Link to='/adminpanel'>Check Bounty</Link>
						{checkAdminss}
						<Link to='/ico-statistic'>ICO Statistic</Link>
						{Number(userData.isRootAdmin) === 1 ? (<Link to='/airdrop-settings'>Airdrop  Settings</Link>)  : null}
						<Link to='/checkairdrop'>Check Airdrop</Link>
					</div>
					<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head">
										Airdrop Statistic
									</div>
									
									

									<div className="statistic__wrapper">
										<div className="statistic__wrapper__item">
											<div>Telegram</div>
											<div style={{color: '#ab47bc',marginTop : '15px'}}>{airdropStatistic.telegram}</div>
										</div>
										<div className="statistic__wrapper__item">
											<div>Facebook</div>
											<div style={{color: '#ab47bc',marginTop : '15px'}}>{airdropStatistic.facebook}</div>
										</div>
										<div className="statistic__wrapper__item">
											<div>Twitter</div>
											<div style={{color: '#ab47bc',marginTop : '15px'}}>{airdropStatistic.twitter}</div>
										</div>
										
									</div>
									
						
										
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
		bountySettings: state.admin.bountySettings,
		airdropStatistic: state.airdrop.airdropStatistic
	}
}

const mapDispatchToProps = dispatch => {
 	return {
        getAirdropStatistic: () => {
            dispatch(getAirdropStatistic())
        },
        
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(BountySettings);