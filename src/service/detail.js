import axios from 'axios'
import cookies from 'react-cookies'

axios.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {

  detailPostGet(v) {
    console.log('service detail post get')
    // return axios.get('/detail/'+id)
    return axios.get('/detail/post', { params: {postInfo:JSON.stringify(v) }})
  },
  detailCommentGet(v) {
    console.log('service detail comment get')
    // return axios.get('/detail/'+id)
    return axios.get('/detail/comment/getpage', { params: {pageInfo:JSON.stringify(v) }})
  },
  detailCommentAdd(comment) {
    console.log('comment add')
    return axios.post('/detail/comment/add', comment)
  },
  detailCommentDeleteById(comment) {
    console.log('comment delete')
    return axios.post('/detail/comment/findbyidanddelete', comment)
  },
  detailCommentUpdateById(comment) {
    console.log('comment update')
    return axios.post('/detail/comment/findbyidandupdate', comment)
  },
  detailPostUpdateById(post) {
    console.log('post update')
    return axios.post('/detail/post/findbyidandupdate', post)
  },
  detailPostAttachById(cmd) {
    console.log('post attach')
    return axios.post('/detail/post/findbyidandattach', cmd)
  },
  detailCommentAttachById(cmd) {
    console.log('comment attach')
    return axios.post('/detail/comment/findbyidandattach', cmd)
  },
}