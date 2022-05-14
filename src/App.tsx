import React from 'react';
import { Route } from 'react-router-dom';

import Broadcast from './page/Broadcast/Broadcast';
import Dashboard from './page/Dashboard/Dashboard';
import Login from './page/Login/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Dashboard} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/broadcast" component={Broadcast} exact />
    </div>
  );
}

export default App;
