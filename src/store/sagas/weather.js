import { delay, call, put, take, race } from 'redux-saga/effects';

import {
  startPolling,
  stopPolling,
} from '../actions';

function* weather(action) {
  const params = { ...action.params };
  let status = {
    inProgress: false,
    fetching: false,
    nextPollEta: null,
    retries: null,
    lastResponseStatus: null,
  };

  while(true) {
    status.inProgress = true;

    try {
      status.fetching = true;
      params.onStatusChange(status);

      const response = yield call(params.asyncFetch);

      status.fetching = false;
      status.nextPollEta = params.delay;

      const shouldContinue = params.callback(response, status);

      if (shouldContinue) {
        status.retries = 0;
        status.lastResponseStatus = 'success';
        params.onStatusChange(status);
      } else {
        params.onStatusChange(status);
        throw new Error('Error while fetching data.');
      }

      for (let i = 1; i <= params.delay; ++i) {
        yield delay(1000);
        status.nextPollEta = params.delay - i;
        params.onStatusChange(status);
      }
    } catch (e) {
      console.error(e);

      const shouldRetry = params.retryOnFailure && status.retries < params.stopAfterRetries;

      status.fetching = false;
      status.lastResponseStatus = 'error';
      status.nextPollEta = shouldRetry ? params.retryAfter : null;

      params.onStatusChange(status);
      params.callback(e, status);

      if (shouldRetry) {
        for (let i = 1; i <= params.retryAfter; ++i) {
          yield delay(1000);
          status.nextPollEta = params.retryAfter - i;
          params.onStatusChange(status);
        }

        ++status.retries;

        yield put(startPolling(params));
      } else {
        status.inProgress = false;
        params.onStatusChange(status);
        yield put(stopPolling());
      }
    }
  }
}

export default function* watchPollingTasks() {
  while(true) {
    const action = yield take(startPolling().type);
    yield race([
      call(weather, action),
      take(stopPolling().type),
    ]);
  }
}