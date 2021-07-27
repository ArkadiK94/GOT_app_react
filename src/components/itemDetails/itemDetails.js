import React, {useState,useEffect} from 'react';
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

function ItemDetails ({id,getServiceFunc,children}) {
    const [item,setItem] = useState(null);
    const [error,setError] = useState(false);
    const [loading,updateLoading]= useState(false);
    const [prevId,updateId]= useState(0);

    const setItemWithLoad = (res)=>{
        setItem(res);
        updateLoading(false);
    }
    const updateChoosenItem = (getServiceFunction)=> {
        if(!id){
            return
        }
        updateLoading(true);
        updateId(id);
        getServiceFunction(id)
            .then(res=>setItemWithLoad(res))
            .catch(()=>setError(true));

    }
    useEffect(()=>{
        if(id !== prevId){
            updateChoosenItem(getServiceFunc);
        }
    });
    if(error){
        return(
            <Error/>
        )
    }else if(!item){
        return(
            <MainBlock>
                <SelectError>Pls choose an item from the list</SelectError>
            </MainBlock>
        )
    }else if(loading){
        return(
            <Loading/>
        )
    } else {
        return (
            <ItemDetailsClazz className="rounded">
                <h4>{item.name}</h4>
                <ListGroup flush>
                    {
                        React.Children.map(children,(child)=>{
                            return React.cloneElement(child,{item})
                        })
                    }
                </ListGroup>
            </ItemDetailsClazz>
        );
    }
    
    
    
}

export default ItemDetails;
export {Filed};                
                    