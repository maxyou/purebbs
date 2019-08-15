import axios from 'axios'
import cookies from 'react-cookies'

axios.defaults.headers.common['x-csrf-token'] = cookies.load('csrfToken');
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = {
  
  categoryGet(v) {
    console.log('service categoryGet get')
    // return axios.get('/detail/'+id)
    return axios.get('/sys/category')
  },

}