import axios from 'axios';
var _ = require('lodash');


export function sendQueryGroupBY(filename,query) {
    return dispatch => {
        dispatch(Loading(true));
  
        fetch('http://192.168.1.148:8080/dev2', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: {
           "filenam": filename,
           "query" :query
          }
         }).then(response => response.json())
         
       
            .then(json => {
             
                var arr = _.values(json);
                console.log('arr dev2' + arr);
                
             dispatch(setResults(arr.slice(0,88000)))
            })
            .catch(error => {
                console.log(error);
                dispatch(Loading(false));
            });
    };
  }


export function setResults(results) {
  return { type: 'GET_DATA', results};
}





export function Loading(status) {
  return { type: 'LOADING', status};
}





export function sendQuery(filename,query) {
  return dispatch => {
      dispatch(Loading(true));

      fetch('http://192.168.1.148:8080/dev', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: {
         "filenam": filename,
         "query" :query
        }
       }).then(response => response.json())
       
     
          .then(json => {
           
              var arr = _.values(json);
              console.log('arr dev2' + arr);
              
           dispatch(setResults(arr.slice(0,88000)))
          })
          .catch(error => {
              console.log(error);
              dispatch(Loading(false));
          });
  };
}










export function sendQuerySelect(query) {
    return dispatch => {
        dispatch(setSQLQuery(query)) 
    };
  }


  export function setSQLQuery(query) {
    return { type: 'SET_SQL_QUERY', query};
  }  



  export function getResults() {
    return dispatch => {
       
        axios.get('http://localhost:8080/results')
            .then(response => {
                dispatch(setResults(response.data.results));
                //dispatch(ajaxLoading(false));
            })
            .catch(error => {
                console.error(error);
                //dispatch(ajaxLoading(false));
            });
  }
  }