// Styled component for the Email input used in the UserLoginContainer and RetrievePasswordContainer
import styled from 'styled-components';


// #toDo: change the name of the InputForLoginSignUp

const LoginInput = styled.input`
    border-bottom: solid 1px ${props => props.GlobalTheme.applicationGeneralColor};
    color: ${props => props.GlobalTheme.applicationGeneralColor};
    position: relative;   
    width: ${props => props.GlobalTheme.adminLoginStyling.buttonInputWidth};
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
    font-size: ${props => props.GlobalTheme.adminLoginStyling.textSize};
`

export default LoginInput;