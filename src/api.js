//see all endpoints in one file
import axios from 'axios'

const auth = {
    register: params => axios.post('http://localhost:3000/auth/register', params),
    login: params => axios.post('http://localhost:3000/auth/login',params),
    // etc.
}

const skills ={
  get: () => axios.get('http://localhost:3000/skills/all', {
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  match: async(params) => await axios.post('http://localhost:3000/skills/match', params),
  add: params => axios.post('http://localhost:3000/skills/add', params, {
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  remove: params => axios.post('http://localhost:3000/skills/remove', params,{
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  suggested: () => axios.post('http://localhost:3000/skills/suggested', {
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
}

const profile={
  get: () => axios.get('http://localhost:3000/user/profile', {
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  update: params => axios.post('http://localhost:3000/user/profile', params,{
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
}

const work ={
  get: () => axios.get('http://localhost:3000/work/all', {
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  add: params => axios.post('http://localhost:3000/jobs/bookmarks/add', params,{
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  remove: params => axios.post('http://localhost:3000/work/remove', params,{
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  update: params => axios.post('http://localhost:3000/work/update', params,{
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
}

const bookmarks = { 
  get: () => axios.get('http://localhost:3000/jobs/bookmarks/all', {
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }), 
  add: params => axios.post('http://localhost:3000/jobs/bookmarks/add', params,{
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  remove: params => axios.post('http://localhost:3000/jobs/bookmarks/remove', params,{
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
}

const searchJobsAcct = {
  get: (queryString) => axios.get(`http://localhost:3000/jobs/search?${queryString}`, {
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  
}
const searchJobs = {
  get: (queryString) => axios.get(`http://localhost:3000/jobs/search?${queryString}`)
  
}
  
  
  export default {
    auth,
    skills,
    profile,
    work,
    bookmarks,
    searchJobsAcct,
    searchJobs
  }