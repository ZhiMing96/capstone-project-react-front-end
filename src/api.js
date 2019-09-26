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

const skills ={
  get: token => axios.get('http://localhost:3000/skills/all', {
    headers: {'Authorization': 'Token '+ token}
  }),
  match: params => axios.get('http://localhost:3000/skills/match', params),
  add: params => axios.post('http://localhost:3000/skills/add', params),
  remove: params => axios.post('http://localhost:3000/skills/remove', params),
}
  
  
  export default {
    auth,
    skills,
  }