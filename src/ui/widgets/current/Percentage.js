import React from 'react';
import { Paper, Switch } from '@material-ui/core';

import styles from './styles.module.scss';

export const PERCENTAGE_TYPES = {
  DEFAULT: 'percentage',
  HUMIDITY: 'humidity',
};

const Percentage = (props) => {
  const { value, type = PERCENTAGE_TYPES.DEFAULT, enableSwitch = false } = props;

  let title;

  switch (type) {
    case PERCENTAGE_TYPES.HUMIDITY:
      title = 'Humidity';
      break;
    default:
      title = 'Percentage';
  }

  return (
    <Paper className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}%</div>
      {enableSwitch && (
        <div>
          <Switch />
        </div>
      )}
    </Paper>
  );
};

export default Percentage;