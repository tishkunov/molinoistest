import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {  getUsersRegister, getTransactionList, getBountyStatistic } from './../actions/admin'
import Leftsidebar from './leftSidebar'
import { Link } from 'react-router-dom'
import Unlogin from './unlogin'


class IcoStatistic extends Component {
	constructor() {
		super();
	}	

	componentDidMount() {
		this.props.getUsersRegister();
		this.props.getTransactionList();
		
	}

	

	render() {
		let bountySettings = Number(this.props.isRootAdmin) === 1 ? (<Link to='/bounty-settings'>Bounty Settings</Link>)  : null;
		let checkAdminss = Number(this.props.isRootAdmin) === 1 ? (<Link to='/checkadmins'>Check Admins</Link>)  : null;
		
		const {   usersList, transListAdmin } = this.props;
		
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
									</div>
					<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head">
										ICO Statistic
									</div>
										
									<h3 style={{marginTop: '70px'}}> Last register users</h3>
									<table class="table" style={{width:'100%'}}>
										<thead>
											<tr>
												<th scope="col" style={{color: '#8e24aa'}}>Account</th>
											    <th scope="col" style={{color: '#8e24aa'}}>Date</th>
											    <th scope="col" style={{color: '#8e24aa'}}>ETH wallet</th>
											    <th scope="col" style={{color: '#8e24aa'}}>Referal</th>  
											</tr>
										</thead>
										<tbody>
											  {usersList.map(item => (
											  		<tr>
											  			<td>{item.email}</td>
											  			<td>{item.dateRegiser}</td>
											  			<td>{item.ethWalletUser}</td>
											  			<td>{item.ref}</td>
											  		</tr>
											  	))}
										</tbody>
									</table>
									<h3> Last transactions</h3>
									<table class="table" style={{width:'100%'}}>
										<thead>
											<tr>
												<th scope="col" style={{color: '#8e24aa'}}>Date</th>
											    <th scope="col" style={{color: '#8e24aa'}}>countTokens</th>
											    <th scope="col" style={{color: '#8e24aa'}}>tokensEqualtUsd</th>
											    <th scope="col" style={{color: '#8e24aa'}}>Bonus</th>
											    <th scope="col" style={{color: '#8e24aa'}}>Valute</th>
											    <th scope="col" style={{color: '#8e24aa'}}>bonusBySum</th>
											    
											</tr>
										</thead>
										<tbody>
											  {transListAdmin.map(item => (
													  	<tr>
													  			<td>{item.dateBuy}</td>
													  			<td>{item.countTokens}</td>
													  			<td>{item.tokensEqualtUsd}</td>
													  			<td>{Number(item.checkBonus) * Number(item.countTokens)}</td>
													  			<td>{item.valute}</td>
													  			<td>{item.bonusBySum}</td>
													  		</tr>
		
													  	))}
										</tbody>
									</table>		
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
		usersList: state.admin.usersList,
		transListAdmin: state.admin.transListAdmin,
		dataForGraphic: state.admin.dataForGraphic
	}
}

const mapDispatchToProps = dispatch => {
 	return {
        getUsersRegister: () => {
            dispatch(getUsersRegister())
        },
        getTransactionList: () =>{
        	dispatch(getTransactionList())
        },
        getBountyStatistic: () => {
        	dispatch(getBountyStatistic())
        }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(IcoStatistic);