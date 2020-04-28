/* eslint-disable no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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

  const onSelect = () => {
    const address = autocomplete.current.getPlace();
    console.log(address);
    if (handleSelect) {
      // do something with address
      handleSelect(address);
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

  return (
    <InputWrapper>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC8K2pvt-4CSCWa_qgPi5DOj0caFrDdw2k&libraries=places`}
        onLoad={setupAutocomplete}
        onError={() => console.log('error')}
      />
      <SearchIcon />
      <TextInput type="text" ref={inputRef} placeholder="Enter your city" />
    </InputWrapper>
  );
};

export default SearchBarComponent;
