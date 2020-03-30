// External Packages
import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
// Internal Modules
// Containers
// Components
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import UnauthenticatedRoute from '../components/UnauthenticatedRoute';
import ClientHomeContainer from '../containers/ClientHomeContainer';
import ModeratorLoginContainer from '../containers/ModeratorLoginContainer';
// import TestComponent from '../components/TestComponent';

export default ({childProps}) =>
    <BrowserRouter>
        <Switch>
            <UnauthenticatedRoute path='/' exact component={ClientHomeContainer} props={childProps} /> 
            <UnauthenticatedRoute path='/adminLogin' exact component={ModeratorLoginContainer} props={childProps} />
            {/* <UnauthenticatedRoute path='/admin' exact component={LoginContainer} props={childProps} /> */}
            {/* <AuthenticatedRoute path='/admin' exact component={ModeratorHome} props={childProps} /> */}
        </Switch>
    </BrowserRouter>
