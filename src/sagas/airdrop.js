import { put, all, call, takeLatest } from 'redux-saga/effects';

export function *airdrop() {
  yield all([
    takeLatest('airDropSettingsToggle', airDropSettingsToggleWorker),
    takeLatest('airDropGetRates', airDropGetRatesWorker),
    takeLatest('submitAirDropType', submitAirDropTypeWorker),
    takeLatest('userSubmitAirdrop', userSubmitAirdropWorker) ,
    takeLatest('getAirdropForCheckAdmin', getAirdropForCheckAdminWorker),
    takeLatest('saveAirDropCheck', saveAirDropCheckWorker),
    takeLatest('getAirdropStatistic', getAirdropStatisticWorker)   
  ]);
}



function* airDropSettingsToggleWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/airdrop/airDropSettingsToggle.php', {
          method:'POST',
          body: action.payload
        })
              .then(res => res.json())
        }
      );
      
   
      yield put({ type: 'airDropSettingsToggleSuccess', payload: data})
      
     
      
      
  } catch (e) {
    console.error(e)
  }
}



function* airDropGetRatesWorker(action) {
  try {
    
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/airdrop/airDropGetRates.php', {
          method:'GET',
        })
              .then(res => res.json())
        }
      );
  
      yield put({ type: 'airDropGetRatesSuccess', payload: data})
     
      
      
  } catch (e) {
    console.error(e)
  }
}



function* submitAirDropTypeWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/airdrop/submitAirDropType.php', {
          method:'POST',
          body: action.payload
        })
              .then(res => res.json())
        }
      );
      yield put({ type: 'submitAirDropTypeSuccess', payload: data})
     
      
      
  } catch (e) {
    console.error(e)
  }
}



function* userSubmitAirdropWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/airdrop/userSubmitAirdrop.php', {
          method:'POST',
          body: action.payload
        })
              .then(res => res.json())
        }
      );
      
      yield put({ type: 'userSubmitAirdropSuccess', payload: data})
     
      
      
  } catch (e) {
    console.error(e)
  }
}


function* getAirdropForCheckAdminWorker(action) {
  try {
  
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/getAirdropForCheckAdmin.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
    
      yield put({ type: 'getAirdropForCheckAdminSuccess', payload:data })
      
  } catch (e) {
    console.error(e)
  }
}


function* saveAirDropCheckWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/saveAirDropCheck.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.text())
        }
      );
      yield put({ type: 'saveAirDropCheckSuccess', payload:data })
      
      
  } catch (e) {
    console.error(e)
  }
}


function* getAirdropStatisticWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/getAirdropStatistic.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
     
      yield put({ type: 'getAirdropStatisticSuccess', payload:data })
      
      
  } catch (e) {
    console.error(e)
  }
}


export default airdrop;