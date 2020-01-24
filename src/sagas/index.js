import {fork, all} from 'redux-saga/effects';
import watchAuthRequests from './auth';
import watchReservationRequests from './reservation';

export default function* rootSaga() {
  yield all([fork(watchAuthRequests), fork(watchReservationRequests)]);
}
