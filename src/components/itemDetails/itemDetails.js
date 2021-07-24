import React, {Component} from 'react';
import {ListGroup,ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import Error from '../error';
import Loading from '../loading';

const ItemDetailsClazz = styled.div `
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

const Filed =({item,label,filed})=>{
    return(
        <ListGroupItem className="d-flex justify-content-between">
            <Term>{label}</Term>
            <span>{item[filed]}</span>
        </ListGroupItem>
    )
}

export default class ItemDetails extends Component {
    state = {
        item: null,
        error: false,
        loading: false
    }
    setError = (error)=>{
        this.setState({error});
    }
    setItem = (res)=>{
        this.setState(()=>{
            return{
                item: res,
                loading: false
            }
        })
    }
    updateChoosenItem = (getServiceFunc)=> {
        const {id} = this.props;
        if(!id){
            return
        }
        this.setState({loading:true});

        getServiceFunc(id)
            .then(res=>this.setItem(res))
            .catch(()=>this.setState({error:true}));

    }
    componentDidMount(){
        const getServiceFunc = (this.props.getServiceFunc);
        this.updateChoosenItem(getServiceFunc);
    }
    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            const getServiceFunc = (this.props.getServiceFunc);
            this.updateChoosenItem(getServiceFunc);
        }
    }
    componentDidCatch(){
        this.setState({
            error:true
        })
    }
    render() {
        const {item,error,loading} = this.state;
        if(error){
            return(
                <Error/>
            )
        }
        if(!item){
            return(
                <MainBlock>
                    <SelectError>Pls choose an item from the list</SelectError>
                </MainBlock>
            )
        }
        if(loading){
            return(
                <Loading/>
            )
        }
        const {name} = item;
        
        return (
            <ItemDetailsClazz className="rounded">
                <h4>{name}</h4>
                <ListGroup flush>
                    {
                        React.Children.map(this.props.children,(child)=>{
                            return React.cloneElement(child,{item})
                        })
                    }
                </ListGroup>
            </ItemDetailsClazz>
        );
    }
}

export {Filed};                
                    