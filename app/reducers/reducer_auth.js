export default function(state = {}, action) {
  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, error: '', authenticated: true, user:action.payload};
    case 'UNAUTH_USER':
      return { ...state, authenticated: false, user:{} };
    case 'UPDATE_INFO':
      return Object.assign({},{...state, user: action.payload})     
    case 'AUTH_ERROR':
      return { ...state, error: action.payload };
    case 'FETCH_MESSAGE':
      return { ...state, message: action.payload };    
  }

  return state;
}
