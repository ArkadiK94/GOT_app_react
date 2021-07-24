import React,{Component} from 'react';
import {Col, Row, Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import Error from '../error';
import {CharPage,BookPage,HousePage,BookItems} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import styled from 'styled-components';
import bgImg from './img/got.jpeg';

const AppClazz = styled.div `
    overflow-x: hidden;
    background: url(${bgImg}) center center no-repeat;
    background-size: cover;
    font-size: 16px;
    height: 100vh;	
`;
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
            <Router>
                <AppClazz> 
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
                        <Route path='/' exact component={MainPage}/>
                        <Route path='/characters' exact component={CharPage}/>
                        <Route path='/houses' exact component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' component={
                            ({match})=>{
                                const {id} = match.params;
                                return <BookItems id={id}/>
                            }
                        }/>
                    </Container>
                </AppClazz>
            </Router>
        );
    }
};

const MainPage = ()=>{
    return(
        <Row>
            <Col lg={{size: 6, offset: 3}}>
                <Form className="d-flex flex-column align-items-center">
                    <FormGroup className="d-flex flex-column align-items-center">
                        <Label className="text-uppercase text-primary" for="email">Please, live your email to send you updates</Label>
                        <Input className="border border-primary border-5 rounded-pill" type="email" name="email" id="email" placeholder="email" />
                    </FormGroup>
                    <Button color="info" size="200">Submit</Button>
                </Form>
            </Col>
        </Row>
    )
}

