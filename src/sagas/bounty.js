import { put, all, call, takeLatest } from 'redux-saga/effects';

export function *bounty() {
  yield all([
   takeLatest('getBountySettings', getBountySettingsWorker) ,
   takeLatest('getBountyForCheckAdmin', getBountyForCheckAdminWorker) ,
   takeLatest('saveBountyListCheck', saveBountyListCheckWorker),
   takeLatest('changeSettings', changeSettingsWorker) ,
   takeLatest('getBountySettings', getBountySettingsWorker) 
  ]);
}



function* getBountyForCheckAdminWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/getBountyForCheck.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
      yield put({ type: 'getBountyForCheckAdminSuccess', payload:data })
      
  } catch (e) {
    console.error(e)
  }
}


function* saveBountyListCheckWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/sendBountyListChecked.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
      
      if (data.error === 'ok') {
        yield put({ type: 'saveBountyListCheckSucess'})
      }
      
      
  } catch (e) {
    console.error(e)
  }
}


function* changeSettingsWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/changeSettingsBounty.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
      
      yield put({ type: 'changeSettingsSuccess', payload: data})
      
      
  } catch (e) {
    console.error(e)
  }
}

function* getBountySettingsWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/getBountySettings.php', {
          method:'GET',
          
        })
              .then(res => res.json())
        }
      );
      yield put({ type: 'getBountySettingsSuccess', payload: data})
     
      
      
  } catch (e) {
    console.error(e)
  }
}


export default bounty;