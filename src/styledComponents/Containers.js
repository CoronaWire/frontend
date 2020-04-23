// Containers
// General child row and column container that will be used to display child components as rows
// or as columns

import styled from 'styled-components';

export const RowWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`

export const ColumnWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`