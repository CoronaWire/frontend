// Contains HTML wrapper used in both "ModeratorArticleFeedComponent"
// and "ModeratorArticleComponent"
// Used to divide the parent component in four sub-sections

import styled from 'styled-components';

export const TinyLayoutSpace = styled.div`
    width: 4%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const LargeLayoutSpace = styled.div`
    height: 100%;
    width: 46%;
    background-color: transparent;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: center;
    align-items: center;
`

export const MediumLayoutSpace = styled.div`
    height: 100%;
    width: 25%;
    background-color: transparent;
    padding-left: 20px;
    justify-content: center;
    align-items: center;
`

export const SmallLayoutSpace = styled.div`
    height: 100%;
    width: 16%;
    background-color: transparent;
    padding-left: 40px;
    justify-content: center;
    align-items: center;
`