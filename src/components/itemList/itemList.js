import React, {useState,useEffect} from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import Error from '../error';
import Loading from '../loading';


const ItemListClazz = styled.div `
    cursor: pointer;
    padding-bottom: 30px;
`

function ItemList ({onItemClick,renderValues,getServiceFunc}){  
    const [arrayValuesNow,setArrayValuesNow] = useState(null);
    const [error,setError] = useState(false);
    const [loading,updateLoading] = useState(false);
    
    const setArrayInfo = (arrayValue)=>{
        if(arrayValue){
            updateLoading(false);
            setArrayValuesNow(arrayValue)
        } else{
            setError(true);
        }
    }
    useEffect(()=>{
        if(getServiceFunc){
            getItemValue(getServiceFunc);
        } else{
            setError(true);
        }
    },[]);
    const getItemValue = (getServiceFunction)=>{
        updateLoading(true);
        getServiceFunction()
            .then(res=>{
                const arrayValues = res.map((item)=>{
                    const {id} = item;
                    console.log()
                    return (
                        <ListGroupItem 
                            key={id} 
                            onClick={()=>onItemClick(id)}>
                                {renderValues(item)}
                        </ListGroupItem>
                    );
                }); 
                setArrayInfo(arrayValues);
            })
            .catch(()=>{
                setError(true);
            });
    }

    
    if(error){
        return(
            <Error/>
        )
    } else if(loading){
        return(
            <Loading/>
        )
    } else {
        return (
            <ItemListClazz>
                {arrayValuesNow}
            </ItemListClazz>
        )
    }
}

export default ItemList;