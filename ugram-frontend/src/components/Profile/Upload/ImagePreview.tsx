import React from 'react';
import { ImagePreviewProps } from '../../../Types';
require('../../../styles/Profile/Upload/ImagePreview.scoped.scss');

const ImagePreview = ({ dataUri, isFullScreen }: ImagePreviewProps) => {
  const classNameFullscreen = isFullScreen
    ? 'demo-image-preview-fullscreen'
    : '';

  return (
    <div className={'demo-image-preview ' + classNameFullscreen}>
      <img src={dataUri} />
    </div>
  );
};

export default ImagePreview;
