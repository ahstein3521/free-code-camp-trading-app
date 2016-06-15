import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router'

class Nav extends Component{
	constructor(props){
		super(props)
		
		this.state={link:'/profile'}
	}
	renderButtons(){
		if(!this.props.auth.authenticated){
			return(
			<li>	   
				<Link to="/signin" className='btn1'>Sign In</Link>
	            <Link to='/signup' className='btn2'>Sign Up</Link>
	        </li>
	        )
		}
		return(
			<li>
			<button className='btn1' onClick={()=>{this.props.signoutUser()}}>Sign Out</button>
		        <Link to='/settings' className='btn2'>
		        	<span className='glyphicon glyphicon-user'></span>
		        </Link>
	        </li>
			)
	}
	renderLinks(){
		if(this.props.auth.authenticated){
			return <Link to="/profile"><h4>{this.props.auth.user.user.displayName+"'s profile"}</h4></Link>
		}else{
			return <Link to="/"><h4>Home</h4></Link> 
		}
	}
	render(){
		return(
	      <nav className='nav'>
	        <ul >
	          <li>
	            <Link to="/library"><h3>Show All</h3></Link>
	            {this.renderLinks()}
	          </li>
	          	{this.renderButtons()}
	        </ul>
	      </nav>
			)
	}
}

function mapStateToProps(state){
	
  return {auth:state.auth}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Nav);