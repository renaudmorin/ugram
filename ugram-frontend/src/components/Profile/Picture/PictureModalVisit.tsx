import { Dialog, Box, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Picture, SelectionType } from '../../../Types';
require('../../../styles/Profile/Picture/PictureModalVisit.scoped.scss');

type Props = {
  visible: boolean;
  picture?: Picture;
  onClose: () => void;
  onPictureModified?: (e: Picture) => void;
};

const PictureModalVisit: React.FC<Props> = ({ visible, picture, onClose }) => {
  const [description, setDescription] = useState(picture?.description ?? '');
  const [hashtags, setHashtags] = useState<SelectionType[]>([]);
  const [mentions, setMentions] = useState<SelectionType[]>([]);
  const [isShown, setIsShown] = useState(visible);

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

  const generateSelectArray = (items?: string[]) => {
    if (!items) {
      return [];
    }

    return items.map<SelectionType>((item) => {
      return { label: item, value: item };
    });
  };

  const close = () => {
    onClose();
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
              {hashtags.map((listitem) => (
                <h5 className="picture-label" key={listitem.label}>
                  #{listitem.value} &nbsp;
                </h5>
              ))}
            </Box>
            <Box mt={2}>
              <div className="subsection-label">Mentions:</div>
              {mentions.map((listitem) => (
                <h5 className="picture-label" key={listitem.label}>
                  @{listitem.value} &nbsp;
                </h5>
              ))}
            </Box>
            <Box mt={2}>
              <div className="subsection-label">Description:</div>
              <p className="picture-desciption">{description}</p>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Dialog>
  );
};

export default PictureModalVisit;
