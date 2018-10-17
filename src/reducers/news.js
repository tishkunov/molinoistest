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
			console.log('aganu')
			return {...state, stateOfAdding: ''}	
		default:
    		return state;
  }
}
