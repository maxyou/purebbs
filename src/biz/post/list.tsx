import * as React from 'react'
import { Component, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { post as actionPost } from 'redux/action'
import { calc, time } from 'tool'
// import ErrorBoundary from 'errorBoundary'
import styled from 'styled-components'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { AvatarImg, UserTip } from 'component/user'

import IconLineup from 'component/icon/lineup.svg'
import IconVote from 'component/icon/vote.svg'

// import { category as categoryCommon } from "../common"
import { command } from 'biz/common'
import { ICategoryItem } from 'redux/common'

const ItemHeight = '60px'
const PostTitleHeight = '40px'
const PostInfoHeight = '20px'

const StyledDivCard = styled.div`
  // padding: 5px;
  margin: 5px;
  &:hover{
    box-shadow: 0px 0px 5px gray;
  }
  // background-color: #ffffff;
  // list-style-type:none;
  // display:flex;
  // justify-content: flex-start;
  // align-items: center;  
`
const StyledDivContainer = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items: center;  
  justify-content: space-between;
`


const StyledDivAvatar = styled.div`
  padding: 10px;
  // margin: 10px;
  display:flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: ${ItemHeight};
  background-color: #ffffff;  
  :hover span{
    visibility: visible;
  }
`
const StyledSpanAvatarTooltip = styled.span`
  position: absolute;
  z-index:1;
  top: 0px;
  left: 75%; 
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
const StyledDivMain = styled.div`
  height: ${ItemHeight};
  background-color: #ffffff;
  flex: 1 0 auto;
  // display:flex;
  // justify-content: center;
  // align-items: center;
`

const StyledDivUpper = styled.div`
  height: ${PostTitleHeight};
  margin-left: 10px;
  // background-color: #c3da13;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 1 auto;
`
const StyledDivTitleText = styled.div`
  height: ${PostTitleHeight};  
  width: 0px;
  white-space:nowrap; 
  overflow:hidden; 
  text-overflow:ellipsis;

  font-size: large;

  // background-color: #c35a13;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1 1 auto;
`
const StyledDivCmtnum = styled.div`
  height: ${ItemHeight};
  padding-right: 10px;
  background-color: #ffffff;  
  display:flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  `
const StyledSpanNum = styled.span`

  visibility: ${props => {
    if (props.hidden) {
      return 'hidden'
    } else {
      return 'visible'
    }
  }};

  font-size: small;
  color: #ffffff;
  background-color: #999999;
  // height: 18px;
  min-width: 30px;
  border-radius: 10px;  
  padding-left: 10px;
  padding-right: 10px;
  margin: 10px;
  display:flex;
  justify-content: center;
  align-items: center;
`
const StyledDivExendIcon = styled.div`
  position: relative;
  background-color: #fff;
  height: ${ItemHeight};
  width: ${ItemHeight};
  display:flex;
  justify-content: center;
  align-items: center;
  :hover span{
    visibility: visible;
  }
`
const StyledDivExtendTooltip = styled.span`
  position: absolute;
  z-index:1;
  top: 0px;
  left: -250%; 
  width: 150px;
  background-color: #9f9;  
  visibility: hidden;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: small;
  margin-left: 10px;
`
const StyledDivExendIconImg = styled.img`
height: ${ItemHeight};
width: ${ItemHeight};
flex: 1 1 auto;
padding:15px;
`
const StyledDivLower = styled.div`
  height: ${PostInfoHeight};
  // background-color: #c3e3c3;
  display:flex;
  justify-content: flex-start;
  align-items: center;
`

const StyledDivInfo = styled.div`
  // background-color: #5f7f7f;
  // display:flex;
  // justify-content: flex-start;
  // align-items: center;
  // flex: 0 1 auto;
`
const StyledDivCtrl = styled.div`
  // background-color: #ff7f7f;
  display:flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 1 auto;
`

const StyledDivTime = styled.span`
  font-size: small;
  color: #777777;
  height: ${PostInfoHeight}; 
  margin-left: 10px;
  // background-color: #c3e383;
  display:flex;
  justify-content: center;
  align-items: center;
  `
  
  const StyledCategory = styled.div`
  padding-left: 2px;
  padding-right: 2px;
  // background-color: #93e3c3;
  // padding: 2px;
  border:1px solid;
  border-color:lightblue;
  border-radius:3px;
`
const StyledLink = styled(Link)`
  text-decoration:none;
`
const StyledSpanOp = styled.span`
  font-size: small;
  margin-left: 10px;
  color: #777777;
  &:hover {
    color: #333333;
  }
`
const StyledSpanStickTop = styled.span`
  background-color: #ccffcc;
  border-radius: 5px;
`
const StyledSpanLike = styled.span<{hoverColor:string}>`
  font-size: small;
  margin-left: 10px;
  color: ${props => props.color};
  &:hover {
    color: ${props => props.hoverColor};
  }
`


function useIdAsKey(postListResult:any):any {
  if (postListResult && postListResult.data && postListResult.data.length >= 0) {
    return postListResult.data.map((v:any) => ({ ...v, key: v._id }))
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

const PostList: React.FC<IState2Prop & IDispatch2Prop> = function (props: IState2Prop & IDispatch2Prop) {
  // function postList(props) {

  const { postAdding, postUpdatting, postDeletting, postPageCurrent, postPageSize, categoryCurrent, postAttaching } = props
  const prevProps: IState2Prop = usePrevious({ postAdding, postUpdatting, postDeletting, postPageCurrent, postPageSize, categoryCurrent, postAttaching })

  console.log('category 1')
  console.log(categoryCurrent)
  console.log(postPageSize)

  useEffect(
    () => {
      if (
        (!prevProps)
        || (prevProps.postAdding === true && props.postAdding === false)
        || (prevProps.postUpdatting === true && props.postUpdatting === false)
        || (prevProps.postAttaching === true && props.postAttaching === false)
        || (prevProps.postDeletting === true && props.postDeletting === false)
        || (prevProps.postPageCurrent !== props.postPageCurrent)
        || (prevProps.postPageSize !== props.postPageSize)
        || (prevProps.categoryCurrent !== props.categoryCurrent)
      ) {
        console.log()
        props.get({
          query: !props.categoryCurrent || props.categoryCurrent === props.category[0].idStr ? {} : { category: props.categoryCurrent },
          options: {
            offset: props.postPageSize * (props.postPageCurrent - 1),
            limit: props.postPageSize,
            sort: { allUpdated: -1 },
            select: 'source oauth title postId author authorId commentNum likeUser updated created avatarFileName lastReplyId lastReplyName lastReplyTime allUpdated stickTop category anonymous extend'
          }
        })
      }
    }, [props.postAdding, props.postUpdatting, props.postDeletting, props.postPageCurrent, props.postPageSize, props.categoryCurrent, props.postAttaching]
  )

  function handleDelete(v:any) {
    if (window.confirm(`${props.words.cmn_confirmDelete}? ${v.title}`)) {
      props.findByIdAndDelete(v)
      // alert("继续");
    } else {
      // alert("再见");
    }
  }

  function handleLike(v:any) {

    if (!props.user.isLogin) {
      return
    }

    props.postFindByIdAndAttach({
      _id: v._id,
      attachCmd: v.likeHasCurrentUser ? command.ATTACH_ACTION.ATTACH_LIKE_CANCEL : command.ATTACH_ACTION.ATTACH_LIKE_SET
    })
  }

  function getExtendIcon(v:string) {

    switch (v) {
      case 'lineup':
        return IconLineup
      case 'vote':
        return IconVote
      default:
        return null
    }

  }


  function showExtendInfo(extend:any) {

    // console.log('showExtendInfo')

    var joinNum
    var expireDate

    switch (extend.addChoice) {
      case 'lineup':
        expireDate = new Date(extend.addLineup.expireTime)
        joinNum = extend.lineupData.length
        break
      case 'vote':
        expireDate = new Date(extend.addVote.expireTime)
        var people = new Set()
        extend.voteData.forEach((v:any) => {
          // console.log(v)
          v.forEach((vv:any) => {
            people.add(vv._id)
          })
        });
        // console.log(people)
        joinNum = people.size
        break
      default:
        return <span>no info</span>
    }

    if (new Date() > expireDate) {
      return <span>{props.words.ext_expired}, {props.words.ext_join_num}:{joinNum}</span>
    } else {
      return <span>{props.words.ext_not_expired}, {props.words.ext_join_num}:{joinNum}</span>
    }
  }

  const dataSource = useIdAsKey(props.postListResult)
  // console.log(dataSource)

  return (
    <div>
      {
        dataSource.map((v:any) => <StyledDivCard key={v.key}>

          <StyledDivContainer>

            <StyledDivAvatar>
              <StyledLink to={'/user/other/' + (v.authorId === props.user._id || v.anonymous === false ? v.authorId : 'anonymous')}>
                {/* <AvatarImg src={calc.calcAvatarPath(v.fromUser[0], v.anonymous, v.authorId == props.user._id)}
                  width='40px' radius='20px'></AvatarImg> */}
                <AvatarImg src={calc.calcAvatarPath(v, v.anonymous, v.authorId === props.user._id)}
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
                    avatarPath={calc.calcAvatarPath(v, false, v.authorId === props.user._id)}
                    name={v.author}
                    intro={v.authorId === props.user._id? props.words.cntnt_this_is_me : props.words.cntnt_this_is_anonymous}
                    topLeft={{top:'0px',left:'70px'}}
                  ></UserTip>
                : null
              }

            </StyledDivAvatar>

            <StyledDivMain>

              <StyledDivUpper>
                {/* {JSON.stringify(v.fromUser[0])} */}
                <StyledDivTitleText>
                  <StyledLink to={`/detail/${v.postId}`} >
                    {v.title}
                  </StyledLink>
                </StyledDivTitleText>
              </StyledDivUpper>

              <StyledDivLower>

                <StyledDivInfo>
                  {/* <StyledDivTime>{props.words.cmn_author}:{v.author}</StyledDivTime> */}
                  <StyledDivTime>{props.words.cmn_author}:<StyledLink to={'/user/other/' + v.authorId}>{v.author}</StyledLink></StyledDivTime>
                </StyledDivInfo>

                {/* <StyledDivInfo>
                  <StyledDivTime>updated:{time.fromNow(v.updated)}</StyledDivTime>
                </StyledDivInfo>

                <StyledDivInfo>
                  <StyledDivTime>created:{time.fromNow(v.created)}</StyledDivTime>
                </StyledDivInfo> */}

                <StyledDivInfo>
                  {v.lastReplyId ?
                    <StyledDivTime>{/*lastReplyTime:{time.fromNow(v.lastReplyTime)}*/}{props.words.cntnt_last_reply}:<StyledLink to={'/user/other/' + v.lastReplyId}>{v.lastReplyName}</StyledLink></StyledDivTime>
                    : null}
                </StyledDivInfo>

                <StyledDivInfo>
                  <StyledDivTime>{/*allUpdated:*/}{time.fromNow(v.allUpdated)}</StyledDivTime>
                </StyledDivInfo>

                <StyledDivInfo>
                  <StyledDivTime>
                    <StyledLink to={'#'} onClick={() => handleLike(v)}><StyledSpanLike color={v.likeHasCurrentUser ? '#FF4500' : '#777777'} hoverColor={v.likeHasCurrentUser ? '#A52A2A' : '#333333'}>{props.words.cntnt_like}{v.likeUser.length}</StyledSpanLike></StyledLink>
                  </StyledDivTime>
                </StyledDivInfo>

                <StyledDivInfo>
                  {(props.user.role === 'bm' || props.user._id === v.authorId) ?
                    <StyledDivCtrl>
                      <StyledLink to={'#'} onClick={() => handleDelete(v)}>
                        <StyledSpanOp>
                          {props.words.cmn_delete}
                        </StyledSpanOp>
                      </StyledLink>
                    </StyledDivCtrl>
                    : null}

                </StyledDivInfo>

                <StyledDivInfo>
                  {v.stickTop ?
                    <StyledDivTime><StyledSpanStickTop>{props.words.cntnt_already_stickTop}</StyledSpanStickTop></StyledDivTime>
                    : null}
                </StyledDivInfo>

                <StyledDivInfo>
                  <StyledDivTime>
                    <StyledCategory>
                      {calc.categoryIdstr2Name(v.category, props.category)}
                    </StyledCategory>
                  </StyledDivTime>
                </StyledDivInfo>

              </StyledDivLower>

            </StyledDivMain>

            {v.extend.addChoice ?
              <StyledDivExendIcon>
                <StyledLink to={`/detail/${v.postId}`} >
                  <StyledDivExendIconImg src={getExtendIcon(v.extend.addChoice)} />
                </StyledLink>
                <StyledDivExtendTooltip>{showExtendInfo(v.extend)}</StyledDivExtendTooltip>
              </StyledDivExendIcon>
              : null}

            <StyledDivCmtnum><StyledSpanNum hidden={v.commentNum === 0}>{v.commentNum} {props.words.cntnt_commentNum}</StyledSpanNum></StyledDivCmtnum>

          </StyledDivContainer>

        </StyledDivCard>)
      }
    </div>
  )
}


interface IState2Prop {
  user: any,
  words: any,
  postPageSize: number,
  postPageCurrent: number,
  postListResult: any,
  postListLoading: boolean,
  postAdding: boolean,
  postDeletting: boolean,
  postUpdatting: boolean,
  postAttaching: boolean,
  categoryCurrent: string,
  category: ICategoryItem[],
}
interface IDispatch2Prop {
  get: (v?:any) => void,
  findByIdAndDelete: (v?:any) => void,
  findByIdAndUpdate: (v:any) => void,
  postFindByIdAndAttach: (v?:any) => void,
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  user: state.user,
  words: state.locale.words,
  postPageSize: state.post.postPageSize,
  postPageCurrent: state.post.postPageCurrent,
  postListResult: state.post.postListResult,
  postListLoading: state.post.postListLoading,
  postAdding: state.post.postAdding,
  postDeletting: state.post.postDeletting,
  postUpdatting: state.post.postUpdatting,
  postAttaching: state.post.postAttaching,
  categoryCurrent: state.post.categoryCurrent,
  category: state.sys.category,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  get: (v) => dispatch(actionPost.Creator.postGet(v)),
  findByIdAndDelete: (v) => dispatch(actionPost.Creator.postFindByIdAndDelete(v)),
  findByIdAndUpdate: (v) => dispatch(actionPost.Creator.postFindByIdAndUpdate(v)),
  postFindByIdAndAttach: (v) => dispatch(actionPost.Creator.postFindByIdAndAttach(v)),
})
// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(postList))
export default withRouter(
  (connect(
    mapStateToProps,
    mapDispatchToProps
  ) as any)(PostList)
)