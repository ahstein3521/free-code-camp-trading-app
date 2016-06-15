import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';
import { Link } from 'react-router';

 class Update extends Component {
  handleFormSubmit({location,displayName}) {
    const user=this.props.auth.user;
    user.user.displayName=displayName;
    user.user.location=location;
    const info={location,displayName}
    this.props.updateUser(this.props.auth.user.user.name,user,info);
  }

  render() {
    const { handleSubmit, fields: { displayName,location }} = this.props;

    return (
        <form className='signup-form'  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h2>Your Info</h2>
           <fieldset className="form-group">
            <label>Name:</label>
            <input {...displayName} type='text' className="form-control" placeholder={this.props.user} required/>
          </fieldset>
          <fieldset className="form-group">
            <label>Location:</label>
            <input {...location} type='text' className="form-control" placeholder={this.props.location} required/>
          </fieldset>
          <fieldset className='signin-btn'>
            <button action="submit" className="btn">Update</button>
            <Link to={'/'}>
              <button action="submit" className="btn btn-cancel">Cancel</button>
            </Link>
          </fieldset>
        </form>      
    );
  }
}

function mapStateToProps({auth}) {
  let user=auth.authenticated? auth.user.user.displayName:null;
  let location=auth.authenticated? auth.user.user.location:null; 
  return { errorMessage: auth.error, user,location,auth };
}

export default reduxForm({
  form: 'update',
  fields: ['displayName','location']
}, mapStateToProps, actions)(Update);