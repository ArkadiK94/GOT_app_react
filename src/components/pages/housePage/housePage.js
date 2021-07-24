import React,{Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails,{Filed} from '../../itemDetails';
import Error from '../../error';
import RowBlock from '../../rowBlock';

export default class HousePage extends Component{
    state ={
        houseId: null,
        error: false
    }
    onHouseClick = (id)=>{
        this.setState({houseId: id});
    }
    componentDidCatch(){
        this.setState({error:true});
    }
    render(){
        const {error,houseId} = this.state;
        const {getService} = this.props;
        if(error){
            return(
                <Error/>
            )
        }
        const itemList = (
            <ItemList 
                onItemClick={this.onHouseClick} 
                getServiceFunc={getService.getAllHouses}
                renderValues = {(item)=>`${item.name}`}
            />
        );
        const itemDetails = (
            <ItemDetails 
                getServiceFunc={getService.getHouse}
                id={houseId}>
                    <Filed label='Region' filed='region'/>
                    <Filed label='Words' filed='words'/>
                    <Filed label='Titles' filed='titles'/>
                    <Filed label='Seats' filed='seats'/>
            </ItemDetails>
        );
        return(
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}