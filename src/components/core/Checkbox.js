// Core Checkbox Componnet

import React, { Component } from 'react';
import styled from 'styled-components';

const CheckboxDiv = styled.div`
    height: 10px;
    width: 10px;
    background-color: ${props => props.checked === true ? 'black' : 'white'};
    border: 1px black solid;
    outline: none;
    cursor: pointer;
    border-radius: 3px;
`

export class Checkbox extends Component {
    constructor(props){
        super(props);
        this.state = {
            checked: this.props.selected,
        }
    }

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    render(){
        return (
            <CheckboxDiv onClick={this.toggleCheckbox} checked={this.state.checked} />
        )
    }
}

