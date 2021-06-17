import React from 'react';
import { Link } from 'react-router-dom';
require('../../../../styles/Shared/Error/NotificationBox/NotificationBox.scoped.scss');

type notificationBoxProps = {
  pictureUrl: string;
  notificationUsername: string;
  notificationDate: Date;
  notificationRead: boolean;
  notificationType: string;
};

function Userbox(props: notificationBoxProps) {
  return (
    <div className="notification">
      <div className="notification_container">
        <span className="notification_picture">
          <img src={props.pictureUrl} alt="" />
        </span>
      </div>
      <div className="notification_text">
        <div className="notification_username">
          <Link to={'/users/' + props.notificationUsername}>
            {props.notificationUsername}
          </Link>
        </div>
        <div className="notification_description">
          has{' '}
          {props.notificationType == 'comment' ? 'commented on' : 'reacted to'}{' '}
          your picture
        </div>
      </div>
    </div>
  );
}
export default Userbox;
