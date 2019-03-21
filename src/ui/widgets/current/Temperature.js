import React from 'react';
import { Paper } from '@material-ui/core';

import styles from './styles.module.scss';

export const TEMPERATURE_TYPES = {
  DEFAULT: 'temperature',
  INSIDE: 'inside',
  OUTSIDE: 'outside',
  DEW: 'dew',
};

const Temperature = (props) => {
  const { value, type = TEMPERATURE_TYPES.DEFAULT } = props;

  let title;

  switch (type) {
    case TEMPERATURE_TYPES.OUTSIDE:
      title = 'Outside temperature';
      break;
    case TEMPERATURE_TYPES.INSIDE:
      title = 'Inside temperature';
      break;
    case TEMPERATURE_TYPES.DEW:
      title = 'Dew point';
      break;
    default:
      title = 'Temperature';
  }

  return (
    <Paper>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </Paper>
  );
};

export default Temperature;