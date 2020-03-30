// Root Component of the Application

// External Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Internal Modules
import Routes from './routing/Routes';
// Styled Components
import AppComponentWrapper from './styledComponents/AppComponentWrapper';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Empty for now
    }
  }

  render() {

    const childProps = {
      isAuthenticated: this.props.isAuthenticated,
    }

    // Provider component from react-redux will be added here at the top
    // level of the hierarchy in order to give access to the redux state to
    // the sub components
    return (
      <AppComponentWrapper>
        <Routes childProps={childProps} />
      </AppComponentWrapper>
    );
  }
}

export default App;
