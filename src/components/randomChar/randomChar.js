import React, {Component} from 'react';
import {ListGroup,ListGroupItem} from 'reactstrap';
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
    state = {
        char: {},
        loading : true,
        error : false,
        interval : null
    }

    getChar = new GetGotInfo();

    getRendomChar = ()=>{
        const newId = Math.floor(Math.random() *500 +25);
        this.getChar.getCharacter(newId)
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
    }
    componentDidMount(){
        this.getRendomChar();
        const intervalOn = setInterval(this.getRendomChar,1500);
        this.setState(()=>{
            return {
                interval : intervalOn
            }
        })
    }
    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    componentDidCatch(){
        console.log("reandomChar");
    }

    render() {
        const {char,loading,error} = this.state;
        const load = loading ? <Loading/>: '';
        const err = error? <Error/>: '';
        const view = (!(loading || error))? <View char={char}/>: "";
        return (
            <>
                <div className="rounded">
                    {load}
                    {err}
                    {view}
                </div>
            </>
        );
    }
}

const View = ({char})=>{
    const {name,gender,born,died,culture} = char;
    return(
        <RandomBlock className="rounded">
            <h4>Random Character: {name}</h4>
            <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Gender </Term>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Born </Term>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Died </Term>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <Term>Culture </Term>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </RandomBlock>
    )
}
