import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import LeftSidebar from './leftSidebar'
import { getAirdropForCheckAdmin, saveAirDropCheck } from './../actions/airdrop'
import Unlogin from './unlogin'


class AdminPanel extends Component {
	constructor(args) {
		super();
		this.state = {
			text:'',
			redir:false,
			addAdminEmail: '',
			addAdminPass: '',
			checkValAddAdmin: true
		}
	}


	handleChangeAdminEnable = (e) => {

		if (e.target.getAttribute('name') === 'checked') {
			let formDataChecked = new FormData();
			formDataChecked.append('email', e.currentTarget.firstElementChild.getAttribute('value'));
			formDataChecked.append('isAdminEnable', e.currentTarget.lastElementChild.getAttribute('value'));
			this.props.toggleAdmin(formDataChecked);
		}
		
	}

	getAirdropForCheckAdmin = (e) => {
		this.props.getAirdropForCheckAdmin();
		
	}

	saveBountyListCheck = (e) => {
		e.preventDefault();
		let bountyListSave = new FormData();
		const radioButtons = document.querySelectorAll('input[type=radio]:checked');
		let arr = {};
		for ( let i = 0; i < radioButtons.length; i++) {
			
			arr[radioButtons[i].name] = radioButtons[i].value;		

		}
		const item = JSON.stringify(arr);
		bountyListSave.append('arr', item);
		
		this.props.saveAirDropCheck(bountyListSave);
	}


	render() {
		
		
		let airDropListAdmin = this.props.dataForCheck === undefined ? 'No data' : this.props.dataForCheck.length === 0 ? null : this.props.dataForCheck.map(item => {
				if (item.statusSend !== 'Reject (not unique)') {
					return	(	
						<tr>
							<td><a href={item.nameAcc}>Account</a></td>
							<td>{item.dateJoin}</td>
							<td>{item.type}</td>     

							<td><input className="bountyList__checkRadio" type="radio" style={{width: '100%', height: '2em'}} required name={String(item.airDropId) + ',' + String(item.type) + ',' + String(item.email)} value="accept" />  </td>
							<td><input className="bountyList__checkRadio" type="radio" style={{width: '100%', height: '2em'}} name={String(item.airDropId) + ',' + String(item.type) + ','   + String(item.email)} value="decline" />   </td>
						</tr>				
					)
				} else {
					return	(	
						<tr>
							<td style={{borderTop: '1px solid red', borderBottom: '1px solid red', borderLeft: '1px solid red'}}><a href={item.nameAcc}>Account</a></td>
							<td style={{borderTop: '1px solid red', borderBottom: '1px solid red'}}>{item.dateJoin}</td>
							<td style={{borderTop: '1px solid red', borderBottom: '1px solid red'}}>{item.type}</td>     

							<td style={{borderTop: '1px solid red', borderBottom: '1px solid red'}}><input className="bountyList__checkRadio" type="radio" style={{width: '100%', height: '2em'}} required name={String(item.airDropId) + ',' + String(item.type) + ',' + String(item.email)} value="accept" />  </td>
							<td style={{borderTop: '1px solid red', borderBottom: '1px solid red', borderRight : '1px solid red'}}><input className="bountyList__checkRadio" type="radio" style={{width: '100%', height: '2em'}} name={String(item.airDropId) + ',' + String(item.type) + ','   + String(item.email)} value="decline" />   </td>
						</tr>				
					)
				}
			 });

		

		let getListButton = this.props.dataForCheck.length === 0 ? (<button className="adminPanel__saveButton" onClick={this.getAirdropForCheckAdmin}>GET AIRDROP LIST FOR CHECK</button>) : null;
		let saveListButton = this.props.dataForCheck === undefined ? null : (<button className="adminPanel__saveButton" type="submit">Save</button>)
		let formBounty = this.props.dataForCheck === undefined  || this.props.dataForCheck.length === 0  || this.props.dataForCheck[0][0] === 'No data' ? 'No data' : (<form onSubmit={this.saveBountyListCheck} style={{width: '100%'}}>
										<table class="table table-hover" style={{width:'100%', marginTop: '70px'}}>
										  <thead>
										    <tr>
										      
										      <th scope="col" style={{color: '#fea321'}}>Account</th>
										      <th scope="col" style={{color: '#fea321'}}>Link</th>
										      <th scope="col" style={{color: '#fea321'}}>Date</th>
										      <th scope="col" style={{color: '#fea321'}}>Accept</th>
										      <th scope="col" style={{color: '#fea321'}}>Decline</th>
										    </tr>
										  </thead>
										  <tbody>
										  {airDropListAdmin}
										  </tbody>
									  	</table>
										
										{saveListButton}
									</form>);

	
		if (Number(this.props.isRootAdmin) === 1) {
				return (
					<Fragment>
						<Unlogin />
						<LeftSidebar />	
						<div className="adminPanelWrapper">
							<div className="adminPanelWrapper__navigationLinks">
								
								<Link to='/bounty-settings'>Bounty Settings</Link>
								<Link to='/bounty-statistic'>Bounty Statistic</Link>
								<Link to='/checkadmins' >Check Admins</Link>
								<Link to='/ico-statistic'>ICO Statistic</Link>
								<Link to='/airdrop-settings'>Airdrop Settings</Link>
							</div>
						
						<div className="adminpanel">
							<div className="adminpanel__rootAdmin">
								
								<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head dashboard__itemBig__head-orange">
										Bounty Check List
									</div>
									<p style={{fontSize : '24px', color : 'red', marginTop: '70px'}}>Be attend lines with red border. This lines without unique link. Link already has in database on another user. </p>
									{getListButton}
									{formBounty}
								</div>
								
							
							</div>
						</div>
						</div>
						
					</Fragment>
				)
			
		} else {
			if (Number(this.props.isAdminEnable) === 1) {
				return (
					<Fragment>
					<Unlogin />
					<div className="adminPanelWrapper">
						<div className="adminPanelWrapper__navigationLinks">
								
								<Link to='/ico-statistic'>ICO Statistic</Link>
								<Link to='/bounty-statistic'>Bounty Statistics</Link>
								
							</div>
						<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head dashboard__itemBig__head-orange">
										Invest to project
									</div>
						{getListButton}
									{formBounty}	
						</div>
						
						
					</div>
					</Fragment>
				)
			} else {
				<div>You don't have access to check bounty</div>
			}	
		}	
		
	}
}

const mapStateToProps = state => {
	return {
		isRootAdmin: state.dashboard.userData.isRootAdmin,
		isAdminEnable: state.dashboard.userData.isAdminEnable,
		admins: state.admin.admins,
		responseText: state.admin.responseText,
		dataForCheck: state.airdrop.dataForCheck,

	}
}

const mapDispatchToProps = dispatch => {
 	return {
        getAirdropForCheckAdmin: () => {
        	dispatch(getAirdropForCheckAdmin())
        },
        saveAirDropCheck: (payload) => {
        	dispatch(saveAirDropCheck(payload))
        }
      
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);








