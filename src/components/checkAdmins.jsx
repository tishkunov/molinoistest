import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import LeftSidebar from './leftSidebar'
import {getAdmins} from './../actions/admin'
import { addAdmin, toggleAdmin } from './../actions/admin'
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

	componentDidMount() {
		if (Number(this.props.isRootAdmin) === 1) {
			this.props.getAdmins();
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
		
		

		const { addAdminEmail, addAdminPass } = this.state;
	
				return (
					<Fragment>
						<Unlogin />
						<LeftSidebar />	
						<div className="adminPanelWrapper">
							<div className="adminPanelWrapper__navigationLinks">				
								<Link to='/bounty-settings'>Bounty Settings</Link>
								<Link to='/bounty-statistic'>Bounty Statistic</Link>
								<Link to='/adminpanel' >Check Bounty</Link>
								<Link to='/ico-statistic'>ICO Statistic</Link>
								<Link to='/airdrop-settings'>Check Admins</Link>
								<Link to='/checkairdrop'>Check Airdrop</Link>
								<Link to='/airdrop-statistic'>Airdrop statistic</Link>
							</div>
						
						<div className="adminpanel">
							<div className="adminpanel__rootAdmin">
								<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head dashboard__itemBig__head-green">
										List of Admins
									</div>
								<table class="table table-hover" style={{ marginTop: '80px', width: '100%', maxWidth: '600px', marginRight: 'calc(100% - 600px)'}}>
										  <thead>
										    <tr>
										      <th scope="col" style={{color: '#64b968', borderTop: '0'}}>Email</th>
										      <th scope="col" style={{color: '#64b968', borderTop: '0'}}>Status</th>
										      
										    </tr>
										  </thead>
										  <tbody>
										  {this.props.admins.map(item =>  {
												return (
												<tr onClick={this.handleChangeAdminEnable} className="admin">
													<td value={item.email}>{item.email}</td>
													<td  value={item.isAdminEnable} >
														{ Number(item.isAdminEnable) === 1 ? (<div name="checked" className="adminEnable"></div>) : (<div name="checked" className="adminDisabled"></div>)}
													</td>
												</tr>
												)
											}
											)}

										  </tbody>

										  
									  	</table>
									  	<p>{this.props.responseText}</p>    
    
										<form onSubmit={this.handleSubmitAddAdmin} style={{display:'flex', justifyContent:'space-around', flexDirection: 'row', width:'100%', maxWidth: '600px', marginRight: 'calc(100% - 600px)'}}>
												<input className="adminpanel__rootAdmin__form__input" required type="email" value={addAdminEmail} onChange={this.handleChange} name="addAdminEmail" placeholder="Email" />
												<input className="adminpanel__rootAdmin__form__input" required type="text" value={addAdminPass} onChange={this.handleChange} name="addAdminPass" placeholder="Password" />
												<button type="submit" disabled={this.state.checkValAddAdmin} className="adminpanel__rootAdmin__form__buttonSubmit-active">Add admin</button>
											</form>
								<div className="admins" style={{display: 'flex', flexDirection:'column'}}>
									
								</div>
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
        
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);








