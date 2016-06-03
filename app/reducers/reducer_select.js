export default function(state = {}, action) {
  switch(action.type) {
		case 'SELECT_ALBUM':
  			return Object.assign({},{current:action.payload})
  		case 'UNSELECT_ALBUM':
  			return Object.assign({},{current:null})	
  }
  return state;
}

