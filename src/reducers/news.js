const initialState = {
  newsList:[],
  filter: 'all',
}

export default function data(state = initialState, action) {
	switch (action.type) {
		case 'submitFileBountySuccess':
			return {...state, bountyList: action.payload}
			
		default:
    		return state;
  }
}
