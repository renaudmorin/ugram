import React from 'react';
import ImageUploader from 'react-images-upload';
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Dialog, Box, Paper, TextField } from '@material-ui/core';
import Aws from '../../../services/Aws';
import API from '../../../services/Api';
import { UploadProps, SelectionType, Comment } from '../../../Types';
import { useEffect } from 'react';
import Camera from 'react-html5-camera-photo';
import ImagePreview from './ImagePreview';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-html5-camera-photo/build/css/index.css';
import { makeStyles } from '@material-ui/core/styles';
require('../../../styles/Profile/Upload/Upload.scoped.scss');

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Upload({
  user,
  setShowUploadModal,
  showUploadWebcam,
  setShowUploadWebcam,
}: UploadProps) {
  const classes = useStyles();
  const userId: string = user.id;
  const username: string = user.username;
  const [uploadedPictureFile, setUploadedPicture] = useState<File | null>(null);
  const [hashtagArray, setHashtagArray] = useState<SelectionType[]>([]);
  const [mentionArray, setMentionArray] = useState<SelectionType[]>([]);
  const [usersArray, setUsersArray] = useState<SelectionType[]>([]);
  const [description, setDescription] = useState<string>('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorWebcamModal, setShowErrorWebcamModal] = useState(false);
  const [dataUri, setDataUri] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const isValidNewValue = (inputValue, selectOptions) => {
    if (
      inputValue.trim().length === 0 ||
      selectOptions.find((option) => option.name === inputValue)
    ) {
      return false;
    }
    return true;
  };

  const handleHashtagChange = (newValue: SelectionType[]) => {
    setHashtagArray(newValue);
  };

  const handleMentionChange = (newValue: SelectionType[]) => {
    setMentionArray(newValue);
  };

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription.target.value);
  };

  const handlePictureChange = (picture) => {
    if (picture.length === 0) {
      picture = null;
    }
    setUploadedPicture(picture);
  };

  const handleTakePhotoAnimationDone = (dataUri: string) => {
    setDataUri(dataUri);
  };

  const handleCameraError = () => {
    setShowErrorWebcamModal(true);
    setShowUploadWebcam(false);
  };

  const arrayToValues = (array: SelectionType[]) => {
    const filteredArray: string[] = array.map((index) => index.value.trim());
    return filteredArray;
  };
  const close = () => {
    setShowErrorModal(false);
    setShowErrorWebcamModal(false);
  };

  const handleUploadToS3 = async () => {
    if (!uploadedPictureFile || uploadedPictureFile === null) {
      setShowUploadModal(true);
      setShowErrorModal(true);
      return;
    }
    setShowLoading(true);
    const filteredHashTagArray = arrayToValues(hashtagArray);
    const filteredMentionArray = arrayToValues(mentionArray);
    const picInfo = await Aws.uploadImage(username, uploadedPictureFile[0]);
    const pictureUrl = picInfo.location.replace(/\s/g, '+');
    const pictureDate: Date = new Date(Date.now());
    const likes: string[] = [];
    const comments: Comment[] = [];
    let pictureDescription = ' ';
    if (description.trim()) {
      pictureDescription = description;
    }
    await API.postPicture(
      pictureUrl,
      userId,
      pictureDescription,
      filteredHashTagArray,
      filteredMentionArray,
      pictureDate.toISOString(),
      likes,
      comments,
    ).then(() => {
      setShowLoading(false);
      setShowUploadModal(false);
      setShowUploadWebcam(false);
    });
  };

  const handleWebcamUploadToS3 = async () => {
    if (!dataUri || dataUri === null) {
      setShowErrorModal(true);
      setShowUploadWebcam(true);
      return;
    }
    setShowLoading(true);
    const filteredHashTagArray = arrayToValues(hashtagArray);
    const filteredMentionArray = arrayToValues(mentionArray);
    const location = await Aws.uploadWebcamImage(username, dataUri);
    const pictureDate: Date = new Date(Date.now());
    const pictureUrl = location.replace(/\s/g, '+');
    const likes: string[] = [];
    const comments: Comment[] = [];
    let pictureDescription = ' ';
    if (description.trim()) {
      pictureDescription = description;
    }
    await API.postPicture(
      pictureUrl,
      userId,
      pictureDescription,
      filteredHashTagArray,
      filteredMentionArray,
      pictureDate.toISOString(),
      likes,
      comments,
    ).then(() => {
      setShowLoading(false);
      setShowUploadModal(false);
      setShowUploadWebcam(false);
    });
  };

  useEffect(() => {
    const getUserObjectArray = async () => {
      const usersObjectArray = await API.getAllUsers();
      const mentionArray: SelectionType[] = [];
      for (const user of usersObjectArray) {
        const userSelectionType = {
          label: user.username,
          value: user.username,
        };
        mentionArray.push(userSelectionType);
      }
      setUsersArray(mentionArray);
    };
    getUserObjectArray();
  }, []);

  return (
    <div className="uploadContainer">
      <div className="imageUploader">
        {!showUploadWebcam && (
          <ImageUploader
            withIcon={false}
            buttonText="Choose image"
            onChange={handlePictureChange}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
            withPreview={true}
            fileSizeError={' file size is too big'}
            fileTypeError={'is not supported file extension'}
            singleImage={true}
          />
        )}
        {showUploadWebcam &&
          (dataUri ? (
            <ImagePreview dataUri={dataUri} isFullScreen={false} />
          ) : (
            <Camera
              onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
              isFullscreen={false}
              onCameraError={() => {
                handleCameraError();
              }}
            />
          ))}
      </div>
      <div className="inputContainer">
        <div className="input-title">Hashtags:</div>
        <div className="input-hashtag">
          <CreatableSelect
            isMulti
            onChange={handleHashtagChange}
            options={hashtagArray}
            isValidNewOption={isValidNewValue}
          />
        </div>
        <div className="input-mentions">
          <div className="input-title">Mentions:</div>
          <Select
            isMulti
            options={usersArray}
            onChange={handleMentionChange}
            className="mention-select"
          />
        </div>
        <div className="input-description">
          <div className="input-title">Description:</div>
          <TextField
            label="Enter Description"
            id="outlined-basic"
            variant="outlined"
            onChange={handleDescriptionChange}
            multiline
            fullWidth
          />
        </div>
      </div>
      {!showUploadWebcam && (
        <button className="postButton" onClick={handleUploadToS3}>
          Post
        </button>
      )}
      {showUploadWebcam && (
        <button className="postButton" onClick={handleWebcamUploadToS3}>
          Post
        </button>
      )}
      <Dialog
        onClose={close}
        aria-labelledby="show-picture-dialog-title"
        open={showErrorModal}
      >
        <Paper>
          <Box m={0} borderTop={1} borderColor={'#eeeeee'}>
            <Box m={1}>Photo Required!</Box>
          </Box>
        </Paper>
      </Dialog>
      <Dialog
        onClose={close}
        aria-labelledby="show-picture-dialog-title"
        open={showErrorWebcamModal}
      >
        <Paper>
          <Box m={0} borderTop={1} borderColor={'#eeeeee'}>
            <Box m={1}>Cannot Access Webcam!</Box>
          </Box>
        </Paper>
      </Dialog>
      <Backdrop className={classes.backdrop} open={showLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Upload;
