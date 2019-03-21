import { all } from 'redux-saga/effects';

import weather from './weather.js';

export default function* rootSaga() {
  yield all([
    weather(),
  ]);
};