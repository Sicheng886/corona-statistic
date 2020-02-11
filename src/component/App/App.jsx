import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import styles from './App.module.css';
import Dashboard from '../Dashboard/Dashboard';
import DetailPage from '../DetailPage/DetailPage';
import TabBar from '../TabBar/TabBar';

const App = () => {
  return (
    <div className={styles.container}>
      <TabBar />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/detail' component={DetailPage} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
