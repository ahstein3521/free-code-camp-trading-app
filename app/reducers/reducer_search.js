export default function(state = {}, action) {
  switch(action.type) {
    case 'FIND_ALBUM':
      return Object.assign({},{current:action.payload.data.results.albummatches.album,
      							query:action.payload.data.results['opensearch:Query']['searchTerms']}) 
    case 'CLEAR':
      return  Object.assign({},{current:null,query:null})   
  }
  return state;
}