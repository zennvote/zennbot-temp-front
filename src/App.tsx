import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { useAuth } from 'src/hooks/useAuth';

import { Dashboard } from 'src/layouts/Dashboard/Dashboard';

import { Song } from 'src/pages/dashboard/songs/Song';
import { Login } from 'src/pages/login/Login';
import { Register } from './pages/register/Register';
import { NotFound } from 'src/pages/NotFound/NotFound';
import { Broadcast } from 'src/pages/broadcast/Broadcast';

import './App.css';
import { Attendances } from './pages/dashboard/attendances/Attendances';
import { Managers } from './pages/dashboard/managers/Managers';
import { Accounts } from './pages/dashboard/accounts/Accounts';

function App() {
  const { isLoggedIn, isLoggingIn, handleRefreshToken } = useAuth();

  useEffect(() => {
    handleRefreshToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggingIn) {
    return <div className="app" />
  }

  return (
    <div className="App">
      <Switch>
        <Route path='/broadcast' component={Broadcast} exact />
        <Route path="/dashboard">
          <Dashboard>
            <Switch>
              {
                !isLoggedIn && (
                  <Route path='*'>
                    <Redirect to='/login' />
                  </Route>
                )
              }
              <Route path="/dashboard" exact>
                <Redirect to='/dashboard/songs' />
              </Route>
              <Route path="/dashboard/songs" component={Song} />
              <Route path="/dashboard/attendances" component={Attendances} />
              <Route path="/dashboard/managers" component={Managers} />
              <Route path="/dashboard/accounts" component={Accounts} />
              <Route path="/dashboard/settings">Settings Page</Route>
              <Route path='*'>
                <Redirect to='/not-found' />
              </Route>
            </Switch>
          </Dashboard>
        </Route>
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
