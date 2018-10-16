const initialState = {
  bountyList:[],
  pageBounty : 0,
  bountyListUi: [],
  bountyListLength: 0
}

export default function data(state = initialState, action) {
	switch (action.type) {
		case 'submitFileBountySuccess':
			return {...state, bountyList: action.payload}
		case 'getBountyListSuccess':
			return {...state, 
				bountyList: action.payload, 
				pageBounty: 100, 
				bountyListUi: action.payload.slice(0, 99),
				bountyListLength: Math.round(action.payload.bountyListLength / 100) }		
		default:
    		return state;
  }
}
