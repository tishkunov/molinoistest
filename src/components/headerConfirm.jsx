import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


function Headerconfirm({props}) {
	let CheckValidEmail = Number(this.props.confirmEmail) !== 1 ? (
			<Fragment>
			<Link to='/mywallet'><div className="topHeaderConfirm__item">
					<div className="topHeaderConfirm__item__circle">1</div>
					<p className="topHeaderConfirm__item__text">Confirm your email</p>
				</div>
			</Link>	
			</Fragment>) : null;  
			let CheckValidWallet = this.props.ethWalletUser === undefined || this.props.ethWalletUser === null || this.props.ethWalletUser === '' ? (
			<Fragment>
				<Link to='/mywallet'>
						<div className="topHeaderConfirm__item">
							<div className="topHeaderConfirm__item__circle">2</div>
							<p className="topHeaderConfirm__item__text">Confirm your wallet</p>
						</div>
				</Link>
			</Fragment>
			) : null;
		if (Number(this.props.confirmEmail) !== 1 || this.props.ethWalletUser === undefined || this.props.ethWalletUser === null || this.props.ethWalletUser === '') {
			return (
			
				<div className="topHeaderConfirm">
					<p className="topHeaderConfirm__text">For buy Tokens</p>
					{CheckValidEmail}
					{CheckValidWallet}
				</div>
			)
		} else {
			return (<div></div>)
					}
}




export default Headerconfirm;





