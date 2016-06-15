export default function(state = {}, action) {
  switch(action.type) {
    case 'FIND_ALBUM':
      return Object.assign({},{current:action.payload.data.albums.items,
      							query:action.payload.data.albums.items}) 
    case 'CLEAR':
      return  Object.assign({},{current:null,query:null})   
  }
  return state;
}