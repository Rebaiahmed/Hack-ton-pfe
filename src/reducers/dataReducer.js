import axios from 'axios';
import initialState from './initialState';
const dataReducer = (state = initialState, action) => {


    switch(action.type) {
        case 'GET_DATA':
        return Object.assign({}, state, {
            results: action.results
          })
        case 'LOADING':
          return  action.isLoading;  
        case 'RUN_QUERY':
              
        return Object.assign({}, state, {
            sql_query: action.query
          })

        case 'SET_SQL_QUERY':
        return Object.assign({}, state, {
            sql_query: action.query
          }) 
          
        case 'LOADIN':
          return Object.assign({}, state, {
            status: action.status
            })  


        default:
          return state;
    }


}
export default dataReducer;