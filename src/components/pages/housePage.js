import React,{Component} from 'react';
import ItemList from '../itemList';
import ItemDetails,{Filed} from '../itemDetails';
import Error from '../error';
import RowBlock from '../rowBlock';
import GetGotInfo from '../../services';


export default class HousePage extends Component{
    state ={
        houseId: null,
        error: false
    }
    getService = new GetGotInfo();

    onHouseClick = (id)=>{
        this.setState({houseId: id});
    }
    componentDidCatch(){
        this.setState({error:true});
    }
    render(){
        const {error,houseId} = this.state;
        if(error){
            return(
                <Error/>
            )
        }
        const itemList = (
            <ItemList 
                onItemClick={this.onHouseClick} 
                getServiceFunc={this.getService.getAllHouses}
                renderValues = {(item)=>`${item.name}`}
            />
        );
        const itemDetails = (
            <ItemDetails 
                getServiceFunc={this.getService.getHouse}
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