import axios from 'axios'
import cookies from 'react-cookies'

axios.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {

  userAdd(post) {
    console.log('user add')
    return axios.post('/admin/add', post)
  },
  userGet(v) {
    console.log('admin user get')
    if (v) {
      console.log('user get use getpages')
      return axios.get('/admin/getpage', { params: {pageInfo:JSON.stringify(v) }})
    } else {
      console.log('user get use get')
      return axios.get('/admin/get')
    }

  },
  userDeleteOne(v) {//找到match的第一个并删除
    return axios.post('/admin/deleteone', { path: v.path })
  },
  userFindByIdAndDelete(v) {
    // console.log('JSON.stringify(v):')
    // console.log(JSON.stringify(v))
    return axios.post('/admin/findbyidanddelete', v)
  },
  userFindByIdAndUpdate(v) {
    // console.log('JSON.stringify(v):')
    console.log('userFindByIdAndUpdate')
    return axios.post('/admin/findbyidandupdate', v)
  },
  userAvatarFindByIdAndUpdate(v) {
    // console.log('JSON.stringify(v):')
    console.log('userAvatarFindByIdAndUpdate')
    return axios.post('/admin/findbyidandupdateavatar', v)
  },


}