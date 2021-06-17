import React from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { MdPhoneIphone } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { User } from '../../Types';
import { useAuth0 } from '@auth0/auth0-react';
require('../../styles/Profile/ProfileBanner.scoped.scss');

function ProfileBanner(User: { user: User }) {
  const { user, isAuthenticated } = useAuth0();
  const userInfo = User['user'];
  const registrationDate = new Date(
    userInfo.registrationDate,
  ).toLocaleDateString();
  return (
    <div className="profile_info_container">
      <div className="profile_info">
        <div className="profile-picture">
          <img src={userInfo.profilePictureUrl} alt="profile" />
        </div>
        <div className="profile-username">
          <div className="username_container">
            <h4>{userInfo.username}</h4>
            {user && user.nickname === userInfo.username && isAuthenticated && (
              <div className="edit-profile-box">
                <a href="/accounts/edit" className="edit-profile-link">
                  Edit Profile
                </a>
              </div>
            )}
          </div>
          <div className="profile-name">
            <span>{userInfo.name}</span>
          </div>
          <div className="user_info">
            <div className="user_info_row">
              <span className="user_info_icon">
                <HiOutlineMailOpen fontSize="1rem" />
              </span>
              <span>{userInfo.email}</span>
            </div>
            <div className="user_info_row">
              <span className="user_info_icon">
                <MdPhoneIphone fontSize="1rem" />
              </span>
              <span>{userInfo.phoneNumber}</span>
            </div>
            <div className="user_info_row">
              <span className="user_info_icon">
                <FaRegCalendarAlt fontSize="1rem" />
              </span>
              <span>{registrationDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileBanner;
