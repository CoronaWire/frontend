// Main Dashboard Component = renders the News Aggregation

// External Packages
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
// Internal Modules
import LoginButton from '../styledComponents/LoginButton';
import GlobalTheme from '../styledComponents/GlobalTheme';
// Components
import SingleNewsComponent from '../components/SingleNewsComponent';
import { media } from './../helpers/media';

// #toDo: make paddingLeft and marginLeft below 30px

const Button = styled(LoginButton)`
    background-color: white;
    color: black;
    border-radius: 5px;
    border: 1px solid #D3D3D3;
    width: auto;
    margin: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    box-sizing: border-box;
    height: 32px;
    &:hover {
      background-color: #F0F0F0;
    }
    ${({ active }) => active && css`
      border: none;
      color: white;
      background-color: #828282;
      &:hover {
        background-color: #828282;
      }
    `};
`;

const ButtonsContainer = styled.div`
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16px;

    ${Button} {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }

    ${media.mobile`
      margin-top: -8px;
      ${Button} {
        margin-top: 8px;
        margin-right: 8px;
      }
    `};
`;

// #toFix: resizing of the button when the bottom border is added
const ScopeButton = styled.button`
    width: auto;
    min-width: 50px;
    height: 100%;
    outline: none;
    background-color: white;
    color: black;
    border-bottom-style: solid;
    border-bottom-color: ${({ underlined }) => underlined ? 'black': 'white'};
    border-bottom-width: 2px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
    cursor: pointer;
    ${media.aboveMobile`
      &:hover {
        background-color: #F0F0F0;
      };
    `};
    box-sizing: border-width;
`;

const ScopeWrapper = styled.div`
    background-color: transparent;
    height: 40px;
    width: 100%
    border-bottom-style: solid;
    border-bottom-color: black;
    border-bottom-width: 3px;
    justify-content: flex-start;
    display: flex;
`

// #toFix: set margin-left and right of both styled components through Global Theming or through
// # a common stylesheet for a single source of truth
// #toFix: also centralize border-radius of article cards
// #important #toFix: height now set as a static amount of pixels. should be proportions?
const NewsListWrapper = styled.div`
    background-color: transparent;
    overflow-y: auto;
    margin-top: 20px;

`;

const OuterWrapper = styled.div`
  ${media.mobile`
    padding: 0 16px;
  `};
`;

// #toDo: enable different layout between different newsType (twitter vs. "formal" news outlet)
class MainDashboardComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: ['Health', 'Food', 'Public Services', 'Social', 'Housing', 'Labor'], // #toDecide : Finalize number of categories and type of categories
            scope: ['Local', 'National'], // #toDecide : is national news going to be on the side or is it going to be part of the main
            scopeClicked: 'Local',
            news: [
              {
                timeStamp: '12 min',
                title: 'Drive-through novel coronavirus (COVID-19) testing available by appointment at Stanford',
                summary: `
                  Drive-through appointments for Stanford Medicine COVID-19 test are available for patients who have been referred.
                  Drive-through appointments for Stanford Medicine COVID-19 test are available for patients who have been referred.
                `,
                source: 'Stanford Health Care',
                newsType: 'Website',
              },
                {timeStamp: '1 hour', title: 'Several SF police officers self-quarantined after coronavirus exposure', summary: 'A janitor who worked at a Sodo office park that houses several Seattle Police Department training and support units recently tested positive for COVID-19', source: 'SF Chronicle', newsType: 'Website'},
                {timeStamp: '1 d', title: 'Researchers from Taiwan find cure for COVID-19.', summary: "It's all in the title. Enough said.", source: 'NY Times', newsType: 'Website'},
            ]
        }
    }

    // handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    
    handleScopeClick = (value) => {
        this.setState({scopeClicked: value})
    }

    // #toDo: figure out the clicked state of the categories button, same grey color?

    render(){
        return(
          <OuterWrapper>
            {false && (
              <ButtonsContainer>
                {this.state.categories.map((value, index) => (
                  <Button key={index}>{value}</Button>
                ))}
              </ButtonsContainer>
            )}
            <ScopeWrapper>
              {this.state.scope.map((value, index) => (
                <ScopeButton
                  key={index}
                  value={value}
                  onClick={e => this.handleScopeClick(e.target.value)}
                  underlined={this.state.scopeClicked == value}
                >
                  {value}
                </ScopeButton>
              ))}
            </ScopeWrapper>
            <NewsListWrapper>
              {this.state.news.map((newsObject, index) => (
                <SingleNewsComponent key={index} props={newsObject} />
              ))}
            </NewsListWrapper>
          </OuterWrapper>
        )
    }
}

export default MainDashboardComponent;
