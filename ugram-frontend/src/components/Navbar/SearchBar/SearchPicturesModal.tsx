import React, { useState } from 'react';
import { Box, Dialog, Paper, TextField } from '@material-ui/core';
import { SearchPictureParams } from '../../../Types';
import API from '../../../services/Api';
import { Autocomplete } from '@material-ui/lab';
import { useEffect } from 'react';
require('../../../styles/Navbar/Searchbar/SearchPicturesModal.scoped.scss');

type Props = {
  visible: boolean;
  onClose: (searchParams?: SearchPictureParams) => void;
};

const SearchPicturesModal: React.FC<Props> = ({ visible, onClose }) => {
  const [descriptionFilter, setDescriptionFilter] = useState<string>('');
  const [hashtagFilter, setHashtagFilter] = useState<string>('');
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtag, setHashtag] = useState<string>('');

  const maxAutocompleteResults = 10;

  const close = (searchParams?: SearchPictureParams) => {
    onClose(searchParams);
  };

  const filterDescriptionOptions = async (filter: string) => {
    if (filter === description) {
      return;
    }
    setDescription(filter);
    const options = await API.getMatchingDescriptions(
      filter,
      maxAutocompleteResults,
    );
    if (options.length === 0) {
      options.push(filter);
    }
    const filteredOptions = options.filter((option) => String(option).trim());
    setDescriptions(filteredOptions);
  };

  const setDescriptionOption = (filter: string | null) => {
    if (filter === null) {
      setDescriptionFilter('');
    } else {
      setDescriptionFilter(filter);
    }
  };

  const filterHashtagOptions = async (filter: string) => {
    if (filter === hashtag) {
      return;
    }
    setHashtag(filter);
    const options = await API.getMatchingHashtags(
      filter,
      maxAutocompleteResults,
    );
    if (options.length === 0) {
      options.push(filter);
    }
    setHashtags(options);
  };

  const setHashtagOption = (filter: string | null) => {
    if (filter === null) {
      setHashtagFilter('');
    } else {
      setHashtagFilter(filter);
    }
  };

  const search = () => {
    const searchParams = {
      desc: getParameterValue(descriptionFilter),
      tag: getParameterValue(hashtagFilter),
    };
    close(searchParams);
  };

  const getParameterValue = (value: string): string | undefined => {
    if (!value || value.trim() === '') {
      return undefined;
    }
    return value;
  };

  useEffect(() => {
    const getDescriptions = async () => {
      const options = await API.getMatchingDescriptions(
        '',
        maxAutocompleteResults,
      );
      const filteredOptions = options.filter((option) => String(option).trim());
      setDescriptions(filteredOptions);
    };

    const getHashTags = async () => {
      const options = await API.getMatchingHashtags('', maxAutocompleteResults);
      setHashtags(options);
    };

    if (visible) {
      getDescriptions();
      getHashTags();
    }
  }, [visible]);

  return (
    <Dialog
      className="search-menu"
      onClose={() => close(undefined)}
      aria-labelledby="show-picture-search-title"
      open={visible}
      fullWidth
      maxWidth="xs"
    >
      <Paper>
        <Box className="title">Seach pictures</Box>
      </Paper>
      <Paper>
        <Box className="search-input">
          <Autocomplete
            inputValue={description}
            onInputChange={(event, value) => filterDescriptionOptions(value)}
            value={descriptionFilter}
            options={descriptions}
            onChange={(event, value) => setDescriptionOption(value)}
            onBlur={() => setDescriptionOption(description)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Description"
                placeholder="Start typing..."
                variant="outlined"
              />
            )}
            handleHomeEndKeys
            freeSolo
          />
        </Box>
        <Box className="search-input">
          <Autocomplete
            inputValue={hashtag}
            onInputChange={(event, value) => filterHashtagOptions(value)}
            value={hashtagFilter}
            options={hashtags}
            onChange={(event, value) => setHashtagOption(value)}
            onBlur={() => setHashtagOption(hashtag)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Hashtag"
                placeholder="Start typing..."
                variant="outlined"
              />
            )}
            handleHomeEndKeys
            freeSolo
          />
        </Box>
        <Box>
          <Box className="button-container">
            <button onClick={search}>Search</button>
          </Box>
        </Box>
      </Paper>
    </Dialog>
  );
};

export default SearchPicturesModal;
