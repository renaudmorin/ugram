import React, { useState, useEffect } from 'react';
import {
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineSearch,
  AiOutlineBell,
} from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import SearchPicturesModal from './SearchBar/SearchPicturesModal';
import { SearchPictureParams, User, Notification } from '../../Types';
import * as queryString from 'querystring';
import API from '../../services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('../../styles/Navbar/Navbar.scoped.scss');

function Header() {
  const [userInfo, setUserInfo] = useState<User>();
  const { user, isAuthenticated } = useAuth0();
  const [
    isSearchPicturesModalVisible,
    setIsSearchPicturesModalVisible,
  ] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState(0);

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

  const notify = () => {
    toast.info('New notification!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  };

  const resetNotificationCount = async () => {
    if (userInfo !== undefined) {
      API.readUserNotifications(userInfo.id).then(() => {
        setNotificationCount(0);
      });
    }
  };

  const updateNotificationsCount = (notifications: Notification[]) => {
    setNotificationCount(
      notifications.filter((notification) => {
        return !notification.notificationRead;
      }).length,
    );
  };

  useEffect(() => {
    const getUserByUsername = async () => {
      const userObject = await API.getUserByUsername(user.nickname);
      setUserInfo(userObject);
      const getNotifications = async (userId: string) => {
        const notifications = await API.getNotificationsForUser(userId);
        updateNotificationsCount(notifications);
      };
      getNotifications(userObject.id);
    };
    getUserByUsername();
  }, [user]);

  useEffect(() => {
    if (userInfo !== undefined) {
      const eventSource = new EventSource(
        process.env.REACT_APP_BACKEND_ENDPOINT +
          '/users/notifications/' +
          userInfo?.id,
      );

      eventSource.onmessage = ({ data }) => {
        const isNewNotification = JSON.parse(data);
        if (isNewNotification['newNotifications']) {
          const getNotifications = async (userId: string) => {
            const notifications = await API.getNotificationsForUser(userId);
            updateNotificationsCount(notifications);
          };
          getNotifications(userInfo.id);
          notify();
        }
      };
    }
  }, [userInfo]);

  return (
    <nav className="Navbar">
      <div className="Title">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="" />
        </Link>
      </div>
      <div className="Search">
        <SearchBar />
      </div>
      <div className="Searchbar-Container">
        <div className="Search-Mobile">
          <SearchBar />
        </div>
        <ul className="Navbar-Icons">
          <li className="Navbar-Icon">
            <button className="PictureSearchButton" onClick={showSearch}>
              <AiOutlineSearch fontSize="2rem" color="white" />
            </button>
          </li>
          <li className="Navbar-Icon">
            <Link to="/">
              <AiOutlineHome fontSize="2rem" color="white" />
            </Link>
          </li>
          <li className="Navbar-Icon">
            <Link to="/discover">
              <AiOutlineCompass fontSize="2rem" color="white" />
            </Link>
          </li>
          <li className="NotificationIcon" onClick={resetNotificationCount}>
            <Link to="/notification">
              <AiOutlineBell fontSize="2rem" color="white" />
            </Link>
            {notificationCount > 0 && (
              <div className="icon-badge">{notificationCount}</div>
            )}
          </li>
          {isAuthenticated && (
            <li className="Navbar-Icon">
              <Link to={'/users/' + user.nickname}>
                <CgProfile fontSize="2rem" color="white" />
              </Link>
            </li>
          )}
          <li className="Navbar-Icon">
            <LogoutButton />
          </li>
        </ul>
      </div>
      <SearchPicturesModal
        visible={isSearchPicturesModalVisible}
        onClose={onSearchPicturesModalClosed}
      />
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnHover
        pauseOnFocusLoss
        closeButton
        onClick={() => {
          history.push('/notification');
          resetNotificationCount();
        }}
      />
    </nav>
  );
}
export default Header;
