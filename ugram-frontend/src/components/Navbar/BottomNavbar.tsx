import React, { useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineSearch,
} from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { Link, useHistory } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { SearchPictureParams } from '../../Types';
import queryString from 'querystring';
import SearchPicturesModal from './SearchBar/SearchPicturesModal';
require('../../styles/Navbar/BottomNavbar.scoped.scss');

function BottomNavbar() {
  const { user, isAuthenticated } = useAuth0();

  const [
    isSearchPicturesModalVisible,
    setIsSearchPicturesModalVisible,
  ] = useState<boolean>(false);

  const history = useHistory();

  const showSearch = () => {
    setIsSearchPicturesModalVisible(true);
  };

  const onSearchPicturesModalClosed = (searchParams?: SearchPictureParams) => {
    setIsSearchPicturesModalVisible(false);
    if (searchParams) {
      const searchQuery = queryString.stringify(searchParams);
      const url = searchQuery ? `/searchpictures?${searchQuery}` : '/';
      history.push(url);
    }
  };

  return (
    <nav className="BottomNavbar">
      <ul className="customNav">
        <li className="Icon">
          <button className="PictureSearchButton" onClick={showSearch}>
            <AiOutlineSearch fontSize="2rem" color="white" />
          </button>
        </li>
        <li className="Icon">
          <Link to="/">
            <AiOutlineHome fontSize="2rem" color="white" />
          </Link>
        </li>
        <li className="Icon">
          <Link to="/discover">
            <AiOutlineCompass fontSize="2rem" color="white" />
          </Link>
        </li>
        {isAuthenticated && (
          <li className="Icon">
            <Link to={'/users/' + user.nickname}>
              <CgProfile fontSize="2rem" color="white" />
            </Link>
          </li>
        )}
        <li>
          <LogoutButton />
        </li>
      </ul>
      <SearchPicturesModal
        visible={isSearchPicturesModalVisible}
        onClose={onSearchPicturesModalClosed}
      />
    </nav>
  );
}
export default BottomNavbar;
