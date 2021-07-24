import React,{Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails,{Filed} from '../../itemDetails';
import Error from '../../error';
import RowBlock from '../../rowBlock';


export default class CharPage extends Component{
    state ={
        charId: null,
        error: false
    }
    onCharClick = (id)=>{
        this.setState({charId: id});
    }
    componentDidCatch(){
        this.setState({error:true});
    }
    render(){
        const {error,charId} = this.state;
        const {getService} = this.props;
        if(error){
            return(
                <Error/>
            )
        }
        const itemList = (
            <ItemList 
                onItemClick={this.onCharClick} 
                getServiceFunc={getService.getAllCharacters}
                renderValues = {(item)=>`${item.name}(${item.gender})`}
            />
        );
        const itemDetails = (
            <ItemDetails 
                getServiceFunc={getService.getCharacter}
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
