// Positioned Wrappers
// Contains a series of div elements that have inherent margin positioning in terms of it's parent container

import styled from 'styled-components';

export const LeftPositionedWrapper = styled.div`
    height: 100%;
    background-color: transparent;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;


export const RightPositionedWrapper = styled.div`
    height: 100%;
    background-color: transparent;
    margin-right: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;