const initialState = {
  rates:[],
  dataForCheck: [],
  airdropStatistic: []
}

export default function data(state = initialState, action) {
	switch (action.type) {

		case "airDropGetRatesSuccess":
			return   {...state, rates: action.payload}

    case 'airDropSettingsToggleSuccess':
      return  {...state, rates: action.payload}

    case 'submitAirDropTypeSuccess':    
      return  {...state, rates: action.payload} 

    case 'getAirdropForCheckAdminSuccess':
      return  {...state, dataForCheck: action.payload}
    case 'saveAirDropCheckSuccess':
      return  {...state, dataForCheck: []} 
      
    case 'getAirdropStatisticSuccess':
      return {...state, airdropStatistic: action.payload}  

		default:
    		return state;
  }

}


