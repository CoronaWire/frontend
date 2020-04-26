// Moderator Dashboard Container 

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules

// #altCode #altDesign: previous design for menu. will delete when UX finalized.
// import LeftModeratorMenuComponent from '../components/LeftModeratorMenuComponent';
// import GlobalTheme from '../styledComponents/GlobalTheme';

import ModeratorCurateComponent from '../components/ModeratorCurateComponent';
import AddArticleComponent from '../components/AddArticleComponent';

// #toDo: move all of these to styledComponent folder

const DashboardWrapper = styled.div`
    width: 100%;
    height: ${({ theme }) => `calc(100vh - ${theme.moderatorHeaderHeight})`};
    background-color: transparent;
    display: flex;
    flex-direction: row;
`

// #altCode #altDesign
// const LeftSideContainer = styled.div`
//     width: 20%;
//     height: 100%;
//     background-color: white;
// `

const MiddleContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: transparent;
    overflow-y: scroll;
`

class ModeratorDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
            pageDisplayed: 'ArticleFeed'
        }
    }

    handlePageChange = (pageName) => {
        this.setState({
            pageDisplayed: pageName
        })
    }

    // #toDo: remove one of the wrappers, it's repetitive. 
    render(){
        return(
            <DashboardWrapper>
                {/* <LeftSideContainer GlobalTheme={GlobalTheme} >
                    <LeftModeratorMenuComponent handlePageChange={this.handlePageChange} />
                </LeftSideContainer> */}
                {/* <MiddleContainer> */}
                    {
                        this.state.pageDisplayed === 'ArticleFeed' && <ModeratorCurateComponent /> 
                    }
                    
                    {
                        this.state.pageDisplayed === 'AddArticle'  && false && <AddArticleComponent />
                    }
                {/* </MiddleContainer> */}
            </DashboardWrapper>
        )
    }
}

// #toUpgrade: Information Feed Component currently only holds one component (Global News) but needs
// to be extended to also hold a National News component 

export default ModeratorDashboard;
