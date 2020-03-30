// Text component with cursor pointer to make it look like a link used throughout application

import styled from 'styled-components';

const LinkTypeText = styled.span`
    font-size: ${props => props.GlobalTheme.adminLoginStyling.textSize};
    color: ${props => props.GlobalTheme.applicationInputColor};
    cursor: pointer;
    font-weight: 500;
    padding: 10px;
    box-sizing: border-box;
`

export default LinkTypeText;