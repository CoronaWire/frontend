// External Packages
import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
// Internal Modules
// Containers
// Components
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import UnauthenticatedRoute from '../components/UnauthenticatedRoute';
import NewsDashboard from './../containers/NewsDashboard';
import ModeratorHomeContainer from '../containers/ModeratorHomeContainer';
import ModeratorLoginContainer from '../containers/ModeratorLoginContainer';
import { AboutPage } from './../containers/AboutPage';
// import TestComponent from '../components/TestComponent';

// #toDo: create 404 error page displayed when user can't login.

export default ({childProps}) =>
    <BrowserRouter>
        <Switch>
            <UnauthenticatedRoute path='/' exact component={NewsDashboard} props={childProps} /> 
            <UnauthenticatedRoute path='/about' exact component={AboutPage} props={childProps} /> 
            <UnauthenticatedRoute path='/adminLogin' exact component={ModeratorLoginContainer} props={childProps} />
            {/* <UnauthenticatedRoute path='/admin' exact component={LoginContainer} props={childProps} /> */}
            <AuthenticatedRoute path='/authenticatedLogin' exact component={ModeratorHomeContainer} props={childProps} />
        </Switch>
    </BrowserRouter>
