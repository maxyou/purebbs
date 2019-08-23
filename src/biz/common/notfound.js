import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { detail as actionDetail } from '@/redux/action'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { time } from '@/tool'

function notFound(props) {

    console.log('not found params:')
    console.log(props)
    useEffect(
        () => {
          
            async function jump(){
                await time.delay(5000)

                if(props.location.state && props.location.state.jumpto){
                    props.history.push(props.location.state.jumpto)
                }else{
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

const mapStateToProps = state => ({
    user: state.user,
    words: state.locale.words,
})

const mapDispatchToProps = dispatch => ({

})
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(notFound))
