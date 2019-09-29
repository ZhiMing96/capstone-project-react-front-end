import { ADD_SKILL, REMOVE_SKILL } from "./types";

export const addSkill = (skill) =>({
    type: ADD_SKILL,
    payload: skill
  })
  
  export const removeSkill = (skill) =>({
    type: REMOVE_SKILL,
    payload: skill
  })
  
  export const updateSkill = () =>({
    type: REMOVE_SKILL,
  })