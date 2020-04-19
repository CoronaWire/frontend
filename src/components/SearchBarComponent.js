/* eslint-disable no-use-before-define */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchBarStyling = {
    width: 400,
    height: 40,
    backgroundColor: 'white'
}

const TextInput = styled.input`
  .pac-container {
    z-index: 10000 !important;
  }
`;

export default function SearchBarComponent() {
  const autocomplete = useRef(null);
  const inputRef = useRef(null);

  const handleSelect = () => {
    const address = autocomplete.current.getPlace();
    console.log(address);
  };

  useEffect(() => {
    const options = {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' }
    };
    autocomplete.current = new google.maps.places.Autocomplete(
      inputRef.current,
      options,
    );
    autocomplete.current.setFields(['name', 'geometry', 'formatted_address']);
    autocomplete.current.addListener('place_changed', handleSelect);
  }, []);

  return (
    <TextInput type="text" ref={inputRef} placeholder="Enter your address or city" />
  );
}

// ToDo: Move to redux store after and connect to redux store

const topLocation = [
    {location: 'New York City'},
    {location: 'San Francisco'},
    {location: 'Seattle'},
]
