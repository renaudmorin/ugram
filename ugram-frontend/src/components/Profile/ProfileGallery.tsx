import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Picture, User } from '../../Types';
import API from '../../services/Api';
import Aws from '../../services/Aws';
import PictureModal from './Picture/PictureModal';
import PictureModalVisit from './Picture/PictureModalVisit';
import CancelIcon from '@material-ui/icons/ClearTwoTone';
import Confirm from './Dialogs/Confirm';
import { useAuth0 } from '@auth0/auth0-react';
require('../../styles/Profile/ProfileGallery.scoped.scss');

function ProfileGallery(User: { user: User; showUploadModal: boolean }) {
  const userInfo = User['user'];
  const { REACT_APP_SERVERLESS_IMAGE_HANDLER_BASE_URL } = process.env;
  const showUploadModal = User['showUploadModal'];
  const [pictureData, setPictureData] = useState<Picture[]>([]);
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
  const [pictureToDelete, setPictureToDelete] = useState<Picture>();
  const [isPictureModalVisible, setIsPictureModalVisible] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState<Picture>();
  const { user, isAuthenticated } = useAuth0();

  const onPictureClicked = (picture: Picture) => {
    picture.pictureUrl = getResizedImageUrl(picture.pictureUrl, '436x436');
    setSelectedPicture(picture);
    setIsPictureModalVisible(true);
  };

  const onPictureModalClosed = () => {
    setIsPictureModalVisible(false);
  };

  const getResizedImageUrl = (url: string, newSize: string) => {
    const start = url.lastIndexOf('/');
    const filename = url.substring(start + 1, url.length);
    return `${REACT_APP_SERVERLESS_IMAGE_HANDLER_BASE_URL}/fit-in/${newSize}/${userInfo.username}/${filename}`;
  };

  const onPictureModified = async (modifiedPicture: Picture) => {
    await API.updatePicture(modifiedPicture);

    const index = pictureData.findIndex((p) => p.id === modifiedPicture.id);
    const updatedColl = [...pictureData];
    updatedColl.splice(index, 1, modifiedPicture);
    setPictureData(updatedColl);
  };

  const deleteImage = (picture: Picture) => {
    setIsConfirmDeleteVisible(true);
    setPictureToDelete(picture);
  };

  const handleConfirmDelete = async (value: boolean) => {
    setIsConfirmDeleteVisible(false);

    if (value && pictureToDelete) {
      await API.deletePicture(pictureToDelete.id);
      await API.deleteAllNotificationsByPictureId(pictureToDelete.id);
      await Aws.deleteImage(userInfo.username, pictureToDelete.pictureUrl);
      const filtered = pictureData.filter((p) => p.id !== pictureToDelete.id);
      setPictureData(filtered);
    }
  };

  useEffect(() => {
    const getProfilePictures = async () => {
      const profilePictureArray = await API.getProfilePicturesByUserId(
        userInfo.id,
      );
      const profilePictureArrayCopy = profilePictureArray.slice();
      function custom_sort(a: Picture, b: Picture) {
        return (
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
        );
      }
      profilePictureArrayCopy.sort(custom_sort);
      setPictureData(profilePictureArrayCopy);
    };
    getProfilePictures();
  }, [user, userInfo.id, showUploadModal]);

  return (
    <div className="gallery">
      {pictureData.map((data, i) => {
        return (
          <div key={i} className="image-container">
            <img
              className="item"
              src={getResizedImageUrl(data.pictureUrl, '293x293')}
              alt=""
              onClick={() => onPictureClicked(data)}
            />
            <div className="deleteOverlay">
              {user && user.nickname === userInfo.username && isAuthenticated && (
                <IconButton size="small" onClick={() => deleteImage(data)}>
                  <CancelIcon />
                </IconButton>
              )}
            </div>
          </div>
        );
      })}
      <Confirm
        visible={isConfirmDeleteVisible}
        text="Do you really want to delete this picture ?"
        onClose={handleConfirmDelete}
      />
      {user && user.nickname === userInfo.username && isAuthenticated && (
        <PictureModal
          visible={isPictureModalVisible}
          onClose={onPictureModalClosed}
          picture={selectedPicture}
          onPictureModified={onPictureModified}
        />
      )}
      {user && user.nickname !== userInfo.username && isAuthenticated && (
        <PictureModalVisit
          visible={isPictureModalVisible}
          onClose={onPictureModalClosed}
          picture={selectedPicture}
          onPictureModified={onPictureModified}
        />
      )}
    </div>
  );
}

export default ProfileGallery;
