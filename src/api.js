//see all endpoints in one file
import axios from 'axios'

const auth = {
    register: params => axios.post('http://localhost:3000/auth/register', params),
    details: token => axios.get('http://localhost:3000/auth/current', {
        headers: {'Authorization': 'Token '+ token}
    }),
    login: params => axios.post('http://localhost:3000/auth/login',params),
    // etc.
  }
  
  
  
  export default {
    auth,
    
  }