export const addNewsHandler = (dispatch) => {
	return {
		type: 'addNewsHandler',
		
	}
	dispatch('addNewsHandler')
}

export const closeForm = (dispatch) => {
	return {
		type: 'closeForm',
		
	}
}

export const setNewsData = (payload) => {
	return {
		type: 'setNewsData',
		payload
	}
}

export const changePage = (payload) => {
	return {
		type: 'changePage',
		payload
	}
}



