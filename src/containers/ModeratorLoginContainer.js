// Page displaying the Login for the Moderators

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

// Internal Modules
import GlobalTheme from '../styledComponents/GlobalTheme';
import LoginInput from '../styledComponents/LoginInput';
import LoginButton from '../styledComponents/LoginButton';
import LoginForm from '../styledComponents/LoginForm';
import LinkTypeText from '../styledComponents/LinkTypeText';
import { ErrorText } from '../styledComponents/TextComponents';

// Redux-related
import store from '../store/store';
import {
    authenticateUser 
} from '../actionCreators/actions';

let firebaseConfig = {
    apiKey: "AIzaSyBioAKQzfRargmo8bAM-fuKRmYTdtgQxSw",
    authDomain: "coronawire-2020.firebaseapp.com",
    databaseURL: "https://coronawire-2020.firebaseio.com",
    projectId: "coronawire-2020",
    storageBucket: "coronawire-2020.appspot.com",
    messagingSenderId: "464179001029",
    appId: "1:464179001029:web:6590be0326ab59b6f962ac",
    measurementId: "G-Q47EB979TP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// #toDo:
// Change the name of the styled components

const ModeratorContainerWrapper = styled.div`
    background: rgb(24,11,255);
    background: linear-gradient(90deg, rgba(24,11,255,1) 0%, rgba(121,9,119,1) 100%);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

`
const FormHeaderText = styled.p`
    color: ${props => props.applicationInputColor};
    font-size: 24px;
    display: block;
    width: auto;
    margin-bottom: 20px;
    text-align: center;
`

const LoginContainerBox = styled.div`
    width: auto;
    height: 400px;
    background-color: white;
    border: 2px solid white;
    border-radius: ${props => props.GlobalTheme.generalApplication.borderRadius};
    display: inline-block;
`

const CheckboxRememberMeContainer = styled.div`
    padding: 10px;
    position: relative;
    bottom: 6px;    
    width: 300px;
    display: flex;
    justify-content: space-between;
    box-sizing: content-box;
`

const CheckboxContainer = styled.div`
    background-color: transparent;
    display: flex;
    text-align: center;
    justify-content: center;
    padding: 10px;

`
const CheckboxLabel = styled.label`
    font-size: 12px;
    color: black;
    height: auto;
    font-weight: 500;
`

const LoginButtonWithGradient = styled(LoginButton)`
    background: rgb(24,11,255);
    background: linear-gradient(90deg, rgba(121,9,119,1) 0%, rgba(24,11,255,1) 100%);
`

const LoginErrorText = styled(ErrorText)`
  visibility: ${props => props.unsuccessfulConnectionStatus === true ? 'visible' : 'hidden'};
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
`

// Will send the login email / username in the redux state
// Wouldn't be necessary if all moderators logged in as Admin, but this wouldn't be good
// if we wanted to track changes or for clarity
class ModeratorLoginContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Empty for now but will hold the login related fields
            email: '',
            password: '',
            unsuccessfulConnection: false,
            emailValidated: 'neutral',
            headerText: 'CoronaWire Login',
            rememberMeClicked: false
        }
    }
    
    // Used in order to retrieve potential email information in local storage and directly display it
    // within the correct input of the Login container 
    componentDidMount = () => {
        let retrievedEmail = this.retrieveEmailFromLocalStorage();
        if (retrievedEmail !== '') {
            this.setState({
                email: retrievedEmail
            })
        }
    }

    // Method used to disable submit button while password and email lengths are not validated
    validateForm = () => this.state.email !== '' && this.state.password !== '';

    // Validates that the string entered in the email filed is an email
    validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    // Function used in order to set the email information entered by the user in local storage
    // in order to create a smoother UX when the moderator logs out and tries to login again 
    storeEmailInLocalStorage = () => {
        if (this.state.rememberMeClicked === true) {
            try {
                localStorage.setItem('email', this.state.email);
            } catch(err) {
                console.error('Key value pair not stored in local storage');
            }
        }
    }
    
    // Like the name of the function suggests. 
    retrieveEmailFromLocalStorage = () => {
        try {
            let email = localStorage.getItem('email');
            return email;
        } catch(err) {
            console.errror('Unable to access local storage');
        }
    }


    // Modify current state of the email and password fields according to what the user types
    handleChange = (event) => {
        this.setState({
        [event.target.id]: event.target.value,
        });
    };


    // Shows the password to the user when clicked
    handleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }


    handleRememberMeClick = () => {
        this.setState({
            rememberMeClicked: this.state.rememberMeClicked === true ? false : true
        })
    }

    // Function used to let the user know that an unsuccessful connection has been made
    // Allows us to create an error user message
    toggleConnectionStatus = () => {
        console.log('Connection status', this.state.unsuccessfulConnection)
        this.setState({
            unsuccessfulConnection: !this.state.unsuccessfulConnection
        })
    }

    handleSignIn = async (event) => {
        event.preventDefault();
        console.log('Sign in button clicked');
        let  { email, password } = this.state;

        if (this.validateEmail(email)) {
            try { 
                let firebaseAuthenticationResult = await firebase.auth().signInWithEmailAndPassword(email, password);
                // console.log('Firebase Authentication ?', firebaseAuthenticationResult);
                store.dispatch(authenticateUser(true));
                try {
                    this.storeEmailInLocalStorage(); // Makes sure that the email is stored in local storage for the future
                    this.props.history.push('/authenticatedLogin');
                } catch(error) {
                    console.error('History not changed successfully.')
                }
            } catch (error) {
                // console.error('Firebase authentication unsuccessful');
                this.toggleConnectionStatus()
                setTimeout(this.toggleConnectionStatus, 4000); // Ensures that the red error text disappears
                // UXdecision: Do I leave the error message so that the user always knows or remove it? 
            }
        } else {
            this.setState({
                emailValidated: 'false'
            })
        }
    }

    render() {
        console.log('Re-rendered unsuccessfulConnectionStatus', this.state.unsuccessfulConnection)
        return(
            <ModeratorContainerWrapper>
            <LoginContainerBox GlobalTheme={GlobalTheme} >
            <LoginForm onSubmit={this.handleSignIn}>
                <FormHeaderText GlobalTheme={GlobalTheme} >
                    {this.state.headerText}
                </FormHeaderText>
                <LoginInput 
                type="email" 
                placeholder="Email" 
                GlobalTheme={GlobalTheme} 
                id="email" 
                onChange={this.handleChange} 
                InputStyling={this.state} 
                value={this.state.email}/> 
                <LoginInput 
                type={this.state.showPassword ? "text" : "password"} 
                placeholder="Password" onChange={this.handleChange} 
                value={this.state.password} 
                GlobalTheme={GlobalTheme} 
                id="password"
                InputStyling={this.state}
                /> 
                <CheckboxRememberMeContainer>
                    <CheckboxContainer>
                        <input type='checkbox' onClick={this.handleRememberMeClick} checked={this.state.rememberMeClicked} name='loginCheckbox' />
                        <CheckboxLabel for='loginContainer'> Remember Me </CheckboxLabel>
                    </CheckboxContainer>

                    {
                        this.state.showPassword ? 
                        <LinkTypeText GlobalTheme={GlobalTheme} onClick={this.handleShowPassword}> Hide Password </LinkTypeText> 
                        : 
                        <LinkTypeText GlobalTheme={GlobalTheme} onClick={this.handleShowPassword}> Show Password </LinkTypeText>
                    }
                </CheckboxRememberMeContainer>

                <LoginErrorText  unsuccessfulConnectionStatus={this.state.unsuccessfulConnection} > Email or password information incorrect </LoginErrorText> 
            
                <LoginButtonWithGradient type="submit" GlobalTheme={GlobalTheme} disabled={!this.validateForm()} > Sign In </LoginButtonWithGradient>
            </LoginForm>
            </LoginContainerBox>
            </ModeratorContainerWrapper>


        )
    }
}

export default ModeratorLoginContainer;