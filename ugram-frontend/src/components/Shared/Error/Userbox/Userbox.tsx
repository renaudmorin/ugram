import React from 'react';
import { Link } from 'react-router-dom';
require('../../../../styles/Shared/Error/Userbox/Userbox.scoped.scss');

type userboxProps = {
  profilePictureUrl: string;
  username: string;
  name: string;
};

function Userbox(props: userboxProps) {
  return (
    <div className="suggestion">
      <div className="profile_container">
        <span className="profile_picture">
          <img src={props.profilePictureUrl} alt="" />
        </span>
      </div>
      <div className="profile_text">
        <div className="profile_username">
          <Link to={'/users/' + props.username}>{props.username}</Link>
        </div>
        <div className="profile_name">{props.name}</div>
      </div>
    </div>
  );
}
export default Userbox;
