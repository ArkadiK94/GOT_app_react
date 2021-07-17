import React, {Component} from 'react';
import './charDetails.css';
import {ListGroup,ListGroupItem} from 'reactstrap';
import styled from 'styled-components';

const CharDetailsClazz = styled.div `
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4{
        margin-bottom: 20px;
        text-align: center;
    }
`;
const Term = styled.span `
    font-weight: bold;
` ;


export default class CharDetails extends Component {

    render() {
        return (
            <CharDetailsClazz className="rounded">
                <h4>John Snow</h4>
                <ListGroup flush>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Gender</Term>
                        <span>male</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Born</Term>
                        <span>1783</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Died</Term>
                        <span>1820</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Culture</Term>
                        <span>First</span>
                    </ListGroupItem>
                </ListGroup>
            </CharDetailsClazz>
        );
    }
}