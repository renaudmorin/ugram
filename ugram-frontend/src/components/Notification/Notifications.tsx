import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Notification } from '../../Types';
import NotificationBox from '../Shared/Error/NotificationBox/NotificationBox';
import API from '../../services/Api';
import { NotificationProps } from '../../Types';
require('../../styles/Notification/Notifications.scoped.scss');

const Notifications: React.FC<NotificationProps> = ({
  id,
}: NotificationProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotifications = async (userId: string) => {
    const UserNotifications = await API.getNotificationsForUser(userId);
    setNotifications(UserNotifications);
  };

  const location = useLocation();

  useEffect(() => {
    getNotifications(id);
  }, [location, id]);

  return (
    <div className="notifications_container">
      <h1>Notifications</h1>
      {notifications
        .slice(0)
        .reverse()
        .map((notification, i) => {
          return (
            <div className="notificationbox_container" key={i}>
              <NotificationBox
                pictureUrl={notification.pictureLink}
                notificationUsername={notification.notificationUsername}
                notificationDate={notification.notificationDate}
                notificationRead={notification.notificationRead}
                notificationType={notification.notificationType}
              ></NotificationBox>
            </div>
          );
        })}
    </div>
  );
};

export default Notifications;
