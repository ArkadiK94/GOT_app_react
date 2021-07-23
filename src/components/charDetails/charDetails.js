import React, {Component} from 'react';
import {ListGroup,ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import GetGotInfo from '../../services';
import Error from '../error';
import Loading from '../loading';

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
const SelectError = styled.h1`
    color: #000;
    text-align: center;
    font-size: 36px;
`;
const MainBlock = styled.div`
    min-height: 300px;
    background-color: #fff;
    padding: 5px;
    padding-right: 20px 
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default class CharDetails extends Component {
    getChar = new GetGotInfo();

    state = {
        char: null,
        error: false,
        loading: false
    }
    setError = (error)=>{
        this.setState({error});
    }
    updateChoosenChar = ()=> {
        const {id} = this.props;
        if(!id){
            return
        }
        this.getChar.getCharacter(id)
            .then(res=>{
                this.setState(()=>{
                    return{
                        char: res,
                        loading: false
                    }
                })
            })
            .catch(()=>{
                this.setState({error:true})
            });
        this.setState({loading:true});

    }
    componentDidMount(){
        this.updateChoosenChar();
    }
    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            this.updateChoosenChar();
        }
    }
    componentDidCatch(){
        this.setState({
            error:true
        })
    }
    render() {
        const {char,error,loading} = this.state;
        if(error){
            return(
                <Error/>
            )
        }
        if(!char){
            return(
                <MainBlock>
                    <SelectError>Pls choose a character from the list</SelectError>
                </MainBlock>
            )
        }
        if(loading){
            return(
                <Loading/>
            )
        }
        const {name,gender,born,died,culture} = char;
        
        return (
            <CharDetailsClazz className="rounded">
                <h4>{name}</h4>
                <ListGroup flush>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Gender</Term>
                        <span>{gender}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Born</Term>
                        <span>{born}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Died</Term>
                        <span>{died}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Culture</Term>
                        <span>{culture}</span>
                    </ListGroupItem>
                </ListGroup>
            </CharDetailsClazz>
        );
    }
}