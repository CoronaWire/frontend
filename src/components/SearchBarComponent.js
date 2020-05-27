/* eslint-disable no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { setLocationAction } from './../actionCreators/actions';
import { fetchFipsInfo } from './../helpers/fips';
import {
  B1,
  Container,
  Input,
  b1Css,
  SearchIcon,
} from './core';
import { retry } from './../helpers/utilities';
import { saveLocationToLocalStorage } from './../helpers/localStorage';
import { useUpdateEffect } from './../helpers/hooks';
import { trackEvent } from './../helpers/ga';

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

const DropdownWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  background: white;
  box-shadow: 0px 2px 2px rgba(36, 42, 73, 0.2);
  border-radius: 2px;
`;

const DropdownItem = styled(Container)`
  cursor: pointer;
  height: 48px;
  padding-left: 42px;
  border-left: 4px solid transparent;
  &:hover {
    border-left: 4px solid ${({ theme }) => theme.newsColors.pink};
    background: ${({ theme }) => theme.newsColors.pinkHover};
  }
  ${B1} {
    color: ${({ theme }) => theme.newsColors.navy};
  }
`;

export const SearchBarComponent = ({ handleSelect }) => {
  const autocompleteService = useRef(null);
  const placesService = useRef(null);
  const sessionToken = useRef(null);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const routerLocation = useLocation();
  const [isFocused, setIsFocused] = useState(false);
  const history = useHistory();

  const redirectToNewsDashboard = () => {
    if (routerLocation.pathname !== '/') {
      history.push('/');
    }
  }

  const [predictionsList, setPredictionsList] = useState([]);

  const onSelect = (prediction) => {
    placesService.current.getDetails(
      {
        placeId: prediction.place_id,
        fields: ['name', 'geometry', 'formatted_address'],
        sessionToken: sessionToken.current,
      },
      async (address, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        if (address) {
          const {
            geometry: { location } = {},
            formatted_address: name,
          } = address;
          if (!location) {
            redirectToNewsDashboard();
            return;
          }
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
        setPredictionsList([]);
        redirectToNewsDashboard();
      },
    );
  };

  const setup = () => {
    autocompleteService.current = new window.google.maps.places.AutocompleteService();;
    placesService.current = new window.google.maps.places.PlacesService(wrapperRef.current);
  };

  useEffect(() => {
    retry(
      () => window && window.google,
      setup,
    );
  }, []);

  const setLocation = useSelector(({ newsFeed: { location } }) => location && location.name);
  const [inputValue, setInputValue] = useState(setLocation || '');

  useUpdateEffect(() => {
    setInputValue(setLocation);
  }, [setLocation]);

  useUpdateEffect(() => {
    if (!isFocused) {
      return;
    }
    autocompleteService.current.getPlacePredictions(
      {
        input: inputValue,
        types: ['(regions)'],
        componentRestrictions: { country: 'us' },
        sessionToken: sessionToken.current,
      },
      (predictions, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        setPredictionsList(predictions);
      },
    );
  }, [inputValue, isFocused]);

  useEffect(() => {
    if (isFocused) {
      sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
    }
  }, [isFocused]);

  return (
    <InputWrapper>
      <SearchIcon />
      <TextInput
        type="text"
        value={inputValue}
        ref={inputRef}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Enter your city"
        onFocus={() => {
          setIsFocused(true);
          trackEvent({
            category: 'homepage',
            action: 'click',
            label: 'search',
          });
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      <DropdownWrapper ref={wrapperRef}>
        {predictionsList.map(prediction => (
          <DropdownItem
            align="center"
            onClick={() => onSelect(prediction)}
            key={prediction.place_id}
          >
            <B1>{prediction.description}</B1>
          </DropdownItem>
        ))}
      </DropdownWrapper>
    </InputWrapper>
  );
};

export default SearchBarComponent;
