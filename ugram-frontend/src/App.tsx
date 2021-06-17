import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Edit from './components/Profile/Edit/Edit';
import Feed from './components/Feed/Feed';
import Login from './components/Login/Login';
import Notification from './components/Notification/Notifications';
import API from './services/Api';
import Discover from './components/Discover/Discover';
import BottomNavbar from './components/Navbar/BottomNavbar';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ErrorPage from './components/Shared/Error/ErrorPage';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { User, Auth0User } from '../src/Types';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentUserInformations, setCurrentUserInformations] = useState({
    id: '',
    profilePictureUrl: '',
    username: '',
    name: '',
    email: '',
    phoneNumber: '',
    registrationDate: '',
  });

  useEffect(() => {
    const createUser = async (user: Auth0User) => {
      const userExists = await API.checkUserExists(user.nickname);
      if (!userExists) {
        await API.createUser(
          user.picture,
          user.nickname,
          user.name,
          user.email,
          '',
        );
      }
      const userObject: User = await API.getUserByUsername(user.nickname);
      setCurrentUserInformations(userObject);
    };
    if (user && isAuthenticated) {
      createUser(user);
    }
  }, [user, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="Loading">
        <img src={process.env.PUBLIC_URL + '/loading.gif'} alt="Loading...." />
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <Router>
        <div className="loginPage">
          <Route path="*">
            <Login></Login>
          </Route>
        </div>
      </Router>
    );
  }
  return (
    <Router>
      <div className="App">
        <Header />
        <BottomNavbar />
        <ReactNotification />
        <Switch>
          <Route
            exact
            path="/accounts/edit"
            component={() => (
              <Edit
                id={currentUserInformations.id}
                profilePictureUrl={currentUserInformations.profilePictureUrl}
                username={currentUserInformations.username}
                name={currentUserInformations.name}
                email={currentUserInformations.email}
                phoneNumber={currentUserInformations.phoneNumber}
                registrationDate={currentUserInformations.registrationDate}
              />
            )}
          />
          <Route exact path="/discover">
            <Discover />
          </Route>
          <Route
            exact
            path="/notification"
            component={() => <Notification id={currentUserInformations.id} />}
          />
          <Route path="/users/:username">
            <Profile />
          </Route>
          <Route exact path="/">
            <Feed />
          </Route>
          <Route exact path="/searchpictures">
            <Feed />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
