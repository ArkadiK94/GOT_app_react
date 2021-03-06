import React, {useState,useEffect} from 'react';
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

function RandomChar () {
    const [char,setChar] = useState({});
    const [loading,updateLoading] = useState(true);
    const [error, setError] = useState(false);

    const getChar = new GetGotInfo();

    const setNewChar = (newChar)=>{
        setChar(newChar);
        updateLoading(false);
    }
    const setErrors = ()=>{
        setError(true);
        updateLoading(false);
    }
    const getRendomChar = ()=>{
        const newId = Math.floor(Math.random() *500 +25);
        getChar.getCharacter(newId)
            .then(newChar=>setNewChar(newChar))
            .catch(() => setErrors());
    }
    useEffect (()=>{
        getRendomChar();
        const intervalOn = setInterval(getRendomChar,1500);
        return ()=>clearInterval(intervalOn);
    },[]);

    
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

export default RandomChar;