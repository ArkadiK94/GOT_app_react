import React, {Component} from 'react';
import {ListGroup,ListGroupItem,Button} from 'reactstrap';
import styled from 'styled-components';
import GetGotInfo from '../../services';
import Loading from '../loading';
import Error from '../error';

const RandomBlock = styled.div`
    min-height: 300px
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
    constructor(props){
        super(props);
        this.getRendomChar();
    }
    state = {
        char: {},
        loading : true,
        error : false,
        showNow : true
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
        })
        .catch(() => {
            this.setState({
                error: true,
                loading: false
            });
        });
    };
    setShowNow = ()=>{
        const {show} = this.props;
        this.setState({showNow:show})
        this.props.onToggle(show);
    }
    render() {
        const {char,loading,error,showNow} = this.state;
        const load = loading ? <Loading/>: '';
        const err = error && showNow ? <Error/>: '';
        const view = (!(loading || error) && showNow)? <View char={char}/>: "";
        return (
            <>
                <div className="rounded">
                    {load}
                    {err}
                    {view}
                </div>
                <Button 
                    color="primary mb-5"
                    onClick={this.setShowNow}>Toggle Random</Button>
            </>
        );
    }
}

const View = ({char})=>{
    const {name,gender,born,died,culture} = char;
    return(
        <RandomBlock className="rounded">
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
        </RandomBlock>
    )
}
