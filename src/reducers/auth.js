import * as ActionTypes from "../utils/actionTypes";
const initialState = {
  fetching: false,
  isLoggedIn: false,
  message: "",
  error: false,
  user: null,
  success: false
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SUCCESS_OPERATION:
      return { ...state, isFetching: false, success: true };
    case ActionTypes.SAVE_ACCOUNT:
      return { ...state, user: action.account };
    case ActionTypes.ADD_CARD:
      return { ...state, user: { ...state.user, card: action.card } };
    default:
      return state;
  }
}
