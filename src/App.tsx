import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import { useAuth } from './hooks/useAuth';
import { Dashboard } from './layouts/Dashboard/Dashboard';
import { Login } from './pages/login/Login';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  const { isLoggedIn, isLoggingIn, handleRefreshToken } = useAuth();

  useEffect(() => {
    handleRefreshToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard">
          <Dashboard>
            <Switch>
              {
                !isLoggingIn && !isLoggedIn && (
                  <Route path='*'>
                    <Redirect to='/login' />
                  </Route>
                )
              }
              <Route path="/dashboard" exact>
                <Redirect to='/dashboard/songs' />
              </Route>
              <Route path="/dashboard/songs">Songs Page</Route>
              <Route path="/dashboard/managers">Managers Page</Route>
              <Route path="/dashboard/settings">Settings Page</Route>
              <Route path='*'>
                <Redirect to='/not-found' />
              </Route>
            </Switch>
          </Dashboard>
        </Route>
        <Route path='/login' component={Login} exact />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
