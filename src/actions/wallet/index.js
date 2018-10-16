export const addWallet = (payload) => {
	return {
		type: 'addWallet',
		payload	
	}
}


export const addEthWalletSuccess = (payload) => {
	return {
		type: 'addEthWalletSuccess',
		payload
	}
}

export default addWallet;


