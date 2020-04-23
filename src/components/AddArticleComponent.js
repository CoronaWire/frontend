// Add Article Component
// As the name suggests, will display fields that will allow moderators to manually
// add an article to the database, if deemed worthy of being displayed in our revolutionary
// and greatly designed application

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
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
    width: 30%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    min-width: 335px;
`;

const RightDataWrapper = styled.div`
    height: auto;
    width: 70%;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 20px;
`;

const URLWrapper = styled.div`
    width: 80%;
    background-color: transparent;
    margin-top: 50px;
    margin-left: 40px;
    display: flex;
    flex-direction: column;
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
    outline: none;
    padding-left: 5px;
`

const URLButton = styled.button`
    height: 32px;
    background-color: black;
    color: white;
    margin-top: 20px;
    width: 150px;
    text-align: center;
    border-radius: 5px;
    border-style: none;
    cursor: pointer;
    outline: none;
`

const SubmitDataButton = styled(URLButton)`
    width: 80%;
    margin: 15px auto;

`

const DataWrapper = styled.div`
    width: 48%;
    background-color: transparent;
    border-radius: 5px; 

    display: flex;
    flex-direction: column;
    min-width: 320px;
`


const DataPointWrapperRow = styled.div`
    width: auto;
    background-color: transparent;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const DataPointWrapperColumn = styled(DataPointWrapperRow)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

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
    padding: 5px;
    outline: none;
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
    height: 175px;
    padding: 5px;
    max-height: 361px;
    min-height: 130px;
    min-width: 199px;
    outline: none;
`

class AddArticleComponent extends Component {
    constructor(props){
        super(props);
        this.state = { 
            // Empty for now 
            articleURL: ''
        }
    }

    // fetchArticleMetaData = async () => {
    //     try {

    //     } catch (error) {
    //         console.error(`Error caught in fetchArticleMetaData ${error}`)
    //     }
    // }

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
                        <DataPointWrapperRow >
                            <DataPointTitle>
                                URL
                            </DataPointTitle>
                            <DataPointShortText id='url'/>
                        </DataPointWrapperRow>
                        <DataPointWrapperRow >
                            <DataPointTitle>
                                Title
                            </DataPointTitle>
                            <DataPointShortText id='title' />
                        </DataPointWrapperRow>
                        <DataPointWrapperRow>
                            <DataPointTitle>
                                Author
                            </DataPointTitle>
                            <DataPointShortText id='author' />
                        </DataPointWrapperRow>
                        <DataPointWrapperRow>
                            <DataPointTitle>
                                Source
                            </DataPointTitle>
                            <DataPointShortText id='source' />
                        </DataPointWrapperRow>
                        <DataPointWrapperRow>
                            <DataPointTitle>
                                City
                            </DataPointTitle>
                            <DataPointShortText id='city'/>
                        </DataPointWrapperRow>
                        <DataPointWrapperRow>
                            <DataPointTitle>
                                Region
                            </DataPointTitle>
                            <DataPointShortText id='region' />
                        </DataPointWrapperRow>
                        <DataPointWrapperRow>
                            <DataPointTitle>
                                Country
                            </DataPointTitle>
                            <DataPointShortText id='country'/>
                        </DataPointWrapperRow>
                        <DataPointWrapperRow >
                            <DataPointTitle>
                                Specificity
                            </DataPointTitle>
                            <DataPointShortText id='specificity' />
                        </DataPointWrapperRow>
                        <DataPointWrapperRow >
                            <DataPointTitle>
                                Category
                            </DataPointTitle>
                            <DataPointShortText id='specificity' />
                        </DataPointWrapperRow>
                        <DataPointWrapperRow >
                            <DataPointTitle>
                                Positivity
                            </DataPointTitle>
                            <DataPointShortText id='specificity' />
                        </DataPointWrapperRow>
                    </DataWrapper>
                    <DataWrapper>
                        <DataPointWrapperColumn >
                            <DataPointTitle>
                                Language
                            </DataPointTitle>
                            <DataPointShortText id='language' />
                        </DataPointWrapperColumn>
                        <DataPointWrapperColumn>
                            <DataPointTitle>
                                Content
                            </DataPointTitle>
                            <DataPointLongText id='content'/>
                        </DataPointWrapperColumn>
                        <DataPointWrapperColumn>
                            <DataPointTitle>
                                Summary
                            </DataPointTitle>
                            <DataPointLongText id='summary'/>
                        </DataPointWrapperColumn>
                        <SubmitDataButton> Submit </SubmitDataButton>
                    </DataWrapper>
                </RightDataWrapper>
            </AddArticleWrapper>
        )
    }
}

export default AddArticleComponent;
