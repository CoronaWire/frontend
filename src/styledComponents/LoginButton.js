// Styled Component for CoronaWire's general Button
// Component stored in StyledComponents folder for now because it might be renamed and re-utilized across
// the application later on

import styled from 'styled-components';

const LoginButton = styled.button`
    background-color: ${props => props.theme.adminLoginStyling.buttonColor};
    width: ${props => props.theme.adminLoginStyling.buttonInputWidth};
    border-radius: ${props => props.theme.generalApplication.borderRadius};;
    color: white;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-top: 18px;
    margin-bottom: 13px;
    margin-left: 13px;
    margin-right: 13px;
    display: block;
    box-sizing: content-box;
    outline: none;
    font-size: ${props => props.theme.adminLoginStyling.textSize};
    cursor: pointer;
`
  
export default LoginButton;
