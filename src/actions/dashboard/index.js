export const getUserData = (payload) => {
	return {
		type: 'fetchUserData',
		payload
	}
}

export const buyTokens = (payload) => {
	return {
		type: 'buyTokens',
		payload
	}
}

export const paymentPage = (payload) => {
	return {
		type: 'paymentPage',
		payload
	}
}

export const buyTokensSuccess = (payload) => {
	return {
		type: 'buyTokensSuccess',
		payload
	}
}

export const transactionInfoSuccess = (payload) => {
	return {
		type : 'transactionInfoSuccess',
		payload
	}
}

export const getTransInfo = (payload) => {
	return {
		type : 'getTransInfo',
		payload
	}
}

export const sendCompleteTransaction = (payload) => {
	return {
		type : 'sendCompleteTransaction',
		payload
	}
}

export const sendCompleteTransactionSuccess = (payload) => {
	return {
		type : 'sendCompleteTransactionSuccess',
		payload
	}
}

export const getTransactionsData = (payload) => {
	return {
		type : 'getTransactionsData',
		payload
	}
}

export const sendMessage = (payload) => {
	return {
		type : 'sendMessage',
		payload
	}
}




