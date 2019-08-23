import axios from 'axios'
import cookies from 'react-cookies'

axios.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {

  detailPostGet(v:any) {
    console.log('service detail post get')
    // return axios.get('/detail/'+id)
    return axios.get('/detail/post', { params: {postInfo:JSON.stringify(v) }})
  },
  detailCommentGet(v:any) {
    console.log('service detail comment get')
    // return axios.get('/detail/'+id)
    return axios.get('/detail/comment/getpage', { params: {pageInfo:JSON.stringify(v) }})
  },
  detailCommentAdd(comment:any) {
    console.log('comment add')
    return axios.post('/detail/comment/add', comment)
  },
  detailCommentDeleteById(comment:any) {
    console.log('comment delete')
    return axios.post('/detail/comment/findbyidanddelete', comment)
  },
  detailCommentUpdateById(comment:any) {
    console.log('comment update')
    return axios.post('/detail/comment/findbyidandupdate', comment)
  },
  detailPostUpdateById(post:any) {
    console.log('post update')
    return axios.post('/detail/post/findbyidandupdate', post)
  },
  detailPostAttachById(cmd:any) {
    console.log('post attach')
    return axios.post('/detail/post/findbyidandattach', cmd)
  },
  detailCommentAttachById(cmd:any) {
    console.log('comment attach')
    return axios.post('/detail/comment/findbyidandattach', cmd)
  },
}