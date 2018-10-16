export const getAdmins = () => {
	return {
		type: 'getAdmins'	
	}
}

export const getAdminsSuccess = (payload) => {
	return {
		type: 'getAdminsSuccess',
		payload
	}
}

export const addAdmin = (payload) => {
	return {
		type: 'addAdmin',
		payload
	}
}

export const addAdminSuccess = (payload) => {
	return {
		type: 'addAdminSuccess',
		payload
	}
}

export const addAdminError = (payload) => {
	return {
		type: 'addAdminError',
		payload
	}
}

export const toggleAdmin = (payload) => {
	return {
		type: 'toggleAdmin',
		payload
	}
}

export const toggleAdminSuccess = (payload) => {
	return {
		type: 'toggleAdminSuccess',
		payload
	}
}

export const changeSettings = (payload) => {
	return {
		type: 'changeSettings',
		payload
	}
}

export const getBountySettings = (payload) => {
	return {
		type: 'getBountySettings',
		payload
	}
}
export const getUsersRegister = () => {
	return {
		type: 'getUsersRegister',
		
	}
}

export const getTransactionList = () => {
	return {
		type: 'getTransactionList',
		
	}
}

export const getBountyStatistic = () => {
	return {
		type: 'getBountyStatistic',
		
	}
}



