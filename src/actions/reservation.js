import * as ActionTypes from "../utils/actionTypes";

export const getHotels = () => ({
  type: ActionTypes.GET_HOTELS
});

export const selectHotel = hotel => ({
  type: ActionTypes.SELECT_HOTEL,
  hotel: hotel
});

export const updateReservation = reservation => ({
  type: ActionTypes.UPDATE_RESERVATION,
  reservation: reservation
});
