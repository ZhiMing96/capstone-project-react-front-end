import { UPDATE_WORK, REMOVE_WORK, EDIT_WORK, ADD_WORK, UNDO_DELETED_WORK} from "../actions/types";
import api from '../../api'

const initialState = {
  //past:[],
  //present: []
  work:[]
};

function compare( a, b ) {
  var aDate = new Date(a.start_date)
  var bDate = new Date(b.start_date)
  if ( aDate <= bDate ){
    return 1;
  }
  if ( aDate > bDate ){
    return -1;
  }
  return 0;
}

export default function (state = initialState, action) {
    const work = action.payload;
    switch (action.type) {
      case ADD_WORK:
        return {
          //past: [],
          //present: [...state.past, work]
          work:[...state.work, work]
        }
      case REMOVE_WORK:
          console.log(work)
        return {
          //past:[],
          //present: state.past.filter(obj => { console.log(obj); return obj.record_id !== work })
          work:  state.work.filter(obj => { console.log(obj); return obj.record_id !== work })
        };
      case UPDATE_WORK:
          work.sort(compare)
          return {
            //past:[],
            //present: work
            work:work
          };
      case EDIT_WORK:
            const arr = [] //new array
            state.work.forEach((element,index) => {
                if (element.record_id === work.record_id){
                    arr.push( work)
                }else {
                    arr.push(element)
                }
            });
            arr.sort(compare)
            return {
              //past:[],
              //present: arr
              work:arr
            };  
       
      default:
        return state;
    }
  };
  