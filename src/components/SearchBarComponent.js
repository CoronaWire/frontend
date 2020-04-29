/* eslint-disable no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setLocationAction } from './../actionCreators/actions';
import { Input, b1Css, SearchIcon } from './core';
import { retry } from './../helpers/utilities';

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

  const onSelect = () => {
    const address = autocomplete.current.getPlace();
    if (address) {
      const { geometry: { location } , formatted_address } = address;
      dispatch(
        setLocationAction({
          lat: location.lat(),
          lng: location.lng(),
          name: formatted_address,
        }),
      );
    }
  };

  const setupAutocomplete = () => {
    const options = {
      types: ['(regions)'],
      componentRestrictions: { country: 'us' }
    };
    autocomplete.current = new google.maps.places.Autocomplete(
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

  // todo change try again logic and move script to index
  return (
    <InputWrapper>
      <SearchIcon />
      <TextInput type="text" ref={inputRef} placeholder="Enter your city" />
    </InputWrapper>
  );
};

export default SearchBarComponent;
