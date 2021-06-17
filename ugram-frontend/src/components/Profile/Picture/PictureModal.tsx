import { Dialog, Box, Paper, TextField } from '@material-ui/core';
import CreatableSelect from 'react-select/creatable';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Picture, SelectionType } from '../../../Types';
import API from '../../../services/Api';
require('../../../styles/Profile/Picture/PictureModal.scoped.scss');

type Props = {
  visible: boolean;
  picture?: Picture;
  onClose: () => void;
  onPictureModified?: (e: Picture) => void;
};

const PictureModal: React.FC<Props> = ({
  visible,
  picture,
  onClose,
  onPictureModified,
}) => {
  const [description, setDescription] = useState(picture?.description ?? '');
  const [hashtags, setHashtags] = useState<SelectionType[]>([]);
  const [mentions, setMentions] = useState<SelectionType[]>([]);
  const [isShown, setIsShown] = useState(visible);
  const [usersArray, setUsersArray] = useState<SelectionType[]>([]);

  useEffect(() => {
    if (isShown) {
      return;
    }
    setDescription(picture?.description ?? '');
    setHashtags(generateSelectArray(picture?.hashtags));
    setMentions(generateSelectArray(picture?.mentions));
  }, [isShown, picture]);

  useEffect(() => {
    setIsShown(visible);
  }, [visible]);

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

  const generateSelectArray = (items?: string[]) => {
    if (!items) {
      return [];
    }

    return items.map<SelectionType>((item) => {
      return { label: item, value: item };
    });
  };

  const descriptionChanged = (value?: string) => {
    const newDescription = value ? value : '';
    setDescription(newDescription);
  };

  const onHashtagsChanged = (value: SelectionType[]) => {
    setHashtags(value);
  };

  const onMentionsChanged = (value: SelectionType[]) => {
    setMentions(value);
  };

  const arrayToValues = (newValue: SelectionType[]) => {
    return newValue.map((index) => index.label.trim());
  };

  const save = () => {
    if (picture && onPictureModified && hasChanged()) {
      const newTags = arrayToValues(hashtags);
      const newMentions = arrayToValues(mentions);
      const newDescription = description.trim() || ' ';

      const modified: Picture = {
        ...picture,
        description: newDescription,
        hashtags: newTags,
        mentions: newMentions,
      };
      onPictureModified(modified);
    }

    close();
  };

  const hasChanged = () => {
    return (
      picture &&
      (picture.hashtags !== arrayToValues(hashtags) ||
        picture.mentions !== arrayToValues(hashtags) ||
        picture.description !== description.trim())
    );
  };

  const close = () => {
    onClose();
  };

  const isValidNewValue = (inputValue, selectOptions) => {
    if (
      inputValue.trim().length === 0 ||
      selectOptions.find((option) => option.name === inputValue)
    ) {
      return false;
    }
    return true;
  };
  return (
    <Dialog
      className="picture-menu"
      onClose={close}
      aria-labelledby="show-picture-dialog-title"
      open={visible}
    >
      <Paper>
        <Box>
          <img
            className="picture-item"
            src={picture?.pictureUrl}
            alt={`${picture?.description}`}
          />
        </Box>
        <Box m={0} borderTop={1} borderColor={'#eeeeee'}>
          <Box m={1}>
            <Box mt={2}>
              <div className="subsection-label">Hashtags:</div>
              <CreatableSelect
                isMulti
                value={hashtags}
                onChange={onHashtagsChanged}
                options={[]}
                isValidNewOption={isValidNewValue}
              />
            </Box>
            <Box mt={2}>
              <div className="subsection-label">Mentions:</div>
              <Select
                isMulti
                options={usersArray}
                value={mentions}
                onChange={onMentionsChanged}
              />
            </Box>
            <Box mt={2}>
              <div className="subsection-label">Description:</div>
              <TextField
                rows={2}
                rowsMax={5}
                multiline={true}
                fullWidth={true}
                value={description}
                onChange={(e) => descriptionChanged(e.target.value)}
                variant="outlined"
              ></TextField>
            </Box>
          </Box>
        </Box>
        <Box className="button-container">
          <button onClick={save}>Save</button>
        </Box>
      </Paper>
    </Dialog>
  );
};

export default PictureModal;
