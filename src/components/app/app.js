import React,{Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
// import GetGotInfo from '../../services'

export default class App extends Component{
    state = {
        show: true
    }
    onToggle = ()=>{
        const {show} = this.state;
        this.setState({show:!show});
    }

    render(){
        const {show} = this.state;
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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

