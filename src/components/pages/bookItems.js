import React,{Component} from 'react';
import GetGotInfo from '../../services';
import ItemDetails,{Filed} from '../itemDetails';
import styled from 'styled-components';


const BookItemsBlock = styled.div`
    width: 50%;
    margin: 0 auto;
`;

export default class BookItems extends Component{
    state ={
        bookId: null,
        error: false
    }
    getService = new GetGotInfo();
    setId = ()=>{
        const {id} = this.props;
        this.setState({bookId:id});
    }
    componentDidMount(){
        this.setId();
    }
    render(){
        const {bookId} = this.state;
        return(
            <BookItemsBlock>
                <ItemDetails 
                    getServiceFunc={this.getService.getBook}
                    id={bookId}>
                        <Filed label='Number Of Pages' filed='numberOfPages'/>
                        <Filed label='Country' filed='country'/>
                        <Filed label='Released' filed='released'/>
                </ItemDetails>
            </BookItemsBlock>
        )
    }
}