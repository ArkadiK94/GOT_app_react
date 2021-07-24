import React, {Component} from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import Error from '../error';
import Loading from '../loading';


const ItemListClazz = styled.div `
    cursor: pointer;
    padding-bottom: 30px;
`

export default class ItemList extends Component {    
    state = {
        arrayValuesNow: null,
        error: false,
        loading: false
    }
    setArrayInfo = (arrayValues)=>{
        this.setState(()=>{
            return{
                arrayValuesNow: arrayValues,
                loading: false
            }
        });
    }
    getItemValue = (getServiceFunc)=>{
        this.setState({loading:true});
        getServiceFunc()
            .then(res=>{
                const {onItemClick,renderValues} = this.props;
                const arrayValues = res.map((item)=>{
                    const {id} = item;
                    return (
                        <ListGroupItem 
                            key={id} 
                            onClick={()=>onItemClick(id)}>
                                {renderValues(item)}
                        </ListGroupItem>
                    );
                }); 
                this.setArrayInfo(arrayValues);
            })
            .catch(()=>{
                this.setState({error:true})
            });
    }

    componentDidMount(){
        const getServiceFunc = (this.props.getServiceFunc);
        this.getItemValue(getServiceFunc);
    }
    componentDidCatch(){
        this.setState({
            error:true
        })
    }
    render() {
        const {error,loading} = this.state;
        
        if(error){
            return(
                <Error/>
            )
        }
        if(loading){
            return(
                <Loading/>
            )
        }
        return (
            <ItemListClazz>
                {this.state.arrayValuesNow}
            </ItemListClazz>
        );
    }
}

