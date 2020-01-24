import * as ActionTypes from "../utils/actionTypes";
const initialState = {
  fetching: false,
  isLoggedIn: false,
  message: "",
  error: false,
  hotels: [],
  reservation: {
    hotel: null,
    room: null,
    price: 0,
    checkInDate: "",
    checkOutDate: "",
    night_numbers: 1
  },
  success: false
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_HOTELS:
      return {
        ...state,
        hotels: action.hotels
      };
    case ActionTypes.SELECT_HOTEL:
      return {
        ...state,
        reservation: {
          ...state.reservation,
          hotel: action.hotel,
          room: action.hotel.rooms[0],
          price: action.hotel.rooms[0].price
        }
      };
    case ActionTypes.UPDATE_RESERVATION:
      return {
        ...state,
        reservation: action.reservation
      };
    default:
      return state;
  }
}
