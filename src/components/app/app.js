import React,{Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import Error from '../error';
import CharPage from '../pages/charPage';
import GetGotInfo from '../../services';
import BookPage from '../pages/bookPage';
import HousePage from '../pages/housePage';


export default class App extends Component{
    state = {
        show: true,
        error: false
    }
    getService = new GetGotInfo();
    onToggle = ()=>{
        const {show} = this.state;
        this.setState({show:!show});
    }
    componentDidCatch(){
        this.setState({error:true});
    }
    render(){
        const {error,show} = this.state;
        if(error){
            return(
                <Error/>
            )
        }
        const showNow = show ? <RandomChar/>: "";
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {showNow}
                            <Button 
                                color="primary mb-5"
                                onClick={this.onToggle}>
                                    Toggle Random
                            </Button>
                        </Col>
                    </Row>
                    <CharPage getService={this.getService}/>
                    <HousePage getService={this.getService}/>
                    <BookPage getService={this.getService}/>
                </Container>
            </>
        );
    }
};

