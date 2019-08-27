import React,{useState} from 'react';
// import {PageRound}from './paginate'
import Add from './add'
import Edit from './edit'
import Page from './page'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
const StyledDiv = styled.div`
    margin: 10px;
    border:2px solid #dede00;
`
export default ({match}) => {

    // const [current, setCurrent] = useState(10)

    return (
        <div>
            {/* <PageRound current={current} ext={3} maxRight={20}></PageRound> */}
            {/* <StyledDiv><PostAdd></PostAdd></StyledDiv> */}
           
            <Route path={`${match.path}/edit`} component={Edit} />
            <Route exact path={match.path} component={Page} />
            
        </div>
    );
}