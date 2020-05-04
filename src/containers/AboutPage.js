// External Packages
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// Internal Modules
import { media } from './../helpers/media';
import { ClientLayout } from './../layout/ClientLayout';
import { GetInTouch } from './../components/GetInTouch';
import { AboutContent } from './../components/AboutContent';

export const AboutPage = () => (
  <ClientLayout
    renderRight={() => <GetInTouch />}
  >
    <AboutContent />
  </ClientLayout>
);
