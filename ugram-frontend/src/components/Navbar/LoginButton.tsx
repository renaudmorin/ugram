import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const loginHandler = () => {
    loginWithRedirect();
  };

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginHandler()}>Log in / Sign up</button>
      )}
    </div>
  );
}

export default LoginButton;
