import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
    min-height: 300px
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
` 
const Error = ()=>{
    return(
        <ErrorContainer>
            <h1>Sorry,something went wrong</h1>
            <img src={process.env.PUBLIC_URL+'/img/ezgif.com-gif-maker.webp'} width="100%" height="100%" alt="Error img"/>
        </ErrorContainer>
    )
}
export default Error;