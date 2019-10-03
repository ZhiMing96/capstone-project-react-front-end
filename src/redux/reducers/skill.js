import { ADD_SKILL, REMOVE_SKILL, UPDATE_SKILL, UNDO_DELETED_SKILL } from "../actions/types";
import api from '../../api'
const initialState = { 
  //past: [],
  //present: [],
  skills:[]
};

export default function (state = initialState, action) {
  const skill = action.payload;
  switch (action.type) {
    case ADD_SKILL:
      console.log(skill)
      return {
        //past: state.present,
        //present: [...state.present, skill]
        skills: [...state.skills,skill]
      }
    case REMOVE_SKILL:
      console.log(skill)
      return {
        //past: state.present,
        //present: state.present.filter(obj => { return obj.id !== skill.id })
        skills: state.skills.filter(obj => { return obj.id !== skill.id })
      };
    case UPDATE_SKILL:
        return {
          //past: state.present,
          //present: skill
          skills:skill

        } 
    case UNDO_DELETED_SKILL:
        return {
          past: [],
          present: state.past
        }
    default:
      return state;
  }
};
