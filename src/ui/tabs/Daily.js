import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import { FtoC } from '../helpers.js';

import { Temperature as TempChart } from '../charts';
import Temperature, { TEMPERATURE_TYPES } from "../widgets/current/Temperature";
import Percentage, { PERCENTAGE_TYPES } from "../widgets/current/Percentage";

const Daily = props => {
  const { data } = props;

  if (!data) return 'Loading...';

  const current = data[data.length - 1];

  return (
    <div>
      <Grid container spacing={16} direction="column">
        <Grid item xs>
          <Grid container spacing={16} justify="space-between">
            <Grid item xs={3}>
              <Temperature
                value={FtoC(current.outTemp).toFixed(1)}
                type={TEMPERATURE_TYPES.OUTSIDE}
              />
            </Grid>
            <Grid item xs={3}>
              <Temperature
                value={FtoC(current.inTemp).toFixed(1)}
                type={TEMPERATURE_TYPES.INSIDE}
                enableSwitch={true}
              />
            </Grid>
            <Grid item xs={3}>
              <Temperature
                value={FtoC(current.windchill).toFixed(1)}
                type={TEMPERATURE_TYPES.WIND}
                enableSwitch={true}
              />
            </Grid>
            <Grid item xs={3}>
              <Percentage
                value={current.outHumidity.toFixed(1)}
                type={PERCENTAGE_TYPES.HUMIDITY}
                enableSwitch={true}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <TempChart data={data} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ weather }) => ({
  data: weather.data,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Daily);
