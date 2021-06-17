import React from 'react';
import { useState } from 'react';
import API from '../../../services/Api';
import { useRef } from 'react';
import { useEffect } from 'react';
import Userbox from '../../Shared/Error/Userbox/Userbox';
import { User } from '../../../Types';
require('../../../styles/Navbar/Searchbar/SearchBar.scoped.scss');

function SearchBar() {
  const [display, setDisplay] = useState(true);
  const [username, setUsername] = useState<User[]>([]);
  const domAccessor = useRef<HTMLDivElement>(null);

  const getUser = async (searchChar: string) => {
    const user = await API.searchUsers(searchChar);
    setUsername(user);
  };

  const actionsOnEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() !== '') {
      getUser(event.target.value);
      event.target.value === '' ? setDisplay(false) : setDisplay(true);
    }
  };

  const handleClickOutside = (event: Event) => {
    if (
      domAccessor.current &&
      !domAccessor.current.contains(event.target as Node)
    ) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside, true);
    return () => {
      window.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="autocomplete">
      <input
        className="searchbar"
        type="Search"
        onChange={(event) => actionsOnEvent(event)}
        placeholder="Search"
      />
      <div ref={domAccessor} className="autoContainer">
        {display &&
          username.map((user, i) => {
            return (
              <Userbox
                profilePictureUrl={user.profilePictureUrl}
                username={user.username}
                name={user.name}
                key={i}
              ></Userbox>
            );
          })}
      </div>
    </div>
  );
}

export default SearchBar;
