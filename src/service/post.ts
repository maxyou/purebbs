import axios from 'axios'
import cookies from 'react-cookies'

axios.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {

  postAdd(post:any) {
    console.log('post add')
    // console.log(post)
    // console.log(post.extend.addVote.expireTime)
    // console.log(new Date(post.extend.addVote.expireTime).getTime())
    return axios.post('/post/add', post)
  },
  postGet(v:any) {
    if (v) {
      console.log('post get use getpages')
      return axios.get('/post/getpage', { params: {pageInfo:JSON.stringify(v) }})
    } else {
      console.log('post get use get')
      return axios.get('/post/get')
    }

  },
  postDeleteOne(v:any) {//找到match的第一个并删除
    return axios.post('/post/deleteone', { path: v.path })
  },
  postFindByIdAndDelete(v:any) {
    // console.log('JSON.stringify(v):')
    // console.log(JSON.stringify(v))
    return axios.post('/post/findbyidanddelete', v)
  },
  postFindByIdAndUpdate(v:any) {
    // console.log('JSON.stringify(v):')
    // console.log(JSON.stringify(v))
    return axios.post('/post/findbyidandupdate', v)
  },

  postAttachById(cmd:any) {
    console.log('post attach')
    return axios.post('/detail/post/findbyidandattach', cmd)
  },
}