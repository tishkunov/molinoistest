
export const ADD_NEWS = 'ADD_NEWS'
export const SET_NEWS_DATA = 'SET_NEWS_DATA'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CLOSE_FORM = 'CLOSE_FORM'
export const CHANGE_FILTER = 'CHANGE_FILTER'

export const closeForm = (dispatch) => {
	return {
		type: CLOSE_FORM,	
	}
}

export const addNews = (dispatch) => {
	return {
		type: ADD_NEWS,	
	}
}

export const setNewsData = (payload) => {
	return {
		type: SET_NEWS_DATA,
		payload
	}
}

export const changePage = (payload) => {
	return {
		type: CHANGE_PAGE,
		payload
	}
}

export const changeFilter = (payload) => {
	return {
		type: CHANGE_FILTER,
		payload
	}
}

