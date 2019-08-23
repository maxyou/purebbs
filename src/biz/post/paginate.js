import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {post as actionPost} from '@/redux/action'
import {calc} from '@/tool'
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
function pageRound({current, ext, totalDocs, pageSize, nav}) {

    // if(!pageSize) {pageSize=10}
    var maxRight = Math.ceil(totalDocs/pageSize)
    if(!maxRight) {maxRight=1}

    console.log('maxRight')
    console.log(maxRight)

    const ba = calc.calcPaginateArray(current, ext, maxRight)
    // console.log(current)
    // console.log(ext)
    // console.log(maxRight)
    console.log(ba[1])

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

const mapStateToProps = state => ({
    // postPageSize: state.post.postPageSize,
    ext: state.post.postPaginateExt,
    current: state.post.postPageCurrent,
    pageSize: state.post.postPageSize,
    totalDocs: state.post.postTotalDocs,
  })
  
  const mapDispatchToProps = dispatch => ({
    nav: (v) => dispatch(actionPost.Creator.postNav(v))
  })
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(pageRound)
  