import React, { useEffect, useState } from 'react';
import API from '../../services/Api';
import Post from './Post/Post';
import { Picture, User } from '../../Types';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import TopHashtags from './Trending/TopHashtags';

require('../../styles/Feed/Feed.scoped.scss');

function Feed() {
  const [pictureData, setPictureData] = useState<Picture[]>([]);
  const [profileData, setProfileData] = useState<User[]>([]);
  const location = useLocation();

  const filterByDate = (pictures: Picture[]) => {
    pictures = pictures.slice();
    function custom_sort(a: Picture, b: Picture) {
      return (
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      );
    }
    pictures.sort(custom_sort);

    setPictureData(pictures);
  };

  useEffect(() => {
    const getUserInfoById = async () => {
      const arr: User[] = [];
      for (const data in pictureData) {
        const id = pictureData[data].userId;
        const user = await API.getUserById(id);
        arr.push(user);
      }
      setProfileData(arr);
    };

    getUserInfoById();
  }, [pictureData]);

  useEffect(() => {
    const getFeedPictures = async () => {
      const { desc, tag } = queryString.parse(location.search);
      const pictures = await API.getPictures(desc, tag);
      filterByDate(pictures);
    };

    getFeedPictures();
  }, [location]);

  const noPicture = () => {
    return (
      <div className="no-picture">
        <div className="no-picture">No pictures found</div>
      </div>
    );
  };

  const feedContent = () => {
    return (
      <div className="feed-container">
        <TopHashtags />
        <div>
          {pictureData.map((picture, index) => {
            return (
              <div key={index}>
                {profileData.map((user, i) => {
                  if (index === i) {
                    return (
                      <Post
                        name={user.name}
                        username={user.username}
                        pictureUrl={picture.pictureUrl}
                        description={picture.description}
                        hashtags={picture.hashtags}
                        mentions={picture.mentions}
                        likes={picture.likes}
                        pictureId={picture.id}
                        comments={picture.comments}
                        key={i}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return pictureData.length === 0 ? noPicture() : feedContent();
}

export default Feed;
