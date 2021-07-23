import React,{Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import Error from '../error';


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
        if(error){
            return(
                <Error/>
            )
        }
        return(
            <Row>
                <Col md='6'>
                    <ItemList onCharClick={this.onCharClick}/>
                </Col>
                <Col md='6'>
                    <CharDetails id={charId}/>
                </Col>
            </Row>
        )
    }
}