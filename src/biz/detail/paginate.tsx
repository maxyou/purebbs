import React from 'react'
import { Dispatch } from 'redux';
import styled from 'styled-components'
import { connect } from 'react-redux'
import {detail as actionDetail} from 'redux/action'
import {calc} from 'tool'
// console.log('actionPost-------')
// console.log(actionPost)

const StyledDiv = styled.div` 
    margin: 5px 10px 5px 10px;
    // background-color:yellow;
`  
const StyledPageRound = styled.div` 
    // margin: 5px;
    // background-color:blue;

    button{
        width:50px;
        height: 25px;
    }
`
function pageRound({current, ext, totalDocs, pageSize, nav}: IState2Prop & IDispatch2Prop) {

    // if(!pageSize) {pageSize=10}
    var maxRight = Math.ceil(totalDocs/pageSize)
    if(!maxRight) {maxRight=1}

    // console.log('maxRight')
    // console.log(maxRight)

    const ba = calc.calcPaginateArray(current, ext, maxRight)
    // console.log(current)
    // console.log(ext)
    // console.log(maxRight)
    // console.log(ba[1])

    return (//待优化：将左右两个首尾按钮直接加在ba数组中
        <div>
            
            {ba[0]==1?null:<span><button onClick={()=>nav(1)} >1</button>{ba[0]==2?null:<span>...</span>}</span>}
            {ba.map((item)=><button 
                    key={item} 
                    onClick={()=>nav(item)}
                    disabled={item===current}
                >{item}</button>)}
            {ba[ba.length-1]==maxRight?null:<span>{ba[ba.length-1]==maxRight-1?null:<span>...</span>}<button onClick={()=>nav(maxRight)}>{maxRight}</button></span>}
            
        </div>
    );
}
interface IState2Prop {
    ext: any,
    current: number,
    pageSize: number,
    totalDocs: number,
  }
  interface IDispatch2Prop {
    nav: (v:any) => void,
  }
  const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    ext: state.detail.commentPaginateExt,
    current: state.detail.commentPageCurrent,
    pageSize: state.detail.commentPageSize,
    totalDocs: state.detail.commentTotalDocs,
  })
  
  const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
    nav: (v) => dispatch(actionDetail.Creator.detailCommentNav(v))
  })
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(pageRound)
  