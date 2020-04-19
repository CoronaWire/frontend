/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchBarStyling = {
    width: 400,
    height: 40,
    backgroundColor: 'white'
}
export default function SearchBarComponent() {
  return (
    <Autocomplete
      id="searchBarComponent"
      options={topLocation}
      getOptionLabel={(option) => option.location}
      style={SearchBarStyling}
      size="small"
      renderInput={(params) => <TextField {...params} label="Choose City" variant="outlined" style={{height: 20}}/>}
    />
  );
}

// ToDo: Move to redux store after and connect to redux store

const topLocation = [
    {location: 'New York City'},
    {location: 'San Francisco'},
    {location: 'Seattle'},
]
