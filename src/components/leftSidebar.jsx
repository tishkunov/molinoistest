import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { airDropGetRates } from './../actions/airdrop'



class LeftSidebar extends Component {
	constructor(args) {
		super();
		this.state = {
			text:'',
			redir:false
		}
	}

	componentDidMount() {
		this.props.airDropGetRates();
	}


	render() {
		let airDropNav = this.props.rates.filter(item => item.statusEnabledAD === 'enabled');

			return (
				<Fragment>
					<div className="leftSidebar">
						<img src="img/logo.png" className="logo" alt="logo" />
						<hr />
						<ul className="leftSidebar__navigation">
							<li className={window.location.pathname !== '/dashboard' ? 'leftSidebar__navigation__item' : 'leftSidebar__navigation__item leftSidebar__navigation__item-active' }>
								<Link to='/dashboard'>{window.location.pathname !== '/dashboard' ? (<img alt="icon sidebar" src="/img/sidebar-icon-panel.png" />) : (<img alt="icon sidebar" src="/img/sidebar-icon-panel-active.png" />)}Dashboard</Link>
							</li>

							<li className={window.location.pathname !== '/mywallet' ? 'leftSidebar__navigation__item' : 'leftSidebar__navigation__item leftSidebar__navigation__item-active' }>
								<Link to='/mywallet'>{window.location.pathname !== '/mywallet' ? (<img alt="icon sidebar" src="/img/sidebar-icon-wallet.png" />) : (<img alt="icon sidebar" src="/img/sidebar-icon-wallet-active.png" />)}My wallet</Link>
							</li>
							<li className={window.location.pathname !== '/feedback' ? 'leftSidebar__navigation__item' : 'leftSidebar__navigation__item leftSidebar__navigation__item-active' }>
								<Link to='/feedback'>
								{window.location.pathname !== '/feedback' ? 
									(<img alt="icon sidebar" src="/img/sidebar-icon-feedback.png" />) : 
									(<img alt="icon sidebar" src="/img/sidebar-icon-feedback-active.png" />)}Feedback
								</Link>
							</li>
							<li className={window.location.pathname !== '/referal' ? 'leftSidebar__navigation__item' : 'leftSidebar__navigation__item leftSidebar__navigation__item-active' }>
								<Link to='/referal'>
								{window.location.pathname !== '/referal' ? 
								(<img alt="icon sidebar" src="/img/sidebar-icon-referal.png" />) : 
								(<img alt="icon sidebar" src="/img/sidebar-icon-referal-active.png" />)}Referal programm
								</Link>
							</li>

							{Number(this.props.isAdmin) === 1 ? null : (<li className={window.location.pathname !== '/bounty' ? 'leftSidebar__navigation__item' : 'leftSidebar__navigation__item leftSidebar__navigation__item-active' }>
								
								<Link to='/bounty'>
								{window.location.pathname !== '/bounty' ? 
								(<img alt="icon sidebar" src="/img/icon-bounty.png" />) : 
								(<img alt="icon sidebar" src="/img/icon-bounty-active.png" />)}Bounty
								</Link>
							</li>)}
							{airDropNav.length === 0 ? null : (<li className={window.location.pathname !== '/airdrop' ? 'leftSidebar__navigation__item' : 'leftSidebar__navigation__item leftSidebar__navigation__item-active' }>
								<Link to='/airdrop'>
								{window.location.pathname !== '/airdrop' ? 
									(<img alt="icon sidebar" src="/img/sidebar-icon-airdrop.png" />) : 
									(<img alt="icon sidebar" src="/img/sidebar-icon-airdrop-active.png" />)}	
									Airdrop
								</Link>
							</li>) }
							

							{Number(this.props.isAdmin) === 1 ? <li className={
								window.location.pathname !== '/adminpanel' 
								&& window.location.pathname !== '/bounty-statistic'  
								&& window.location.pathname !== '/bounty-settings' 
								&& window.location.pathname !== '/checkadmins' 
								&& window.location.pathname !== '/ico-statistic'
								&& window.location.pathname !== '/checkairdrop'
								&& window.location.pathname !== '/airdrop-settings'
								&& window.location.pathname !== '/airdrop-statistic'
								  ? 'leftSidebar__navigation__item' : 'leftSidebar__navigation__item leftSidebar__navigation__item-active' }>
								  <Link to='/adminpanel'>{
								  	window.location.pathname !== '/adminpanel' 
								  	&& window.location.pathname !== '/bounty-statistic'  
								  	&& window.location.pathname !== '/bounty-settings' 
								  	&& window.location.pathname !== '/checkadmins' 
								  	&& window.location.pathname !== '/ico-statistic'
								  	&& window.location.pathname !== '/checkairdrop'
									&& window.location.pathname !== '/airdrop-statistic'
									 ? (<img alt="icon sidebar" src="/img/sidebar-icon-referal.png" />) : (<img alt="icon sidebar" src="/img/sidebar-icon-referal-active.png" />)}Admin Panel</Link></li> : null} 
						</ul>				
						 
					</div>		
				</Fragment>
			)
		
	}
}

const mapStateToProps = state => {
	return {
		isAdmin: state.dashboard.userData.isAdmin,
		rates: state.airdrop.rates,
	}
}

const mapDispatchToProps = dispatch => {
 	return {
        airDropGetRates: () => {
        	dispatch(airDropGetRates())
        }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);





