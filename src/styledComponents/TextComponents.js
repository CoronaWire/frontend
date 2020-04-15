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
    font-size: 16px;
`

export const UnderlinedMediumText = styled.p`
    font-size: 15px;
    color: #6558F5;
    background-color: transparent;
    border-bottom-style: solid;
    border-bottom-color: #6558F5;
    border-bottom-width: 2px;
    margin-top: 0px;
    margin-bottom: 0px;
    display: inline-block;
    width: 35px;
    text-align: center;
    &:hover {
        font-weight: 600;
        width: 40px;
    }
`
