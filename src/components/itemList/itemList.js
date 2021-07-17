import React, {Component} from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';

const ItemListClazz = styled.div `
    cursor: pointer;
`

export default class ItemList extends Component {

    render() {
        return (
            <ItemListClazz>
                <ListGroupItem>
                    John Snow
                </ListGroupItem>
                <ListGroupItem>
                    Brandon Stark
                </ListGroupItem>
                <ListGroupItem>
                    Geremy
                </ListGroupItem>
            </ItemListClazz>
        );
    }
}