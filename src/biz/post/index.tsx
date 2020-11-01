import * as React from 'react';
// import {PageRound}from './paginate'
import PostAdd from './add'
import PostPage from './page'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
// const StyledDiv = styled.div`
//     margin: 10px;
//     border:2px solid #dede00;
// `
interface IRouterProp {
    history: any,
    match: any,
    location: any,
}
export default ({match}:IRouterProp) => {

    // const [current, setCurrent] = useState(10)

    return (
        <div>
            {/* <PageRound current={current} ext={3} maxRight={20}></PageRound> */}
            {/* <StyledDiv><PostAdd></PostAdd></StyledDiv> */}
           
            <Route path={`${match.path}/add`} component={PostAdd} />
            <Route exact path={match.path} component={PostPage} />
            
        </div>
    );
}