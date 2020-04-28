/* eslint-disable no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setLocationAction } from './../actionCreators/actions';
import { Input, b1Css, SearchIcon } from './core';
import Script from 'react-load-script';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
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

  // todo change try again logic and move script to index
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

  return (
    <InputWrapper>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={setupAutocomplete}
        onError={() => console.log('error')}
      />
      <SearchIcon />
      <TextInput type="text" ref={inputRef} placeholder="Enter your city" />
    </InputWrapper>
  );
};

export default SearchBarComponent;
