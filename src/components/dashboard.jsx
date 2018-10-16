import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import _ from 'lodash';
import { getUserData, paymentPage, getTransactionsData } from './../actions/dashboard/index'
import { connect } from 'react-redux'
import LeftSidebar from './leftSidebar'
import HeaderConfirm from './headerConfirm'
import Countdown from 'react-countdown-now';
import Unlogin from './unlogin'


class Dashboard extends Component {
	constructor(args) {
		super();
		this.state = {
			globalTimeout:null,
			globalInterval: null,
			data: [],
			actionState:false,
			countTokens: 0,
			redir:false,
			buyTokensDisable: true,
			bonuses: 0
		}
	}

	componentDidMount() {
		let formData = new FormData();
		formData.append('hash', localStorage.getItem('uniqueHash'));
		this.props.getUserDataFunc(formData);

		
		setTimeout(() => {
			if (this.props.userData.ethWalletUser === undefined || this.props.userData.ethWalletUser === null || this.props.userData.ethWalletUser === '' || Number(this.props.userData.confirmEmail) !== 1 )  {
				this.setState({ actionState: true })
			}
			let transData = new FormData();
			transData.append('email', this.props.userData.email);
			this.props.getTransactionsData(transData);
			
		},500);

		setTimeout(() => {
			if (localStorage.getItem('uniqueHash') !== this.props.userData.hash) localStorage.removeItem('uniqueHash')
		
		}, 3000);

		const globalInterval = setInterval(() => {
			let globalTimeout = setTimeout(() => {
				localStorage.removeItem('uniqueHash');
				this.setState({globalTimeout:null, globalInterval:null});
			}, 3600000);
			this.setState({globalTimeout:globalTimeout});
		}, 180000);

		this.setState({globalInterval:globalInterval});

		const debounce = _.debounce(() => {
			if (this.state.globalTimeout !== null) clearTimeout(this.state.globalTimeout);
		
		}, 5000);
		setTimeout(() => {
			if (localStorage.getItem('uniqueHash') === undefined || localStorage.getItem('uniqueHash') === null) {
				window.location.replace("http://lk.on-life.io");
			} 
		}, 5000)

		window.addEventListener('mousemove', debounce);
		let b1 = new Date('2018-10-15');
		let b2 = new Date('2018-10-22');
		let b3 = new Date('2018-10-29');
		let b4 = new Date('2018-11-05');
		let now = new Date();
		if (b1 > now) {
			this.setState({bonuses: 30});
		} else if (b2 > now) {
			this.setState({bonuses: 15}); 
			
		} else {
				if (b3 > now) {
					this.setState({bonuses: 10}); 
				} else {
					if (b4 > now) {
						this.setState({bonuses: 5}); 
					} else {
						this.setState({bonuses: 0}); 
					}
					
				}
			}
	}

	handleCountTokensChange = (e) => {
		this.setState({ countTokens: Number(e.target.value) })
	}

	handleBuyTokens = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append('count', this.state.countTokens);
		this.props.paymentPage(this.state.countTokens);
		setTimeout(() => {
			this.setState({redir:true})
		}, 200)
		
		
	}


	render() {
		const { countTokens, redir } = this.state;
		const { userData } = this.props;
		

		let buttonBuy =  Number(this.props.userData.confirmEmail) !== 1 ||  this.props.userData.ethWalletUser === undefined || this.props.userData.ethWalletUser === null || this.props.userData.ethWalletUser === '' ? (<div disabled="disabled" className="dashboard__itemBig__buttonBuy-disabled">Buy {countTokens} tokens</div>) : (<button type="submit" className="dashboard__itemBig__buttonBuy">Buy {this.state.countTokens} tokens</button>);
		
		
		let transList = this.props.transactionList.length > 0 ? this.props.transactionList.map(item => (
				<tr>
					<td>{item.dateBuy}</td>
					<td>{item.countTokens}</td>
					
					<td>{parseFloat(item.countTokens) * parseFloat(item.checkBonus)}</td>
					<td><img src="/img/icon-check-true.png" alt="Check true"/></td>
				</tr>
			)) : null;
		
		if (redir === true ) {
			return (
				<Redirect to='/payment' />
			)
		} else {
			if (localStorage.getItem('uniqueHash') === undefined || localStorage.getItem('uniqueHash') === null) {
				return (
					<Redirect to='/login' />
				)
			} else {	

				if (localStorage.getItem('uniqueHash') === this.props.userData.hash) {
					return (
						<Fragment>
							<Unlogin />
							<HeaderConfirm ethWalletUser={userData.ethWalletUser} confirmEmail={userData.confirmEmail} />
							<LeftSidebar />
							<div className="dashboard">
								<div className="dashboard__wrapperItemsXs">
									<div className="dashboard__itemXs">
										<div className="dashboard__itemXs__img dashboard__itemXs__img-green">
											<img src="/img/icon-green.png" alt="icon-dashboard" />
										</div>
										<p>My tokens</p>
										<h3>{Number(userData.boughtTokens) + Number(userData.bountyTokens) + Number(userData.referalTokens)  + Number(userData.airDropTokens)}</h3>
									</div>
									<div className="dashboard__itemXs">
										<div className="dashboard__itemXs__img dashboard__itemXs__img-blue">
											<img src="/img/icon-blue.png" alt="icon-dashboard" />
										</div>
										<p>Sum in USD</p>
										<h3>{Number(userData.boughtTokens)*0.25 + Number(userData.bountyTokens)*0.25 + Number(userData.referalTokens)*0.25 + Number(userData.airDropTokens)*0.25}</h3>
									</div>
									<div className="dashboard__itemXs">
										<div className="dashboard__itemXs__img dashboard__itemXs__img-orange">
											<img src="/img/icon-orange.png" alt="icon-dashboard" />
										</div>
										<p>Bonus Right now</p>
										<h3>{this.state.bonuses} %</h3>
									</div>
									<div className="dashboard__itemXs">
										<div className="dashboard__itemXs__img dashboard__itemXs__img-red">
											<img src="/img/icon-red.png" alt="icon-dashboard" />
										</div>
										<p>Days until end ICO</p>
										<h3><Countdown date={'Mon Dec 31 2018 00:00:00 GMT+0300'} /></h3>
									</div>
								</div>
								
								<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head">
										Invest to project
									</div>
									<form className="dashboard__itemBig__form" onSubmit={this.handleBuyTokens}>
										<input type="text" style={{marginLeft: '0', width:'100%', marginTop: '70px'}} className="myWallet__itemBig__input myWallet__itemBig__input-eth" readonly="readonly" disabled="disabled" value={userData.ethWalletUser} name="ethwallet" placeholder="ETH wallet" />
										<div className="dashboard__itemBig__inputWrapper">
											<input type="text" placeholder='Tokens' className="dashboard__itemBig__input" onChange={this.handleCountTokensChange} />
											<input type="text" placeholder='USD sum' className="dashboard__itemBig__input" value={countTokens*0.25 + '$'}  disabled="disabled" readonly="readonly" />
										</div>
										{buttonBuy}
										
									</form>
								</div>
								<div className="dashboard__itemBig">
									<div className="dashboard__itemBig__head dashboard__itemBig__head-orange">
										My invest
									</div>
									<table class="table" style={{width:'100%', marginTop: '60px'}}>
									  <thead>
									    <tr>
									      <th scope="col" style={{color: '#fea321'}}>Date</th>
									      <th scope="col" style={{color: '#fea321'}}>Count Tokens</th>
									      <th scope="col" style={{color: '#fea321'}}>Bonus</th>
									     
									      <th scope="col" style={{color: '#fea321'}}>Status</th>
									    </tr>
									  </thead>
									  <tbody>
									    {transList}
									    
									  </tbody>
									</table>
								</div>
								<div className="dashboard__itemMdWrapper">
									<div className="dashboard__itemMd">
										<div className="dashboard__itemBig__head dashboard__itemBig__head-blue">
											Price token
										</div>
										<div className="dashboard__itemMdWrapper__priceTokenWrapper">
											<div className="dashboard__itemMdWrapper__priceTokenWrapper__price__icon">
												<img src="/img/icon-eth.png" alt="icon-eth" />
												<p>ETH</p>
											</div>
											<div className="dashboard__itemMdWrapper__priceTokenWrapper__price__text">
												0,0025
											</div>
										</div>
									</div>
									<div className="dashboard__itemMd">
										<div className="dashboard__itemBig__head dashboard__itemBig__head-blue">
											Bonus Calendar
										</div>
										<table className="table" style={{marginTop: '60px'}}>
										<tbody>
											<tr>
												<td style={{color: '#10c0d7'}}>30%</td>
												<td>Until 15.10.2018</td>
											</tr>
											<tr>
												<td style={{color: '#10c0d7'}}>15%</td>
												<td>Until 22.10.2018</td>
											</tr>
											<tr>
												<td style={{color: '#10c0d7'}}>10%</td>
												<td>Until 29.10.2018</td>
											</tr>
											<tr>
												<td style={{color: '#10c0d7'}}>5%</td>
												<td>Until 05.11.2018</td>
											</tr>
										</tbody>
										</table>
									</div>
								</div>
								
								
							</div>
							
							
						</Fragment>
					)
				} else  {
					return (
							<div>Loading....</div>
							)
				}
					
			}
		}
		
				
	}
}


const mapStateToProps = state => {
	return {
		userData: state.dashboard.userData,
		transactionList: state.dashboard.transactionList
	}
}

 const mapDispatchToProps = dispatch => {
 	return {
        getUserDataFunc: (formData) => {
            dispatch(getUserData(formData));
        },
        paymentPage: (data) => {
        	dispatch(paymentPage(data))
        },
        getTransactionsData : (payload) => {
        	dispatch(getTransactionsData(payload))
        }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);