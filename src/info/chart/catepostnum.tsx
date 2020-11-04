import React, { Fragment, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ICategoryItem } from 'redux/common'
var echarts = require('echarts');

const GQL_CATEGORY_POST_NUM = gql`
  query CategoryPostNum{
    categoryPostNum{
      name
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


const CategoryPostNum = (props: IState2Prop & IDispatch2Prop) => { 

    const { loading, error, data, networkStatus } = useQuery(GQL_CATEGORY_POST_NUM, {
        variables: {
            // length: 3
        }
    });

    if (loading) {
        // console.log('================userQuery loading:')
        return <div>loading...</div>
    }
    if (error) {
        // console.log('=======================userQuery error:')
        console.log(JSON.stringify(error))
        return <p>Error :(</p>;
    }
        
    // console.log('========================userQuery get data:')
    console.log(data)

//     console.log('========= in Chart ==================')


    const idStr2Name = (idStr:string):string => {

        if(props.category == null){
            return idStr
        }
        
        for(const c of props.category){
            if(c.idStr === idStr){
                return c.name
            }
        }

        return idStr
    }

    // 基于准备好的dom，初始化echarts实例
    setTimeout(
        ()=>{
            var myChart = echarts.init(document.getElementById('CategoryPostNum'));
            // console.log('===============data in setTimeout=========')
            // console.log(data)
            myChart.setOption(
                {
                    title: {
                        text: props.words.statistic_category_post_num
                    },                
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a}<br/>{b}:{c}({d}%)'
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     legt: 'left',
                    //     data: data.categoryPostNum.map((v:any)=> v.name)
                    // },
                    series: [{
                        name: props.words.statistic_category_post_num,
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data:data.categoryPostNum.map((v:any)=>{
                                return {value:v.postNum, name: idStr2Name(v.name)}
                            }),
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0,0,0,0.5)'
                            }
                        }
                    }]
                }
            )
        },
        200
    )
    return <DivLayout id='CategoryPostNum'></DivLayout>
}


interface IState2Prop {
    words: any,  
    category: ICategoryItem[],
  }
  interface IDispatch2Prop {
  }
  const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    words: state.locale.words,
    category: state.sys.category,
  })
  
  const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryPostNum)
