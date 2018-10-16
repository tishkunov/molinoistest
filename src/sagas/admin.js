import { put, takeLatest, all, takeEvery, call } from 'redux-saga/effects';

export function *admin() {
  yield all([
    takeEvery('getUsersRegister', getUsersRegisterWorker),
    takeEvery('addAdmin', addAdminWorker),
    takeEvery('toggleAdmin', toggleAdminWorker),
    takeEvery('getBountyStatistic', getBountyStatisticWorker),
    takeEvery('getAdmins', getAdminsWorker),
    takeEvery('getTransactionList', getTransactionListWorker)
  ]);
}


function* getBountyStatisticWorker(action) {
  try {
    
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/getBountyStatistic.php', {
          method:'GET',
        })
              .then(res => res.json())
        }
      );
    
      yield put({ type: 'getBountyStatisticSuccess', payload: data})
      
      
  } catch(e) {
    console.error(e)
  }
}



function* getTransactionListWorker(action) {
  try {
    
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/getTransactionList.php', {
          method:'GET',
        })
              .then(res => res.json())
        }
      );
  
      yield put({ type: 'getTransactionListSuccess', payload: data})
      
      
  } catch(e) {
    console.error(e)
  }
}

function* getUsersRegisterWatcher(action) {
  yield 
}

function* getUsersRegisterWorker(action) {
  try {
    
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/getUsersRegister.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
    
      yield put({ type: 'getUsersRegisterSuccess', payload: data})
      
      
  } catch(e) {
    console.error(e)
  }
}


function* addAdminWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/addAdmin.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
      if (data.addAdminStatus === true) {
        yield put(addAdminSuccess(data));
      }  else {
         yield put(addAdminError(data));
      }
      
  } catch(e) {
    console.error(e)
  }
}


function* toggleAdminWorker(action) {
  try {
    
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/toggleAdmin.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );
      if (data.toggleAdminStatus === true) {
        yield put(toggleAdminSuccess(data));
      }
      
  } catch (e) {
    console.error(e)
  }
}


function* getAdminsWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/admin/getAdmins.php', {
          method:'GET',
        })
              .then(res => res.json())
        }
      );
      yield put(getAdminsSuccess(data));
     
  } catch(e) {
    console.error(e)
  }
}


export default admin;