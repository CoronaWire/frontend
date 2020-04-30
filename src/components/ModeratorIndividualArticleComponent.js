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

const ContentDisplayChoiceWrapper = styled.div`
    height: 40px;
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: row;
`

const ContentDisplayTypeButton = styled.button`
    height: 100%;
    width: 33%;
    background-color: ${props => props.contentTypeDisplayed === props.currentButtonType ? 'green' : 'transparent'};
    text-align: center;
    outline: none;
    cursor: pointer;
    color: black;
    font-size: 16px;
    font-weight: 600;
    border-top-style: solid;
    border-top-width: 4px;
    border-top-color: transparent;
    &:hover {
        border-top-style: solid;
        border-top-width: 4px;
        border-top-color: green;
    }
`

const TextContent = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
    padding-left: 120px;
    padding-right: 120px;
    font-size: 15px;
    font-weight: 500;
    padding-top: 40px;
    padding-bottom: 40px;
    line-height: 20px;
    text-justify: auto;

`

class ModeratorIndividualArticleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Empty for now
            title: props.articleObject.title,
            content: props.articleObject.content,
            source: props.articleObject.source_id,
            state: props.articleObject.state,
            author: props.articleObject.author,
            summary: props.articleObject.summary,
            city:  props.articleObject.city,
            country: props.articleObject.country,
            contentTypeDisplayed: 'IFrame',
            articleURL: props.articleObject.article_url,
            outline: 'https://outline.com/' + props.articleObject.article_url
        }
    }

    handleChange = (event) => {
        this.setState({
        [event.target.id]: event.target.value,
        });
    };

    changeContentDisplay = (contentType) => {
        this.setState({
            contentTypeDisplayed: contentType
        })
    }

    render(){
        return (
            <IndividualArticleWrapper>
                <HalfGrid>
                    <ArticleDataWrapper>
                        <InputWrapper>
                            <InputTitle>
                            Title
                            </InputTitle>
                            <MediumTextField id='title' value={this.state.title} onChange={this.handleChange} />
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            Author
                            </InputTitle>
                            <MediumTextField id='author' value={this.state.author} onChange={this.handleChange} />
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            URL
                            </InputTitle>
                            <MediumTextField id='url' value={this.state.articleURL} onChange={this.handleChange} />
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            Summary
                            </InputTitle>
                            <MediumTextField id='summary' value={this.state.summary} onChange={this.handleChange} />
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            Specificity
                            </InputTitle>
                            <SmallTextField id='specificity' value={this.state.specificity} onChange={this.handleChange} >
                            </SmallTextField>
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            City
                            </InputTitle>
                            <SmallTextField id='city' value={this.state.city} onChange={this.handleChange} />
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            State
                            </InputTitle>
                            <SmallTextField id='state' value={this.state.state} onChange={this.handleChange}/>
            
                        </InputWrapper>
                        <InputWrapper>
                            <InputTitle>
                            Country
                            </InputTitle>
                            <SmallTextField id='country' value={this.state.country} onChange={this.handleChange}>
                            </SmallTextField>
                        </InputWrapper>
                    </ArticleDataWrapper>
                </HalfGrid>
                <HalfGrid>
                    <ContentDisplayChoiceWrapper>
                        <ContentDisplayTypeButton onClick={() => this.changeContentDisplay('Outline')} contentTypeDisplayed={this.state.contentTypeDisplayed} currentButtonType={'Outline'} > Outline </ContentDisplayTypeButton>
                        <ContentDisplayTypeButton onClick={() => this.changeContentDisplay('IFrame')} contentTypeDisplayed={this.state.contentTypeDisplayed} currentButtonType={'IFrame'} > IFrame </ContentDisplayTypeButton>
                        <ContentDisplayTypeButton onClick={() => this.changeContentDisplay('Text')} contentTypeDisplayed={this.state.contentTypeDisplayed} currentButtonType={'Text'}> Text </ContentDisplayTypeButton>                       
                    </ContentDisplayChoiceWrapper>
                    {
                        this.state.contentTypeDisplayed === 'Outline' &&  <IFrame src={`${this.state.outline}`} />
                    }
                    {
                        this.state.contentTypeDisplayed === 'IFrame' &&  <IFrame src={`${this.props.articleObject.article_url}`} />
                    }
                    {
                        this.state.contentTypeDisplayed === 'Text' &&  <TextContent> {this.state.content} </TextContent>
                    }
                </HalfGrid>
            </IndividualArticleWrapper>
        )
    }
}

export default ModeratorIndividualArticleComponent;
