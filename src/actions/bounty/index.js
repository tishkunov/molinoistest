
export const acceptBounty = (payload) => {
	return {
		type: 'acceptBounty',
		payload
	}
}

export const bountyAcceptSuccess = (payload) => {
	return {
		type: 'bountyAcceptSuccess',
		payload
	}
}

export const submitFileBounty = (payload) => {
	return {
		type: 'submitFileBounty',
		payload
	}
}

export const submitFileBountySuccess = (payload) => {
	return {
		type: 'submitFileBountySuccess',
		payload
	}
}

export const getBountyList = (payload) => {
	return {
		type: 'getBountyList',
		payload
	}
}

export const getBountyListSuccess = (payload) => {
	return {
		type: 'getBountyListSuccess',
		payload
	}
}

export const getBountyForCheckAdmin = (payload) => {
	return {
		type: 'getBountyForCheckAdmin',
		payload
	}
}

export const saveBountyListCheck = (payload) => {
	return {
		type: 'saveBountyListCheck',
		payload
	}
}



