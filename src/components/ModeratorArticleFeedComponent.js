// Moderator Article Feed Component
// Component that shows the moderator the article feeds, whether they are approved, rejected, or pending

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules

const ActionAndFilterWrapper = styled.div`
    width: 100%;
    height: 110px;
    background-color: white;
    display: flex;
    flex-direction: row;
    padding-top: 20px;
`

const FilterWrapper = styled.div`
    width: 70%;
    height: auto;
    box-sizing: content-box;
    background-color: transparent;
    display: flex;
    flex-direction: column;
`

const DropDownMenuWrapper = styled.div`
    width: auto;
    height: 50px;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const DropDownText = styled.h3`
    width: 80px;
    font-size: 17px;
    color: black;
    font-weight: 600;
    display: inline-block;
    background-color: transparent;
    margin-left: 20px;
    margin-right: 10px;
`

const DropDownMenuPlaceholder = styled.div`
    height: 30px;
    width: 200px;
    background-color: transparent;
    border-radius: 5px;
    display: inline-block;
    margin-left: 25px;
    border-style: solid;
    border-width: 1px;
    border-color: black;
`

const PublishRejectWrapper = styled(FilterWrapper)`
    width: 30%;
`

const ButtonWrapper = styled(DropDownMenuWrapper)`
    justify-content: flex-end;
    padding-right: 14px;
`

// #toRemember: height of drop down and button needs to be the same
// store in global theme?

const Button = styled.div`
    background-color: ${props => props.buttonType === 'Publish' ? 'purple' : 'red'};
    height: 30px;
    width: 90px;
    border-radius: 5px;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

class ModeratorArticleFeedComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterLocation: '',
            filterArticleStatus: '',
            sortBy: '',
        }
    }

    render(){
        return(
            <>
            <ActionAndFilterWrapper>
                <FilterWrapper>
                    <DropDownMenuWrapper>
                        <DropDownText> Show: </DropDownText>
                        <DropDownMenuPlaceholder />
                        <DropDownMenuPlaceholder />
                    </DropDownMenuWrapper>
                    <DropDownMenuWrapper>
                        <DropDownText> Sort by: </DropDownText>
                        <DropDownMenuPlaceholder />
                    </DropDownMenuWrapper>
                </FilterWrapper>
                <PublishRejectWrapper>
                    <ButtonWrapper>
                        <Button buttonType={'Reject'}> Reject </Button>
                        <Button buttonType={'Publish'}> Publish </Button>
                    </ButtonWrapper>
                </PublishRejectWrapper>
            </ActionAndFilterWrapper>
            </>
        )
    }
}

export default ModeratorArticleFeedComponent;
