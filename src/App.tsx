import React from 'react';
import { Route } from 'react-router-dom';

import Broadcast from './page/Broadcast/Broadcast';
import Dashboard from './page/Dashboard/Dashboard';
import Login from './page/Login/Login';

import './App.css';
import Register from './page/Register/Register';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Dashboard} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/broadcast" component={Broadcast} exact />
    </div>
  );
}

export default App;
