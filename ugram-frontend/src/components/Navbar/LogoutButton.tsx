import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated && (
        <Link to="#" onClick={() => logout()}>
          <FiLogOut fontSize="2rem" color="white" />
        </Link>
      )}
    </div>
  );
}

export default LogoutButton;
