import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import albumsReducer from './reducer_albums'
import searchReducer from './reducer_search'
import selected from './reducer_select'
import auth from './reducer_auth'
import user from './reducer_userData'

const rootReducer = combineReducers({
			albums:albumsReducer,
	search_results:searchReducer,
		  selected,
		  form,
		  user,
		  auth
});

export default rootReducer;
