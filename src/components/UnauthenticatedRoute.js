// Unauthenticated Route 
// Similar to AuthenticatedRoute component created in this directory. We check to ensure
// that the user is not authenticated before we render the component that is passed in.
// If the user is, then we use <Redirect /> component to redirect the user to the homepage

// External Packages
import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      !cProps.isAuthenticated
        ? <C {...props} {...cProps} />
        : <Redirect to="/authenticatedLogin" />} 
  />;
