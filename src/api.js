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
  match: async(params) => await axios.post('http://localhost:3000/skills/match', params),
  add: params => axios.post('http://localhost:3000/skills/add', params, {
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  remove: params => axios.post('http://localhost:3000/skills/remove', params,{
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
}
  
  
  export default {
    auth,
    skills,
  }