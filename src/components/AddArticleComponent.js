// Add Article Component
// As the name suggests, will display fields that will allow moderators to manually
// add an article to the database, if deemed worthy of being displayed in our revolutionary
// and greatly designed application

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
const urlMetaData = require('url-metadata');
// Internal Modules

const AddArticleWrapper = styled.div`
    width: 100%;
    background-color: white;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const LeftURLWrapper = styled.div`
    height: auto;
    width: 50%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
`;

const RightDataWrapper = styled.div`
    height: auto;
    width: 50%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const URLWrapper = styled.div`
    height: 40px;
    width: 80%;
    background-color: transparent;
    margin-top: 50px;
    margin-left: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const URLText = styled.p`
    font-size: 15px;
    color: black;
    font-weight: 600;
    display: inline-block;
`

const URLInput = styled.input`
    height: 32px;
    width: 200px;
    background-color: white;
    border-style: black;
    border-radius: 5px;
    border-color: black;
    border-width: 1px;
    display: inline-block;
    margin-left: 15px;
`

const URLButton = styled.button`
    height: 32px;
    background-color: transparent;
    color: white;
    margin-left: 20px;
    width: 150px;
    text-align: center;
    border-radius: 5px;
    border-style: none;
    cursor: pointer;
    outline: none;
`

const DataWrapper = styled.div`
    width: 60%;
    background-color: red;
    border-radius: 5px; 
    margin-top: 50px;
    padding-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 50px;
`

const DataPointWrapper = styled.div`
    width: 320px;
    background-color: transparent;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const DataPointTitle = styled.p`
    width: 33%;
    background-color: transparent;
    font-size: 15px;
    color: black;
    text-align: center;
`

const DataPointShortText = styled.input`
    display: inline-block;
    background-color: transparent;
    width: 80%;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 5px;
    margin-left: 20px;
    margin-right: 20px;
    height: 34px;
`

const DataPointLongText = styled.textarea`
    display: inline-block;
    background-color: transparent;
    width: 80%;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 5px;
    margin-left: 20px;
    margin-right: 20px;
    height: 200px;
`

class AddArticleComponent extends Component {
    constructor(props){
        super(props);
        this.state = { 
            // Empty for now 
            articleURL: ''
        }
    }

    fetchArticleMetaData = async () => {
        try {
            urlMetaData(this.state.articleURL).then(
            function (metadata) { // success handler
                console.log(metadata)
            },
            function (error) { // failure handler
                console.log(error)
            })
        } catch (error) {
            console.error(`Error caught in fetchArticleMetaData ${error}`)
        }
    }

    handleChange = (event) => {
        this.setState({
        [event.target.id]: event.target.value,
        });
    };

    // #toDo: add article_id UUID on spot
    // # what's source_id? id?

    render(){
        console.log('New url is', this.state.articleURL);

        return(
            <AddArticleWrapper>
                
                <LeftURLWrapper>
                    <URLWrapper>
                        <URLText> Add URL </URLText>
                        <URLInput type='text' id='articleURL' onChange={this.handleChange} />
                        <URLButton onClick={this.fetchArticleMetaData}> Fetch Article Data </URLButton>
                    </URLWrapper>
                </LeftURLWrapper>
                <RightDataWrapper>
                    <DataWrapper>
                        <DataPointWrapper >
                            <DataPointTitle>
                                URL
                            </DataPointTitle>
                            <DataPointShortText id='url'/>
                        </DataPointWrapper>
                        <DataPointWrapper >
                            <DataPointTitle>
                                Title
                            </DataPointTitle>
                            <DataPointShortText id='title' />
                        </DataPointWrapper>
                        <DataPointWrapper>
                            <DataPointTitle>
                                Author
                            </DataPointTitle>
                            <DataPointShortText id='author' />
                        </DataPointWrapper>
                        <DataPointWrapper>
                            <DataPointTitle>
                                Source
                            </DataPointTitle>
                            <DataPointShortText id='source' />
                        </DataPointWrapper>
                        <DataPointWrapper>
                            <DataPointTitle>
                                City
                            </DataPointTitle>
                            <DataPointShortText id='city'/>
                        </DataPointWrapper>
                        <DataPointWrapper>
                            <DataPointTitle>
                                Region
                            </DataPointTitle>
                            <DataPointShortText id='region' />
                        </DataPointWrapper>
                        <DataPointWrapper>
                            <DataPointTitle>
                                State
                            </DataPointTitle>
                            <DataPointShortText id='state'/>
                        </DataPointWrapper>
                        <DataPointWrapper>
                            <DataPointTitle>
                                Content
                            </DataPointTitle>
                            <DataPointLongText id='content'/>
                        </DataPointWrapper>
                    </DataWrapper>
                </RightDataWrapper>
            </AddArticleWrapper>
        )
    }
}

export default AddArticleComponent;
