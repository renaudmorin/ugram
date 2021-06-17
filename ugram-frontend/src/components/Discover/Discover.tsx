import React, { useEffect, useState } from 'react';
import API from '../../services/Api';
import Userbox from '../Shared/Error/Userbox/Userbox';
import { User } from '../../Types';
require('../../styles/Discover/Discover.scoped.scss');

function Discover() {
  const [users, setUsers] = useState<User[]>([]);

  const getAllUsers = async () => {
    const users = await API.getAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="discover_container">
      <h1>Discover other users !</h1>
      {users.map((user, i) => {
        return (
          <div className="userbox_container" key={i}>
            <Userbox
              profilePictureUrl={user.profilePictureUrl}
              username={user.username}
              name={user.name}
            ></Userbox>
          </div>
        );
      })}
    </div>
  );
}

export default Discover;
