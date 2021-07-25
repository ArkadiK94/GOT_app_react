import React,{Component} from 'react';
import {Col, Row, Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import Error from '../error';
import {CharPage,BookPage,HousePage,BookItems} from '../pages';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 
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
                    <Switch>
                        <Route path='/' exact render={()=>{
                            return(
                                <AppHeaderPromo 
                                    showNow={showNow} 
                                    onToggle={this.onToggle} 
                                    component={<MainPage/>}/>
                            )
                        }}/>
                        <Route path='/characters/' exact render={()=>{
                            return(
                                <AppHeaderPromo 
                                    showNow={showNow} 
                                    onToggle={this.onToggle} 
                                    component={<CharPage/>}/>
                            )
                        }}/>
                        <Route path='/houses/' exact render={()=>{
                            return(
                                <AppHeaderPromo 
                                    showNow={showNow} 
                                    onToggle={this.onToggle} 
                                    component={<HousePage/>}/>
                            )
                        }}/>
                        <Route path='/books/' exact render={()=>{
                            return(
                                <AppHeaderPromo 
                                    showNow={showNow} 
                                    onToggle={this.onToggle} 
                                    component={<BookPage/>}/>
                            )
                        }}/>
                        <Route path='/books/:id' exact render={
                            ({match})=>{
                                const {id} = match.params;
                                console.log(match);
                                if(id < 11 && id >=1){
                                    return(
                                        <AppHeaderPromo 
                                            showNow={showNow} 
                                            onToggle={this.onToggle} 
                                            component={<BookItems id={id}/>}/>
                                    )
                                }
                                return(
                                    <ErrorPage404/>
                                )
                                
                            }
                        }/>
                        <Route render={()=>{
                            return(
                                <ErrorPage404/>
                            )
                        }}/>
                    </Switch>
                    
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

const ErrorPage404 = ()=>{
    return(
        <div className="d-flex flex-column align-items-center mt-5">
            <h1 className="text-light">404 Page Not Found</h1>
            <Button color="info">
                <Link to="/">
                    go to main page
                </Link>
            </Button>
        </div>
    )
}
class AppHeaderPromo extends Component{
    render(){
        return(
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {this.props.showNow}
                            <Button 
                                color="primary mb-5"
                                onClick={this.props.onToggle}>
                                    Toggle Random
                            </Button>
                        </Col>
                    </Row>
                    {this.props.component}
                </Container>
            </>
        )
    }
}