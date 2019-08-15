import axios from 'axios'
import cookies from 'react-cookies'

axios.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {

  extendLineupJoin(v) {
    console.log('extendLineupJoin')
    // console.log('JSON.stringify(v):')
    return axios.post('/extend/lineup/join', v)
  },
  extendLineupQuit(v) {
    console.log('extendLineupQuit')
    // console.log('JSON.stringify(v):')
    return axios.post('/extend/lineup/quit', v)
  },

  extendVoteJoin(v) {
    console.log('extendVoteJoin=========')
    console.log(JSON.stringify(v))
    return axios.post('/extend/vote/join', v)
  },
  extendVoteQuit(v) {
    console.log('extendVoteQuit')
    // console.log('JSON.stringify(v):')
    return axios.post('/extend/vote/quit', v)
  },


}