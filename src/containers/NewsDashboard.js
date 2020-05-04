// News Dashboard Container which holds the MenuSelectionComponent, NewsListComponent/Container
// and RightSideFeedContainer

// External Packages
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// Internal Modules
import NewsDashboardComponent from '../components/MainDashboardComponent';
import InformationFeedComponent from '../components/InformationFeedComponent';
import { media } from './../helpers/media';
import { ClientLayout } from './../layout/ClientLayout';

const NewsDashboard = () => {
  const isLocalScope = useSelector(({ newsFeed: { scope } = {} }) => scope === 'local');
  return (
    <ClientLayout
      renderRight={() => isLocalScope && (
        <InformationFeedComponent />
      )}
    >
      <NewsDashboardComponent />
    </ClientLayout>
  );
};

export default NewsDashboard;
