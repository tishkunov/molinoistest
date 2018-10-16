const initialState = {
  admins:[],
  responseText: '',
  bountyListAdmin: [],
  bountySettings: {},
  usersList: [],
  transListAdmin: [{valute: 'ETH'}],
  dataForGraphic: []
}

export default function data(state = initialState, action) {
	switch (action.type) {
		case "getAdminsSuccess":
			return {...state, admins: action.payload}

    case 'addAdminSuccess':
    	let newAdmin = action.payload.email;
    	let text = action.payload.addAdminResText;
    	return {...state, admins: [...state.admins, newAdmin], responseText: text}

    case 'addAdminError' : 
    	let textError = action.payload.addAdminResText;
    	return {...state, responseText: textError}

    case 'toggleAdminSuccess' :
    	let statusAdmin = {
    		email: action.payload.email, 
    		isAdminEnable: action.payload.isAdminEnable
    	}
   
    	return {...state, admins : state.admins.map(item => item.email !== statusAdmin.email ? item : statusAdmin) }	

    case 'getBountyForCheckAdminSuccess':
      return {...state, bountyListAdmin:action.payload}	

    case 'saveBountyListCheckSucess':
      return {...state, bountyListAdmin: []}   

    case 'getBountySettingsSuccess':
      return {...state, bountySettings : action.payload } 

    case 'changeSettingsSuccess': 
      return {...state, bountySettings: action.payload} 

    case 'getUsersRegisterSuccess': 
      return {...state, usersList: action.payload} 

    case 'getTransactionListSuccess' :
      return {...state, transListAdmin: action.payload}

    case 'getBountyStatisticSuccess' :
      return {...state, dataForGraphic: action.payload} 

		default:
    	return state;
  }
  
}


