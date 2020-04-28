// Moderator Individual Article Component
// Component displaying selected article's current data, also allowing moderators to edit said data, and 
// approve / reject article

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import { HalfGrid } from '../styledComponents/GridLayout';

const IndividualArticleWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #dfe6ed;
    display: flex;
    flex-direction: row;
`;

const ArticleDataWrapper = styled.div`
    width: 90%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    margin: auto auto;
    margin-bottom: 50px;
    padding-bottom: 50px;
`;

const InputTitle = styled.p`
    background-color: transparent;
    font-size: 14px;
    color: black;
    margin-bottom: 5px;
    display: inline-block;
    font-weight: 600;
`;

const MediumTextField = styled.textarea`
    background-color: white;
    border: solid 2px #B8C4CF;
    height: 120px;
    width: 90%;
    max-width: 90%;
    min-width: 90%;
    max-height: 100px;
    min-height: 100px;
    outline: none;
    border-radius: 5px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
`;

const SmallTextField = styled(MediumTextField)`
    background-color: white;
    border: solid 2px #b8c4cf;
    height: 100px;
    width: 90%;
    max-width: 90%;
    min-width: 90%;
    max-height: 35px;
    min-height: 35px;
    outline: none;
    border-radius: 5px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
`

const InputWrapper = styled.div`
    background-color: transparent;
    display: flex;
    flex-direction: column;
`

const IFrame = styled.iframe`
    height: 100%;
    width: 100%;
    border-style: none;
`


class ModeratorIndividualArticleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Empty for now

        }
    }

    handleChange = (event) => {
        this.setState({
        [event.target.id]: event.target.value,
        });
    };

    render(){
        return (
            <IndividualArticleWrapper>
                <HalfGrid>
                    <ArticleDataWrapper>
                        <InputWrapper>
                            <InputTitle>
                            Title
                            </InputTitle>
                            <MediumTextField id='title' value={this.props.articleObject.title} onChange={this.handleChange} />
                            
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            Content
                            </InputTitle>
                            <MediumTextField id='content' value={this.props.articleObject.content} onChange={this.handleChange} />
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            Scope
                            </InputTitle>
                            <SmallTextField id='scope'>
                            </SmallTextField>
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            Source
                            </InputTitle>
                            <SmallTextField id='source'>
                            </SmallTextField>
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            Region
                            </InputTitle>
                            <SmallTextField id='region'>
                            </SmallTextField>
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            City
                            </InputTitle>
                            <SmallTextField id='city'>
                            </SmallTextField>
                        </InputWrapper>
                    </ArticleDataWrapper>
                </HalfGrid>
                <HalfGrid>
                    <IFrame src={`${this.props.articleObject.article_url}`} />
                </HalfGrid>
            </IndividualArticleWrapper>
        )
    }
}

export default ModeratorIndividualArticleComponent;
