import axios from 'axios'
import cookies from 'react-cookies'

axios.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {

  register(user) {
    console.log('service user register')
    return axios.post('/user/register', user)
  },
  login(user) {
    console.log('service user login')
    return axios.post('/user/login', user)
  },
  logout(user) {
    console.log('service user logout')
    return axios.post('/user/logout', user)
  },
  getStatus() {
    console.log('service user status')
    return axios.get('/user/status')
  },
  getOtherInfo(v) {
    console.log('service other user info')
    console.log(v)
    return axios.get('/user/other/info', { params: {user:JSON.stringify(v) }})
  },
  // uploadAvatar(v) {
  //   console.log('service user upload')
  //   return axios.post('/user/upload/avatar', v)
  // },
  updateAvatar(v) {
    console.log('service user upload')
    return axios.post('/user/upload/avatar', v)
  },
  userUpdate(v) {
    console.log('service user update')
    return axios.post('/user/update', v)
  },
  userChangePassword(v) {
    console.log('service user userChangePassword')
    return axios.post('/user/password/change', v)
  },
  userResetPassword(v) {
    console.log('service user userResetPassword')
    return axios.post('/user/password/reset', v)
  },
  userResetPasswordNew(v) {
    console.log('service user userResetPassword')
    return axios.post('/user/password/new', v)
  },
}