export const ADD_NEWS = 'ADD_NEWS'
export const SET_NEWS_DATA = 'SET_NEWS_DATA'
export const CHANGE_PAGE = 'CHANGE_PAGE'


export const addNewsHandler = (dispatch) => {
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



