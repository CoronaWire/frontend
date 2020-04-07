// Styled component for the Email input used in the UserLoginContainer and RetrievePasswordContainer
import styled from 'styled-components';


// #toDo: change the name of the InputForLoginSignUp

const LoginInput = styled.input`
    border-bottom: solid 1px ${props => props.theme.applicationGeneralColor};
    color: ${props => props.theme.applicationGeneralColor};
    position: relative;
    width: ${props => props.theme.adminLoginStyling.buttonInputWidth};
    display: block;
    padding: 10px;
    margin: 10px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    outline: none;
    &:placeholder {
        color: grey;
    }
    font-size: ${props => props.theme.adminLoginStyling.textSize};
`

export default LoginInput;
