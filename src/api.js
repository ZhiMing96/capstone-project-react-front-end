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
    "limit": 5
    },{
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
  updateSocial: params => axios.post('http://localhost:3000/social/profile', params,{
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
}

const work ={
  get: () => axios.get('http://localhost:3000/work/all', {
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  add: params => axios.post('http://localhost:3000/work/add', params,{
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
  click: params => axios.post('http://localhost:3000/jobs/click',params,{
    headers: {'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  
}
const searchJobs = {
  get: (queryString) => axios.get(`http://localhost:3000/jobs/search?${queryString}`)
  
}

const articles = {
  get: () => axios.get('http://localhost:3000/article')
}

const events = {
  get: () => axios.get('http://localhost:3000/event/all')
}

const dailyDigest = {
  
  get: () => axios.get('http://localhost:3000/daily', {
    headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  getFromUrl: params => axios.get('http://localhost:3000/daily', {
    headers:{ 'Authorization': 'Token '+ params}
  }),
  getPublic: () => axios.get('http://localhost:3000/daily')
}

const invitations = {
  getPending: () => axios.get('http://localhost:3000/meetup/invite/pending', {
    headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),

  getCurrent: () => axios.get('http://localhost:3000/meetup/invite/all', {
    headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }), 

  acceptInvitation: params => axios.post('http://localhost:3000/meetup/invite/accept', params, {
    headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),

  rejectInvitation: params => axios.post('http://localhost:3000/meetup/invite/reject', params, {
    headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),

  
}

const meetups = {
    getTeleLink: params => axios.post('http://localhost:3000/telegram/user', params),

    changeDate: params => axios.post('http://localhost:3000/meetup/update', params, {
      headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
    }),

    completeMeetup: params => axios.post('http://localhost:3000/meetup/complete', params, {
      headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
    }),
    cancelMeetup: params => axios.post('http://localhost:3000/meetup/cancel', params, {
      headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
    }),
}

const recommendations = {
  request: (params) => axios.post('http://localhost:3000/recommendation/request', params, {
    headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
}

const alerts = {
  retrieve: (params) => axios.post("http://localhost:3000/alert/all", params, {
    headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
  seen: (params) => axios.post("http://localhost:3000/alert/seen", params, {
    headers:{ 'Authorization': 'Token '+ window.localStorage.getItem('authToken')}
  }),
}
  
  export default {
    auth,
    skills,
    profile,
    work,
    bookmarks,
    searchJobsAcct,
    searchJobs,
    articles,
    dailyDigest,
    events,
    invitations,
    meetups,
    recommendations,
    alerts,
  }