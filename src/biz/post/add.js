import React, { Component } from 'react'
import { connect } from 'react-redux'
// import actionPost from '@/redux/action/post'
import { post as actionPost, locale as actionLocale } from '@/redux/action'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
import ReactMde from "react-mde"
import * as Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css"
import {Add as AddExtend} from "../extend"



const StyledDivHeader = styled.div`    
    // height: 30px;
    padding: 3px;
    display:flex;
    justify-content: center;
    align-items: center;
    // background-color:green;
`
const StyledSpanTitle = styled.span`    
    flex: 0 0 auto;
`
const StyledInputTitle = styled.input`
    margin-left: 3px;
    margin-right: 3px;
    flex: 1 0 auto;
`
const StyledSelect = styled.select`
  margin: 10px;
`
const StyledSpanAnonymous = styled.span`
    margin-left: 10px;
    font-size: small;
`
const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});


class PostAdd extends React.Component {

    constructor(props) {
        super(props)

        console.log('------------PostAdd----------------')
        // console.log(props)

        this.state = {
            title: '',
            content: '',
            // category: '',
            category: (props.category && props.category[1]) ? props.category[1].idStr : '',
            anonymous: false,
            markdownTab: 'write'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleMarkdownChange = this.handleMarkdownChange.bind(this)
        this.setMarkdownTab = this.setMarkdownTab.bind(this)
        // this.setAnonymous = this.setAnonymous.bind(this)
    }

    componentDidUpdate(){

        console.log('------------------componentDidUpdate-----------------------')
        if(!this.state.category && this.props.category && this.props.category[1]){

            console.log('------------------componentDidUpdate.setState-----------------------')
            this.setState({category: this.props.category[1].idStr })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log('handleSubmit')

        if(!this.state.title || this.state.title.length==0){
            alert('must have title')
            return
        }

        // const user = this.props.user
        this.props.submit({
            title: this.state.title,
            content: this.state.content,
            category: this.state.category,
            anonymous: this.state.anonymous,
            extend: this.props.extend,
            // author: user.result && user.result.data && user.result.data.name,
            // authorId: user.result && user.result.data && user.result.data._id,
        })
        this.props.history.goBack()
    }
    handleCancel(e) {
        e.preventDefault()
        console.log('handleCancel')
        // console.log(this.props)
        this.props.history.goBack()
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleMarkdownChange(e) {
        this.setState({ content: e })
    }
    setMarkdownTab(e) {
        console.log(e)
        this.setState({ markdownTab: e })
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                {/* <h3>{JSON.stringify(this.props.locale)}</h3> */}
                {/* <button onClick={()=>this.props.languageSet('en')}>en</button><button onClick={()=>this.props.languageSet('zh')}>zh</button>
                <hr/> */}
                <form style={{ display: 'inline' }} onSubmit={this.handleSubmit} method="post">
                    <StyledDivHeader>
                        <StyledSpanTitle >{this.props.words.cntnt_title}</StyledSpanTitle>
                        <StyledInputTitle type="text" name="title" onChange={this.handleChange} value={this.state.title} />
                    </StyledDivHeader>

                    {/* <span >{this.props.words.cntnt_content}</span> */}
                    <ReactMde
                        value={this.state.content}
                        onChange={this.handleMarkdownChange}
                        selectedTab={this.state.markdownTab}
                        onTabChange={this.setMarkdownTab}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(converter.makeHtml(markdown))
                        }
                    />
                    {/* <StyledTextarea type="text" name="content" onChange={this.handleChange} value={this.state.content} /><br/>                     */}
                    <input type="submit" value={this.props.words.cmn_cancel} onClick={this.handleCancel} />
                    <input type="submit" value={this.props.words.cmn_confirm} />
                    <StyledSelect onChange={(e) => {this.setState({category: e.target.value}) }} value={this.state.category}>

                        {
                            this.props.category.map((v, index)=>{
                                if(index===0){
                                    return null
                                }

                                return <option value={v.idStr} key={v.idStr}>{v.name}</option>
                            })
                        }

                    </StyledSelect>
                    <label htmlFor="anonymous"><StyledSpanAnonymous>{this.props.words.cntnt_anonymous_publish}</StyledSpanAnonymous></label>
                    <input type="checkbox" id="anonymous" name="anonymous"
                        onChange={(e) => this.setState({anonymous:e.target.checked})} checked={this.state.anonymous} />
                </form><br />
                <AddExtend></AddExtend>                
            </div>
        )
    }
}
const mapStateToProps = state => ({
    addResult: state.post.postAddResult,
    words: state.locale.words,
    user: state.user,
    extend: state.extend,
    category: state.sys.category,
})

const mapDispatchToProps = dispatch => ({
    submit: (v) => dispatch(actionPost.Creator.postAdd(v)),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostAdd)
