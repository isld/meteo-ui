import { ACTIONS } from '../actions';

const initialState = {
  data: null,
  pollingStatus: {},
};

export const weather = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_POLLING_STATUS:
      return {
        ...state,
        pollingStatus: action.status,
      };
    case ACTIONS.UPDATE_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state
  }
};

export default weather;
