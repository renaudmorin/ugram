import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';
import API from '../../../services/Api';
import { Comment } from '../../../Types';
require('../../../styles/Feed/Post/Post.scoped.scss');

type postProps = {
  username: string;
  name: string;
  description: string;
  hashtags: string[];
  pictureUrl: string;
  mentions: string[];
  likes: string[];
  pictureId: string;
  comments: Comment[];
};

function Post(props: postProps) {
  const [like, setLike] = useState(false);
  const [likeCounter, setCounter] = useState(0);
  const [comment, setComment] = useState<string>('');
  const auth0 = useAuth0();
  const handleLikeClick = () => setLike(!like);
  const [liveCommentList, setCommentList] = useState<string[]>([]);
  const commentSection = document.getElementById(
    'textarea_comment',
  ) as HTMLInputElement;

  useEffect(() => {
    const numberOfLikes = props.likes.length;
    setCounter(numberOfLikes);
  }, [props]);

  useEffect(() => {
    props.likes.forEach((username) => {
      if (username == auth0.user.nickname) {
        setLike(true);
      }
    });
  }, [props, auth0]);

  const addNotification = async (type: string) => {
    const user = await API.getUserByUsername(props.username);
    const userId = user.id;
    await API.createNotification(
      props.pictureId,
      userId,
      auth0.user.nickname,
      type,
      props.pictureUrl,
    );
  };

  const postComment = async () => {
    handleLiveComment();
    await API.addComment(props.pictureId, auth0.user.nickname, comment);
    addNotification('comment');
    setComment('');
    commentSection.value = '';
  };

  const addReaction = async () => {
    handleLikeClick();
    setCounter(likeCounter + 1);
    await API.addReaction(props.pictureId, auth0.user.nickname);
  };

  const deleteReaction = async () => {
    handleLikeClick();
    setCounter(likeCounter - 1);
    await API.deleteReaction(props.pictureId, auth0.user.nickname);
  };

  const handleReaction = async () => {
    if (like === false) {
      addReaction();
      addNotification('like');
    } else deleteReaction();
  };

  const handleLiveComment = () => {
    setCommentList((liveCommentList: Array<string>) =>
      liveCommentList.concat(comment),
    );
  };

  return (
    <article>
      <header>
        <div className="article_name">
          <Link to={'/users/' + props.username}>{props.name}</Link>
        </div>
      </header>
      <div className="picture_container">
        <img src={props.pictureUrl} alt="" />
      </div>
      <div className="reaction_post_container">
        <button className="reaction_button">
          <AiFillHeart
            fontSize="1.3rem"
            onClick={handleReaction}
            className={like ? 'like_color' : ''}
          />
        </button>
        <span className="reaction_button">{likeCounter}</span>
      </div>
      <br />
      <div className="article_description">{props.description}</div>
      <div className="article_description">
        {props.hashtags.map((hashtag: string, i: number) => {
          return (
            <span className="card_tag" key={i}>
              #{hashtag}
            </span>
          );
        })}
      </div>
      <div className="article_description">
        {props.mentions.map((mention: string, i: number) => {
          return (
            <span className="card_tag" key={i}>
              @{mention}
            </span>
          );
        })}
      </div>
      <section>
        {props.comments.map((comment, i) => {
          if (comment.username != undefined)
            return (
              <div key={i} className="posted_comment">
                <span style={{ fontWeight: 600, float: 'left' }}>
                  {comment.username}
                </span>
                &nbsp;
                <span>{comment.comment}</span>
              </div>
            );
        })}
        {liveCommentList.map((comment) => {
          if (comment != undefined) {
            return (
              <div className="posted_comment">
                <span style={{ fontWeight: 600, float: 'left' }}>
                  {auth0.user.nickname}
                </span>
                &nbsp;
                <span>{comment}</span>
              </div>
            );
          }
        })}
      </section>
      <section className="comment_section">
        <textarea
          id="textarea_comment"
          className="text_comment"
          placeholder="Add a comment"
          onChange={(event) => setComment(event.target.value.trim())}
        ></textarea>
        <button
          disabled={comment.length < 1}
          className="comment_button"
          onClick={postComment}
        >
          Post
        </button>
      </section>
    </article>
  );
}

export default Post;
