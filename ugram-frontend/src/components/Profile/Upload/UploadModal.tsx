import React from 'react';
import Upload from './Upload';
import { Dialog, Box, Paper } from '@material-ui/core';
import { UploadModalProps } from '../../../Types';
require('../../../styles/Profile/Upload/UploadModal.scoped.scss');

function UploadModal({
  user,
  showUploadModal,
  setShowUploadModal,
  showUploadWebcam,
  setShowUploadWebcam,
}: UploadModalProps) {
  const close = () => {
    setShowUploadModal(false);
    setShowUploadWebcam(false);
  };
  return (
    <div className="uploadModal">
      <Dialog
        onClose={close}
        aria-labelledby="show-picture-dialog-title"
        open={showUploadModal}
      >
        <Paper>
          <Box m={0} borderTop={1} borderColor={'#eeeeee'}>
            <Box m={1}>
              <Upload
                user={user}
                setShowUploadModal={setShowUploadModal}
                showUploadWebcam={showUploadWebcam}
                setShowUploadWebcam={setShowUploadWebcam}
              />
            </Box>
          </Box>
        </Paper>
      </Dialog>
    </div>
  );
}

export default UploadModal;
