import React, { Component } from 'react'
import { connect } from 'react-redux'
// import actionPost from '@/redux/action/post'
import { post as actionPost, locale as actionLocale } from '@/redux/action'
import styled from 'styled-components'
import { Dispatch } from 'redux';

const StyledTextarea = styled.textarea`
    margin: 3px;
    border:2px solid #dede00;
    width: 80%;
    height: 200px;
`


interface IRouterProp {
    history: any,
}
interface IDispatch2Prop {
    submit: (v:any) => void,
    languageSet: (v:any) => void,
}

type IState2Prop = {
    addResult: object,
    words: any,
    user: any,
};

type State = {
    title: string,
    content: string,
};
class PostAdd extends React.Component<IState2Prop & IDispatch2Prop & IRouterProp, State> {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }


    handleSubmit(e) {
        e.preventDefault()
        console.log('handleSubmit')
        const user = this.props.user
        this.props.submit({
            title: this.state.title,
            content: this.state.content,
            author: user.result && user.result.data && user.result.data.name,
            authorId: user.result && user.result.data && user.result.data._id,
        })
        this.props.history.goBack()
    }
    handleCancel(e) {
        e.preventDefault()
        console.log('handleCancel')
        // console.log(this.props)
        this.props.history.goBack()
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }
    handleContentChange(e) {
        this.setState({ content: e.target.value })
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                {/* <h3>{JSON.stringify(this.props.locale)}</h3> */}
                <button onClick={() => this.props.languageSet('en')}>en</button><button onClick={() => this.props.languageSet('zh')}>zh</button>
                <hr />
                <form style={{ display: 'inline' }} onSubmit={this.handleSubmit} method="post">
                    <span >{this.props.words.cntnt_title}</span>
                    <input type="text" name="title" onChange={this.handleTitleChange} value={this.state.title} /><br />
                    <span >{this.props.words.cntnt_content}</span>
                    <StyledTextarea type="text" name="content" onChange={this.handleContentChange} value={this.state.content} /><br />
                    <input type="submit" value={this.props.words.cmn_cancel} onClick={this.handleCancel} />
                    <input type="submit" value={this.props.words.cmn_confirm} />
                </form><br />

            </div>
        )
    }
}
const mapStateToProps:{(arg0:any):IState2Prop} = state => ({
    addResult: state.post.postAddResult,
    words: state.locale.words,
    user: state.user
})

const mapDispatchToProps:{(dispatch:Dispatch):IDispatch2Prop} = (dispatch:Dispatch) => ({
    submit: (v) => dispatch(actionPost.Creator.postAdd(v)),
    languageSet: (v) => dispatch(actionLocale.Creator.languageSet(v))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostAdd)
