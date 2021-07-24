import React,{Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails,{Filed} from '../../itemDetails';
import Error from '../../error';
import RowBlock from '../../rowBlock';

export default class BookPage extends Component{
    state ={
        bookId: null,
        error: false
    }
    onBookClick = (id)=>{
        this.setState({bookId: id});
    }
    componentDidCatch(){
        this.setState({error:true});
    }
    render(){
        const {error,bookId} = this.state;
        const {getService} = this.props;
        if(error){
            return(
                <Error/>
            )
        }
        const itemList = (
            <ItemList 
                onItemClick={this.onBookClick} 
                getServiceFunc={getService.getAllBooks}
                renderValues = {(item)=>`${item.name}(${item.released})`}
            />
        );
        const itemDetails = (
            <ItemDetails 
                getServiceFunc={getService.getBook}
                id={bookId}>
                    <Filed label='Authors' filed='authors'/>
                    <Filed label='Country' filed='country'/>
                    <Filed label='Released' filed='released'/>
            </ItemDetails>
        );
        return(
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}