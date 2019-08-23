import React, { Component, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link, NavLink, Redirect, withRouter } from 'react-router-dom'
import { user as actionUser, locale as actionLocale, sys as actionSys} from '@/redux/action'
import { AvatarImg } from '@/component/user'
// import {calc} from '@/tool'

const AppbarHeight = '50px'

const StyledDivAppbar = styled.div`
    height: ${AppbarHeight};
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    // border: 0.5px solid #dddddd;
`
const StyledDivLogo = styled.div`
    // border:1px solid #dede00;
    height: ${AppbarHeight};
    width:100px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    flex:0 0 auto;
    // background-color: red;
`
const StyledDivUser = styled.div`
    // border:1px solid #dede00;
    height: ${AppbarHeight};
    // width:500px;
    flex: 1 0 auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    // background-color: lightblue;
`
const StyledDivSearch = styled.div`
    margin-left: 10px;
    margin-right: 20px;
    height: ${AppbarHeight};
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    // background-color: #C23456;
`
const StyledDivUserName = styled.div`
    margin-left: 5px;
    margin-right: 5px;
    height: ${AppbarHeight};
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    // background-color: #D23456;
`
const StyledDivLocale = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    height: ${AppbarHeight};
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    // background-color: #12c456;
`
const StyledDivUserCtrl = styled.div`
    // border:1px solid #dede00;
    height: ${AppbarHeight};
    // width:80px;
    margin: 10px;
    // display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    // background-color: #65f3D1;
`
const StyledLink = styled(Link)`
  text-decoration:none;
`
const StyledSelect = styled.select`
  margin: 10px;
`
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  
const Appbar = function (props) {
    const { isLogin } = props
    const prevProps = usePrevious({ isLogin })

    const StyledDivUserAvatarName = styled(StyledDivUserCtrl)`
        display:${props.isLogin ? 'flex' : 'none'}
        justify-content: center;
        align-items: center;
    `
    const StyledDivUserLogin = styled(StyledDivUserCtrl)`
        display:${props.isLogin ? 'none' : 'flex'}
    `
    const StyledDivUserRegister = styled(StyledDivUserCtrl)`
        display:${props.isLogin ? 'none' : 'flex'}
    `
    const StyledDivUserLogout = styled(StyledDivUserCtrl)`
        display:${props.isLogin ? 'flex' : 'none'}
    `
    const StyledDivUserAdmin = styled(StyledDivUserCtrl)`
        display:${props.isLogin ? 'flex' : 'none'}
    `

    function logout() {
        props.userLogout()
        // console.log('push to /post')
        // props.history.push('/post')
        // console.log('push to /post 2')
    }
    

    useEffect(
        () => {
            if (!prevProps){
                props.userGetStatus()
                props.categoryGet()
            }
        }, []
    )


    return (
        <StyledDivAppbar>
            {/* {isLogin?null:<Redirect to="/post" />}             */}
            <StyledDivLogo><StyledLink to='/'><span>{props.words.cmn_home}</span></StyledLink></StyledDivLogo>
            <StyledDivUser>
                {/* <StyledDivSearch>
                    <input type='text' ></input><button>Search</button>
                </StyledDivSearch> */}
                <StyledDivUserAvatarName>
                    {/* <StyledDivUserName><NavLink to={`/user/${props.user._id}`}><AvatarImg width='35px' radius={'5px'} src={props.user.avatarPath} /></NavLink></StyledDivUserName> */}
                    <StyledDivUserName><StyledLink to='/user'><AvatarImg width='35px' radius={'5px'} src={props.user.avatarPath} /></StyledLink></StyledDivUserName>
                    {/* <StyledDivUserName><NavLink to={`/user/${props.user._id}`}>{props.user.name}</NavLink></StyledDivUserName> */}
                    <StyledDivUserName><StyledLink to='/user'>{props.user.name}</StyledLink></StyledDivUserName>
                </StyledDivUserAvatarName>
                
                {props.user.role=='admin'?<StyledDivUserAdmin><StyledLink to='/admin'><span>{props.words.adm_admin}</span></StyledLink></StyledDivUserAdmin>:null}
                
                <StyledDivUserLogout><StyledLink to='/'><span onClick={logout}>{props.words.user_logout}</span></StyledLink></StyledDivUserLogout>
                
                <StyledDivUserLogin><StyledLink to='/login'><span>{props.words.user_login}</span></StyledLink></StyledDivUserLogin>
                
                <StyledDivUserRegister><StyledLink to='/register'><span>{props.words.user_register}</span></StyledLink></StyledDivUserRegister>
                {/* <StyledDivLocale>
                    <button onClick={()=>props.languageSet('zh')}>zh</button>
                    <button onClick={()=>props.languageSet('en')}>en</button>
                </StyledDivLocale> */}
                
                <StyledSelect onChange={(e) => { props.languageSet( e.target.value )}} value={''+props.locale.language}>
                    <option value='zh'>中文</option>
                    <option value='en'>en</option>
                </StyledSelect>
            </StyledDivUser>
        </StyledDivAppbar>
    );
}

const mapStateToProps = state => ({
    isLogin: state.user.isLogin,
    words: state.locale.words,
    user: state.user,
    locale: state.locale,
    sys: state.sys,
})

const mapDispatchToProps = dispatch => ({
    userLogout: (v) => dispatch(actionUser.Creator.userLogout(v)),
    userGetStatus: (v) => dispatch(actionUser.Creator.userGetStatus(v)),
    languageSet:(v)=>dispatch(actionLocale.Creator.languageSet(v)),
    categoryGet:(v)=>dispatch(actionSys.Creator.categoryGet(v)),
})
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Appbar))
