export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_ALBUMS':
      return action.payload.data.results;
  	case 'ADD_ALBUM':
  	  return [...state,action.payload]
  	case 'DELETE_ALBUM':
  		return [...state.slice(0,action.payload),...state.slice(action.payload+1)]
  	}
  	
  return state;
}