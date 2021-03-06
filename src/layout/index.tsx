import React, { Fragment } from 'react';
import styled from 'styled-components'

import { Switch, BrowserRouter, HashRouter, Route, Redirect } from 'react-router-dom'

import Appbar from './appbar'
import Content from './content'

import * as Info from '../info'

const DivLayout = styled.div`
    // padding: 15px;
    // background-color: #F8F8FF;
    display: flex;
    justify-content: center;
    `
const GridWrapper = styled.div`
    // padding: 15px;
    max-width:1280px;
    width:1152px;
    min-width:768px;
    // background-color: #DCDCDC;
    display: grid;
    
    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas:
            "ab ab ab ab"
            "ct ct ct nf"
            "ft ft ft ft";
    }
    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas:
            "ab ab ab"
            "ct ct ct"
            "nf nf nf"
            "ft ft ft";
    }

    
`
const GridAppbar = styled.div`
    // padding: 5px;
    // background-color: #00ff00; 
    margin: 0 0 10px 0;
    grid-area: ab;
`
const GridContent = styled.div`
    // padding: 5px;
    margin: 0 10px 10px 0;
    background-color: #E1FFFF;
    border: 0.5px solid #dddddd;
    min-height: 500px;
    grid-area: ct;
    `
const GridNotify = styled.div`
    // padding: 5px;
    min-height: 300px;
    background-color: #FFFFF0; 
    margin: 0 0 10px 0;
    grid-area: nf;
`
const GridFooter = styled.div`
    padding: 5px;
    background-color: white; 
    border: 0.5px solid #dddddd;
    grid-area: ft;
`
const StyledDivInfo = styled.div`
  height: 100%;
  width: 100%;
  font-size: small;
//   background-color: #6789df;
//   position: relative;
//   display:flex;
//   flex-direction:column;
//   justify-content: flex-start;
//   align-items: center;
`

const StyledDivChart = styled.div`
  background-color: #e7e9ff;
  border-radius: 10px;
//   width: 100%;
//   padding: 10px;
  margin: 10px;
  position: relative;
  display:flex;
  justify-content: center;
  align-items: center;
`

function Footer() {
    return <div>footer</div>
}
function Infomation() {
    return(
        <StyledDivInfo>
            <StyledDivChart>
                <Info.Chart.TopUser></Info.Chart.TopUser>
            </StyledDivChart>
            <StyledDivChart>
                <Info.Chart.CategoryPostNum></Info.Chart.CategoryPostNum>
            </StyledDivChart>
        </StyledDivInfo>
    ) 
}
export default () => {

    return (
        <Fragment>
            <HashRouter>
                <DivLayout>
                    <GridWrapper>                        
                        <GridAppbar><Appbar></Appbar></GridAppbar>
                        <GridContent><Content></Content></GridContent>
                        <GridNotify><Infomation></Infomation></GridNotify>
                        <GridFooter><Footer></Footer></GridFooter>
                    </GridWrapper>
                </DivLayout>
            </HashRouter>
        </Fragment>
    );
}