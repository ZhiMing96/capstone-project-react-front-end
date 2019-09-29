import { ADD_SKILL, REMOVE_SKILL,UPDATE_SKILL } from "./types";

export const addSkill = (skill) =>({
    type: ADD_SKILL,
    payload: skill
  })
  
  export const removeSkill = (skill) =>({
    type: REMOVE_SKILL,
    payload: skill
  })
  
  export const updateSkill = (skills) =>({
    type: UPDATE_SKILL,
    payload: skills,
  })