// Contains HTML wrapper used in both "ModeratorArticleFeedComponent"
// and "ModeratorArticleComponent"
// Used to divide the parent component in sub-sections of differing sizes

import styled from 'styled-components';

export const TinyGrid = styled.div`
    width: 6%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LargeGrid = styled.div`
    height: 100%;
    width: 44%;
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
    display: flex;
`

export const SmallGrid = styled.div`
    height: 100%;
    width: 16%;
    background-color: transparent;
    padding-left: 40px;
    justify-content: center;
    align-items: center;
`

export const SmallerGrid = styled.div`
    height: 100%;
    width: 12%;
    background-color: transparent;
    padding-left: 20px;
    justify-content: center;
    align-items: center;
`

export const SmallestGrid = styled.div`
    width: 8%;
    height: 100%;
    background-color: transparent;
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
