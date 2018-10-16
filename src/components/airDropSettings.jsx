import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import LeftSidebar from './leftSidebar'
import { airDropSettingsToggle, airDropGetRates, submitAirDropType } from './../actions/airdrop'
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
		this.props.airDropGetRates();
		
	}

	handleChange = (e) => {
		
		this.setState({ [e.target.name] : e.target.value},() => {
			if (this.state.addAdminEmail.length > 4 && this.state.addAdminPass.length > 5) {
				this.setState({checkValAddAdmin: false})
			}
			
		});
		
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

	handleChangeAirDropType = (e) => {
		let type = e.target.getAttribute('type');
		let data = new FormData();
		data.append('type', type);
		this.props.airDropSettingsToggle(data);
	}

	handleSubmitAirDropType = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append('type', e.currentTarget.lastElementChild.value);
		data.append('count', e.currentTarget.firstElementChild.value);
		this.props.submitAirDropType(data);
		e.currentTarget.firstElementChild.value = '';
	}


	render() {
		console.log(this.props.rates);
		
		

		const { rates } = this.props;
	
				return (
					<Fragment>
						<Unlogin />
						<LeftSidebar />	
						<div className="adminPanelWrapper">	
							<div className="adminPanelWrapper__navigationLinks">
								<Link to='/adminpanel'>Check Bounty</Link>
								<Link to='/bounty-settings'>Bounty Settings</Link>		
								<Link to='/checkadmins'>Check Admins</Link>
								<Link to='/ico-statistic'>ICO Statistic</Link>
								<Link to='/checkairdrop'>Check Airdrop</Link>
								<Link to='/airdrop-statistic'>Airdrop statistic</Link>
							</div>				
							<div className="adminpanel">

								<div className="adminpanel__rootAdmin">
									<div className="dashboard__itemBig">
										<div className="dashboard__itemBig__head dashboard__itemBig__head-blue">
											Type of Airdrop
										</div>
										<div className="airDropTypes">
											{rates.map(item => (
											<div className="airDropTypes__item">
												<h3 className="airDropTypes__item__heading">{item.typeAirDrop}</h3>
												<form className="airDropTypes__item__form" onSubmit={this.handleSubmitAirDropType}>
													<input className="airDropTypes__item__form__input" type="text" required placeholder={item.countTokensForAD}  />
													
													<button className="airDropTypes__item__form__button" type="submit">Save</button>
													<input type="hidden" value={item.typeAirDrop} />
												</form>
												<button className={item.statusEnabledAD === 'disabled' ? 'airDropTypes__item__checkBox airDropTypes__item__checkBox-disabled' : 'airDropTypes__item__checkBox airDropTypes__item__checkBox-active'} onClick={this.handleChangeAirDropType} type={item.typeAirDrop}>{item.statusEnabledAD === 'disabled' ? 'NO' : 'YES'}</button>
											</div>

											))}
											
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
		rates: state.airdrop.rates,
	}
}

const mapDispatchToProps = dispatch => {
 	return {
        airDropGetRates: () => {
            dispatch(airDropGetRates());
        },
        airDropSettingsToggle: (payload) => {
        	dispatch(airDropSettingsToggle(payload))
        },
        submitAirDropType: (payload) => {
        	dispatch(submitAirDropType(payload))
        }
        
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);








