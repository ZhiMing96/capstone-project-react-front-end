import { ADD_SKILL, REMOVE_SKILL, UPDATE_SKILL, UPDATE_SUGGESTED_SKILLS } from "../actions/types";
import api from '../../api'
const initialState = { 
  //past: [],
  //present: [],
  skills:[],
  suggestedSkills:[]
};

export default function (state = initialState, action) {
  const skill = action.payload;
  switch (action.type) {
    case ADD_SKILL:
      console.log(skill)
      return {
        ...state,
        //past: state.present,
        //present: [...state.present, skill]
        skills: [...state.skills,skill]
      }
    case REMOVE_SKILL:
      console.log(skill)
      return {
        ...state,
        //past: state.present,
        //present: state.present.filter(obj => { return obj.id !== skill.id })
        skills: state.skills.filter(obj => { return obj.id !== skill.id })
      };
    case UPDATE_SKILL:
        return {
          ...state,
          //past: state.present,
          //present: skill
          skills:skill

        } 
    case UPDATE_SUGGESTED_SKILLS:
      console.log('update suggested')
        return {
          ...state,
          suggestedSkills:skill
        }
    default:
      return state;
  }
};
