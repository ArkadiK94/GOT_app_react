import React,{Component} from 'react';
import ItemList from '../itemList';
import ItemDetails,{Filed} from '../itemDetails';
import Error from '../error';
import RowBlock from '../rowBlock';
import GetGotInfo from '../../services';



export default class CharPage extends Component{
    state ={
        charId: null,
        error: false
    }
    getService = new GetGotInfo();

    onCharClick = (id)=>{
        this.setState({charId: id});
    }
    componentDidCatch(){
        this.setState({error:true});
    }
    render(){
        const {error,charId} = this.state;
        if(error){
            return(
                <Error/>
            )
        }
        const itemList = (
            <ItemList 
                onItemClick={this.onCharClick} 
                getServiceFunc={this.getService.getAllCharacters}
                renderValues = {(item)=>`${item.name}(${item.gender})`}
            />
        );
        const itemDetails = (
            <ItemDetails 
                getServiceFunc={this.getService.getCharacter}
                id={charId}>
                    <Filed label='Gender' filed='gender'/>
                    <Filed label='Born' filed='born'/>
                    <Filed label='Died' filed='died'/>
                    <Filed label='Culture' filed='culture'/>
            </ItemDetails>
        );
        return(
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}
