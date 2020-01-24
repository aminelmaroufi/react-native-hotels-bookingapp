import * as ActionTypes from '../utils/actionTypes';

export const saveAccount = account => ({
  type: ActionTypes.SAVE_ACCOUNT,
  account,
});

export const addCard = card => ({
  type: ActionTypes.ADD_CARD,
  card,
});
