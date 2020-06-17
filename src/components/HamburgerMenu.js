import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import noScroll from 'no-scroll';
import { Container, LogoIcon, CloseIcon, HamburgerIcon } from './core';
import LeftClientMenuComponent from './LeftClientMenuComponent';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.newsColors.secondary};
  padding-top: 12px;
`;

const Spacer = styled.div`
  width: 24px;
  height: 100%;
`;

const TopContainer = styled(Container)`
  padding: 0 16px;
  margin-bottom: 20px;
`;

export const HamburgerMenu = () => {
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    if (visible) {
      noScroll.on();
    } else {
      noScroll.off();
    }
    return () => {
      noScroll.off();
    };
  }, [visible]);

  return (
    <React.Fragment>
      <HamburgerIcon
        onClick={() => setVisibility(true)}
      />
      {visible && (
        <Wrapper>
          <TopContainer align="center" width="100%" justify="space-between">
            <CloseIcon onClick={() => setVisibility(false)} />
            <LogoIcon width="137px" />
            <Spacer />
          </TopContainer>
          <LeftClientMenuComponent />
        </Wrapper>
      )}
    </React.Fragment>
  );
};
