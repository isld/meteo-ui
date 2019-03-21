export const ACTIONS = {
  START_POLLING: 'start_polling',
  STOP_POLLING: 'stop_polling',
  UPDATE_POLLING_STATUS: 'update_polling_status',
  UPDATE_DATA: 'update_data',
};

export const startPolling = params => ({
  type: ACTIONS.START_POLLING,
  params,
});

export const stopPolling = params => ({
  type: ACTIONS.STOP_POLLING,
  params,
});

export const updatePollingStatus = status => ({
  type: ACTIONS.UPDATE_POLLING_STATUS,
  status,
});

export const updateData = data => ({
  type: ACTIONS.UPDATE_DATA,
  data,
});
