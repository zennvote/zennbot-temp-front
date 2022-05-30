import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import { Dashboard } from './layouts/Dashboard/Dashboard';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard">
          <Dashboard>
            <Switch>
              <Route path="/dashboard/songs">Test</Route>
            </Switch>
          </Dashboard>
        </Route>
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
