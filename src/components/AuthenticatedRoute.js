// Authenticated Route
// Component similar to the AppliedRoute component. Main difference is that we look at props 
// passed in to check if a user is authenticated, then we render the passed in component.
// If user is not authenticated, we use Redirect React Router component to redirect the user
// to the login page

// External Packages
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Authenticated Route set up to redirect to /admin page if user is not authenticated
export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated
        ? <C {...props} {...cProps} />
        : <Redirect
            to="/admin"
          />}
  />;
