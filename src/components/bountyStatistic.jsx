import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {   getUsersRegister, getTransactionList, getBountyStatistic } from './../actions/admin'
import Leftsidebar from './leftSidebar'
import { Link } from 'react-router-dom'
import Unlogin from './unlogin'

var CanvasJSReact = require('./../canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;




class BountySettings extends Component {
	constructor() {
		super();
	}	

	componentDidMount() {
		this.props.getUsersRegister();
		this.props.getTransactionList();
		this.props.getBountyStatistic();
		setTimeout(() => {
			 CanvasJS.addColorSet("white",[
			 	 '#ffffff'
			 	]
               );
			let dps = []; // dataPoints
			let chart = new CanvasJS.Chart("chartContainer", {
				title :{
					text: "Bounty Statistic by weeks"
				},
				colorSet: 'white',
				backgroundColor: "#8e24aa",
				axisY: {
					includeZero: true
				},      
				data: [{
					type: "area",
					dataPoints: dps
				}],
				axisX:{      
		            valueFormatString: "DD-MMM" ,
		            labelAngle: -50,

		        },
			    color: 'white'  
			});
										
				let firstWeek = [],
					secondWeek = [],
					thirdWeek = [],
					fourthWeek = [],
					fiveWeek = [],
					sixWeek = [],
					weeks = [];
					
				this.props.dataForGraphic.map(item => {
					if (item.dateChecked <= '2018-10-07' ) {
						firstWeek.push(item)
					} else if (item.dateChecked <= '2018-10-14') {
							secondWeek.push(item)
							} else if (item.dateChecked <= '2018-10-21') {
								thirdWeek.push(item);
								} else if (item.dateChecked <= '2018-10-28') {
										fourthWeek.push(item);
									} else if (item.dateChecked <= '2018-11-04') {
										fiveWeek.push(item);
									} else if (item.dateChecked <= '2018-11-11') {
										sixWeek.push(item);
									}
				} )
				if (firstWeek.length !== 0) weeks.push(firstWeek)
				if (secondWeek.length !== 0) weeks.push(secondWeek)
				if (thirdWeek.length !== 0) weeks.push(thirdWeek)
				if (fourthWeek.length !== 0) weeks.push(fourthWeek)
				if (fiveWeek.length !== 0) weeks.push(fiveWeek)
				if (sixWeek.length !== 0) weeks.push(sixWeek)

				let datesOfBounty = [];
					 datesOfBounty[0] = '2018-10-7';
					 datesOfBounty[1] = '2018-10-14'
					 datesOfBounty[2] = '2018-10-21'
					 datesOfBounty[3] = '2018-10-28'
					 datesOfBounty[4] = '2018-11-4';
					 datesOfBounty[5] = '2018-11-11';		
					 
				for (let s = 0; s < weeks.length; s++) {
					dps.push({
						x: new Date(datesOfBounty[s]),
						y: weeks[s].length
					});
					
				}
				
				chart.render();
			
			CanvasJS.addColorSet("white",[
			 	 '#ffffff'
			 	]
               );
			let dps2 = []; // dataPoints
			let chart2 = new CanvasJS.Chart("chartContainer2", {
				title :{
					text: "Bounty Statistic by weeks"
				},
				colorSet: 'white',
				backgroundColor: "#8e24aa",
				axisY: {
					includeZero: true
				},      
				data: [{
					type: "area",
					dataPoints: dps2
				}],
				axisX:{      
		            valueFormatString: "DD-MMM" ,
		            labelAngle: -50,

		        },
			    color: 'white'  
			});
				
				let firstWeek2 = [],
					secondWeek2 = [],
					thirdWeek2 = [],
					fourthWeek2 = [],
					fiveWeek2 = [],
					sixWeek2 = [],
					weeks2 = [];
					
				this.props.dataForGraphic.map(item => {
					if (item.dateChecked <= '2018-10-07' ) {
						firstWeek2.push(item)
					} else if (item.dateChecked <= '2018-10-14') {
							secondWeek2.push(item)
							} else if (item.dateChecked <= '2018-10-21') {
								thirdWeek2.push(item);
								} else if (item.dateChecked <= '2018-10-28') {
										fourthWeek2.push(item);
									} else if (item.dateChecked <= '2018-11-04') {
										fiveWeek2.push(item);
									} else if (item.dateChecked <= '2018-11-11') {
										sixWeek2.push(item);
									}
				} )
				if (firstWeek.length !== 0) weeks2.push(firstWeek)
				if (secondWeek.length !== 0) weeks2.push(secondWeek)
				if (thirdWeek.length !== 0) weeks2.push(thirdWeek)
				if (fourthWeek.length !== 0) weeks2.push(fourthWeek)
				if (fiveWeek.length !== 0) weeks2.push(fiveWeek)
				if (sixWeek.length !== 0) weeks2.push(sixWeek)
				
					
					 
				for (let s = 0; s < weeks.length; s++) {
					
					if (s === 0 || s === weeks.length - 1) {
						dps2.push({
							x: new Date(datesOfBounty[s]),
							y: weeks2[s].length
						});
					} else {
						dps2.push({
							x: new Date(datesOfBounty[s]),
							y: weeks2[s].length + weeks2[s + 1].length
						});
					}
					
					
				}
				
				

				chart2.render();
			
		},700)
	}

	handleChangeStatisticType = (e) => {
		let eventValue = e.target.value;
		
		 CanvasJS.addColorSet("white",[
			 	 '#ffffff'
			 	]
               );
			let dps = []; // dataPoints
			let chart = new CanvasJS.Chart("chartContainer", {
				title :{
					text: "Bounty Statistic by weeks"
				},
				colorSet: 'white',
				backgroundColor: "#8e24aa",
				axisY: {
					includeZero: true
				},      
				data: [{
					type: "area",
					dataPoints: dps
				}],
				axisX:{      
		            valueFormatString: "DD-MMM" ,
		            labelAngle: -50,

		        },
			});
			

				
				let firstWeek = [],
					secondWeek = [],
					thirdWeek = [],
					fourthWeek = [],
					fiveWeek = [],
					sixWeek = [],
					weeks = [];
				
			let data = eventValue !== 'all' ? this.props.dataForGraphic.filter(item => item.socialType === eventValue)	: this.props.dataForGraphic.map(item => item);
				data.map(item => {
					if (item.dateChecked <= '2018-10-07' ) {
						firstWeek.push(item)
					} else if (item.dateChecked <= '2018-10-14') {
							secondWeek.push(item)
							} else if (item.dateChecked <= '2018-10-21') {
								thirdWeek.push(item);
								} else if (item.dateChecked <= '2018-10-28') {
										fourthWeek.push(item);
									} else if (item.dateChecked <= '2018-11-04') {
										fiveWeek.push(item);
									} else if (item.dateChecked <= '2018-11-11') {
										sixWeek.push(item);
									}
				} )
	
				if (firstWeek.length !== 0) weeks.push(firstWeek)
				if (secondWeek.length !== 0) weeks.push(secondWeek)
				if (thirdWeek.length !== 0) weeks.push(thirdWeek)
				if (fourthWeek.length !== 0) weeks.push(fourthWeek)
				if (fiveWeek.length !== 0) weeks.push(fiveWeek)
				if (sixWeek.length !== 0) weeks.push(sixWeek)
				
				let datesOfBounty = [];
					 datesOfBounty[0] = '2018-10-7';
					 datesOfBounty[1] = '2018-10-14'
					 datesOfBounty[2] = '2018-10-21'
					 datesOfBounty[3] = '2018-10-28'
					 datesOfBounty[4] = '2018-11-4';
					 datesOfBounty[5] = '2018-11-11';		
					 
				for (let s = 0; s < weeks.length; s++) {
					
					dps.push({
						x: new Date(datesOfBounty[s]),
						y: weeks[s].length
					});
					
				}

				
				chart.render();
			

			CanvasJS.addColorSet("white",[
			 	 '#ffffff'
			 	]
               );
			let dps2 = []; // dataPoints
			let chart2 = new CanvasJS.Chart("chartContainer2", {
				title :{
					text: "Bounty Statistic by weeks"
				},
				colorSet: 'white',
				backgroundColor: "#8e24aa",
				axisY: {
					includeZero: true
				},      
				data: [{
					type: "area",
					dataPoints: dps2
				}],
				axisX:{      
		            valueFormatString: "DD-MMM" ,
		            labelAngle: -50,

		        },
			    color: 'white'  
			});
			
			
			
			

				
				let firstWeek2 = [],
					secondWeek2 = [],
					thirdWeek2 = [],
					fourthWeek2 = [],
					fiveWeek2 = [],
					sixWeek2 = [],
					weeks2 = [];
					let data2 = eventValue !== 'all' ? this.props.dataForGraphic.filter(item => item.socialType === eventValue)	: this.props.dataForGraphic.map(item => item);
				data2.map(item => {
					if (item.dateChecked <= '2018-10-07' ) {
						firstWeek2.push(item)
					} else if (item.dateChecked <= '2018-10-14') {
							secondWeek2.push(item)
							} else if (item.dateChecked <= '2018-10-21') {
								thirdWeek2.push(item);
								} else if (item.dateChecked <= '2018-10-28') {
										fourthWeek2.push(item);
									} else if (item.dateChecked <= '2018-11-04') {
										fiveWeek2.push(item);
									} else if (item.dateChecked <= '2018-11-11') {
										sixWeek2.push(item);
									}
				} )
				
				if (firstWeek.length !== 0) weeks2.push(firstWeek)
				if (secondWeek.length !== 0) weeks2.push(secondWeek)
				if (thirdWeek.length !== 0) weeks2.push(thirdWeek)
				if (fourthWeek.length !== 0) weeks2.push(fourthWeek)
				if (fiveWeek.length !== 0) weeks2.push(fiveWeek)
				if (sixWeek.length !== 0) weeks2.push(sixWeek)
				 
				
					
					 
				for (let s = 0; s < weeks.length; s++) {
					
					if (s === 0 || s === weeks.length - 1) {
						dps2.push({
							x: new Date(datesOfBounty[s]),
							y: weeks2[s].length
						});
					} else {
						dps2.push({
							x: new Date(datesOfBounty[s]),
							y: weeks2[s].length + weeks2[s + 1].length
						});
					}
					
					
				}
				
				

				chart2.render();
	}

	render() {
		let bountySettings = Number(this.props.isRootAdmin) === 1 ? (<Link to='/bounty-settings'>Bounty Settings</Link>)  : null;
		let checkAdminss = Number(this.props.isRootAdmin) === 1 ? (<Link to='/checkadmins'>Check Admins</Link>)  : null;
		
		const { userData  } = this.props;
		
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
						<Link to='/airdrop-statistic'>Airdrop statistic</Link>
					</div>
					<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head">
										Bounty Statistic
									</div>
									<div style={{width: '100%', float: 'left'}}><div id="chartContainer" style={{height: '170px', width: '50%', marginTop: '70px'}}></div></div>
									<div style={{width: '100%', float: 'left'}}>
										
										<div id="chartContainer2" style={{height: '170px', width: '50%', marginTop: '70px'}}></div>
									</div>

										

									
									    
									
									<div className="statistic__item__select">Choose type of statistic </div>
									<select onChange={this.handleChangeStatisticType}>
										<option value="all">All</option>
										<option value="ambassador">Ambassador</option>
										<option value="twitterRT">Twitter Tweets</option>
										<option value="twitterTW">Twitter ReTweets</option>
										<option value="facebookFP">Facebook Posts</option>
										<option value="facebookFS">Facebook Shares</option>
									</select>
										
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

export default connect(mapStateToProps, mapDispatchToProps)(BountySettings);