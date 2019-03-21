import { combineReducers } from 'redux';

import weather from './weather.js';

const reducer = combineReducers({
  weather,
});

export default reducer;
