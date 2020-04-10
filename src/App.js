// Root Component of the Application

// External Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Internal Modules
import Routes from './routing/Routes'; 
// Styled Components
import AppComponentWrapper from './styledComponents/AppComponentWrapper';
// Redux 
import store from './store/store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Empty for now
    }
  }

  setGeolocation = geolocation => {
    this.setState({ geolocation });
  }

  handleGeolocationError = () => {
    this.setState({ geolocationRefused: true });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.setGeolocation,
      this.handleGeolocationError,
    );

    navigator.geolocation.watchPosition(
      this.setGeolocation,
      this.handleGeolocationError,
    );
  }

  render() {
    console.log(this.state);

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

// Typechecking for the App's passed in props 
App.propTypes = {
	isAuthenticated: PropTypes.bool,
};

// Sets the default props of the app container
App.defaultProps = {
	isAuthenticated: false
};

// Maps the store's properties to the App container's props in order to render the
// correct application UI when user authenticates
function mapStateToProps(state) {
	return {
			isAuthenticated: state.authentication.isAuthenticated
	};
}

export default connect(mapStateToProps)(App);

