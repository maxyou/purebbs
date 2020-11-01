import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { detail as actionDetail } from 'redux/action'
// import ErrorBoundary from 'errorBoundary'
import styled from 'styled-components'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { calc, time } from 'tool'
import { AvatarImg, UserTip } from 'component/user'
import dialogPolyfill from 'dialog-polyfill'
import { command } from 'biz/common'
import ReactMde from "react-mde"
import * as Showdown from "showdown";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const CommentTotalHeight = '60px'
const CommentInfoHeight = '20px'


const StyledDivList = styled.div`
  min-height: ${CommentTotalHeight}
  padding: 0.5px;
  margin-bottom: 5px;
  display:flex;
  justify-content: flex-start;
  align-items: stretch;  
  // background-color: #ffffff;
`

const StyledDivMain = styled.div`
  // padding: 5px;  
  background-color: #ffffff;

  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex: 1 0 0%;
  `
const StyledDivCommentUpper = styled.div`
  // background-color: red;
  // display:flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: stretch;
  flex: 1 0 auto;
`
// const StyledDivComment = styled.div`
//   padding: 5px;
//   // width: 0px;
//   white-space: pre-wrap;
//   word-wrap: normal;
//   background-color: lightgreen;
//   flex: 1 0 auto;
// `
const StyledDivCommentMde = styled.div`
  // margin: 10px;
  padding: 5px;
  // width: 300px;
  // white-space: pre-wrap;
  // word-wrap: normal;
  // background-color: lightgreen;
  // flex: 1 0 auto;
`

const StyledDivInfo = styled.div`
  // background-color: yellow;
  height: ${CommentInfoHeight};
  // padding-left: 10px;
  display:flex;
  justify-content: flex-start;
  align-items: center;
`
const StyledDivAvatar = styled.div`
  // height: 40px;  
  padding: 5px;
  position: relative;
  background-color: #ffffff;
  display:flex;
  justify-content: center;
  align-items: flex-start;
  :hover span{
    visibility: visible;
  }
`
const StyledSpanAvatarTooltip = styled.span`
  position: absolute;
  z-index:1;
  top: -10px;
  left: 85%; 
  width: 200px;
  background-color: #9f9;  
  visibility: hidden;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: small;
  margin-left: 10px;
`
const StyledDivAvatarInTooltip = styled.div`
  padding-left: 10px;
  display:flex;
  justify-content: flex-start;
  align-items: center;
`
const StyledDivAvatarInTooltipText = styled.div`
  padding-left: 10px;
  display:flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
`
const StyledDivTime = styled.div`
  padding-left: 5px;
  font-size: small;
  height: ${CommentInfoHeight};
  // background-color: #c3e383;
  display:flex;
  justify-content: center;
  align-items: center;
`


const StyledDivCtrl = styled.div`
  // background-color: #ff7f7f;
  height: ${CommentInfoHeight};
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 auto;
  `
const StyledSpanOp = styled.span`
  font-size: small;
  padding-left: 5px;
  color: #777777;
  &:hover {
    color: #333333;
  }
`
const StyledSpanLike = styled.span<{hoverColor:string}>`
  font-size: small;
  margin-left: 5px;
  color: ${props => props.color};
  &:hover {
    color: ${props => props.hoverColor};
  }
`

const StyledLink = styled(Link)`
  text-decoration:none;
`

const StyledDialog = styled.dialog`
    width: 800px;
    // min-height: 300px;
    border: 2px solid lightblue;
`

const StyledDivUpdate = styled.div`
    padding: 3px;
    // background-color: blue;
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: stretch;    
`
const StyledTextarea = styled.textarea`
    // margin: 3px;
    border:1px solid #dede00;
    min-height: 200px;
    flex: 1 1 auto;
`
const StyledSpanAnonymous = styled.span`
    margin-left: 10px;
    font-size: small;
`

function useIdAsKey(commentListResult:any) {
  if (commentListResult && commentListResult.data && commentListResult.data.length >= 0) {
    return commentListResult.data.map((v:any) => ({ ...v, key: v._id }))
  }
  // console.log(array)
  return []
}

function usePrevious(value:any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
interface IRouterProp {
  match: any,
}
const CommentList: React.FC<IState2Prop & IDispatch2Prop & IRouterProp> = function (props) {
  // function commentList(props) {

  useEffect(
    () => {
      var detailCommentDialog:HTMLElement|null = document.getElementById('detailCommentDialog');
      // console.log('detailCommentDialog---------')
      // console.log(detailCommentDialog)
      dialogPolyfill.registerDialog(detailCommentDialog as HTMLDialogElement);      
    }, []
  )

  // const [commentUpdate, setCommentUpdate] = useState('')
  const [commentEdit, setCommentEdit] = useState({ content: '', anonymous: false })

  const { commentAdding, commentUpdatting, commentDeletting, commentPageCurrent, commentPageSize, commentAttaching } = props
  const prevProps: IState2Prop = usePrevious({ commentAdding, commentUpdatting, commentDeletting, commentPageCurrent, commentPageSize, commentAttaching })

  const [markdownTab, setMarkdownTab] = useState<"write" | "preview" | undefined>("write")

  useEffect(
    () => {
      if (
        (!prevProps)
        || (prevProps.commentAdding == true && props.commentAdding == false)
        || (prevProps.commentAttaching == true && props.commentAttaching == false)
        || (prevProps.commentUpdatting == true && props.commentUpdatting == false)
        || (prevProps.commentDeletting == true && props.commentDeletting == false)
        || (prevProps.commentPageCurrent != props.commentPageCurrent)
        || (prevProps.commentPageSize != props.commentPageSize)
      ) {
        props.get({
          query: {
            postId: props.match.params.id
          },
          options: {
            offset: props.commentPageSize * (props.commentPageCurrent - 1),
            limit: props.commentPageSize,
            sort: { created: -1 },
            select: 'postId content author authorId updated created avatarFileName likeUser anonymous source oauth'
          }
        })
      }
    }, [props.commentAdding, props.commentUpdatting, props.commentDeletting, props.commentPageCurrent, props.commentPageSize, props.commentAttaching]
  )

  const dataSource = useIdAsKey(props.commentListResult)
  // console.log(dataSource)

  function handleDelete(v:any) {
    if (window.confirm(`${props.words.cmn_confirmDelete}? ${v.content}`)) {
      props.delete(v)
      // alert("继续");
    } else {
      // alert("再见");
    }
  }

  function handleUpdate() {
    if (window.confirm(`${props.words.cmn_confirmUpdate}? ${commentEdit.content}`)) {
      props.update(commentEdit)
      // alert("继续");
    } else {
      // alert("再见");
    }
  }

  function openEdit(v:any) {
    console.log(v)
    setCommentEdit(v)
    var detailCommentDialog: any = document.getElementById('detailCommentDialog');
    detailCommentDialog!.showModal()
  }

  function handleLike(v:any) {

    if (!props.user.isLogin) {
      return
    }

    // var op
    // if(v.likeUser){
    //   op = v.likeUser.some((v) => {return v._id == props.user._id})?command.ATTACH_ACTION.ATTACH_LIKE_CANCEL:command.ATTACH_ACTION.ATTACH_LIKE_SET
    // }else{
    //   op = command.ATTACH_ACTION.ATTACH_LIKE_SET
    // }
    // console.log('handleLike:')
    // console.log(v.likeUser)
    // console.log(op)
    props.findByIdAndAttach({
      _id: v._id,
      attachCmd: v.likeHasCurrentUser ? command.ATTACH_ACTION.ATTACH_LIKE_CANCEL : command.ATTACH_ACTION.ATTACH_LIKE_SET
    })
  }

  function commentEditOnChange(e:any) {
    console.log(e)
    console.log(commentEdit)
    setCommentEdit({ ...commentEdit, content: e })
  }

  return (
    <div>
      <StyledDialog id="detailCommentDialog">
        <form method="dialog">
          {/* <span >修改评论: </span><br /> */}

          <StyledDivUpdate>
            {/* <StyledTextarea type="text" name="comment" onChange={(e) => setCommentEdit({ ...commentEdit, content: e.target.value })} value={commentEdit.content} /><br /> */}
            <ReactMde
              value={commentEdit.content}
              // onChange={(e:any) => setComment(e.target.value)}
              onChange={commentEditOnChange}
              selectedTab={markdownTab}
              onTabChange={setMarkdownTab}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
          </StyledDivUpdate>

          <input type="submit" value={props.words.cmn_cancel} />
          <input type="submit" value={props.words.cntnt_submit} onClick={handleUpdate} />
          <label htmlFor="anonymous"><StyledSpanAnonymous>{props.words.cntnt_anonymous_publish}</StyledSpanAnonymous></label>
          <input type="checkbox" id="anonymous" name="anonymous"
            onChange={(e) => setCommentEdit({ ...commentEdit, anonymous: e.target.checked })} checked={commentEdit.anonymous} />
        </form>
      </StyledDialog>
      {
        dataSource.map((v:any) => <StyledDivList key={v.key}>
          {/* <StyledDivContainerNoUse> */}
          {/* {JSON.stringify(v)} */}

          <StyledDivAvatar>
            <StyledLink to={'/user/other/' + (v.authorId == props.user._id || v.anonymous === false ? v.authorId : 'anonymous')}>
              <AvatarImg src={calc.calcAvatarPath(v, v.anonymous, v.authorId == props.user._id)}
                width='40px' radius='20px'></AvatarImg>
            </StyledLink>

            {v.anonymous !== false ?
              // <StyledSpanAvatarTooltip>                
              //     <StyledDivAvatarInTooltip>
              //       <AvatarImg src={calc.calcAvatarPath(v, false, v.authorId == props.user._id)} width='40px' radius='20px' />
              //       <StyledDivAvatarInTooltipText>
              //         <div>{v.author}</div>
              //         <div>{v.authorId == props.user._id? props.words.cntnt_this_is_me : props.words.cntnt_this_is_anonymous}</div>
              //       </StyledDivAvatarInTooltipText>
              //     </StyledDivAvatarInTooltip>
              // </StyledSpanAvatarTooltip>
              <UserTip
                    avatarPath={calc.calcAvatarPath(v, false, v.authorId == props.user._id)}
                    name={v.author}
                    intro={v.authorId == props.user._id? props.words.cntnt_this_is_me : props.words.cntnt_this_is_anonymous}
                    topLeft={{top:'0px',left:'70px'}}
                  ></UserTip>
              : null
            }
          </StyledDivAvatar>

          <StyledDivMain>

            <StyledDivCommentUpper>
              {/* <StyledDivComment>
                  {v.content}
              </StyledDivComment> */}
              <StyledDivCommentMde dangerouslySetInnerHTML={{ __html: converter.makeHtml(v.content) }}></StyledDivCommentMde>
            </StyledDivCommentUpper>

            <StyledDivInfo>
              <StyledDivTime>
                <StyledDivTime><StyledLink to={'/user/other/' + v.authorId}>{v.author}</StyledLink></StyledDivTime>
              </StyledDivTime>

              <StyledDivTime>
                {/*created:*/}{time.fromNow(v.created)}
              </StyledDivTime>

              {(props.user.role == 'bm' || props.user._id == v.authorId) ?
                <StyledDivCtrl>

                  {/* <StyledSpanOp onClick={() => openEdit(v)}>{props.words.cmn_update}</StyledSpanOp> */}

                  <StyledLink to={'#'} onClick={() => openEdit(v)}>
                    <StyledSpanOp>
                      {props.words.cmn_update}
                    </StyledSpanOp>
                  </StyledLink>

                  <StyledLink to={'#'} onClick={() => handleDelete(v)}>
                    <StyledSpanOp>
                      {props.words.cmn_delete}
                    </StyledSpanOp>
                  </StyledLink>

                  {/* <StyledSpanOp onClick={() => handleDelete(v)}>{props.words.cmn_delete}</StyledSpanOp> */}
                </StyledDivCtrl>
                : null
              }

              <StyledDivTime>
                <StyledLink to={'#'} onClick={() => handleLike(v)}><StyledSpanLike color={v.likeHasCurrentUser ? '#FF4500' : '#777777'} hoverColor={v.likeHasCurrentUser ? '#A52A2A' : '#333333'}>{props.words.cntnt_like}{v.likeUser.length}</StyledSpanLike></StyledLink>
              </StyledDivTime>

            </StyledDivInfo>

          </StyledDivMain>

          {/* </StyledDivContainerNoUse> */}
        </StyledDivList>)
      }
    </div>
  )
}

interface IState2Prop {
  user: any,
  words: any,
  commentPageSize: number,
  commentPageCurrent: number,
  commentListResult: any,
  commentListLoading: boolean,
  commentAdding: boolean,
  commentDeletting: boolean,
  commentUpdatting: boolean,
  commentAttaching: boolean,
}
interface IDispatch2Prop {
  get: (v?:any) => void,
  delete: (v?:any) => void,
  update: (v:any) => void,
  findByIdAndAttach: (v?:any) => void,
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
  commentPageSize: state.detail.commentPageSize,
  commentPageCurrent: state.detail.commentPageCurrent,
  commentListResult: state.detail.commentListResult,
  commentListLoading: state.detail.commentListLoading,
  commentAdding: state.detail.commentAdding,
  commentDeletting: state.detail.commentDeletting,
  commentUpdatting: state.detail.commentUpdatting,
  commentAttaching: state.detail.commentAttaching,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  get: (v) => dispatch(actionDetail.Creator.detailCommentGet(v)),
  delete: (v) => dispatch(actionDetail.Creator.detailCommentDelete(v)),
  update: (v) => dispatch(actionDetail.Creator.detailCommentUpdate(v)),
  findByIdAndAttach: (v) => dispatch(actionDetail.Creator.detailCommentFindByIdAndAttach(v)),
})
// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchToProps
// ) (commentList))

export default withRouter(
  (connect(
    mapStateToProps,
    mapDispatchToProps
  ) as any)(CommentList)
)
