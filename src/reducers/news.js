
const initialState = {
  newsList:[],
  filter: 'all',
  stateOfAdding: '',
  page: 1,
  countPages: []
}

export default function data(state = initialState, action) {
	switch (action.type) {
		case 'ADD_NEWS':
			return {...state, stateOfAdding: 'active'}	
		case 'CLOSE_FORM':
			return {...state, stateOfAdding: ''}	
		case 'SET_NEWS_DATA': 
			return {...state, 
					newsList:action.payload,
					countPages: action.payload.length > 3 ?  Array.from({ length: Math.ceil(action.payload.length / 3) }, (v, k) => k + 1) : [],
					stateOfAdding: [] 
			}	
		case 'CHANGE_PAGE': 	
			return {...state, page: action.payload}
		case 'CHANGE_FILTER':
			const filteredNewsList = state.newsList.filter(item => action.payload === 'all' ? item : item.nameEng === action.payload );
			return {...state, 
				filter : action.payload,
				countPages: filteredNewsList.length > 3 ? Array.from({ length: Math.ceil(filteredNewsList.length / 3) }, (v, k) => k + 1) : []}	
		default:
    		return state;
  }
}