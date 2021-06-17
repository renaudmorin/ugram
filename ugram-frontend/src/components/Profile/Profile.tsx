import React from 'react';
import ProfileBanner from './ProfileBanner';
import ProfileGallery from './ProfileGallery';
import UploadModal from './Upload/UploadModal';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorPage from '../Shared/Error/ErrorPage';
import API from '../../services/Api';
import { ProfileParamTypes, User } from '../../Types';
import { useAuth0 } from '@auth0/auth0-react';
require('../../styles/Profile/Profile.scoped.scss');

function Profile() {
  const [userInfo, setUserInfo] = useState<User>();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUploadWebcam, setShowUploadWebcam] = useState(false);
  const { username } = useParams<ProfileParamTypes>();
  const [validRoute, setValidRoute] = useState(true);
  const { user, isAuthenticated } = useAuth0();

  const openUploadModal = () => {
    setShowUploadModal((prev) => !prev);
  };

  const openUploadWebcamModal = () => {
    setShowUploadModal((prev) => !prev);
    setShowUploadWebcam((prev) => !prev);
  };

  useEffect(() => {
    const getUserByUsername = async () => {
      const userObject = await API.getUserByUsername(username);
      const isValidRoute =
        userObject?.username &&
        userObject.username.toLowerCase() === username.toLowerCase();
      setValidRoute(isValidRoute);

      if (isValidRoute) {
        setUserInfo(userObject);
      }
    };
    getUserByUsername();
  }, [username]);

  return (
    <div>
      {!validRoute && <ErrorPage></ErrorPage>}
      {validRoute && userInfo && (
        <div className="profile-container">
          <ProfileBanner user={userInfo} />
          {user && user.nickname === userInfo.username && isAuthenticated && (
            <div>
              <button className="showModalButton" onClick={openUploadModal}>
                Post a picture
              </button>
              <button
                className="showModalButton"
                onClick={openUploadWebcamModal}
              >
                Post using webcam
              </button>
            </div>
          )}
          <UploadModal
            user={userInfo}
            showUploadModal={showUploadModal}
            setShowUploadModal={setShowUploadModal}
            showUploadWebcam={showUploadWebcam}
            setShowUploadWebcam={setShowUploadWebcam}
          />
          <ProfileGallery user={userInfo} showUploadModal={showUploadModal} />
        </div>
      )}
    </div>
  );
}

export default Profile;
