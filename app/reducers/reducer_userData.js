export default function(state = null, action) {
  switch(action.type) {
    case 'FETCH_USER':
      return action.payload
    case 'UNAUTH_USER':
      return null;
    case 'FETCH_USER_LIB':
      return Object.assign({},{...state, library:action.payload});  
    case 'UPDATE_USER_DATA':
      return Object.assign({},{...state, ...action.payload})    
  }

  return state;
}
