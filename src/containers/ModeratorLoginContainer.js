// Page displaying the Login for the Moderators

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// Internal Modules
import GlobalTheme from '../styledComponents/GlobalTheme';
import LoginInput from '../styledComponents/LoginInput';
import LoginButton from '../styledComponents/LoginButton';
import LoginForm from '../styledComponents/LoginForm';
import LinkTypeText from '../styledComponents/LinkTypeText';
import { ErrorText, LargeText } from '../styledComponents/Text';

// Redux-related
import store from '../store/store';
import {
    authenticateUser 
} from '../actionCreators/actions';

// #toDo #toFix:
// - Change the name of the styled components
// - figure out why login message re-renders 8 times
// - fix input checkbox and turn it into a div
// - remove console.logs returned when user successfully logs in

const ModeratorContainerWrapper = styled.div`
    background: rgb(24,11,255);
    background: linear-gradient(90deg, rgba(24,11,255,1) 0%, rgba(121,9,119,1) 100%);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Header = styled.div`
    height: 80px;
    width: 100vw;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
`

const HeaderLink = styled(LargeText)`
    color: white;
    margin-left: 20px;
    padding-bottom: 5px;
    border-bottom: solid 2px transparent;
    &:hover {
        border-bottom: solid 2px white;
    }
    font-size: 17px;
    transition: border-bottom 0.2s ease-in;
    cursor: pointer;
`

const LoginBoxWrapper = styled.div`
    height: 100%;
    width: 100vw;
    background-color: transparent;
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
    &:hover {
        background: linear-gradient(90deg, rgba(24,11,255,1) 0%, rgba(121,9,119,1) 100%);
    }
    transition: background 1s ease-in;
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
            headerText: 'Covid Wire Login',
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
        // console.log('Connection status', this.state.unsuccessfulConnection)
        this.setState({
            unsuccessfulConnection: !this.state.unsuccessfulConnection
        })
    }

    handleSignIn = async (event) => {
        event.preventDefault();
        let  { email, password } = this.state;
        // #toDo: move this URL to .env variables
        const url = 'https://authenticationapi-dot-coronawire-2020.uc.r.appspot.com/authenticate'
        if (this.validateEmail(email)) {
            try { 
                let authenticationResult = await axios.post(url, {
                    email: email, //varEmail is a variable which holds the email
                    password: password
                })
                console.log('Authentication result', authenticationResult);
                let accessToken = authenticationResult.data.user.stsTokenManager.accessToken;
                // Set token in the local storage to avoid authentication on Refresh
                localStorage.setItem('token', accessToken);

                // console.log(authenticationResult)
                store.dispatch(authenticateUser(true));
                try {
                    this.storeEmailInLocalStorage(); // Makes sure that the email is stored in local storage for the future
                    this.props.history.push('/authenticatedLogin');
                } catch(error) {
                    console.error('History not changed successfully.')
                }
            } catch (error) {
                // console.error('Firebase authentication unsuccessful');
                console.error(`Error caught in authentication function`)
                console.log(error);
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

    goToNewsFeed = () => {
        this.props.history.push('/');
    }

    render() {
        // console.log('Re-rendered unsuccessfulConnectionStatus', this.state.unsuccessfulConnection)
        return(
            <ModeratorContainerWrapper>
            <Header>
                <HeaderLink onClick={this.goToNewsFeed}> Go to News Feed </HeaderLink>
            </Header>
            <LoginBoxWrapper>
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
                </LoginBoxWrapper>
            </ModeratorContainerWrapper>


        )
    }
}

export default ModeratorLoginContainer;
