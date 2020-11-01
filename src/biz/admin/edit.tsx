import React, { useState } from 'react'
import { connect } from 'react-redux'
import PostList from './list'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { AvatarImg } from 'component/user'
import { admin as actionAdmin } from 'redux/action'
import { AvatarCrop } from 'component/user'
import { Dispatch } from 'redux';
import {FieldSet} from 'component/style'

const StyledDivCard = styled.div`
    width:100%;
    background-color: white;
    `
const StyledDivCrop = styled.div<{display:string}>`
    width: 100%;
    // height: 450px;
    // position: absolute;
    display: ${props => props.display};
    // background-color: red;
`
const StyledInput = styled.input`
    margin: 10px;
    padding: 10px;
    display: none;
    // background-color: lightblue;
`
function Edit(props:IState2Prop & IDispatch2Prop  & IProps & IRouterProp) {

  const [cropDisplay, setCropDisplay] = useState('none')
  const [file, setFile] = useState<any>(null)
  const [cropBlob, setCropBlob] = useState(null)
  const [role, setRole] = useState(props.userEdit.role)
  const [email, setEmail] = useState(props.userEdit.email || '')


  function createFormData(cropBlob:any) {
    let data = new FormData()
    data.append('file', cropBlob)
    data.append('_id', props.userEdit._id)
    return data
  }

  function handleSubmit(e:any) {
    e.preventDefault();
    console.log('handleSubmit + findByIdAndUpdate')
    props.findByIdAndUpdate(
      {
        _id: props.userEdit._id,
        name: props.userEdit.name,
        role: role,
        email: email,
      }
    )
    console.log('handleSubmit + findByIdAndUpdate---1')
    if (cropBlob) {
      props.findByIdAndUpdateAvatar(createFormData(cropBlob))
    }
    console.log('handleSubmit + findByIdAndUpdate---2')
    props.history.goBack()
    console.log('handleSubmit + findByIdAndUpdate---3')
  }

  function handleCancel(e:any) {
    e.preventDefault();
    console.log('handleSubmit + props.history.goBack()----1')
    props.history.goBack()
    console.log('handleSubmit + props.history.goBack()----2')
  }

  function onSelectFile(e:any) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setCropDisplay('block')
        setFile(reader.result)
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  function onCropBlob(cropBlob:any) {
    console.log('onCropFile---1')
    setCropDisplay('none')
    console.log('onCropFile---2')
    // console.log(croppedFile.get('file'))
    setCropBlob(cropBlob)
    // props.userUploadAvatar(croppedFile)
    console.log('onCropFile---3')
  }

  return (
    <StyledDivCard>
      <FieldSet.StyledFieldSet>
        <legend>{props.userEdit.name}</legend>
        {/* <div>{props.userEdit.name}</div> */}

        <div><label htmlFor="theinput" >{props.words.user_avatar}:<AvatarImg width='45px' src={cropBlob ? URL.createObjectURL(cropBlob) : 'user/avatar/' + props.userEdit.avatarFileName} /></label>
          <StyledInput type="file" onChange={onSelectFile} onClick={(e) => (e.target as any).value = ''} id='theinput' /></div>

        <div><StyledDivCrop display={cropDisplay} >
          <AvatarCrop file={file} onCropBlob={onCropBlob} onCancel={() => setCropDisplay('none')}></AvatarCrop>
        </StyledDivCrop></div>

        <div><form style={{ display: 'inline' }} onSubmit={handleSubmit} method="post">
          {props.words.user_role}:<select name="role" onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="user">user</option>
            <option value="bm">bm</option>
            {/* <option value="admin">admin</option> */}
          </select><br />
          {/* <input type="text" name="role" onChange={(e)=>setRole(e.target.value)} value={role} /><br/> */}
          {props.words.user_email}:<input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} /><br />
          <input type="submit" onClick={handleCancel} value={props.words.cmn_cancel} />
          <input type="submit" value={props.words.cntnt_submit} />
          {/* <input type="submit" value={'confirm'} /> */}
        </form></div>
      </FieldSet.StyledFieldSet>
    </StyledDivCard>
  );
}
interface IProps extends RouteComponentProps<any>{
  // user: any,
}
interface IRouterProp {
  history: any,
  match: any,
}
interface IState2Prop {
  userEdit: any,
  words: any,
}
interface IDispatch2Prop {
  findByIdAndUpdate: (v:any) => void,
  findByIdAndUpdateAvatar: (v:any) => void,
}

const mapStateToProps: { (arg0: any): IState2Prop } = state => ({
  userEdit: state.admin.userEdit,
  words: state.locale.words,
})

const mapDispatchToProps: { (dispatch: Dispatch): IDispatch2Prop } = (dispatch: Dispatch) => ({
  findByIdAndUpdate: (v:any) => dispatch(actionAdmin.Creator.userFindByIdAndUpdate(v)),
  findByIdAndUpdateAvatar: (v:any) => dispatch(actionAdmin.Creator.userAvatarFindByIdAndUpdate(v)),
})

export default withRouter(
  (connect(
      mapStateToProps,
      mapDispatchToProps
  ) as any) (Edit)
)