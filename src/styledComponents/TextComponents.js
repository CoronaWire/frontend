// Styled components that will hold the different types of texts used throughout the application

import styled from 'styled-components';

export const ErrorText = styled.div`
    color: red;
    font-size: 12px;
`

export const MediumText = styled.p`
    font-size: 14px;
    color: black;
    font-weight: 600;
    background-color: transparent;
    display: inline-block;
`

export const SmallText = styled(MediumText)`
    font-size: 12px;
`
export const LargeText = styled(MediumText)`
    font-size: 15px;
`

export const UnderlinedMediumText = styled.div`
    font-size: 15px;
    color: #8779F1;
    background-color: transparent;
    margin-top: 0px;
    margin-bottom: 0px;
    display: inline;
    width: auto;
    text-align: left;
    &:hover {
        border-bottom-color: #8779F1;
        font-weight: 600;
    }
    cursor: pointer;
`

// border-bottom-style: solid;
// border-bottom-color: #6558F5;
// border-bottom-width: 2px;
