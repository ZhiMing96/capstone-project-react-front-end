//see all endpoints in one file
import axios from 'axios'

const auth = {
    register: params => axios.post('/auth/register', params),
    details: token => axios.get('/auth/current/', {
        headers: {'Authorization': 'Token '+ token}
    }),
    login: params => axios.post('/auth/login',params),
    // etc.
  }
  
  
  
  export default {
    auth,
    
  }