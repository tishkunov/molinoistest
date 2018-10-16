import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import LeftSidebar from './leftSidebar'
import { addAdmin, toggleAdmin , getAdmins } from './../actions/admin'
import { getBountyForCheckAdmin, saveBountyListCheck } from './../actions/bounty'
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


	handleChange = (e) => {
		
		this.setState({ [e.target.name] : e.target.value},() => {
			if (this.state.addAdminEmail.length > 4 && this.state.addAdminPass.length > 5) {
				this.setState({checkValAddAdmin: false})
			}
			
		});
		
	}

	handleSubmitAddAdmin = (e) => {
		e.preventDefault();
		let formData = new FormData();
        formData.append('email', this.state.addAdminEmail);
        formData.append('pass', this.state.addAdminPass);
		this.props.addAdmin(formData);
		this.setState({addAdminEmail: '',addAdminPass: ''});
	}

	handleChangeAdminEnable = (e) => {

		if (e.target.getAttribute('name') === 'checked') {
			let formDataChecked = new FormData();
			formDataChecked.append('email', e.currentTarget.firstElementChild.getAttribute('value'));
			formDataChecked.append('isAdminEnable', e.currentTarget.lastElementChild.getAttribute('value'));
			this.props.toggleAdmin(formDataChecked);
		}
		
	}

	getBountyForCheckAdmin = (e) => {
		this.props.getBountyForCheckAdmin();
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
		bountyListSave.append('email', this.props.bountyListAdmin[0].email);
		this.props.saveBountyListCheck(bountyListSave);
	}


	render() {
		
		let bountyListAdmin = this.props.bountyListAdmin === undefined ? 'No data' : this.props.bountyListAdmin.length === 0 ? null : this.props.bountyListAdmin.map(item => {
			if (item.statusSend !== 'Reject (not unique)') {
				return	(
				
					<tr>
						
						<td><a href={item.account}>Account</a></td>
						<td><a href={item.link}>Link</a></td>
						<td>{item.dateSend.split(',')[0]}</td>	     
						<td style={{display: 'none'}}><input type="hidden" value={String(item.socialType) + ',' +  String(item.bountyId)} /> </td>
						<td><input className="bountyList__checkRadio" type="radio" style={{width: '100%', height: '2em'}} required name={String(item.socialType) + ',' +  String(item.bountyId)} value="accept" />  </td>
						<td><input className="bountyList__checkRadio" type="radio" style={{width: '100%', height: '2em'}} name={String(item.socialType) + ',' +  String(item.bountyId)} value="decline" />   </td>
					</tr>
						

			)
			} else {
				return	(
			
				<tr >
						<td style={{borderTop: '1px solid red', borderBottom: '1px solid red', borderLeft: '1px solid red'}}><a href={item.account}>Account</a></td>
						<td style={{borderTop: '1px solid red', borderBottom: '1px solid red'}}><a href={item.link}>Link</a></td>
						<td style={{borderTop: '1px solid red', borderBottom: '1px solid red'}}>{item.dateSend.split(',')[0]}</td>	     
						<td style={{borderTop: '1px solid red', borderBottom: '1px solid red', display: 'none'}}><input type="hidden" value={String(item.socialType) + ',' +  String(item.bountyId)} /> </td>
						<td style={{borderTop: '1px solid red', borderBottom: '1px solid red'}}><input className="bountyList__checkRadio" type="radio" style={{width: '100%', height: '2em'}} required name={String(item.socialType) + ',' +  String(item.bountyId)} value="accept" />  </td>
						<td style={{borderTop: '1px solid red', borderBottom: '1px solid red', borderRight : '1px solid red'}}><input className="bountyList__checkRadio" type="radio" style={{width: '100%', height: '2em'}} name={String(item.socialType) + ',' +  String(item.bountyId)} value="decline" />   </td>
					</tr>
						

			)
			}
		});

		

		let getListButton = this.props.bountyListAdmin.length === 0 ? (<button className="adminPanel__saveButton" onClick={this.getBountyForCheckAdmin}>GET BOUNTY LIST FOR CHECK</button>) : null;
		let saveListButton = this.props.bountyListAdmin === undefined ? null : (<button className="adminPanel__saveButton" type="submit">Save</button>)
		let formBounty = this.props.bountyListAdmin === undefined  || this.props.bountyListAdmin.length === 0  || this.props.bountyListAdmin[0][0] === 'No data' ? 'No data' : (<form onSubmit={this.saveBountyListCheck} style={{width: '100%'}}>
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
										  {bountyListAdmin}
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
								<Link to='/checkairdrop'>Check Airdrop</Link>
								<Link to='/airdrop-statistic'>Airdrop statistic</Link>
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
							<Link to='/checkairdrop'>Check Airdrop</Link>
							<Link to='/airdrop-statistic'>Airdrop statistic</Link>
						</div>
						<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head dashboard__itemBig__head-orange">
										Admin panel
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
		bountyListAdmin: state.admin.bountyListAdmin,

	}
}

const mapDispatchToProps = dispatch => {
 	return {
        getAdmins: () => {
            dispatch(getAdmins());
        },
        addAdmin: (payload) => {
        	dispatch(addAdmin(payload))
        },
        toggleAdmin: (payload) => {
        	dispatch(toggleAdmin(payload))
        },
        getBountyForCheckAdmin: () => {
        	dispatch(getBountyForCheckAdmin())
        },
        saveBountyListCheck: (payload) => {
        	dispatch(saveBountyListCheck(payload))
        }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);








