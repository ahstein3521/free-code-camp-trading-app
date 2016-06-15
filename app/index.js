import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import promise from 'redux-promise'
import thunk from 'redux-thunk'

import App from './components/app';
import Home from './components/home';
import StoreFront from './components/store_front';
import Profile from './components/profile';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Auth from './components/auth';
import Settings from './components/update_form';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(promise,thunk)(createStore);


const store=createStoreWithMiddleware(reducers)



if (localStorage.getItem('token')) {
  store.dispatch({ type: 'AUTH_USER' });
}

ReactDOM.render(
 <Provider store={store}> 
   <Router history={browserHistory}>
     <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path='/library' component={StoreFront}/>  
      <Route path='/profile' component={Auth(Profile)}/>  
      <Route path='/signup' component={SignUp}/>  
      <Route path='/signin' component={SignIn}/>
      <Route path='/settings' component={Auth(Settings)}/>      
    </Route>
  </Router>
</Provider>
  , document.querySelector('.app'));

/**************************************************
todo:
When a trade is confirmed, each of the two records traded need to be removed from any other users profile if it is 
a pending trade

******************************************************/