import { UPDATE_WORK, REMOVE_WORK, EDIT_WORK, ADD_WORK} from "../actions/types";
import api from '../../api'

const initialState = {
    work: []
};

export default function (state = initialState, action) {
    const work = action.payload;
    switch (action.type) {
      case ADD_WORK:
        return {
          work: [...state.work, work]
        }
      case REMOVE_WORK:
          console.log(work)
        return {
          work: state.work.filter(obj => { console.log(obj); return obj.record_id !== work })
        };
      case UPDATE_WORK:
          return {work: work};
      case EDIT_WORK:
            const arr = [] //new array
            state.work.forEach((element,index) => {
                if (element.record_id === work.record_id){
                    arr.push( work)
                }else {
                    arr.push(element)
                }
            });
            return {
                work: arr
            };  
        
      default:
        return state;
    }
  };
  