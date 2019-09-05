import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { detail as actionDetail } from '@/redux/action'
import { post as actionPost } from '@/redux/action'
import { calc, time } from '@/tool'
import styled from 'styled-components'
import { AvatarImg, AvatarName } from '@/component/user'
import * as Extend from '@/biz/extend'
import { command } from '@/biz/common'
import dialogPolyfill from 'dialog-polyfill'
import ReactMde from "react-mde";
import { Dispatch } from 'redux';
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
// import { category } from "../common"
import {ICategoryItem} from '@/redux/common'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const PostHeaderHeight = '60px'
const PostTitleHeight = '40px'
const PostInfoHeight = '20px'

const StyledDivPost = styled.div`
  background-color: white;
`

const StyledDivHeader = styled.div`
  height: ${PostHeaderHeight};  
  // background-color: #c333f3;
  display:flex;
  justify-content: flex-start;
  align-items: center;
`
const StyledDivHeaderAvatar = styled.div`
  padding: 5px;
  position: relative;
  background-color: #ffffff;
  display:flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  :hover span{
    visibility: visible;
  }
`
const StyledSpanAvatarTooltip = styled.span`
  position: absolute;
  z-index:1;
  top: -10px;
  left: 85%; 
  width: 160px;
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
const StyledDivHeaderMain = styled.div`
  padding-left: 10px;
  // background-color: #d2c456;
  height: ${PostHeaderHeight};
  flex: 1 1 auto;
`
const StyledDivHeaderUpper = styled.div`
  height: ${PostTitleHeight};
  // background-color: #c3e383;
  // width: 1000px;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  // flex: 1 1 auto;
`
const StyledDivTitleText = styled.div`
  height: ${PostTitleHeight};  
  width: 0px;
  white-space:nowrap; 
  overflow:hidden; 
  // text-overflow:ellipsis;

  font-size: large;

  // background-color: #c35a13;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 1 auto;
`
const StyledDivHeaderInfo = styled.div`
  height: ${PostInfoHeight};
  // background-color: #83e383;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 0 auto;
`
const StyledDivTime = styled.div`
  padding-left: 5px;
  font-size: small;
  height: ${PostInfoHeight};  
  // padding-left: 10px;
  padding-right: 5px;
  // background-color: #c3e383;
  display:flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
`
const StyledDivCtrl = styled.div`
  // padding-left: 5px;
  // padding-right: 5px;
  // background-color: #ff7f7f;
  display:flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 auto;
`
const StyledCategory = styled.div`
// background-color: #93e3c3;
// padding: 2px;
border:1px solid;
border-color:lightblue;
border-radius:3px;
`
const StyledSpanOp = styled.span`
  font-size: small;
  padding-left: 5px;
  // margin-left: 10px;
  color: #777777;
  &:hover {
    color: #333333;
  }
`
const StyledSpanLike = styled.span`
  font-size: small;
  padding-left: 5px;
  // margin-left: 10px;
  color: ${props => props.color};
  &:hover {
    color: ${props => props.hoverColor};
  }
`
const StyledDivPostContent = styled.div`
  padding: 10px;
`
const StyledDivCategory = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`
const StyledLink = styled(Link)`
  text-decoration:none;
`

const StyledDivUpdateHeader = styled.div`    
    // height: 30px;
    padding: 3px;
    display:flex;
    justify-content: center;
    align-items: center;
    // background-color:green;
`
const StyledSpanUpdateTitle = styled.span`    
    flex: 0 0 auto;
`
const StyledInputUpdateTitle = styled.input`
    margin-left: 3px;
    margin-right: 3px;
    flex: 1 0 auto;
`

const StyledDialog = styled.dialog`
    min-width: 800px;
    border: 2px solid lightblue;
`
const StyledSelect = styled.select`
  margin: 10px;
`
const StyledSpanAnonymous = styled.span`
    margin-left: 10px;
    font-size: small;
`

function usePrevious(value):any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
interface IRouterProp {
  history: any,
  match: any,
}
const post: React.FC<IState2Prop & IDispatch2Prop & IRouterProp> = function (props) {

  useEffect(
    () => {
      var detailPostDialog = document.getElementById('detailPostDialog');
      // console.log('detailPostDialog---------')
      // console.log(detailPostDialog)
      dialogPolyfill.registerDialog(detailPostDialog);
    }, []
  )

  const [postEdit, setPostEdit] = useState({ title: '', content: '', category: '', anonymous: false })

  function handleDelete(v) {
    console.log(props)
    if (confirm(`${props.words.cmn_confirmDelete}? ${v.title}`)) {
      props.findByIdAndDelete(v)
      props.history.push('/post')
      // alert("继续");
    } else {
      // alert("再见");
    }

  }

  const { postUpdatting, postAttaching } = props
  const prevProps:IState2Prop = usePrevious({ postUpdatting, postAttaching })

  useEffect(
    () => {
      if (
        (!prevProps)
        || (prevProps.postUpdatting == true && props.postUpdatting == false)
        || (prevProps.postAttaching == true && props.postAttaching == false)
      ) {
        props.detailPostGet({
          condition: { postId: props.match.params.id },
          select: 'title content postId author authorId avatarFileName commentNum likeUser stickTop updated created extend category anonymous source oauth'
        })
      }
    }, [props.postUpdatting, props.postAttaching]
  )
  useEffect(
    () => {
      if (props.post && props.post.code == -1) {
        // console.log('-------detail post props---------1')
        // console.log(props.post)
        props.history.push({
          pathname: '/notfound',
          state: {
            message: 'the post is not found, maybe deleted',
            jumpto: '/post',
          }
        })
      } else {
        // console.log('-------detail post props---------2')
        // console.log(props.post)
        // props.history.push('/post')
      }
    }, [props.post]
  )


  function handleUpdate() {
    if (confirm(`${props.words.cmn_confirmUpdate}? ${postEdit.title}`)) {
      props.findByIdAndUpdate(postEdit)
      // alert("继续");
    } else {
      // alert("再见");
    }
  }
  function openEdit(v) {
    setPostEdit(v)
    console.log('openEdit')
    console.log(v)
    var detailPostDialog:any = document.getElementById('detailPostDialog');
    detailPostDialog!.showModal()
  }
  function toggleStickTop(v) {
    // v.stickTop = !v.stickTop
    props.findByIdAndAttach({
      _id: v._id,
      attachCmd: v.stickTop ? command.ATTACH_ACTION.ATTACH_STICK_TOP_CANCEL : command.ATTACH_ACTION.ATTACH_STICK_TOP_SET
    })

    // var vv = {...v, stickTop:!v.stickTop}
    // console.log('------------v.stickTop:'+v.stickTop)
    // console.log('------------vv.stickTop:'+vv.stickTop)
    // setPostEdit(vv)
    // console.log('------------postEdit.stickTop:'+postEdit.stickTop)
    // props.findByIdAndUpdate(postEdit)
  }
  function handleLike(v) {
    if (!props.user.isLogin) {
      return
    }
    // v.stickTop = !v.stickTop
    props.findByIdAndAttach({
      _id: v._id,
      attachCmd: v.likeHasCurrentUser ? command.ATTACH_ACTION.ATTACH_LIKE_CANCEL : command.ATTACH_ACTION.ATTACH_LIKE_SET
    })
  }
  const [markdownTab, setMarkdownTab] = useState<"write"|"preview"|undefined>("write");
  return (
    <div>
      <StyledDialog id="detailPostDialog">

        <form method="dialog">
          <StyledDivUpdateHeader>
            <StyledSpanUpdateTitle >{props.words.cntnt_title}</StyledSpanUpdateTitle>
            <StyledInputUpdateTitle type="text" name="title" onChange={(e) => setPostEdit({ ...postEdit, title: e.target.value })} value={postEdit.title} /><br />
          </StyledDivUpdateHeader>
          {/* <StyledTextarea type="text" name="content" onChange={(e) => setPostEdit({ ...postEdit, content: e.target.value })} value={postEdit.content} /><br /> */}

          <ReactMde
            value={postEdit.content}
            onChange={(e) => setPostEdit({ ...postEdit, content: e })}
            selectedTab={markdownTab}
            onTabChange={setMarkdownTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />

          <input type="submit" value={props.words.cmn_cancel} />
          <input type="submit" value={props.words.cntnt_submit} onClick={handleUpdate} />
          <StyledSelect onChange={(e) => { setPostEdit({ ...postEdit, category: e.target.value }) }} value={postEdit.category}>
            {
              props.category.map((v, index) => {
                if (index === 0) {
                  return null
                }

                return <option value={v.idStr} key={v.idStr}>{v.name}</option>
              })
            }
            
          </StyledSelect>
          <label htmlFor="anonymous"><StyledSpanAnonymous>{props.words.cntnt_anonymous_publish}</StyledSpanAnonymous></label>
          <input type="checkbox" id="anonymous" name="anonymous"
            onChange={(e) => setPostEdit({ ...postEdit, anonymous: e.target.checked })} checked={postEdit.anonymous} />
        </form>
      </StyledDialog>
      {props.post && props.post.data ?
        <StyledDivPost>

          <StyledDivHeader>

            <StyledDivHeaderAvatar>
              <StyledLink to={'/user/other/' + (props.post.data.authorId == props.user._id || props.post.data.anonymous === false ? props.post.data.authorId : 'anonymous')}>
                  <AvatarImg src={calc.calcAvatarPath(props.post.data, props.post.data.anonymous, props.post.data.authorId == props.user._id)}
                  width='40px' radius='20px'></AvatarImg>
              </StyledLink>
              
              {props.post.data.anonymous !== false ?
                <StyledSpanAvatarTooltip>                  
                    <StyledDivAvatarInTooltip>
                      <AvatarImg src={calc.calcAvatarPath(props.post.data, false, props.post.data.authorId == props.user._id)} width='40px' radius='20px' />
                      <StyledDivAvatarInTooltipText>
                        <div>{props.post.data.author}</div>
                        <div>{props.post.data.authorId == props.user._id ? props.words.cntnt_this_is_me : props.words.cntnt_this_is_anonymous}</div>
                      </StyledDivAvatarInTooltipText>
                    </StyledDivAvatarInTooltip>

                </StyledSpanAvatarTooltip>
                : null
              }

            </StyledDivHeaderAvatar>

            <StyledDivHeaderMain>
              <StyledDivHeaderUpper>
                <StyledDivTitleText>
                  {props.post.data.title}
                </StyledDivTitleText>
              </StyledDivHeaderUpper>

              <StyledDivHeaderInfo>

                <StyledDivTime><StyledLink to={'/user/other/' + props.post.data.authorId}>{props.post.data.author}</StyledLink></StyledDivTime>
                

                <StyledDivTime>{/*updated:*/}{time.fromNow(props.post.data.updated)}</StyledDivTime>
                {/* <StyledDivTime>created:{time.fromNow(props.post.data.created)}</StyledDivTime> */}

                {(props.user.role == 'bm' || props.user._id == props.post.data.authorId) ?
                  <StyledDivCtrl>
                    <StyledLink to={'#'} onClick={() => openEdit(props.post.data)}><StyledSpanOp>{props.words.cmn_update}</StyledSpanOp></StyledLink>
                    <StyledLink to={'#'} onClick={() => handleDelete(props.post.data)}><StyledSpanOp>{props.words.cmn_delete}</StyledSpanOp></StyledLink>
                    {props.user.role == 'bm' ?
                      <StyledLink to={'#'} onClick={() => toggleStickTop(props.post.data)}><StyledSpanOp>{props.post.data.stickTop ? props.words.cntnt_cancelStickTop : props.words.cntnt_stickTop}</StyledSpanOp></StyledLink>
                      : null
                    }
                  </StyledDivCtrl>
                  : null
                }

                <StyledDivCtrl>
                  <StyledLink to={'#'} onClick={() => handleLike(props.post.data)}><StyledSpanLike color={props.post.data.likeHasCurrentUser ? '#FF4500' : '#777777'} hoverColor={props.post.data.likeHasCurrentUser ? '#A52A2A' : '#333333'}>{props.words.cntnt_like}{props.post.data.likeUser ? props.post.data.likeUser.length : 0}</StyledSpanLike></StyledLink>
                </StyledDivCtrl>

                <StyledDivTime>
                  <StyledCategory>
                    {calc.categoryIdstr2Name(props.post.data.category, props.category)}
                  </StyledCategory>
                </StyledDivTime>

              </StyledDivHeaderInfo>
            </StyledDivHeaderMain>
          </StyledDivHeader>
          <hr />
          {/* <StyledDivPostContent>{props.post.data.content}</StyledDivPostContent> */}
          <StyledDivPostContent dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.post.data.content) }}></StyledDivPostContent>
          {/* {props.post.data.extend && props.post.data.extend.addLineup?
          <Extend.Lineup addLineup={props.post.data.extend.addLineup}></Extend.Lineup>:null} */}
          <hr />
          <Extend.Home></Extend.Home>
        </StyledDivPost>
        : null}
    </div>
  );
}


interface IState2Prop {
  user: any,
  words: any,
  post: any,
  postLoading: boolean,
  postUpdatting: boolean,
  postAttaching: boolean,
  category: ICategoryItem[],
}
interface IDispatch2Prop {
  detailPostGet: (v?) => void,
  findByIdAndDelete: (v?) => void,
  findByIdAndUpdate: (v) => void,
  findByIdAndAttach: (v?) => void,
}

const mapStateToProps:{(arg0:any):IState2Prop} = state => ({
  user: state.user,
  words: state.locale.words,
  post: state.detail.post,
  postLoading: state.detail.postLoading,
  postUpdatting: state.detail.postUpdatting,
  postAttaching: state.detail.postAttaching,
  category: state.sys.category,
})

const mapDispatchToProps:{(dispatch:Dispatch):IDispatch2Prop} = (dispatch:Dispatch) => ({
  detailPostGet: (v) => dispatch(actionDetail.Creator.detailPostGet(v)),
  findByIdAndDelete: (v) => dispatch(actionPost.Creator.postFindByIdAndDelete(v)), //暂时复用post页面功能
  findByIdAndUpdate: (v) => dispatch(actionDetail.Creator.detailPostFindByIdAndUpdate(v)),
  findByIdAndAttach: (v) => dispatch(actionDetail.Creator.detailPostFindByIdAndAttach(v)),
})
export default withRouter(
  (connect(
      mapStateToProps,
      mapDispatchToProps
  ) as any) (post)
)