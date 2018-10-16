const initialState = {
  userData:[],
  countTokesBuy: 0,
  transactionData:{
  	result : {
  		status_url: undefined
  	}
  },
  transInfo: {

  },
  transactionList: []
}

export default function data(state = initialState, action) {

	switch (action.type) {
		case 'fethUserDataSuccess':
			return {...state, userData: action.payload}

		case 'addEthWalletSuccess':
			const ethWalletUser = action.payload;
			return {...state, userData: {...state.userData, ethWalletUser}}  

		case 'paymentPage' :
			return {...state, countTokesBuy: action.payload}

		case 'buyTokensSuccess' : 
			return {...state, transactionData: action.payload}

		case 'transactionInfoSuccess':
			return {...state, transInfo: action.payload}

		case 'sendCompleteTransactionSuccess':
			return {...state }		

		case 'bountyAcceptSuccess':
			return {...state, userData: action.payload}	

		case 'getTransactionsData':
			return {...state, transactionList: action.payload}	

		case 'acceptBountySuccess': 
			let bountyAccept = 'true';
			return {...state, userData: {...state.userData, bountyAccept}}	

		case 'userSubmitAirdropSuccess' : 
			return {...state, userData: action.payload}	

		default:
    		return state;
  }
  
}
