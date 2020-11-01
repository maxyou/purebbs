import React,{useState} from 'react';
// import {PageRound}from './paginate'
import Edit from './edit'
import Page from './page'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
const StyledDiv = styled.div`
    margin: 10px;
    border:2px solid #dede00;
`
interface IRouterProp {
    history: any,
    match: any,
    location: any,
}
export default ({match}:IRouterProp) => {

    return (
        <div>
           
            <Route path={`${match.path}/edit`} component={Edit} />
            <Route exact path={match.path} component={Page} />
            
        </div>
    );
}