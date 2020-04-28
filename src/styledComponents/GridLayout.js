// Contains HTML wrapper used in both "ModeratorArticleFeedComponent"
// and "ModeratorArticleComponent"
// Used to divide the parent component in sub-sections of differing sizes

import styled from 'styled-components';

export const TinyGrid = styled.div`
    width: 4%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LargeGrid = styled.div`
    height: 100%;
    width: 46%;
    background-color: transparent;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: center;
    align-items: center;
`

export const MediumGrid = styled.div`
    height: 100%;
    width: 25%;
    background-color: transparent;
    padding-left: 20px;
    justify-content: center;
    align-items: center;
`

export const SmallGrid = styled.div`
    height: 100%;
    width: 16%;
    background-color: transparent;
    padding-left: 40px;
    justify-content: center;
    align-items: center;
`

export const HalfGrid = styled.div`
    height: 100%;
    width: 50%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`
