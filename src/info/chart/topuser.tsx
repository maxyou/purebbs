import React, { Fragment, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {calc} from 'tool'
var echarts = require('echarts');

const GQL_TOPUSER = gql`
  query TopUser($length: Int!){
    topUser(length:$length){
      name
      role
      postNum
    }
  } 
`;
const DivLayout = styled.div`
    min-width: 300px;
    height: 300px;
    // background-color: yellow;
    color: red;
`


const TopUser = (props: IState2Prop & IDispatch2Prop) => { 

    const { loading, error, data, networkStatus } = useQuery(GQL_TOPUSER, {
        variables: {
            length: 3
        }
    });

    if (loading) {
        // console.log('================userQuery loading:')
        return <div>loading...</div>
    }
    if (error) {
        // console.log('=======================userQuery error:')
        // console.log(JSON.stringify(error))
        return <p>Error :(</p>;
    }
        
    // console.log('========================userQuery get data:')
    // console.log(data)

//     console.log('========= in Chart ==================')

//     // 基于准备好的dom，初始化echarts实例
    setTimeout(
        ()=>{
            var myChart = echarts.init(document.getElementById('TopUser'));
            // console.log('===============data in setTimeout=========')
            // console.log(data)
            myChart.setOption({
                tooltip: {
                },
                title: {
                    text: props.words.statistic_top_user
                },                
                yAxis: {
                    type: 'value'
                },
                xAxis: {
                    type: 'category',
                    data: data.topUser.map((v:any)=> v.name)
                },
                series: [{
                    data:data.topUser.map((v:any)=>{
                            return {value:v.postNum, name: v.name, itemStyle: {color: calc.getRandomColorString()}}
                        }),
                    type: 'bar'
                }]
            })
        },
        200
    )
    return <DivLayout id='TopUser'></DivLayout>
}

interface IState2Prop {
    words: any,  
  }
interface IDispatch2Prop {
}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    words: state.locale.words,
})
const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopUser)