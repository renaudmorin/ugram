import { Dialog, DialogTitle, Button } from '@material-ui/core';
import React from 'react';

type Props = {
  visible: boolean;
  text: string;
  onClose: (result: boolean) => void;
};

const PictureModal: React.FC<Props> = ({ visible, text, onClose }) => {
  const closeOk = () => {
    onClose(true);
  };

  const closeCancel = () => {
    onClose(false);
  };

  return (
    <Dialog aria-labelledby="show-confirm-dialog-title" open={visible}>
      <DialogTitle>{text}</DialogTitle>
      <Button onClick={closeOk}>Yes</Button>
      <Button onClick={closeCancel}>No</Button>
    </Dialog>
  );
};

export default PictureModal;
