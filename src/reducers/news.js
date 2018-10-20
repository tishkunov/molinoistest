const initialState = {
  newsList:[],
  filter: 'all',
  stateOfAdding: '',
  page: 1,
  countPages: []
}

export default function data(state = initialState, action) {
	switch (action.type) {
		case 'submitFileBountySuccess':
			return {...state, bountyList: action.payload}
		case 'addNewsHandler':
			return {...state, stateOfAdding: 'active'}	
		case 'setNewsData': 
			return {...state, 
					newsList:action.payload,
					countPages: action.payload.length > 3 ?  Array.from({ length: Math.ceil(action.payload.length / 3) }, (v, k) => k + 1) : [],
					stateOfAdding: [] 
			}	
		case 'changePage': 	
			return {...state, page: action.payload}
		default:
    		return state;
  }
}
