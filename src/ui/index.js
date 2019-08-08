import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { startPolling, stopPolling, updatePollingStatus, updateData } from '../store/actions';

import Header from './header';
import { Daily, Weekly, Monthly, Yearly, Camera } from './tabs';

import styles from './styles.module.scss';

class Main extends Component {
  fetchData = () => (axios.get('http://localhost:8088/api/weatherstation/current'));

  handleData = response => {
    if (response) {
      this.props.updateData(response.data);
      return true;
    }

    return false;
  };

  handleStatusChange = status => {
    this.props.updatePollingStatus(status);
  };

  startPolling = () => {
    this.props.startPolling({
      asyncFetch: this.fetchData,
      callback: this.handleData,
      onStatusChange: this.handleStatusChange,
      delay: this.delay || 10,
      retryOnFailure: true,
      retryAfter: 5,
      stopAfterRetries: 2,
    });
  };

  stopPolling = () => {
    this.props.updatePollingStatus({});
    this.props.stopPolling();
  };

  componentDidMount() {
    this.startPolling();
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className={styles.main}>
            <Switch>
              <Route exact path="/" render={() => (<Daily />)}/>
              <Route path="/weekly" render={() => (<Weekly />)}/>
              <Route path="/monthly" render={() => (<Monthly />)}/>
              <Route path="/yearly" render={() => (<Yearly />)}/>
              <Route path="/camera" render={() => (<Camera />)}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ data, pollingStatus }) => ({
  data,
  ...pollingStatus,
});

const mapDispatchToProps = dispatch => ({
  startPolling: params => dispatch(startPolling(params)),
  stopPolling: () => dispatch(stopPolling()),
  updatePollingStatus: status => dispatch(updatePollingStatus(status)),
  updateData: data => dispatch(updateData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
