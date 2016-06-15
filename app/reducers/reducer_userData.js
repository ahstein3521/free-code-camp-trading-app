export default function(state = null, action) {
  switch(action.type) {
    case 'FETCH_USER':
      return action.payload
 
    case 'UPDATE_USER_DATA':
      return Object.assign({},{...state, ...action.payload})    
  }

  return state;
}
