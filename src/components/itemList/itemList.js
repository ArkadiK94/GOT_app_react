import React, {Component} from 'react';
import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import GetGotInfo from '../../services';
import Error from '../error';
import Loading from '../loading';

const ItemListClazz = styled.div `
    cursor: pointer;
    padding-bottom: 30px;
`

export default class ItemList extends Component {
    getCharArray = new GetGotInfo();
    
    state = {
        arrayNamesNow: null,
        error: false,
        loading: false
    }

    getCharsName = ()=>{
        this.getCharArray.getAllCharacters()
            .then(res=>{
                this.setState(()=>{
                    const {onCharClick} = this.props;
                    const arrayNames = res.map((char)=>{
                        const {id} = char;
                        return (
                            <ListGroupItem 
                                key={id} 
                                onClick={()=>onCharClick(id)}>
                                    {char.name}
                            </ListGroupItem>
                        );
                    });
                    return{
                        arrayNamesNow: arrayNames,
                        loading: false
                    }
                });
            })
            .catch(()=>{
                this.setState({error:true})
            });
        this.setState({loading:true})
        
    }

    componentDidMount(){
        this.getCharsName();
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
                {this.state.arrayNamesNow}
            </ItemListClazz>
        );
    }
}