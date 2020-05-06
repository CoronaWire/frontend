// News Source Filter Component
// Filter from News Sources

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules

const NewsSourceFilterWrapper = styled.div`
    background-color: red;
    display: flex;
    min-height: 64px;
    flex-direction: row;
    justify-content: left;
    align-items: center;
`

const FilterBarWrapper = styled.div`
    height: auto;
    background-color: orange;
    display: flex,
    flex-direction: row;
    margin-left: 20px;
    justify-content: center;
    align-items: center;
    width: auto;
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
`

const DropDownListOption = styled.option`
    height: 60px;
    background-color: transparent;
    color: black;
`

const NewsSourceList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 100%;
`

const NewsSourceWrapper = styled.div`
    border-radius: 20px;
    margin-right: 15px;
    height: 40px;
    width: auto;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    min-width: 30px;
    border: solid 1px grey;
    background-color: white;
    &:hover {
        background-color: white;
        border: solid 1px black;
    }
    display: inline-block;
`;

const NewsSourceText = styled.p`
    font-weight: 600;
    color: black;
    font-size: 15px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    text-align: center;
    width: 80%;
    height: 100%;
    box-sizing: border-box;
    margin-top: 0px;
    margin-bottom: 0px;
    display: inline-block;
    background-color: green;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 40px;

`

const NewsSourceCancelButton = styled.p`
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    &:hover { 
        color: red;
    }
    text-align: center;
    width: 20%;
    height: 100%;
    font-size: 15px;
    box-sizing: border-box;
    margin-top: 0px;
    margin-bottom: 0px;
    display: inline-block;
    background-color: blue;
    margin-left: 10px;
    padding-left: 8px;
    padding-right: 8px;
    line-height: 40px;
`

class NewsSourceFilterComponent extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {

        const optionsList = this.props.newsSourceArray.map((newsSourceURL) => {
            return <DropDownListOption value={newsSourceURL} id={newsSourceURL} >
                {newsSourceURL}
            </DropDownListOption>
        })

        const NewsFilters = this.props.newsSourceFilterArray.map((newsSourceURL) => {
            return <NewsSourceWrapper>
                    <NewsSourceText>
                        {newsSourceURL}
                    </NewsSourceText>
                    <NewsSourceCancelButton>
                        x
                    </NewsSourceCancelButton>
                </NewsSourceWrapper>
        });
        
        return (
            <NewsSourceFilterWrapper>
                <FilterBarWrapper>
                    <FilterBarTitle>
                        Add News Source to Filter: 
                    </FilterBarTitle>
                    <DropDownListWrapper onChange={(event) => this.props.addNewsSourceToFilter(event.target.value)}>
                        {
                            optionsList
                        }
                    </DropDownListWrapper>
                </FilterBarWrapper>
                <FilterBarWrapper>
                    {NewsFilters}
                </FilterBarWrapper>
            </NewsSourceFilterWrapper>
        )
    }
}

export default NewsSourceFilterComponent;
