import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ align }) => align && `align-items: ${align}`};
  ${({ bg }) => bg && `background: ${bg}`};
  ${({ flexColumn }) => flexColumn && `flex-direction: column`};
`;
