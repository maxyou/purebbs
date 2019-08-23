import React, { Fragment } from 'react';
import styled from 'styled-components'
import { Switch, BrowserRouter, HashRouter, Route, Redirect } from 'react-router-dom'
import Post from '@/biz/post'
import Detail from '@/biz/detail'
import Login from '@/biz/user/login'
import Register from '@/biz/user/register'
import NewPwd from '@/biz/user/resetpwdnew'
import User from '@/biz/user'
import Admin from '@/biz/admin'
import {NotFound} from '@/biz/common'

// const StyledDivAppbar = styled.div`
//     height: 60px;
//     display: flex;
//     flex-wrap: nowrap;
//     justify-content: space-between;
//     align-items: center;
//     background-color: lightblue;
// `

const Content = function (props) {

    return (
        <div>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/post" />} />
                <Route path="/admin" component={Admin} />
                <Route path="/post" component={Post} />
                <Route path="/detail/:id" component={Detail} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/user" component={User} />
                <Route path="/resetpwd/newpwd/:id" component={NewPwd} />                
                <Route path="/notfound" component={NotFound} />
                <Route component={Post} />
            </Switch>
        </div>
    );
}


export default Content
