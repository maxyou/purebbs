import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { extend as actionExtend } from 'redux/action'
// import { AddLineup, AddVote } from 'biz/extend'
import Lineup from './lineup'
import Vote from './vote'
import { Dispatch } from 'redux';
import {FieldSet} from 'component/style'

const StyledDivExtendChoose = styled.div`
    background-color: lightgreen;
    display:flex;
    justify-content: space-between;
    align-items: center;    
`
function switchExtendChoice(choice:string){
    // console.log(choice)
    switch(choice){
        case 'vote':         
            return <Vote></Vote>
        case 'lineup': 
            return <Lineup></Lineup>
    }

}
function Home(props: IState2Prop & IDispatch2Prop) {    

    useEffect(() => {
        
        return function cleanup() {
          props.extendServerDataInit()
        }
      }, [])

    return (
        <div>
            <div>
                {switchExtendChoice(props.extendFromServer?props.extendFromServer.addChoice:null)}
            </div>

        </div>
    )
}
interface IState2Prop {
    user: any,
    words: any,
    extendFromServer: any,
  }
  interface IDispatch2Prop {
    extendServerDataInit: (v?:any) => void,
    init: (v?:any) => void,
    update: (v:any) => void,
  }
  const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    user: state.user,
    words: state.locale.words,
    extendFromServer: state.extend.extendFromServer,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
    extendServerDataInit: (v) => dispatch(actionExtend.Creator.extendServerDataInit(v)),
    init: (v) => dispatch(actionExtend.Creator.extendAddChoiceInit(v)),
    update: (v) => dispatch(actionExtend.Creator.extendAddChoiceUpdate(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)