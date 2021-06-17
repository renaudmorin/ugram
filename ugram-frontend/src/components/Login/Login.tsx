import React from 'react';
import LoginButton from '../Navbar/LoginButton';
import { SiAuth0 } from 'react-icons/si';
import FadeIn from 'react-fade-in';
require('../../styles/Login/Login.scoped.scss');

function Login() {
  return (
    <div className="LoginPage">
      <FadeIn transitionDuration={2000}>
        <div className="LoginWelcome">
          <h1 className="LoginWelcomeText">Welcome to </h1>
          <div className="LoginLogo">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="" />
          </div>
        </div>
      </FadeIn>
      <div className="LoginBoxContainer">
        <div className="LoginTitle">
          <h2>Log in or sign up</h2>
        </div>
        <SiAuth0 fontSize="4rem" color="grey" />
        <div className="LoginButton">
          <LoginButton></LoginButton>
        </div>
      </div>
      <div className="LoginFooter">
        <h6>
          &#169; 2021 Ugram | Équipe 6
          <br />
          GLO-3112 - Développement avancé d&apos;applications Web
          <br />
          Université Laval
        </h6>
      </div>
    </div>
  );
}

export default Login;
