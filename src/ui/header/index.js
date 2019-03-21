import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@material-ui/core';

const Header = () => (
  <AppBar position="static">
    <Tabs
      value={location.pathname} // eslint-disable-line
      variant="fullWidth"
    >
      <Tab component={Link} value="/" to="/" label="Daily" />
      <Tab component={Link} value="/weekly" to="/weekly" label="Weekly" />
      <Tab component={Link} value="/monthly" to="/monthly" label="Monthly" />
      <Tab component={Link} value="/yearly" to="/yearly" label={new Date().getFullYear()} />
      <Tab component={Link} value="/camera" to="/camera" label="Camera" />
    </Tabs>
  </AppBar>
);

export default Header;
