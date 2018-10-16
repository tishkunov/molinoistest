import { all } from 'redux-saga/effects';

import { wallet } from './wallet';
import { dashboard } from './dashboard';
import { airdrop } from './airdrop';
import { bounty } from './bounty';
import { bountyAdmin } from './bountyAdmin'



 function* rootSaga() {
  yield all([
    wallet,
    dashboard,  
    airdrop,
    bounty,
    bountyAdmin
  ])
}


export default rootSaga;