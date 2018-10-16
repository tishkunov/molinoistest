import { put, all, takeEvery, call } from 'redux-saga/effects';

export function *wallet() {
  yield all([
    takeEvery('addWallet', addWalletWorker)
  ]);
}



function* addWalletWorker(action) {
  try {
    const data = yield call(() => {
        return fetch('http://lk.on-life.io/wallet/addWallet.php', {
          method:'POST',
          body:action.payload
        })
              .then(res => res.json())
        }
      );

      if (data.addWallet === true) {
        if (data.ethWalletUser && data.ethWalletUser !== '' && data.ethWalletUser !== undefined && data.ethWalletUser !== null) {
          yield put({ type: 'getBountyStatisticSuccess', payload: data.ethWalletUser})
        } 
      }
      
  } catch (e) {
    console.error(e)
  }
}


export default wallet;