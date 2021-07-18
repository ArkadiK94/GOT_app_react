import React, {Component} from 'react';
import {ListGroup,ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import GetGotInfo from '../../services';
import Loading from '../loading';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;
const Term = styled.span`
    font-weight: bold;
`;

export default class RandomChar extends Component {
    constructor(){
        super();
        this.getRendomChar();
    }
    state = {
        char: {},
        loading : true
    }
    getRendomChar = ()=>{
        const newId = Math.floor(Math.random() *500 +25);
        const newService = new GetGotInfo();
        newService.getCharacter(newId)
        .then(newChar=>{
            this.setState({
                char: newChar,
                loading: false
            });
        });
    };
    render() {
        const {char,loading} = this.state;
        // if(loading){
        //     return(
                
        //     )
        // }
        return (
            <RandomBlock className="rounded">
                <Loading/>
            </RandomBlock>
        );
    }
}

const View = ({char})=>{
    const {name,gender,born,died,culture} = char;
    return(
        <div>
            <h4>Random Character: {name || "no-data :("}</h4>
            <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Gender </Term>
                    <span>{gender  || "no-data :("}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Born </Term>
                    <span>{born  || "no-data :("}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Died </Term>
                    <span>{died  || "no-data :("}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Culture </Term>
                    <span>{culture  || "no-data :("}</span>
                </ListGroupItem>
            </ListGroup>
        </div>
    )
}
