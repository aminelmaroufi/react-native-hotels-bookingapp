import * as ActionTypes from "../utils/actionTypes";
import { all, takeLatest, put } from "redux-saga/effects";
import * as data from "../api/data.json";

function* get_hotels() {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });

    yield all([
      put({
        type: ActionTypes.SET_HOTELS,
        hotels: data.hotels
      }),
      put({
        type: ActionTypes.SUCCESS_OPERATION
      })
    ]);
  } catch (e) {
    debugger;
    yield put({ type: ActionTypes.API_CALL_FAILURE, message: e.message });
  }
}

export default function* watchReservationRequest() {
  yield all([takeLatest(ActionTypes.GET_HOTELS, get_hotels)]);
}
