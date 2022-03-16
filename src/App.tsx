import React from 'react';
import './App.css';
import Broadcast from './page/Broadcast/Broadcast';
import Dashboard from './page/Dashboard/Dashboard';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Dashboard} exact />
      <Route path="/broadcast" component={Broadcast} exact />
    </div>
  );
}

export default App;
