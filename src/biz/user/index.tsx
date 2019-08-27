import React,{useState} from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Route, NavLink, Redirect, withRouter } from 'react-router-dom'
import Edit from './edit'
import Me from './me'
import PwdEdit from './pwdedit'
import Other from './other'

const StyledDivTemp = styled.div`
    width: 100px;
    height: 100px;
    margin: 10px;
    border:2px solid #dede00;
`

// function Other(){
//     return (
//         <StyledDivTemp>
//             other
//         </StyledDivTemp>
//     )
// }
function Info(props){
    return (
        <div>
             <fieldset>
                <legend>{props.words.user_personalInfo}</legend>
                <Me></Me>            
            </fieldset>
             <fieldset>
                <legend>{props.words.user_personalSecurity}</legend>                
                <NavLink to='/user/password/edit'><button>{props.words.user_changePassword}</button></NavLink>
            </fieldset>
        </div>
    )
}

function User () {

    return (
        <div>           
            <Route path='/user/other/:id' component={Other} />            
            <Route path='/user/me/edit' component={Edit} />            
            <Route path='/user/password/edit' component={PwdEdit} />            
            <Route exact path="/user" component={
                connect(
                    mapStateToProps,
                    mapDispatchToProps
                )(Info)} />            
        </div>
    );
}


const mapStateToProps = state => ({
    user: state.user,
    words: state.locale.words,
  })
  
  const mapDispatchToProps = dispatch => ({
    // edit: (v) => dispatch(actionAdmin.Creator.userEdit(v)),
  })
  
  export default User
//   export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(User))
  