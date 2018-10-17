const initialState = {
  newsList:[],
  filter: 'all',
  stateOfAdding: ''
}

export default function data(state = initialState, action) {
	switch (action.type) {
		case 'submitFileBountySuccess':
			return {...state, bountyList: action.payload}
		case 'addNewsHandler':
			return {...state, stateOfAdding: 'active'}	
		case 'closeForm':
			return {...state, stateOfAdding: ''}
		case 'setNewsData': 
			return {...state, newsList:action.payload}		
		default:
    		return state;
  }
}
