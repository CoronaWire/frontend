// News Source Filter Component
// Filter from News Sources

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules


const NewsSourceFilterWrapper = styled.div`
    background-color: transparent;
    display: flex;
    min-height: 64px;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    overflow-x: auto;
    width: 100%;
    height: 100%;
`

const FilterBarWrapper = styled.div`
    height: auto;
    background-color: transparent;
    display: flex,
    flex-direction: row;
    margin-left: 20px;
    justify-content: center;
    align-items: center;
    width: auto;
    padding-right: 20px;
`

const FilterBarWrapperOverflow = styled.div`
    overflow-x: scroll;
    width: 60%;
    height: 100%;
    background-color: transparent;
    white-space: nowrap;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-left: 20px;
    border-left: 2px solid #DFE6ED
`

const FilterBarTitle = styled.p`
    font-size: 15px;
    text-align: left;
    margin-right: 20px;
    display: inline-block;
    font-weight: 500;
`;

const FilterBarInput = styled.input`
    width: 150px;
    height: 30px;
    background-color: blue;
    outline: none;
    display: ineline-block;
    border-radius: 10px;
    border-style: solid;
    border-color: black;
`;

const DropDownListWrapper = styled.select`
    width: 180px;
    font-size: 14px;
    background-color: white;
    color: black;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 4px;
    display: inline-block;
    outline: none;
`

const DropDownListOption = styled.option`
    height: 60px;
    background-color: transparent;
    color: black;
`

const NewsSourceWrapper = styled.div`
    margin-left: 15px;
    height: 40px;
    width: auto;
    cursor: pointer;
    min-width: 30px;
    border: solid 1px transparent;
    background-color: white;
    &:hover {
        background-color: white;
    }
    display: inline-block;
    flex: 0 0 auto;
`; 
// border: solid 1px black;

const NewsSourceText = styled.p`
    font-weight: 600;
    color: black;
    font-size: 13px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    text-align: center;
    height: 100%;
    box-sizing: border-box;
    margin-top: 0px;
    margin-bottom: 0px;
    display: inline-block;
    border-left: solid #6558f5 1px;
    border-top: solid #6558f5 1px;
    border-bottom: solid #6558f5 1px;
    border-right: solid white 1px;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 40px;
    background-color: white;
`

const NewsSourceCancelButton = styled.p`
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    &:hover { 
        color: #6558f5;
    }
    text-align: center;
    width: 40px;
    height: 100%;
    font-size: 13px;
    box-sizing: border-box;
    margin-top: 0px;
    margin-bottom: 0px;
    display: inline-block;
    padding-left: 8px;
    padding-right: 8px;
    line-height: 40px;
    border-right: solid #6558f5 1px;
    border-top: solid #6558f5 1px;
    border-bottom: solid #6558f5 1px;
    border-left: solid white 1px;
    background-color: white
`

class NewsSourceFilterComponent extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {

        // Creates an array of options populated by all the news sources available in the database
        const optionsList = this.props.newsSourceArray.map((newsSourceURL) => {
            return <DropDownListOption value={newsSourceURL} id={newsSourceURL} >
                {newsSourceURL}
            </DropDownListOption>
        })

        // Creates buttons representing each news sources used as an extra filter to moderate the articles
        // Has an 'x' on the side, representing a delete operation, which allows the moderator to remove the
        // news source from the filtering 
        const NewsFilters = this.props.newsSourceFilterArray.map((newsSourceURL) => {
            return <NewsSourceWrapper>
                    <NewsSourceText>
                        {newsSourceURL}
                    </NewsSourceText>
                    <NewsSourceCancelButton onClick={() => this.props.deleteNewsSourceFromFilter(newsSourceURL)}>
                        x
                    </NewsSourceCancelButton>
                </NewsSourceWrapper>
        });
        
        return (
            <NewsSourceFilterWrapper>
                <FilterBarWrapper>
                    <FilterBarTitle>
                        News Sources filter: 
                    </FilterBarTitle>
                    <DropDownListWrapper onChange={(event) => this.props.addNewsSourceToFilter(event.target.value)}>
                        {/* Added here so that the first option is not a source but an empty space. 'placeholder' value added
                        so that the function can detect when the blank place is clicked and know that it isn't a newsSourceURL to
                        add to the newsSourceFilterArray in the parent component (ModeratorCurateComponent)'s state  */}
                        <DropDownListOption value='placeholder'/> 
                        {
                            optionsList
                        }
                    </DropDownListWrapper>
                </FilterBarWrapper>
                <FilterBarWrapperOverflow>
                    {NewsFilters}
                </FilterBarWrapperOverflow>
            </NewsSourceFilterWrapper>
        )
    }
}

export default NewsSourceFilterComponent;
