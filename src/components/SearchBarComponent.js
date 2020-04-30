/* eslint-disable no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setLocationAction } from './../actionCreators/actions';
import { fetchFipsInfo } from './../helpers/fips';
import { Input, b1Css, SearchIcon } from './core';
import { retry } from './../helpers/utilities';
import { saveLocationToLocalStorage } from './../helpers/localStorage';
import { useUpdateEffect } from './../helpers/hooks';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  svg:first-child {
    left: 16px;
  }

  .pac-container {
    z-index: 10000 !important;
  }
`;

const TextInput = styled(Input)`
  padding-left: 46px;
`;

export const SearchBarComponent = ({ handleSelect }) => {
  const autocomplete = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const onSelect = async () => {
    const address = autocomplete.current.getPlace();
    if (address) {
      const {
        geometry: { location },
        formatted_address: name,
      } = address;
      const lat = location.lat();
      const lng = location.lng();
      const fipsData = await fetchFipsInfo(lat, lng);

      const userLocation = {
        lat,
        lng,
        name,
        ...fipsData,
      };

      saveLocationToLocalStorage(userLocation);
      dispatch(
        setLocationAction(userLocation),
      );
    }
    inputRef.current.blur();
  };

  const setupAutocomplete = () => {
    const options = {
      types: ['(regions)'],
      componentRestrictions: { country: 'us' }
    };
    autocomplete.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options,
    );
    autocomplete.current.setFields(['name', 'geometry', 'formatted_address']);
    autocomplete.current.addListener('place_changed', onSelect);
  };

  useEffect(() => {
    retry(
      () => window && window.google,
      setupAutocomplete,
    );
  }, []);

  const setLocation = useSelector(({ newsFeed: { location } }) => location && location.name);
  const [inputValue, setInputValue] = useState(setLocation || '');
  useUpdateEffect(() => {
    setInputValue(setLocation);
  }, [setLocation]);

  // todo change try again logic and move script to index
  return (
    <InputWrapper>
      <SearchIcon />
      <TextInput
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Enter your city"
      />
    </InputWrapper>
  );
};

export default SearchBarComponent;
