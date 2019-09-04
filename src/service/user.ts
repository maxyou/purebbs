import axios from 'axios'
import cookies from 'react-cookies'

axios.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {

  register(user:any) {
    console.log('service user register')
    return axios.post('/user/register', user)
  },
  login(user:any) {
    console.log('service user login')
    return axios.post('/user/login', user)
  },
  logout(v:any) {
    console.log('service user logout')
    return axios.post('/user/logout', v)
  },
  getStatus(v:any) {
    console.log('service user status')
    return axios.get('/user/status')
  },
  getOtherInfo(v:any) {
    console.log('service other user info')
    console.log(v)
    return axios.get('/user/other/info', { params: {user:JSON.stringify(v) }})
  },
  // uploadAvatar(v) {
  //   console.log('service user upload')
  //   return axios.post('/user/upload/avatar', v)
  // },
  updateAvatar(v:any) {
    console.log('service user upload')
    return axios.post('/user/upload/avatar', v)
  },
  userUpdate(v:any) {
    console.log('service user update')
    return axios.post('/user/update', v)
  },
  userChangePassword(v:any) {
    console.log('service user userChangePassword')
    return axios.post('/user/password/change', v)
  },
  userResetPassword(v:any) {
    console.log('service user userResetPassword')
    return axios.post('/user/password/reset', v)
  },
  userResetPasswordNew(v:any) {
    console.log('service user userResetPassword')
    return axios.post('/user/password/new', v)
  },
}