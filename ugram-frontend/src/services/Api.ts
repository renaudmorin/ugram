import { Picture, ApiError, Hashtag, Comment, Notification } from '../Types';
import { QueryParamBuilder } from './QueryParamBuilder';
require('dotenv').config();

class Api {
  constructor(private readonly baseUrl?: string) {}

  getUserByUsername = async (username: string) => {
    const response = await fetch(`${this.baseUrl}/users/${username}`);
    const json = await response.json();
    return json;
  };
  getProfilePicturesByUserId = async (
    userId: string,
    descriptionFilter?: string,
    hashtagFilter?: string,
  ) => {
    const params = new QueryParamBuilder()
      .addParam({ name: 'desc', value: descriptionFilter })
      .addParam({ name: 'tag', value: hashtagFilter })
      .toString();
    const response = await fetch(`${this.baseUrl}/pictures/${userId}${params}`);
    const json = await response.json();
    return json;
  };

  getPictures = async (
    descriptionFilter?: string,
    hashtagFilter?: string,
  ): Promise<Picture[]> => {
    const params = new QueryParamBuilder()
      .addParam({ name: 'desc', value: descriptionFilter })
      .addParam({ name: 'tag', value: hashtagFilter })
      .toString();
    const response = await fetch(`${this.baseUrl}/pictures/${params}`);
    const json = await response.json();
    return json;
  };

  updatePicture = async (picture: Picture) => {
    await fetch(`${this.baseUrl}/picture/${picture.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(picture),
    });
  };

  readUserNotifications = async (userId: string) => {
    await fetch(`${this.baseUrl}/notifications/${userId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    });
  };

  deletePicture = async (id: string) => {
    await fetch(`${this.baseUrl}/picture/${id}`, {
      method: 'DELETE',
    });
  };

  deleteAllPictures = async (userId: string) => {
    await fetch(`${this.baseUrl}/pictures/${userId}`, {
      method: 'DELETE',
    });
  };

  deleteAllNotificationsByUserId = async (userId: string) => {
    await fetch(`${this.baseUrl}/notifications/${userId}`, {
      method: 'DELETE',
    });
  };

  deleteAllNotificationsByPictureId = async (pictureId: string) => {
    await fetch(`${this.baseUrl}/notifications/picture/${pictureId}`, {
      method: 'DELETE',
    });
  };

  createNotification = async (
    pictureId: string,
    pictureOwnerId: string,
    notificationUsername: string,
    notificationType: string,
    pictureLink: string,
  ) => {
    const notificationDate: Date = new Date(Date.now());
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pictureId: pictureId,
        pictureOwnerId: pictureOwnerId,
        notificationUsername: notificationUsername,
        notificationDate: notificationDate,
        notificationRead: false,
        notificationType: notificationType,
        pictureLink: pictureLink,
      }),
    };
    return fetch(`${this.baseUrl}/notification`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  deleteUser = async (id: string) => {
    await fetch(`${this.baseUrl}/user/${id}`, {
      method: 'DELETE',
    });
  };

  getUserById = async (userId: string) => {
    const response = await fetch(`${this.baseUrl}/user/${userId}`);
    const json = await response.json();
    return json;
  };

  updateUser = async (
    userId: string,
    name: string,
    email: string,
    phoneNumber: string,
  ) => {
    const response = await fetch(`${this.baseUrl}/user/${userId}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      }),
    });
    if (!response.ok) {
      throw new ApiError(await response.json());
    }
    return response;
  };

  createUser = async (
    profilePictureUrl: string,
    userName: string,
    name: string,
    email: string,
    phoneNumber: string,
  ) => {
    const creationDate: Date = new Date(Date.now());
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profilePictureUrl: profilePictureUrl,
        username: userName,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        registrationDate: creationDate.toISOString(),
      }),
    };
    return fetch(`${this.baseUrl}/user`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  checkUserExists = async (username: string) => {
    const userList = await this.getAllUsers();
    for (const user of userList) {
      if (user.username === username) {
        return true;
      }
    }
    return false;
  };

  postPicture = async (
    pictureUrl: string,
    userId: string,
    description: string,
    hashtags: string[],
    mentions: string[],
    creationDate: string,
    likes: string[],
    comments: Comment[],
  ) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pictureUrl: pictureUrl,
        userId: userId,
        description: description,
        hashtags: hashtags,
        mentions: mentions,
        creationDate: creationDate,
        likes: likes,
        comments: comments,
      }),
    };
    const response = await fetch(`${this.baseUrl}/picture`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    return response;
  };

  getAllUsers = async (searchFilter?: string) => {
    const params = new QueryParamBuilder()
      .addParam({ name: 'search', value: searchFilter })
      .toString();
    const response = await fetch(`${this.baseUrl}/users${params}`);
    const json = await response.json();
    return json;
  };

  searchUsers = async (searchFilter: string) => {
    return this.getAllUsers(searchFilter);
  };

  addReaction = async (pictureId: string, username: string) => {
    const response = await fetch(
      `${this.baseUrl}/picture/${pictureId}/reaction`,
      {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        method: 'POST',
        body: JSON.stringify({
          username: username,
        }),
      },
    );
    if (!response.ok) {
      throw new ApiError(await response.json());
    }
    return response;
  };

  deleteReaction = async (pictureId: string, username: string) => {
    await fetch(`${this.baseUrl}/picture/${pictureId}/reaction`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        username: username,
      }),
    });
  };

  addComment = async (pictureId: string, username: string, comment: string) => {
    const response = await fetch(
      `${this.baseUrl}/picture/${pictureId}/comment`,
      {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        method: 'POST',
        body: JSON.stringify({
          username: username,
          comment: comment,
        }),
      },
    );
    if (!response.ok) {
      throw new ApiError(await response.json());
    }
    return response;
  };

  getPopularHashtags = async (limit?: number): Promise<Hashtag[]> => {
    const response = await fetch(`${this.baseUrl}/pictures/hashtags/${limit}`);
    const json = await response.json();
    return json;
  };

  getNotificationsForUser = async (userId: string): Promise<Notification[]> => {
    const response = await fetch(`${this.baseUrl}/notifications/${userId}`);
    const json = await response.json();
    return json;
  };

  getMatchingDescriptions = async (
    description?: string,
    limit?: number,
  ): Promise<string[]> => {
    const params = new QueryParamBuilder()
      .addParam({ name: 'desc', value: description })
      .addParam({ name: 'limit', value: limit?.toString() })
      .toString();
    const response = await fetch(
      `${this.baseUrl}/pictures/matchingdescriptions/${params}`,
    );
    const json = await response.json();
    return json;
  };

  getMatchingHashtags = async (
    description?: string,
    limit?: number,
  ): Promise<string[]> => {
    const params = new QueryParamBuilder()
      .addParam({ name: 'hashtag', value: description })
      .addParam({ name: 'limit', value: limit?.toString() })
      .toString();
    const response = await fetch(
      `${this.baseUrl}/pictures/matchinghashtags/${params}`,
    );
    const json = await response.json();
    return json;
  };
}

const instance = new Api(process.env.REACT_APP_BACKEND_ENDPOINT);
export default instance;
