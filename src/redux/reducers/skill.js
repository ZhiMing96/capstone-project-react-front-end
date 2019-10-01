import { ADD_SKILL, REMOVE_SKILL, UPDATE_SKILL } from "../actions/types";

const initialState = { 
  skills: [],
};

export default function (state = initialState, action) {
  const skill = action.payload;
  switch (action.type) {
    case ADD_SKILL:
      console.log(skill)
      return {
        skills: [...state.skills, skill]
      }
    case REMOVE_SKILL:
      console.log(skill)
      return {
        skills: state.skills.filter(obj => { return obj.id !== skill.id })
      };
    case UPDATE_SKILL:
        return {skills: skill} 
    default:
      return state;
  }
};
