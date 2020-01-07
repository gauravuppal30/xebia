import React, { useState } from 'react';

import Header from './component/Header/header';
import RoutingContainer from './component/RoutingContainer/routing-container';
import Login from './component/Login/login';

export default function App() {

  const [user, setUser] = useState(sessionStorage.getItem('logged in'));
  const [validUser , setValidUser] = useState(user ? true : false);

  const authencatedUser = (username) => {
    sessionStorage.setItem('logged in', username);
    setUser(sessionStorage.getItem('logged in'));
    username ? setValidUser(true) : setValidUser(false);
  }
  //console.log('validd',validUser,user);
  const loggedIn = !validUser ?
    <Login authencatedUser={authencatedUser} /> : <RoutingContainer authencatedUser={authencatedUser} />;
  return (
    <div className="app container-fluid">
      <div className="row">
        <Header />
        {loggedIn}
      </div>
    </div>
  );
}
