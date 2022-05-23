import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import { Dashboard } from './layouts/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Route path="/dashboard" component={Dashboard} exact />
    </div>
  );
}

export default App;
