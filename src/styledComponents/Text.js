// Styled components that will hold the different types of texts used throughout the application

import styled from 'styled-components';

export const ErrorText = styled.div`
    color: red;
    font-size: 12px;
`
export const SmallText = styled.p`
    font-size: 12px;
    color: black;
    background-color: transparent;
    font-weight: 600;
`

export const MediumText = styled(SmallText)`
    font-size: 14px;
`;

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

export const GradientText = styled.p`
    color: rgb(24,11,255);
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
    outline: none;
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
`;
