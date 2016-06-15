import axios from 'axios';
import { browserHistory } from 'react-router';

require('../secret')

const ROOT_URL='https://record-server.herokuapp.com'
const Key=process.env.KEY

export function findAlbum(query){	
	const request=axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${Key}&format=json`)
	return {type:'FIND_ALBUM',payload:request}	
}

export function fetchAlbums(){
	const request=axios.get(`${ROOT_URL}/albums`)
	return {type:'FETCH_ALBUMS',payload:request}
}
export function addNewAlbum(album){
	const request=axios.post(`${ROOT_URL}/albums`,album)
	return {type:'ADD_ALBUM',payload:album}
}
export function deleteAlbum(album,index){
  const request=axios.delete(`${ROOT_URL}/albums/${album}`)
  return {type:'DELETE_ALBUM',payload:index}
}

export function selectAlbum(album){
	return {type:'SELECT_ALBUM',payload:album}
}
export function unselectAlbum(){
	return {type:'UNSELECT_ALBUM'}
}
export function clearResults(){
	return {type:'CLEAR'}	
}

export function sendRequest(user,owner,offer,trade,update){
  axios.put(`${ROOT_URL}/user/${owner}`,{$push:{request_received:{offer,trade}}})
  axios.put(`${ROOT_URL}/user/${user}`,{$push:{request_sent:{offer,trade}}})
  return({type:'UPDATE_INFO',payload:update})  
}

export function cancelRequest(user,owner, obj, update){
  axios.put(`${ROOT_URL}/user/${owner}`,{$pull:{request_received:obj}})
  axios.put(`${ROOT_URL}/user/${user}`,{$pull:{request_sent:obj}})
  return({type:'UPDATE_INFO',payload:update})  
}



export function confirmRequest(userA, userB, albumA, albumB,update){
  axios.put(`${ROOT_URL}/albums/${albumA}`,{owner:userB})
  axios.put(`${ROOT_URL}/albums/${albumB}`,{owner:userA})
  

  return({type:'UPDATE_INBOX',payload:update})  
}

export function signupUser({ email, password,name,location}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email,password,name,location})
      .then(response => {
        dispatch({type:'AUTH_USER',payload:response.data});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/library');
      }).catch(() => {
        dispatch(authError('This Email or Username is already in use according to my intel.'));
      });
  }
}
export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({type:'AUTH_USER',payload:response.data});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/library');
      })
      .catch(() => {
        dispatch(authError('Why did you enter the wrong info?'));
      });
  }
}
export function updateUser(name,userObj,update){
  
  const request=axios.put(`${ROOT_URL}/user/${name}`,update)
                .then(()=>{
                  browserHistory.push('/library')})
  return {type:'UPDATE_INFO',payload:userObj}
}
export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return { type: 'UNAUTH_USER' };
}

export function authError(error) {
  return {
    type: 'AUTH_ERROR',
    payload: error
  };
}