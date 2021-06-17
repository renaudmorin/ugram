import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import ScrollContainer from 'react-indiana-drag-scroll';
import Tooltip from '@material-ui/core/Tooltip';
import API from '../../../services/Api';
import { Hashtag } from '../../../Types';

require('../../../styles/Feed/Trending/TopHashtags.scoped.scss');

function TopHashtags() {
  const [popularHashtags, setPopularHashtags] = useState<Hashtag[]>([]);

  const history = useHistory();

  const search = (term: string) => {
    const url = `/searchpictures?desc=&tag=${term}`;
    history.push(url);
  };

  useEffect(() => {
    const getPopularHashtags = async () => {
      const hashtags = await API.getPopularHashtags(10);
      setPopularHashtags(hashtags);
    };

    getPopularHashtags();
  }, []);

  return (
    <div className="top-hashtags-container">
      <h3 className="top-hashtags-header">Most popular hashtags</h3>
      <ScrollContainer className="top-hashtags">
        {popularHashtags.map((hashtag, index) => (
          <div className="hashtag" key={hashtag.name}>
            <Label className="hashtag-rank" circular color="olive">
              {index + 1}
            </Label>
            <Tooltip
              arrow
              title={
                <h5 className="hashtag-tooltip-text">
                  {hashtag.count} post{hashtag.count > 1 ? 's' : ''}
                </h5>
              }
            >
              <Label
                className="hashtag-text"
                as="a"
                color="teal"
                onClick={() => search(hashtag.name)}
                tag
              >
                #{hashtag.name}
              </Label>
            </Tooltip>
          </div>
        ))}
      </ScrollContainer>
    </div>
  );
}

export default TopHashtags;
