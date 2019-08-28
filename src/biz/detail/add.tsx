import React, { useState } from 'react'
import { connect } from 'react-redux'
import { detail as actionDetail } from '@/redux/action'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import ReactMde from "react-mde"
import * as Showdown from "showdown"

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

const StyledDivAdd = styled.div`
    margin-top: 10px;
    padding: 3px;
    // background-color: blue;
    display:flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    
`

const StyledTextarea = styled.textarea`
    // margin: 3px;
    border:1px solid #dede00;
    width: 100%;
    height: 100px;
    flex: 1 1 auto;
`
const StyledSpanAnonymous = styled.span`
    margin-left: 10px;
    font-size: small;
`

function commentAdd(props) {

    const [comment, setComment] = useState('')
    const [anonymous, setAnonymous] = useState(false)
    const [markdownTab, setMarkdownTab] = useState<"write" | "preview" | undefined>("write")

    function handleSubmit(e) {
        e.preventDefault()
        // console.log('handleSubmit')
        // console.log(this.state.title)
        // console.log(this.state.content)
        const user = props.user
        props.commentAdd({
            content: comment,
            postId: props.match.params.id,
            anonymous: anonymous,
            // author: user.result && user.result.data && user.result.data.name,
            // authorId: user.result && user.result.data && user.result.data._id,
        })
        setComment('')
    }


    return (
        <div>
            <form style={{ display: 'inline' }} onSubmit={handleSubmit}>
                <StyledDivAdd>
                    {/* <span >{props.words.cntnt_comment} </span> */}
                    {/* <StyledTextarea type="text" name="comment" onChange={(e) => setComment(e.target.value)} value={comment} /> */}
                    {/* <StyledTextarea type="text" name="comment" onChange={(e) => setComment(e.target.value)} value={comment} /> */}

                    <ReactMde
                        value={comment}
                        // onChange={(e:any) => setComment(e.target.value)}
                        onChange={setComment}
                        selectedTab={markdownTab}
                        onTabChange={setMarkdownTab}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(converter.makeHtml(markdown))
                        }
                    />


                </StyledDivAdd>
                <input type="submit" value={props.words.cntnt_submit} />
                <label htmlFor="anonymous"><StyledSpanAnonymous>{props.words.cntnt_anonymous_publish}</StyledSpanAnonymous></label>
                    <input type="checkbox" id="anonymous" name="anonymous"
                        onChange={(e) => setAnonymous(e.target.checked)} checked={anonymous} />
            </form><br />

        </div>
    )

}

const mapStateToProps = state => ({
    addResult: state.post.postAddResult,
    user: state.user,
    words: state.locale.words,
})

const mapDispatchToProps = dispatch => ({
    commentAdd: (v) => dispatch(actionDetail.Creator.detailCommentAdd(v))
})

export default withRouter(
    (connect(
        mapStateToProps,
        mapDispatchToProps
    ) as any) (commentAdd)
  )
