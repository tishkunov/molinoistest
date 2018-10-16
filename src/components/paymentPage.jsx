import React, { Component } from 'react'
import { connect } from 'react-redux'
import './../App.css';
import { buyTokens, getTransInfo, sendCompleteTransaction } from './../actions/dashboard/index'
import Countdown from 'react-countdown-now';


class PaymentPage extends Component {
	constructor() {
		super()
		this.state = {
			paymentMethod: 'BTC',
			timeout:86400
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({timeout: this.props.transactionData.result.timeout})
		}, 32000)
	}


	handlePay = (e) => {
		let data = new FormData();
		data.append('tokens', this.props.tokens);
		data.append('valute', this.state.paymentMethod);
		data.append('email', this.props.userData.email)
	
		this.props.buyTokens(data);		
		setTimeout(() => {
			setInterval(() => {
				
			let dataTrans = new FormData();
			dataTrans.append('id', this.props.transactionData.result.txn_id);
			this.props.getTransInfo(dataTrans)		
			}, 60000) 
		}, 60000)
		
		let modal = document.querySelector('.modalConfirm');
		modal.style.display = 'none';
	}

	confirmPay = (e) => {
		
		let item = document.querySelector('.card.selected');
		item.classList.remove('selected');
		e.currentTarget.firstElementChild.classList.add('selected');
		this.setState({paymentMethod: e.currentTarget.getAttribute('name')});
		
	}

	confirmPayModal = () => {
		let modal = document.querySelector('.modalConfirm');
		modal.style.display = 'block';
	}

	render() {
		
		let payNow = Object.keys(this.props.transInfo).length === 0 || this.props.transInfo === undefined ? null : ( <div id="paynow" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" class="modal show">
		    <div role="document" class="modal-dialog modal-lg">
		        <div class="modal-content">
		            <div class="modal-header">
		                <h5 id="exampleModalLabel" class="modal-title">Payment Information</h5></div>
		            <div class="table-responsive col-sm-">
		                <table class="table">
		                    <tbody>
		                        <tr>
		                            <td class="text-right">Status:</td>
		                            <td>{this.props.transInfo.result.status_text}</td>
		                        </tr>
		                        <tr>
		                            <td class="text-right">Total Amount To Send:</td>
		                            <td>{this.props.transInfo.result.amountf} {this.props.transInfo.result.coin} <span>(total confirms needed: {this.props.transactionData.result.confirms_needed})</span></td>
		                        </tr>
		                        <tr>
		                            <td class="text-right">Received So Far:</td>
		                            <td>{this.props.transInfo.result.receivedf} {this.props.transInfo.result.coin}</td>
		                        </tr>
		                        <tr>
		                            <td class="text-right">Balance Remaining:</td>
		                            <td>
		                                {this.props.transInfo.result.amountf} {this.props.transInfo.result.coin}
		                            </td>
		                        </tr>
		                        <tr>
		                            <td colspan="2" class="text-center">
		                                <img src={this.props.transactionData.result.qrcode_url} alt="QR CODE" />
		                                <div class="text-danger"><small>Do not send value to us if address status is expired!</small></div>
		                            </td>
		                        </tr>
		                        <tr>
		                            <td class="text-right">Send To Address:</td>
		                            <td>{this.props.transInfo.result.payment_address}</td>
		                        </tr>
		                        <tr>
		                            <td class="text-right">Time Left For Us to Confirm Funds:</td>
		                            <td>
		                                <div class="time-remaining bold"><Countdown date={Date.now() + (parseFloat(this.state.timeout * 1000) - 60000)} /></div>
		                            </td>
		                        </tr>
		                        <tr>
		                            <td class="text-right">Payment ID:</td>
		                            <td>{this.props.transactionData.result.txn_id}</td>
		                        </tr>
		                        <tr>
		                            <td colspan="2" class="text-center text-muted"><a target="_blank" class="text-muted" href={this.props.transactionData.result.status_url}>Alternative Link</a> | <a href="https://lk.sbcplatform.com/coinpayment/transactions/histories" class="text-muted">Transaction Histories</a></td>
		                        </tr>
		                    </tbody>
		                </table>
		            </div>
		        </div>
		    </div>
		</div>);
		
		return (

			<div id="coinpayment-vue">

    			<div className="row justify-content-md-center mb-5">
        			<div className="col-sm-12">
			            <div className="row mt-5">
			                <div className="col-sm-4">
			                    <div className="card">
			                        <div className="card-body">
			                            <div className="text-center">
			                                <img src="coinpayment.logo.png" alt="coinpayment.logo" width="170"/>
			                            </div>
			                        </div>
			                        <table className="table">
			                            <thead>
			                                <tr>
			                                    <th>Description</th>
			                                    <th className="text-right">Amount</th>
			                                </tr>
			                            </thead>
			                            <tbody>
			                                <tr>
			                                    <td>
			                                        ONF Token
			                                        <div><small className="text-muted">Item Price: 0,25 USD</small>
			                                            <br/> <small className="text-muted">Quantity: {this.props.tokens}</small></div>
			                                    </td>
			                                    <td className="text-right">{Number(this.props.tokens)*0.25} USD</td>
			                                </tr>
			                            </tbody>
			                        </table>
			                        <table className="table">
			                            <tfoot>
			                                <tr>
			                                    <th>Item Total</th>
			                                    <th className="text-right">{Number(this.props.tokens)*0.25} USD</th>
			                                </tr>
			                                <tr>
			                                    <td className="text-right">Total Amount USD</td>
			                                    <td className="text-right">{Number(this.props.tokens)*0.25} USD</td>
			                                </tr>
			                                <tr>
			                                    <td className="text-right">Payment Method</td>
			                                    <td className="text-right">{this.state.paymentMethod}</td>
			                                </tr>
			                               
			                            </tfoot>
			                        </table>
			                        <div className="card-body text-center">
			                            <hr /> <small className="text-muted">You are buying {this.props.tokens} ONF Tokens</small></div>
			                    </div>
			                    <div className="text-center">
			                        <button type="button" name="button" onClick={this.confirmPayModal} className="btn btn-block btn-danger mt-3 mb-4" >Pay Now <i className="fa fa-arrow-circle-right"></i></button>
			                        <div className="text-muted"><a href="http://on-life.io/test" className="text-muted">Cancel your payment</a> | <a href="https://lk.sbcplatform.com/coinpayment/transactions/histories" className="text-muted">Transaction Histories</a></div>
			                    </div>
			                </div>
			                <div className="col-sm-8">
			                    <div className="card">
			                        <div className="card-body">
			                            
			                           
			                            <div className="slimScrollDiv" >
			                                <div className="row coin-items" >
			                                    <div className="col-sm-6 show-coin mt-3" name="BTC" onClick={this.confirmPay}>
			                                        <div className="card selected">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img  alt="icon valute"width="25" src="https://www.coinpayments.net/images/coins/BTC.png" className="mr-3" />
			                                                <div className="media-body"><strong className="mt-0">Bitcoin</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="BCH" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img  alt="icon valute"width="25" src="https://www.coinpayments.net/images/coins/BCH.png" className="mr-3" />
			                                                <div className="media-body"><strong className="mt-0">Bitcoin Cash</strong>
			                                                   </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="DCR" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/DCR.png" className="mr-3" />
			                                                <div className="media-body"><strong className="mt-0">Decred</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="DGB" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/DGB.png" className="mr-3" />
			                                                <div className="media-body"><strong className="mt-0">DigiByte</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="ETC" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/ETC.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">Ether Classic</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="ETH" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/ETH.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">Ether</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="EXP" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/EXP.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">Expanse</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="GLD" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/GLD.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">Goldcoin</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="NEO" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/NEO.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">NEO</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="QTUM" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/QTUM.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">Qtum</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="SMART" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/SMART.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">SmartCash</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="SYS" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/SYS.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">Syscoin</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="UBQ" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/UBQ.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">Ubiq</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="WAVES" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/WAVES.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">Waves</strong>
			                                                   </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="XEM" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/XEM.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">NEM</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="XMR" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/XMR.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">Monero</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="XZC" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/XZC.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">ZCoin</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="ZEC" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/ZEC.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">ZCash</strong>
			                                                   </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                    <div className="col-sm-6 show-coin mt-3" name="ZEN" onClick={this.confirmPay}>
			                                        <div className="card">
			                                            <div className="media mt-2 ml-2 mr-2 mb-3"><img alt="icon valute" width="25" src="https://www.coinpayments.net/images/coins/ZEN.png" className="mr-3"/>
			                                                <div className="media-body"><strong className="mt-0">ZenCash</strong>
			                                                    </div>
			                                            </div>
			                                        </div>
			                                    </div>
			                                </div>
			                                
			                            </div>
			                        </div>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			   
			    {payNow}

			    <div class="swal-overlay swal-overlay--show-modal modalConfirm" tabindex="-1">
				  <div class="swal-modal" role="dialog" aria-modal="true"><div class="swal-title" >Confirmation</div><div class="swal-text">Are you sure ?</div><div class="swal-footer"><div class="swal-button-container">

				    <button class="swal-button swal-button--cancel">Cancel</button>

				    <div class="swal-button__loader">
				      <div></div>
				      <div></div>
				      <div></div>
				    </div>

				  </div><div class="swal-button-container">

				    <button class="swal-button swal-button--confirm" onClick={this.handlePay}>OK</button>

				    <div class="swal-button__loader">
				      <div></div>
				      <div></div>
				      <div></div>
				    </div>

				  </div></div></div></div>
			</div>

		)
	}
	
}


const mapStateToProps = state => {
	return {
		tokens: state.dashboard.countTokesBuy,
		transactionData: state.dashboard.transactionData,
		status_url: state.dashboard.transactionData.result.status_url,
		transInfo : state.dashboard.transInfo,
		userData: state.dashboard.userData
	}
}

const mapDispatchToProps = dispatch => {
	return {
		buyTokens: (data) => {
        	dispatch(buyTokens(data))
        },
        getTransInfo: (data) => {
        	dispatch(getTransInfo(data))
        },
        sendCompleteTransaction: (data) => {
        	dispatch(sendCompleteTransaction(data))
        }
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);