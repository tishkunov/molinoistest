import { put, all, call, takeLatest } from 'redux-saga/effects';

export function *bountyAdmin() {
  yield all([
   takeLatest('getBountyList', getBountyListWorker),
   takeLatest('acceptBounty', acceptBountyWorker),
   takeLatest('submitFileBounty', submitFileBountyWorker)
  ]);
}


function* acceptBountyWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/bounty/userAcceptBounty.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );

      yield put({ type: 'acceptBountySuccess', payload: data})

  } catch (e) {
    console.error(e)
  }
}

function* submitFileBountyWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/bounty/userDownloadFile.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
      
      yield put({ type: 'submitFileBountySuccess', payload:data })
      
      
  } catch (e) {
    console.error(e)
  }
}



function* getBountyListWorker(action) {
  try {
  
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/bounty/getBountyListUser.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
      
      yield put({ type: 'getBountyListSuccess', payload:data })
   
      
  } catch (e) {
    console.error(e)
  }
}


export default bountyAdmin;