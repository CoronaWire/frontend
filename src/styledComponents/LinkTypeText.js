// Text component with cursor pointer to make it look like a link used throughout application

import styled from 'styled-components';

const LinkTypeText = styled.span`
    font-size: ${props => props.theme.adminLoginStyling.textSize};
    color: ${props => props.theme.applicationInputColor};
    cursor: pointer;
    font-weight: 500;
    padding: 10px;
    box-sizing: border-box;
`

export default LinkTypeText;
