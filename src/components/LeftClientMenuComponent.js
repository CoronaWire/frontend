// Left Menu Component = News, Numbers, CoronaVirus Facts

import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import LeftMenuButtonComponent from './LeftMenuComplexButtonComponent';
import DividingLine from '../styledComponents/DividingLine';

// #toDo: Needs to be connected to parent component, Dashboard and send up the actual news

const LeftMenuWrapper = styled.div`
  background-color: transparent;
  width: 100%
`

const Separator = styled(DividingLine)`
  ${({ theme }) => `background-color: ${theme.newsColors.midGrey}`};
  margin: 32px 24px 16px;
`;
// #toDo: move margin-top to GlobalTheming to ensure that it'll be shared across the Dashboard middle title
// and the main menu buttons


class LeftClientMenuComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
          menuOptions: [
             {
               menuTitle: 'News',
               menuSubtitle: "Learn what's reported locally"
             },
             {
               menuTitle: 'About Covid-Wire',
               menuSubtitle: 'Donate & learn about the site'
             },
             {
               menuTitle: 'COVID-19 Facts',
               menuSubtitle: 'Knowledge on the Virus'
             }
          ],
      }
    }

    render(){
        return(
            <LeftMenuWrapper>
              {this.state.menuOptions.map((menuObject, index) => (
                <LeftMenuButtonComponent active={!index} props={menuObject} key={index} />
              ))}
              <Separator />
            </LeftMenuWrapper>
        )
    }
}

export default LeftClientMenuComponent;
