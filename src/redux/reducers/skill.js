import { ADD_SKILL, REMOVE_SKILL, UPDATE_SKILL } from "../actions/types";
import api from '../../api'

const initialState = { 
  skills: [],
};

export default function (state = initialState, action) {
  const skill = action.payload;
  switch (action.type) {
    case ADD_SKILL:
      console.log(skill)
      return {
        ...state,
        skills: [...state.skills, skill]
      }
    case REMOVE_SKILL:
      console.log(skill)
      return {
        ...state, //copy the rest of state object except the properties changes made below
        skills: state.skills.filter(obj => { return obj.id !== skill.id })
      };
    case UPDATE_SKILL:
      console.log(skill)
      api.skills.get(window.localStorage.getItem('authToken'))
      .then(response => {
        return {skills: response.data.skill_list} //api return array
      }).catch(error => {

        console.log('issue w token')
        return state
      })
    default:
      return state;
  }
};
