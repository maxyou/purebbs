import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { detail as actionDetail } from '@/redux/action'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { time } from '@/tool'
import { Dispatch } from 'redux';

const notFound: React.FC<IState2Prop & IDispatch2Prop & IRouterProp> = function (props: IState2Prop & IDispatch2Prop & IRouterProp) {

    console.log('not found params:')
    console.log(props)
    useEffect(
        () => {

            async function jump() {
                await time.delay(5000)

                if (props.location.state && props.location.state.jumpto) {
                    props.history.push(props.location.state.jumpto)
                } else {
                    // props.history.push('/post')
                }

            }

            jump()

        }, []
    )
    return (
        <div>

            <p>{props.location.state ? props.location.state.message : '404, not found'}</p>

            <p>will jump to {props.location.state ? props.location.state.jumpto : 'home page'} soon in 5 seconds ...</p>

        </div>
    )

}

interface IRouterProp {
    history: any,
    match: any,
    location: any,
}
interface IState2Prop {
    user: any,
    words: any,
}
interface IDispatch2Prop {

}
const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
    user: state.user,
    words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({

})


export default withRouter(
    (connect(
        mapStateToProps,
        mapDispatchToProps
    ) as any)(notFound)
)