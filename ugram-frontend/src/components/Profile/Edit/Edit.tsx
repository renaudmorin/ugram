import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import API from '../../../services/Api';
import { store } from 'react-notifications-component';
import { ApiError } from '../../../Types';
import { useAuth0 } from '@auth0/auth0-react';
import Aws from '../../../services/Aws';
import Auth0 from '../../../services/Auth0';
require('../../../styles/Profile/Edit/Edit.scoped.scss');

type Props = {
  id: string;
  profilePictureUrl: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
};

const Edit: React.FC<Props> = ({
  id,
  username,
  name,
  email,
  phoneNumber,
}: Props) => {
  const [userInformations, setUserInformations] = useState({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
  });

  const [editStatus, setEditStatus] = useState({
    completed: false,
  });

  const { register, errors, handleSubmit } = useForm<Props>();
  const { logout, user } = useAuth0();

  const onSubmit = async (data: Props) => {
    await API.updateUser(id, data.name, data.email, data.phoneNumber)
      .then(() => {
        setUserInformations(data);
        setEditStatus({ completed: true });
      })
      .catch((error: ApiError) => {
        store.addNotification({
          title: 'Error',
          message: error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  };

  const deleteUser = async () => {
    await API.deleteAllPictures(id);
    await API.deleteUser(id);
    await API.deleteAllNotificationsByUserId(id);
    await Aws.deleteUserFolder(username);
    await Auth0.deleteUser(user.sub);
    logout();
  };

  if (editStatus.completed === true) {
    return <Redirect to={'/users/' + username} />;
  }

  return (
    <div className="settings-container">
      <div>
        <h1 className="settings-header">Edit user informations</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="edit-container">
            <div className="edit-field">
              <label className="edit-label" htmlFor="name">
                Name
              </label>
              <input
                className="profile_edit_input"
                type="text"
                id="name"
                name="name"
                placeholder="name"
                defaultValue={userInformations.name}
                ref={register({
                  required: true,
                  pattern: /^[a-z ,.'-]+$/i,
                  validate: (value) => {
                    return !!value.trim() && value.length < 50;
                  },
                })}
              />
              {errors.name && errors.name.type === 'required' && (
                <div className="error">This field cannot be empty</div>
              )}
              {errors.name &&
                (errors.name.type === 'pattern' ||
                  errors.name.type === 'validate') && (
                  <div className="error">This name is invalid</div>
                )}
            </div>
            <div className="edit-field">
              <label className="edit-label" htmlFor="email">
                Email
              </label>
              <input
                className="profile_edit_input"
                type="email"
                id="email"
                name="email"
                placeholder="email"
                defaultValue={userInformations.email}
                ref={register({
                  required: true,
                  validate: (value) => {
                    return value.length < 50;
                  },
                })}
              />
              {errors.email && errors.email.type === 'required' && (
                <div className="error">This field cannot be empty</div>
              )}
              {errors.email && errors.email.type === 'validate' && (
                <div className="error">This email address is too long</div>
              )}
            </div>
            <div className="edit-field">
              <label className="edit-label" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="profile_edit_input"
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="phone number"
                defaultValue={userInformations.phoneNumber}
                ref={register({
                  maxLength: 10,
                  minLength: 10,
                  min: 0,
                })}
              />
              {errors.phoneNumber && errors.phoneNumber.type === 'required' && (
                <div className="error">This field cannot be empty</div>
              )}
              {errors.phoneNumber &&
                (errors.phoneNumber.type === 'maxLength' ||
                  errors.phoneNumber.type === 'minLength') && (
                  <div className="error">Phone number length must be 10</div>
                )}
              {errors.phoneNumber && errors.phoneNumber.type === 'min' && (
                <div className="error">Phone number cannot be negative</div>
              )}
            </div>
            <button className="save-button" type="submit">
              Save
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={deleteUser}
            >
              Delete my profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
