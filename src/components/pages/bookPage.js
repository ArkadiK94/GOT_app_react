import React,{Component} from 'react';
import ItemList from '../itemList';
import Error from '../error';
import GetGotInfo from '../../services';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

const BookBlock = styled.div`
    width: 50%;
    margin: 0 auto;
`;


class BookPage extends Component{
    state ={
        error: false
    }
    getService = new GetGotInfo();
    componentDidCatch(){
        this.setState({error:true});
    }
    render(){
        const {error} = this.state;
        if(error){
            return(
                <Error/>
            )
        }
        return(
            <BookBlock>
                <ItemList 
                    onItemClick={(itemId)=>{
                        this.props.history.push(itemId);
                    }} 
                    getServiceFunc={this.getService.getAllBooks}
                    renderValues = {(item)=>`${item.name}(${item.released})`}
                />
            </BookBlock>
        )
    }
}

export default withRouter(BookPage);