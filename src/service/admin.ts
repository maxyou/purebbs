import axios from 'axios'
// interface ICookies{
//   load:{(arg0: string):void}
// }
import cookies from 'react-cookies'

axios.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {

  userAdd(post:any) {
    console.log('user add')
    return axios.post('/admin/add', post)
  },
  userGet(v:any) {
    console.log('admin user get')
    if (v) {
      console.log('user get use getpages')
      return axios.get('/admin/getpage', { params: {pageInfo:JSON.stringify(v) }})
    } else {
      console.log('user get use get')
      return axios.get('/admin/get')
    }

  },
  userDeleteOne(v:any) {//找到match的第一个并删除
    return axios.post('/admin/deleteone', { path: v.path })
  },
  userFindByIdAndDelete(v:any) {
    // console.log('JSON.stringify(v):')
    // console.log(JSON.stringify(v))
    return axios.post('/admin/findbyidanddelete', v)
  },
  userFindByIdAndUpdate(v:any) {
    // console.log('JSON.stringify(v):')
    console.log('userFindByIdAndUpdate')
    return axios.post('/admin/findbyidandupdate', v)
  },
  userAvatarFindByIdAndUpdate(v:any) {
    // console.log('JSON.stringify(v):')
    console.log('userAvatarFindByIdAndUpdate')
    return axios.post('/admin/findbyidandupdateavatar', v)
  },


}