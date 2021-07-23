import React,{Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import Error from '../error';
import CharPage from '../CharPage';

export default class App extends Component{
    state = {
        show: true,
        error: false
    }
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
                    <CharPage/>
                </Container>
            </>
        );
    }
};

