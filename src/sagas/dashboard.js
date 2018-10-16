import { put, takeLatest, all, call } from 'redux-saga/effects';




function* sendMessageWorker(action) {
  try {
    
    const data = yield call(() => {
      return fetch('http://lk.on-life.io/dashboard/sendMessage.php', {
        method:'POST',
        body: action.payload
      })
      .then(res => res.json())
    })
  
    if (data === 'ok') {

    }
  
    
  } catch(e) {
    console.log(e)
  }
}


function* buyTokensWorker(action) {
  try {
    const data = yield call(() => {
      return fetch('http://lk.on-life.io/dashboard/buyTokens/index.php', {
        method:'POST',
        body: action.payload
      })
      .then(res => res.json())
    })

    if (data.error === 'ok') {
      yield put({type: 'buyTokensSuccess', payload: data});
      let dataTrans = new FormData();
      dataTrans.append('id', data.result.txn_id);
      const data2 = yield call(() => {
        return fetch('http://lk.on-life.io/dashboard/buyTokens/transactioninfo.php', {
          method:'POST',
          body: dataTrans
        })
        .then(res => res.json())
      })
      

      if (data2.error === 'ok') {
         yield put({type: 'transactionInfoSuccess', payload: data2});
      }   

      
      
    }
  } catch(e) {
    console.error(e)
  } 
}


function* getTransInfoWorker(action) {
  try {
    
    const data = yield call(() => {
      return fetch('http://lk.on-life.io/dashboard/buyTokens/transactioninfo.php', {
        method:'POST',
        body: action.payload
      })
      .then(res => res.json())
    })
    
    if (data.error === 'ok') {
       yield put({type: 'transactionInfoSuccess', payload: data});
    }
  } catch(e) {
    console.log(e)
  }
}



function* sendCompleteTransactionWorker(action) {
  try {

    const data = yield call(() => {
      return fetch('http://lk.on-life.io/dashboard/buyTokens/transactionComplete.php', {
        method:'POST',
        body: action.payload
      })
      .then(res => res.json())
    })

    if (data.error === 'ok') {
      yield put({type: 'sendCompleteTransactionSuccess', payload: data});
    }
  } catch(e) {
    console.log(e)
  }
}




function* fetchUserDataWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/confirm/getSession.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
      yield put({type: 'fethUserDataSuccess', payload: data});
     
  } catch(e) {
    console.error(e)
  }
}


function* getTransactionsDataWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/dashboard/transactionsData.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
      
      if (data.length > 0) {
        yield put({type: 'getTransactionsData', payload: data});
      }
     
  } catch(e) {
    console.error(e)
  }
}



export function *dashboard() {
  yield all([
    takeLatest("getTransactionsData", getTransactionsDataWorker),
    takeLatest('fetchUserData', fetchUserDataWorker),
    takeLatest('sendCompleteTransaction', sendCompleteTransactionWorker),
    takeLatest('getTransInfo', getTransInfoWorker ),
    takeLatest('buyTokens', buyTokensWorker ),
    takeLatest('sendMessage', sendMessageWorker )
  ]);
}



export default dashboard;