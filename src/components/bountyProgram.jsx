import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import LeftSidebar from './leftSidebar'
import { acceptBounty, submitFileBounty, getBountyList } from './../actions/bounty'
import HeaderConfirm from './headerConfirm'
import Unlogin from './unlogin'


class AdminPanel extends Component {
	constructor(args) {
		super();
		this.state = {
			text:'',
			textSecond:'',
			ethwallet: '',
			formatValid: false,
			sizeValid: false,
			validationFile: false,
			file:null,
			page: 100,
			activePage: 1,
			prevPage: 0
		}
	}

	handleAcceptBounty = () => {
		let data = new FormData();
        data.append('email', this.props.userData.email);
		this.props.acceptBounty(data);
	}

	handleDownloadTable = () => {

	}

	handleLoadTable = () => {

	}

	componentDidMount() {
		let getBountyList = new FormData();
		getBountyList.append('email', this.props.userData.email);
		this.props.getBountyList(getBountyList);
	}

	handleSubmitFile = (e) => {
		e.preventDefault();
		let dataFile = new FormData();
		dataFile.append('file', this.state.file);
		dataFile.append('email', this.props.userData.email);
		this.props.submitFileBounty(dataFile);
		e.currentTarget.firstElementChild.value = '';
	}

	handleChangeInputFile = (e) => {
		e.target.value.slice(-5) !== '.xlsx' ? this.setState({text: 'File should be .xlsx format', formatValid: false }) : this.setState({formatValid: true , text: ''});
		Number(e.target.files[0].size) > 999999 ? this.setState({textSecond : 'File size should be less than 1mb', sizeValid: false}) : this.setState({sizeValid: true, textSecond: ''});
		const target = e.target;
		setTimeout(() => {
			if (this.state.formatValid === true && this.state.sizeValid === true) {
				this.setState({validationFile: true, file: target.files[0]})
			}
		}, 200);
	}

	handlePageChange = (pageNumber) =>  {
		
    	this.setState({page: pageNumber*100});

  	}

  	handleChangePage = (e) => {
  		this.setState({page: Number(e.target.getAttribute('indes')) * 100, prevPage: (Number(e.target.getAttribute('indes')) * 100) - 100})
  		
  	}

  	handleEventChooseFile = (e) => {
  		e.preventDefault();
  		console.log(e.target.previousElementSibling)
  		e.target.previousElementSibling.click();
  	}




	render() {
	
		
		
		let bountyList =  this.props.bountyList === undefined ? null : this.props.bountyList.map((item, index) => {
			if (this.state.page > index && this.state.prevPage < index) {
				if (item.statusSend !== 'Reject (not unique)') {
					return (
							<Fragment>
							<tr>	
								<td>{item.dateSend.split(',')[0]}</td>
								<td>{item.statusSend}</td>
								
								<td><a className="bountyList__links"  href={item.account}>Account</a></td>
								<td><a className="bountyList__links"  href={item.link}>Link</a></td>
							</tr>
							
							</Fragment>
						)
				} else {
					return (
							<Fragment>
							<tr>	
								<td>{item.dateSend.split(',')[0]}</td>
								<td>pending</td>
								
								<td><a className="bountyList__links"  href={item.account}>Account</a></td>
								<td><a className="bountyList__links"  href={item.link}>Link</a></td>
							</tr>
							
							</Fragment>
						)
				}
				
			}
		} );
	
		let pageBountyUI = this.props.bountyList === undefined ? null :  Math.round(this.props.bountyList.length / 100) + 1;

		let navButtons = pageBountyUI > 1 ? Array.from({ length: pageBountyUI }, (v, k) => k) : null;	
		
		let buttonsUi = navButtons === null || navButtons === undefined  || navButtons.length === 1 ? null :  navButtons.map(item => 
			(<button indes={item+1} className="bounty__pagination" onClick={this.handleChangePage} >{item + 1}</button>)
			)							    
									 
		const { userData } = this.props;
		if (Number(userData.confirmEmail) === 1 && userData.ethWalletUser !== '' && userData.ethWalletUser !== null && userData.ethWalletUser !== undefined) {

			return ( 
				<Fragment>
				<Unlogin />
				<HeaderConfirm ethWalletUser={userData.ethWalletUser} confirmEmail={userData.confirmEmail} />
				<Fragment >
					<LeftSidebar />
					
					{this.props.userData.bountyAccept !== 'true' ? (
						<Fragment>
							<div className="bountyWrapper">
								<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head dashboard__itemBig__head-blue">
										Bounty Programm
									</div>
									<p>Lorem Ipsum Dolor</p>
									{this.state.text}
									{this.state.textSecond}
									<p style={{fontSize: '22px'}}>My bounty Tokens : {userData.bountyTokens}</p>
									<div className="bounty__buttonsWrapper">
										<button onClick={this.handleAcceptBounty}>Follow bounty programm</button>
										<button className='bounty__buttonsAction' ><a target="_blank" rel="noopener noreferrer" style={{color:'#fff', textDecoration : 'none'}} href="http://on-life.io/example.xlsx">Download Table</a></button>
									
										<input className='bounty__buttonsAction'  style={{width: '300px'}}  required type="file" />
										<button  className='bounty__buttonsAction' type="submit"  >Load Table</button>
									</div>
									
								</div>
							</div>
							
						</Fragment>
					) : (
						<Fragment>
							<div className="bountyWrapper">
								<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head dashboard__itemBig__head-blue">
										Bounty Programm
									</div>
									<p>Loreim ipsum Dolor</p>
									<p>{this.state.text}</p>
									<p>{this.state.textSecond}</p>
									<p style={{fontSize: '22px'}}> My bounty Tokens : {userData.bountyTokens}</p>
									<div className="bounty__buttonsWrapper">
										
										<button  className="bounty__buttonsAction" onClick={this.handleDownloadTable}><a rel="noopener noreferrer" target="_blank" style={{color:'#fff', textDecoration : 'none'}} href="http://on-life.io/example.xlsx">Download Table</a></button>
										
										<form onSubmit={this.handleSubmitFile}>
											<input className="bounty__buttonsAction" style={{width: '300px', opacity: '0', position: 'absolute'}}  onChange={this.handleChangeInputFile} required type="file" />
											<button className="bounty__buttonsAction" style={{width: '300px'}} onClick={this.handleEventChooseFile}   required >Choose file</button>
											<button className="bounty__buttonsAction" type="submit" disabled={!this.state.validationFile} >Load Table</button>
										</form>
									</div>
									
									<div className="bountyList">
										<table class="table" style={{width:'100%'}}>
											  <thead>
											    <tr>
											      <th scope="col" style={{color: '#00bcd4'}}>Date</th>
											      <th scope="col" style={{color: '#00bcd4'}}>Status </th>
											      <th scope="col" style={{color: '#00bcd4'}}>Account</th>
											      <th scope="col" style={{color: '#00bcd4'}}>Link</th>
											      
											    </tr>
											  </thead>
											  <tbody>
											  {bountyList}
											  </tbody>
											</table>
											{buttonsUi}
										
									</div>
								</div>	
							</div>
						</Fragment>
					)}
					
					
				</Fragment>
				</Fragment>
			)	
		} else {
			return (
				<Fragment>
				<HeaderConfirm ethWalletUser={userData.ethWalletUser} confirmEmail={userData.confirmEmail} />
				<LeftSidebar />
							<div className="bountyWrapper">
								<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head dashboard__itemBig__head-blue">
										Bounty Programm
									</div>
									<p className="dashboard__itemBig__wallet__text" style={{marginTop: '60px'}}>For accept bounty programm need verify email and ETH wallet</p>
																		
									<div className="bounty__buttonsWrapper">
										<button  className="bounty__buttonsAction">Follow bounty programm</button>
										<button  className="bounty__buttonsAction">Download Table</button>
										
										<div >
											<input className="bounty__buttonsAction"  required type="file" />
											<div className="bounty__buttonsAction" >Load Table</div>
										</div>
									</div>
									
									<div className="bountyList">
										<table class="table" style={{width:'100%'}}>
											  <thead>
											    <tr>
											      <th scope="col" style={{color: '#00bcd4'}}>Date</th>
											      <th scope="col" style={{color: '#00bcd4'}}>Status </th>
											      <th scope="col" style={{color: '#00bcd4'}}>Account</th>
											      <th scope="col" style={{color: '#00bcd4'}}>Link</th>
											      
											    </tr>
											  </thead>
											  <tbody>
											  
											  </tbody>
											</table>
										
									</div>
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
		bountyList: state.bounty.bountyList
	}
}

const mapDispatchToProps = dispatch => {
 	return {
        acceptBounty: (payload) => {
            dispatch(acceptBounty(payload));
        },
        submitFileBounty: (payload) => {
        	dispatch(submitFileBounty(payload))
        },
        getBountyList : (payload) => {
        	dispatch(getBountyList(payload))
        }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);








